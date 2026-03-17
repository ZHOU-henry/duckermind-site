(function () {
  function init() {
  const root = document.querySelector("[data-noesis-observatory]");
  if (!root) return;

  const factorButtons = root.querySelector("[data-factor-buttons]");
  const sliceButtons = root.querySelector("[data-slice-buttons]");
  const regionList = root.querySelector("[data-region-list]");
  const summary = root.querySelector("[data-observatory-summary]");
  const globeNode = root.querySelector("[data-globe-canvas]");
  if (!factorButtons || !sliceButtons || !regionList || !summary || !globeNode) {
    return;
  }

  const factors = {
    compute: {
      label: "Compute",
      color: "rgba(20,135,255,0.82)",
      summary:
        "Composite proxy built from data-center pipeline, hyperscaler capex, accelerator supply, and regional cluster signals."
    },
    algorithms: {
      label: "Algorithms",
      color: "rgba(118,69,255,0.82)",
      summary:
        "Composite proxy built from model-release density, frontier benchmark movement, and research-lab activity."
    },
    data: {
      label: "Data",
      color: "rgba(5,129,169,0.82)",
      summary:
        "Composite proxy built from dataset ecosystems, platform concentration, public data infrastructure, and data partnerships."
    },
    storage: {
      label: "Storage",
      color: "rgba(11,144,196,0.82)",
      summary:
        "Composite proxy built from storage buildout, cloud archive density, and data-center storage expansion."
    },
    energy: {
      label: "Energy",
      color: "rgba(214,154,52,0.88)",
      summary:
        "Composite proxy built from grid readiness, power agreements, energy abundance, and AI-infrastructure power accessibility."
    },
    talent: {
      label: "AI Talent",
      color: "rgba(222,107,72,0.86)",
      summary:
        "Composite proxy built from research clusters, hiring concentration, migration patterns, and institutional density."
    }
  };

  const observatoryData = {
    "2024": {
      compute: [
        { name: "US East", lat: 38.9, lng: -77.0, value: 84, note: "Northern Virginia and East Coast cluster" },
        { name: "US West", lat: 37.4, lng: -122.0, value: 79, note: "Bay Area and West Coast cluster" },
        { name: "Pacific Northwest", lat: 47.6, lng: -122.3, value: 72, note: "Seattle and cloud-region expansion belt" },
        { name: "Europe Core", lat: 50.1, lng: 8.6, value: 63, note: "Frankfurt, Amsterdam, Paris, London corridor" },
        { name: "China East", lat: 31.2, lng: 121.4, value: 78, note: "Shanghai-centered industrial and cloud density" },
        { name: "China North", lat: 39.9, lng: 116.4, value: 74, note: "Beijing policy, model, and state-backed cluster" },
        { name: "Japan", lat: 35.7, lng: 139.7, value: 59, note: "Tokyo compute and enterprise AI base" },
        { name: "Korea", lat: 37.56, lng: 126.98, value: 56, note: "Seoul semiconductor and cloud demand cluster" },
        { name: "India", lat: 19.0, lng: 72.8, value: 49, note: "Mumbai + Bengaluru buildout phase" },
        { name: "Singapore / Johor", lat: 1.35, lng: 103.8, value: 57, note: "Regional infra and logistics role" },
        { name: "Pacific Node", lat: 21.3, lng: -157.8, value: 43, note: "Submarine-cable and Pacific logistics proxy" },
        { name: "Gulf", lat: 24.5, lng: 54.4, value: 41, note: "Early energy-backed compute push" }
      ],
      algorithms: [
        { name: "US West", lat: 37.4, lng: -122.0, value: 90, note: "Highest frontier model and lab density" },
        { name: "US East", lat: 42.3, lng: -71.0, value: 66, note: "Academic + frontier research cluster" },
        { name: "China", lat: 39.9, lng: 116.4, value: 74, note: "Model systems and applied algorithm scale" },
        { name: "UK", lat: 51.5, lng: -0.1, value: 58, note: "DeepMind and London research concentration" },
        { name: "France", lat: 48.8, lng: 2.3, value: 54, note: "Paris / Mistral / Inria / math-ML cluster" },
        { name: "Japan", lat: 35.7, lng: 139.7, value: 51, note: "Enterprise and robotics-adjacent algorithm strength" },
        { name: "Korea", lat: 37.56, lng: 126.98, value: 48, note: "Vision and semiconductor-adjacent algorithm talent" },
        { name: "India", lat: 12.9, lng: 77.6, value: 44, note: "Fast-growing talent and product lab presence" },
        { name: "Singapore", lat: 1.29, lng: 103.85, value: 46, note: "Regional research and deployment node" }
      ],
      data: [
        { name: "US", lat: 39.0, lng: -98.0, value: 86, note: "Platform concentration and open-data ecosystem scale" },
        { name: "Europe", lat: 50.1, lng: 8.6, value: 60, note: "High institutional density, tighter governance" },
        { name: "China", lat: 31.2, lng: 121.4, value: 75, note: "Large-scale domestic data ecosystem" },
        { name: "Japan", lat: 35.7, lng: 139.7, value: 47, note: "Industrial and enterprise data-rich environment" },
        { name: "Korea", lat: 37.56, lng: 126.98, value: 44, note: "Consumer-tech and device ecosystem data strength" },
        { name: "India", lat: 20.5, lng: 78.9, value: 51, note: "Population-scale digital exhaust and services data" },
        { name: "SEA", lat: 1.35, lng: 103.8, value: 45, note: "Regional logistics and consumer-scale data growth" }
      ],
      storage: [
        { name: "US East", lat: 38.9, lng: -77.0, value: 82, note: "Large hyperscaler archive/storage presence" },
        { name: "US West", lat: 37.4, lng: -122.0, value: 76, note: "Cloud backbone and research-adjacent storage" },
        { name: "Europe Core", lat: 52.3, lng: 4.9, value: 61, note: "Amsterdam / Frankfurt corridor" },
        { name: "China", lat: 31.2, lng: 121.4, value: 72, note: "Large domestic cloud storage footprint" },
        { name: "Japan", lat: 35.7, lng: 139.7, value: 54, note: "Enterprise cloud and storage-heavy industrial demand" },
        { name: "Korea", lat: 37.56, lng: 126.98, value: 49, note: "High-density storage and device ecosystem support" },
        { name: "Singapore", lat: 1.29, lng: 103.85, value: 50, note: "Regional data warehousing node" }
      ],
      energy: [
        { name: "US", lat: 39.0, lng: -98.0, value: 73, note: "Mixed grid, rising AI power demand" },
        { name: "US West", lat: 37.4, lng: -122.0, value: 68, note: "Power-constrained but capital-rich West Coast corridor" },
        { name: "Nordics", lat: 59.3, lng: 18.1, value: 79, note: "Clean power and cool-climate infra advantage" },
        { name: "Canada", lat: 45.4, lng: -73.6, value: 68, note: "Hydro and cooling advantage" },
        { name: "China", lat: 35.8, lng: 104.1, value: 76, note: "Scale advantage with mixed energy constraints" },
        { name: "Japan", lat: 35.7, lng: 139.7, value: 46, note: "Import-dependent energy context with high demand" },
        { name: "Korea", lat: 37.56, lng: 126.98, value: 44, note: "Dense industrial load and constrained energy profile" },
        { name: "Gulf", lat: 24.5, lng: 54.4, value: 71, note: "Energy-backed compute ambition" }
      ],
      talent: [
        { name: "US West", lat: 37.4, lng: -122.0, value: 91, note: "Bay Area frontier cluster" },
        { name: "US East", lat: 42.3, lng: -71.0, value: 67, note: "Boston / NYC research and startup layer" },
        { name: "UK", lat: 51.5, lng: -0.1, value: 63, note: "DeepMind and allied ecosystem" },
        { name: "France", lat: 48.8, lng: 2.3, value: 61, note: "Mistral / Inria / academic cluster" },
        { name: "Japan", lat: 35.7, lng: 139.7, value: 57, note: "Robotics, enterprise, and advanced engineering talent" },
        { name: "Korea", lat: 37.56, lng: 126.98, value: 53, note: "Semiconductor and applied AI talent density" },
        { name: "India", lat: 12.9, lng: 77.6, value: 72, note: "Large-scale engineering and AI labor pool" },
        { name: "Singapore", lat: 1.29, lng: 103.85, value: 58, note: "Dense regional high-skill node" },
        { name: "Israel", lat: 32.08, lng: 34.78, value: 55, note: "High-intensity entrepreneurial AI cluster" }
      ]
    },
    "2025": {},
    "2026": {}
  };

  observatoryData["2025"] = JSON.parse(JSON.stringify(observatoryData["2024"]));
  observatoryData["2026"] = JSON.parse(JSON.stringify(observatoryData["2024"]));

  const bump = {
    compute: [2, 2, 2, 3, 3, 2, 2, 2, 2, 3, 4, 6],
    algorithms: [2, 1, 2, 2, 2, 2, 2, 2, 3],
    data: [1, 1, 2, 1, 1, 2, 2],
    storage: [2, 1, 2, 2, 1, 1, 3],
    energy: [1, 1, 2, 1, 2, 1, 1, 4],
    talent: [1, 1, 1, 2, 1, 1, 3, 2, 1]
  };

  Object.keys(observatoryData["2025"]).forEach((factor) => {
    observatoryData["2025"][factor].forEach((item, index) => {
      item.value = Math.min(item.value + bump[factor][index], 100);
    });
  });

  Object.keys(observatoryData["2026"]).forEach((factor) => {
    observatoryData["2026"][factor].forEach((item, index) => {
      item.value = Math.min(item.value + bump[factor][index] * 2, 100);
    });
  });

  let currentFactor = "compute";
  let currentYear = "2026";
  let countryFeatures = [];

  function sphericalToCartesian(lat, lng) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return {
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.cos(phi),
      z: Math.sin(phi) * Math.sin(theta)
    };
  }

  function rotatePoint(point, lon, lat) {
    const lonRad = lon * (Math.PI / 180);
    const latRad = lat * (Math.PI / 180);

    const x1 = point.x * Math.cos(lonRad) - point.z * Math.sin(lonRad);
    const z1 = point.x * Math.sin(lonRad) + point.z * Math.cos(lonRad);
    const y1 = point.y;

    return {
      x: x1,
      y: y1 * Math.cos(latRad) - z1 * Math.sin(latRad),
      z: y1 * Math.sin(latRad) + z1 * Math.cos(latRad)
    };
  }

  function initFallbackGlobe() {
    const canvas = document.createElement("canvas");
    canvas.className = "globe-canvas";
    globeNode.innerHTML = "";
    globeNode.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let lon = 118;
    let lat = 10;
    let zoom = 1;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    function resize() {
      const rect = globeNode.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        requestAnimationFrame(resize);
        return;
      }
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.max(640, rect.width * ratio);
      canvas.height = Math.max(420, rect.height * ratio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    }

    function projectPoint(latValue, lngValue, cx, cy, radius) {
      const p = rotatePoint(sphericalToCartesian(latValue, lngValue), lon, lat);
      return {
        x: cx + radius * p.x,
        y: cy - radius * p.y,
        z: p.z
      };
    }

    function drawGraticule(cx, cy, radius) {
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;
      for (let latLine = -60; latLine <= 60; latLine += 30) {
        ctx.beginPath();
        let started = false;
        for (let lngLine = -180; lngLine <= 180; lngLine += 4) {
          const p = rotatePoint(sphericalToCartesian(latLine, lngLine), lon, lat);
          if (p.z < 0) {
            started = false;
            continue;
          }
          const x = cx + radius * p.x;
          const y = cy - radius * p.y;
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      for (let lngLine = -150; lngLine <= 180; lngLine += 30) {
        ctx.beginPath();
        let started = false;
        for (let latLine = -90; latLine <= 90; latLine += 4) {
          const p = rotatePoint(sphericalToCartesian(latLine, lngLine), lon, lat);
          if (p.z < 0) {
            started = false;
            continue;
          }
          const x = cx + radius * p.x;
          const y = cy - radius * p.y;
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
    }

    function drawCountries(cx, cy, radius) {
      if (!countryFeatures.length) return;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      ctx.fillStyle = "rgba(122, 182, 120, 0.36)";
      ctx.strokeStyle = "rgba(218, 240, 255, 0.4)";
      ctx.lineWidth = 1.15;

      for (const feature of countryFeatures) {
        const polygons =
          feature.geometry.type === "Polygon"
            ? [feature.geometry.coordinates]
            : feature.geometry.coordinates;

        for (const polygon of polygons) {
          for (const ring of polygon) {
            let visibleCount = 0;
            ctx.beginPath();
            let started = false;
            for (const [lngValue, latValue] of ring) {
              const point = projectPoint(latValue, lngValue, cx, cy, radius);
              if (point.z < -0.02) {
                started = false;
                continue;
              }
              visibleCount += 1;
              if (!started) {
                ctx.moveTo(point.x, point.y);
                started = true;
              } else {
                ctx.lineTo(point.x, point.y);
              }
            }
            if (visibleCount > 2) {
              ctx.closePath();
              ctx.fill();
              ctx.stroke();
            }
          }
        }
      }

      ctx.restore();
    }

    function draw() {
      const rect = globeNode.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.38 * zoom;

      const sphere = ctx.createRadialGradient(cx - radius * 0.25, cy - radius * 0.3, radius * 0.12, cx, cy, radius);
      sphere.addColorStop(0, "rgba(67, 159, 255, 0.8)");
      sphere.addColorStop(0.5, "rgba(18, 44, 84, 0.96)");
      sphere.addColorStop(1, "rgba(7, 16, 32, 1)");
      ctx.fillStyle = sphere;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      drawCountries(cx, cy, radius);
      drawGraticule(cx, cy, radius);

      const items = observatoryData[currentYear][currentFactor];
      const factorColor = factors[currentFactor].color;
      items.forEach((item) => {
        const p = rotatePoint(sphericalToCartesian(item.lat, item.lng), lon, lat);
        if (p.z < 0) return;
        const x = cx + radius * p.x;
        const y = cy - radius * p.y;
        const dotRadius = 3 + item.value * 0.06 * zoom;
        ctx.beginPath();
        ctx.fillStyle = factorColor;
        ctx.globalAlpha = 0.22;
        ctx.arc(x, y, dotRadius * 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.fillStyle = factorColor;
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.88)";
        ctx.font = "12px Manrope";
        ctx.fillText(item.name, x + dotRadius + 4, y - dotRadius - 2);
      });
    }

    canvas.addEventListener("pointerdown", (event) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    });

    canvas.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const deltaX = event.clientX - lastX;
      const deltaY = event.clientY - lastY;
      lon += deltaX * 0.35;
      lat = Math.max(-70, Math.min(70, lat + deltaY * 0.22));
      lastX = event.clientX;
      lastY = event.clientY;
      draw();
    });

    canvas.addEventListener("pointerup", () => {
      dragging = false;
    });

    canvas.addEventListener("wheel", (event) => {
      event.preventDefault();
      const delta = event.deltaY > 0 ? -0.08 : 0.08;
      zoom = Math.max(0.72, Math.min(1.55, zoom + delta));
      draw();
    });

    window.addEventListener("resize", resize);
    async function loadCountryData() {
      try {
        const response = await fetch("/assets/data/countries-110m.json");
        const topology = await response.json();
        if (window.topojson && topology.objects && topology.objects.countries) {
          countryFeatures = window.topojson.feature(topology, topology.objects.countries).features;
          draw();
        }
      } catch (error) {
        // Leave the globe usable even if boundary data fails.
      }
    }

    loadCountryData();
    resize();
    return {
      update: draw
    };
  }

  function buildPointData(items, color) {
    return items.map((item) => ({
      ...item,
      color,
      radius: 0.28 + item.value * 0.0042,
      altitude: 0.02 + item.value * 0.0018
    }));
  }

  let globe = null;
  let fallback = null;

  fallback = initFallbackGlobe();

  function applyData() {
    const factorMeta = factors[currentFactor];
    const items = observatoryData[currentYear][currentFactor];
    const sorted = [...items].sort((a, b) => b.value - a.value);

    if (fallback) {
      fallback.update();
    }

    summary.textContent = `${factorMeta.label} · ${currentYear} · ${factorMeta.summary}`;
    regionList.innerHTML = sorted
      .map(
        (item) => `
          <article class="region-item">
            <small>${currentYear} · ${factorMeta.label}</small>
            <strong>${item.name} · ${item.value}</strong>
            <p class="mini-note">${item.note}</p>
          </article>
        `
      )
      .join("");
  }

  factorButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      currentFactor = button.dataset.factor;
      factorButtons
        .querySelectorAll("button")
        .forEach((node) => node.classList.toggle("globe-button-active", node === button));
      applyData();
    });
  });

  sliceButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      currentYear = button.dataset.slice;
      sliceButtons
        .querySelectorAll("button")
        .forEach((node) => node.classList.toggle("slice-button-active", node === button));
      applyData();
    });
  });

  window.addEventListener("resize", () => {
    if (!globe) return;
    globe.width(globeNode.clientWidth || 720);
  });

  applyData();
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init, { once: true });
  }
})();
