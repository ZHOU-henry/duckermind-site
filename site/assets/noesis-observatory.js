(function () {
  const root = document.querySelector("[data-noesis-observatory]");
  if (!root) return;

  const factorButtons = root.querySelector("[data-factor-buttons]");
  const sliceButtons = root.querySelector("[data-slice-buttons]");
  const regionList = root.querySelector("[data-region-list]");
  const summary = root.querySelector("[data-observatory-summary]");
  const globeNode = root.querySelector("[data-globe-canvas]");

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
        { name: "Europe Core", lat: 50.1, lng: 8.6, value: 63, note: "Frankfurt, Amsterdam, Paris, London corridor" },
        { name: "China East", lat: 31.2, lng: 121.4, value: 78, note: "Shanghai-centered industrial and cloud density" },
        { name: "China North", lat: 39.9, lng: 116.4, value: 74, note: "Beijing policy, model, and state-backed cluster" },
        { name: "India", lat: 19.0, lng: 72.8, value: 49, note: "Mumbai + Bengaluru buildout phase" },
        { name: "Singapore / Johor", lat: 1.35, lng: 103.8, value: 57, note: "Regional infra and logistics role" },
        { name: "Gulf", lat: 24.5, lng: 54.4, value: 41, note: "Early energy-backed compute push" }
      ],
      algorithms: [
        { name: "US West", lat: 37.4, lng: -122.0, value: 90, note: "Highest frontier model and lab density" },
        { name: "US East", lat: 42.3, lng: -71.0, value: 66, note: "Academic + frontier research cluster" },
        { name: "China", lat: 39.9, lng: 116.4, value: 74, note: "Model systems and applied algorithm scale" },
        { name: "UK", lat: 51.5, lng: -0.1, value: 58, note: "DeepMind and London research concentration" },
        { name: "France", lat: 48.8, lng: 2.3, value: 54, note: "Paris / Mistral / Inria / math-ML cluster" },
        { name: "India", lat: 12.9, lng: 77.6, value: 44, note: "Fast-growing talent and product lab presence" },
        { name: "Singapore", lat: 1.29, lng: 103.85, value: 46, note: "Regional research and deployment node" }
      ],
      data: [
        { name: "US", lat: 39.0, lng: -98.0, value: 86, note: "Platform concentration and open-data ecosystem scale" },
        { name: "Europe", lat: 50.1, lng: 8.6, value: 60, note: "High institutional density, tighter governance" },
        { name: "China", lat: 31.2, lng: 121.4, value: 75, note: "Large-scale domestic data ecosystem" },
        { name: "India", lat: 20.5, lng: 78.9, value: 51, note: "Population-scale digital exhaust and services data" },
        { name: "SEA", lat: 1.35, lng: 103.8, value: 45, note: "Regional logistics and consumer-scale data growth" }
      ],
      storage: [
        { name: "US East", lat: 38.9, lng: -77.0, value: 82, note: "Large hyperscaler archive/storage presence" },
        { name: "US West", lat: 37.4, lng: -122.0, value: 76, note: "Cloud backbone and research-adjacent storage" },
        { name: "Europe Core", lat: 52.3, lng: 4.9, value: 61, note: "Amsterdam / Frankfurt corridor" },
        { name: "China", lat: 31.2, lng: 121.4, value: 72, note: "Large domestic cloud storage footprint" },
        { name: "Singapore", lat: 1.29, lng: 103.85, value: 50, note: "Regional data warehousing node" }
      ],
      energy: [
        { name: "US", lat: 39.0, lng: -98.0, value: 73, note: "Mixed grid, rising AI power demand" },
        { name: "Nordics", lat: 59.3, lng: 18.1, value: 79, note: "Clean power and cool-climate infra advantage" },
        { name: "Canada", lat: 45.4, lng: -73.6, value: 68, note: "Hydro and cooling advantage" },
        { name: "China", lat: 35.8, lng: 104.1, value: 76, note: "Scale advantage with mixed energy constraints" },
        { name: "Gulf", lat: 24.5, lng: 54.4, value: 71, note: "Energy-backed compute ambition" }
      ],
      talent: [
        { name: "US West", lat: 37.4, lng: -122.0, value: 91, note: "Bay Area frontier cluster" },
        { name: "US East", lat: 42.3, lng: -71.0, value: 67, note: "Boston / NYC research and startup layer" },
        { name: "UK", lat: 51.5, lng: -0.1, value: 63, note: "DeepMind and allied ecosystem" },
        { name: "France", lat: 48.8, lng: 2.3, value: 61, note: "Mistral / Inria / academic cluster" },
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
    compute: [2, 2, 3, 3, 2, 2, 3, 6],
    algorithms: [2, 1, 2, 2, 2, 2, 3],
    data: [1, 1, 2, 2, 2],
    storage: [2, 1, 2, 2, 3],
    energy: [1, 2, 1, 2, 4],
    talent: [1, 1, 1, 2, 3, 2, 1]
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

  function buildPointData(items, color) {
    return items.map((item) => ({
      ...item,
      color,
      radius: 0.28 + item.value * 0.0042,
      altitude: 0.02 + item.value * 0.0018
    }));
  }

  const globe = window.Globe
    ? window.Globe()(globeNode)
        .width(globeNode.clientWidth || 720)
        .height(560)
        .backgroundColor("rgba(0,0,0,0)")
        .globeImageUrl("/assets/images/earth-night.jpg")
        .showAtmosphere(true)
        .atmosphereColor("#66c6ff")
        .atmosphereAltitude(0.15)
        .pointLat("lat")
        .pointLng("lng")
        .pointAltitude("altitude")
        .pointRadius("radius")
        .pointColor("color")
        .labelLat("lat")
        .labelLng("lng")
        .labelText((d) => d.name)
        .labelSize(1.2)
        .labelColor(() => "rgba(255,255,255,0.85)")
        .labelDotRadius(0.2)
        .labelAltitude(0.01)
    : null;

  function applyData() {
    const factorMeta = factors[currentFactor];
    const items = observatoryData[currentYear][currentFactor];
    const sorted = [...items].sort((a, b) => b.value - a.value);

    if (globe) {
      const pointData = buildPointData(items, factorMeta.color);
      globe.pointsData(pointData);
      globe.labelsData(pointData);
      const controls = globe.controls();
      controls.autoRotate = false;
      controls.enablePan = false;
      controls.minDistance = 120;
      controls.maxDistance = 360;
      globe.pointOfView({ lat: 22, lng: 12, altitude: 2.0 }, 600);
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
})();
