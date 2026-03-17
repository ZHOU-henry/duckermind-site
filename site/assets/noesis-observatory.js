(function () {
  const DATA_URL = "/assets/data/noesis-observatory.json";
  const TOPOLOGY_URL = "/assets/data/countries-110m.json";

  function hexToRgba(hex, alpha) {
    const safe = String(hex || "#1491ff").replace("#", "");
    const value = safe.length === 3
      ? safe
          .split("")
          .map((char) => char + char)
          .join("")
      : safe;
    const red = parseInt(value.slice(0, 2), 16);
    const green = parseInt(value.slice(2, 4), 16);
    const blue = parseInt(value.slice(4, 6), 16);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  function seededRandom(seed) {
    let state = seed % 2147483647;
    if (state <= 0) state += 2147483646;
    return function next() {
      state = (state * 16807) % 2147483647;
      return (state - 1) / 2147483646;
    };
  }

  function buildSeed(parts) {
    let hash = 0;
    parts.forEach((part) => {
      const text = String(part);
      for (let index = 0; index < text.length; index += 1) {
        hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
      }
    });
    return hash || 1;
  }

  function projectPoint(lat, lng, centerLon, centerLat, radius) {
    const phi = (lat * Math.PI) / 180;
    const lambda = (lng * Math.PI) / 180;
    const phi0 = (centerLat * Math.PI) / 180;
    const lambda0 = (centerLon * Math.PI) / 180;
    const delta = lambda - lambda0;

    const cosc =
      Math.sin(phi0) * Math.sin(phi) +
      Math.cos(phi0) * Math.cos(phi) * Math.cos(delta);

    return {
      x: radius * Math.cos(phi) * Math.sin(delta),
      y:
        radius *
        (Math.cos(phi0) * Math.sin(phi) -
          Math.sin(phi0) * Math.cos(phi) * Math.cos(delta)),
      visible: cosc > 0,
      depth: cosc,
    };
  }

  function buildPointCloud(items, factorKey, yearKey) {
    const points = [];

    items.forEach((item, itemIndex) => {
      const anchors = item.anchors && item.anchors.length ? item.anchors : [[item.lat, item.lng]];
      const seed = buildSeed([yearKey, factorKey, item.iso3 || item.name, itemIndex]);
      const random = seededRandom(seed);
      const totalPoints = Math.max(28, Math.round(item.value * 2.25));
      const perAnchor = Math.max(12, Math.round(totalPoints / anchors.length));
      const spreadLat = 0.34 + item.value * 0.013;
      const spreadLng = 0.48 + item.value * 0.019;

      anchors.forEach((anchor, anchorIndex) => {
        const [baseLat, baseLng] = anchor;
        for (let index = 0; index < perAnchor; index += 1) {
          const jitterLat = (random() - 0.5) * spreadLat * (0.8 + anchorIndex * 0.12);
          const jitterLng = (random() - 0.5) * spreadLng * (0.8 + anchorIndex * 0.12);
          const intensity = 0.35 + random() * 0.65;
          points.push({
            country: item.name,
            lat: baseLat + jitterLat,
            lng: baseLng + jitterLng,
            intensity,
            value: item.value,
          });
        }

        const orbitPoints = Math.max(6, Math.round(item.value * 0.18));
        for (let index = 0; index < orbitPoints; index += 1) {
          const angle = random() * Math.PI * 2;
          const orbitRadiusLat = spreadLat * (0.75 + random() * 0.95);
          const orbitRadiusLng = spreadLng * (0.75 + random() * 1.15);
          const intensity = 0.18 + random() * 0.35;
          points.push({
            country: item.name,
            lat: baseLat + Math.sin(angle) * orbitRadiusLat,
            lng: baseLng + Math.cos(angle) * orbitRadiusLng,
            intensity,
            value: item.value,
          });
        }
      });
    });

    return points;
  }

  async function init() {
    const root = document.querySelector("[data-noesis-observatory]");
    if (!root) return;

    const factorButtons = root.querySelector("[data-factor-buttons]");
    const sliceButtons = root.querySelector("[data-slice-buttons]");
    const regionList = root.querySelector("[data-region-list]");
    const summary = root.querySelector("[data-observatory-summary]");
    const globeNode = root.querySelector("[data-globe-canvas]");
    const yearNote = root.querySelector("[data-observatory-year-note]");
    const sourceList = root.querySelector("[data-observatory-sources]");
    if (
      !factorButtons ||
      !sliceButtons ||
      !regionList ||
      !summary ||
      !globeNode ||
      !yearNote ||
      !sourceList
    ) {
      return;
    }

    const [dataResponse, topologyResponse] = await Promise.all([
      fetch(DATA_URL),
      fetch(TOPOLOGY_URL),
    ]);
    const observatory = await dataResponse.json();
    const topology = await topologyResponse.json();
    const countryFeatures =
      window.topojson && topology.objects && topology.objects.countries
        ? window.topojson.feature(topology, topology.objects.countries).features
        : [];

    const canvas = document.createElement("canvas");
    canvas.className = "globe-canvas";
    globeNode.innerHTML = "";
    globeNode.appendChild(canvas);

    const context = canvas.getContext("2d");
    const pointCache = new Map();
    const state = {
      factorKey: "compute",
      yearKey: "2026",
      selectedCountry: null,
      centerLon: 112,
      centerLat: 18,
      zoom: 1,
      dragging: false,
      lastX: 0,
      lastY: 0,
    };

    function getFactorMeta() {
      return observatory.factors[state.factorKey];
    }

    function getItems() {
      const items = observatory.years[state.yearKey][state.factorKey] || [];
      return [...items].sort((left, right) => right.value - left.value);
    }

    function getSelectedCountry(items) {
      if (!state.selectedCountry || !items.some((item) => item.name === state.selectedCountry)) {
        state.selectedCountry = items[0] ? items[0].name : null;
      }
      return items.find((item) => item.name === state.selectedCountry) || items[0] || null;
    }

    function getPointCloud(items) {
      const cacheKey = `${state.yearKey}:${state.factorKey}`;
      if (!pointCache.has(cacheKey)) {
        pointCache.set(cacheKey, buildPointCloud(items, state.factorKey, state.yearKey));
      }
      return pointCache.get(cacheKey);
    }

    function drawStars(width, height) {
      const starRandom = seededRandom(17032026);
      for (let index = 0; index < 180; index += 1) {
        const x = starRandom() * width;
        const y = starRandom() * height;
        const radius = starRandom() > 0.94 ? 1.9 : 0.8 + starRandom() * 0.8;
        context.fillStyle = `rgba(255,255,255,${0.06 + starRandom() * 0.28})`;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }
    }

    function drawSphere(centerX, centerY, radius) {
      context.save();

      const halo = context.createRadialGradient(
        centerX,
        centerY,
        radius * 0.22,
        centerX,
        centerY,
        radius * 1.38
      );
      halo.addColorStop(0, "rgba(113, 167, 255, 0.08)");
      halo.addColorStop(0.5, "rgba(58, 133, 255, 0.12)");
      halo.addColorStop(1, "rgba(9, 18, 32, 0)");
      context.fillStyle = halo;
      context.beginPath();
      context.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      context.fill();

      const ocean = context.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.34,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      ocean.addColorStop(0, "rgba(88, 172, 255, 0.95)");
      ocean.addColorStop(0.28, "rgba(31, 84, 171, 0.98)");
      ocean.addColorStop(0.72, "rgba(12, 28, 68, 1)");
      ocean.addColorStop(1, "rgba(6, 12, 28, 1)");

      context.fillStyle = ocean;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = "rgba(190, 227, 255, 0.32)";
      context.lineWidth = 1.4;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.stroke();

      context.restore();
    }

    function drawCountryLayer(centerX, centerY, radius) {
      if (!countryFeatures.length) return;

      context.save();
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.clip();

      for (const feature of countryFeatures) {
        const polygons =
          feature.geometry.type === "Polygon"
            ? [feature.geometry.coordinates]
            : feature.geometry.coordinates;

        for (const polygon of polygons) {
          for (const ring of polygon) {
            let visiblePoints = 0;
            context.beginPath();
            let started = false;

            for (const coordinate of ring) {
              const lng = coordinate[0];
              const lat = coordinate[1];
              const point = projectPoint(lat, lng, state.centerLon, state.centerLat, radius);
              if (!point.visible || point.depth < 0.015) {
                started = false;
                continue;
              }
              visiblePoints += 1;
              const x = centerX + point.x;
              const y = centerY - point.y;
              if (!started) {
                context.moveTo(x, y);
                started = true;
              } else {
                context.lineTo(x, y);
              }
            }

            if (visiblePoints > 2) {
              context.closePath();
              const land = context.createLinearGradient(
                centerX - radius,
                centerY - radius,
                centerX + radius,
                centerY + radius
              );
              land.addColorStop(0, "rgba(86, 142, 88, 0.88)");
              land.addColorStop(0.55, "rgba(132, 182, 118, 0.94)");
              land.addColorStop(1, "rgba(173, 198, 125, 0.82)");
              context.fillStyle = land;
              context.strokeStyle = "rgba(244, 251, 255, 0.58)";
              context.lineWidth = 1.1;
              context.fill();
              context.stroke();
              context.strokeStyle = "rgba(16, 29, 42, 0.18)";
              context.lineWidth = 0.45;
              context.stroke();
            }
          }
        }
      }

      context.restore();
    }

    function drawGraticule(centerX, centerY, radius) {
      context.save();
      context.strokeStyle = "rgba(232, 244, 255, 0.13)";
      context.lineWidth = 0.8;

      for (let lat = -60; lat <= 60; lat += 30) {
        context.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 4) {
          const point = projectPoint(lat, lng, state.centerLon, state.centerLat, radius);
          if (!point.visible) {
            started = false;
            continue;
          }
          const x = centerX + point.x;
          const y = centerY - point.y;
          if (!started) {
            context.moveTo(x, y);
            started = true;
          } else {
            context.lineTo(x, y);
          }
        }
        context.stroke();
      }

      for (let lng = -150; lng <= 180; lng += 30) {
        context.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 4) {
          const point = projectPoint(lat, lng, state.centerLon, state.centerLat, radius);
          if (!point.visible) {
            started = false;
            continue;
          }
          const x = centerX + point.x;
          const y = centerY - point.y;
          if (!started) {
            context.moveTo(x, y);
            started = true;
          } else {
            context.lineTo(x, y);
          }
        }
        context.stroke();
      }

      context.restore();
    }

    function drawPointCloud(points, centerX, centerY, radius, color, selectedCountry) {
      context.save();
      context.globalCompositeOperation = "lighter";

      for (const point of points) {
        const projected = projectPoint(
          point.lat,
          point.lng,
          state.centerLon,
          state.centerLat,
          radius
        );
        if (!projected.visible || projected.depth < 0.02) continue;

        const x = centerX + projected.x;
        const y = centerY - projected.y;
        const isSelected = selectedCountry && point.country === selectedCountry.name;
        const baseRadius = 0.26 + point.intensity * 0.85 + point.value * 0.0025;
        const glowRadius = baseRadius * (isSelected ? 9.6 : 6.2);
        const coreRadius = baseRadius * (isSelected ? 1.75 : 1.18);

        context.fillStyle = hexToRgba(color, isSelected ? 0.22 : 0.085);
        context.beginPath();
        context.arc(x, y, glowRadius, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = hexToRgba(color, isSelected ? 0.96 : 0.74);
        context.beginPath();
        context.arc(x, y, coreRadius, 0, Math.PI * 2);
        context.fill();
      }

      context.restore();
    }

    function drawLabels(items, centerX, centerY, radius, selectedCountry) {
      context.save();
      context.font = '600 12px "Manrope", sans-serif';
      context.textBaseline = "middle";

      items.slice(0, 6).forEach((item) => {
        const point = projectPoint(item.lat, item.lng, state.centerLon, state.centerLat, radius);
        if (!point.visible || point.depth < 0.08) return;

        const x = centerX + point.x;
        const y = centerY - point.y;
        const isSelected = selectedCountry && item.name === selectedCountry.name;
        context.fillStyle = isSelected
          ? "rgba(255, 245, 220, 0.96)"
          : "rgba(236, 244, 255, 0.82)";
        context.fillText(item.name, x + 8, y - 10);
      });

      context.restore();
    }

    function drawSelectedOrbit(centerX, centerY, radius, selectedCountry, color) {
      if (!selectedCountry) return;
      const point = projectPoint(
        selectedCountry.lat,
        selectedCountry.lng,
        state.centerLon,
        state.centerLat,
        radius
      );
      if (!point.visible || point.depth < 0.03) return;

      const x = centerX + point.x;
      const y = centerY - point.y;
      context.save();
      context.strokeStyle = hexToRgba(color, 0.86);
      context.lineWidth = 1.3;
      context.beginPath();
      context.arc(x, y, 15, 0, Math.PI * 2);
      context.stroke();
      context.strokeStyle = "rgba(255,255,255,0.72)";
      context.beginPath();
      context.arc(x, y, 6, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }

    function renderSidebar(items, factorMeta, selectedCountry) {
      const yearNoteText = observatory.yearNotes[state.yearKey] || "";
      const sourceHtml = (factorMeta.sources || [])
        .map(
          (source) => `
            <li class="globe-source-item">
              <a href="${source.url}" target="_blank" rel="noreferrer">${source.name}</a>
              <p>${source.detail}</p>
            </li>
          `
        )
        .join("");

      yearNote.textContent = yearNoteText;
      sourceList.innerHTML = sourceHtml;

      regionList.innerHTML = items
        .map((item) => {
          const isSelected = selectedCountry && item.name === selectedCountry.name;
          const metrics = (item.metrics || [])
            .slice(0, 3)
            .map(
              (metric) => `
                <li class="region-metric">
                  <span>${metric.label}</span>
                  <strong>${metric.value}</strong>
                </li>
              `
            )
            .join("");
          return `
            <article class="region-item ${isSelected ? "region-item-active" : ""}" data-country="${item.name}">
              <small>${state.yearKey} · ${factorMeta.label}</small>
              <strong>${item.name} · ${item.value}</strong>
              <p class="mini-note">${item.note}</p>
              <ul class="region-metric-list">${metrics}</ul>
            </article>
          `;
        })
        .join("");

      regionList.querySelectorAll("[data-country]").forEach((node) => {
        node.addEventListener("click", () => {
          state.selectedCountry = node.getAttribute("data-country");
          render();
        });
      });
    }

    function render() {
      const rect = globeNode.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (!width || !height) return;

      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.max(720, Math.round(width * ratio));
      canvas.height = Math.max(460, Math.round(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      context.clearRect(0, 0, width, height);
      drawStars(width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.39 * state.zoom;
      drawSphere(centerX, centerY, radius);
      drawCountryLayer(centerX, centerY, radius);
      drawGraticule(centerX, centerY, radius);

      const factorMeta = getFactorMeta();
      const items = getItems();
      const selectedCountry = getSelectedCountry(items);
      const points = getPointCloud(items);

      drawPointCloud(points, centerX, centerY, radius, factorMeta.color, selectedCountry);
      drawSelectedOrbit(centerX, centerY, radius, selectedCountry, factorMeta.color);
      drawLabels(items, centerX, centerY, radius, selectedCountry);

      summary.textContent = `${factorMeta.label} · ${state.yearKey} · ${factorMeta.summary} ${factorMeta.methodology}`;
      renderSidebar(items, factorMeta, selectedCountry);
    }

    function updateFactorButtons(activeFactor) {
      factorButtons.querySelectorAll("button").forEach((button) => {
        button.classList.toggle("globe-button-active", button.dataset.factor === activeFactor);
      });
    }

    function updateSliceButtons(activeYear) {
      sliceButtons.querySelectorAll("button").forEach((button) => {
        button.classList.toggle("slice-button-active", button.dataset.slice === activeYear);
      });
    }

    factorButtons.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        state.factorKey = button.dataset.factor;
        state.selectedCountry = null;
        updateFactorButtons(state.factorKey);
        render();
      });
    });

    sliceButtons.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        state.yearKey = button.dataset.slice;
        state.selectedCountry = null;
        updateSliceButtons(state.yearKey);
        render();
      });
    });

    canvas.addEventListener("pointerdown", (event) => {
      state.dragging = true;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    });

    canvas.addEventListener("pointermove", (event) => {
      if (!state.dragging) return;
      const deltaX = event.clientX - state.lastX;
      const deltaY = event.clientY - state.lastY;
      state.centerLon -= deltaX * 0.24;
      state.centerLat = Math.max(-70, Math.min(70, state.centerLat + deltaY * 0.18));
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      render();
    });

    function endDrag() {
      state.dragging = false;
    }

    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointerleave", endDrag);
    canvas.addEventListener("wheel", (event) => {
      event.preventDefault();
      state.zoom = Math.max(0.76, Math.min(1.42, state.zoom + (event.deltaY > 0 ? -0.06 : 0.06)));
      render();
    });

    window.addEventListener("resize", render);

    updateFactorButtons(state.factorKey);
    updateSliceButtons(state.yearKey);
    render();
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init, { once: true });
  }
})();
