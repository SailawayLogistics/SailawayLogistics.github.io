// These dots are a deterministic visual texture for coverage, not shipment records.
const carrierCountryIds = new Set([40, 56, 70, 100, 191, 203, 208, 233, 246, 250, 276, 300, 348, 428, 440, 442, 499, 528, 620, 642, 688, 703, 705, 724, 752]);
const forwardingCountryIds = new Set([...carrierCountryIds, 380, 756]);

const anchors = {
  ES: [-3.7038, 40.4168], PT: [-9.1393, 38.7223], FR: [2.3522, 48.8566],
  BE: [4.3517, 50.8503], NL: [4.9041, 52.3676], DE: [13.405, 52.52],
  LU: [6.1296, 49.6116], AT: [16.3738, 48.2082], CZ: [14.4378, 50.0755],
  HU: [19.0402, 47.4979], RO: [26.1025, 44.4268], DK: [12.5683, 55.6761],
  SE: [18.0686, 59.3293], HR: [15.9819, 45.815], BA: [17.191, 44.772],
  RS: [20.4573, 44.7872], ME: [19.2594, 42.4304], IT: [12.4964, 41.9028],
  CH: [7.4474, 46.948], SI: [14.5058, 46.0569]
};

const carrierConnections = [
  ["ES", "FR"], ["PT", "ES"], ["FR", "BE"], ["FR", "DE"], ["DE", "NL"],
  ["DE", "AT"], ["AT", "HU"], ["HU", "RO"], ["DE", "DK"], ["DK", "SE"],
  ["HU", "HR"], ["HR", "BA"], ["BA", "RS"], ["RS", "ME"]
];
const forwardingConnections = [
  ["ES", "FR"], ["FR", "CH"], ["CH", "IT"], ["IT", "AT"], ["AT", "DE"],
  ["DE", "NL"], ["FR", "BE"], ["BE", "LU"], ["ES", "PT"], ["IT", "SI"],
  ["SI", "HR"], ["HR", "BA"], ["BA", "RS"], ["RS", "ME"], ["DE", "CZ"]
];

function coverageDots(features, includedIds, projection, seed) {
  const random = d3.randomLcg(seed);
  const major = new Set([250, 276, 724, 380, 620, 642, 752]);
  const compact = new Set([56, 70, 442, 528, 703, 705, 756]);
  const dots = [];

  for (const country of features.filter((feature) => includedIds.has(Number(feature.id)))) {
    const id = Number(country.id);
    const bounds = d3.geoBounds(country);
    const minLon = Math.max(-12, bounds[0][0]);
    const maxLon = Math.min(40, bounds[1][0]);
    const minLat = Math.max(35, bounds[0][1]);
    const maxLat = Math.min(62, bounds[1][1]);
    const target = major.has(id) ? 14 : compact.has(id) ? 4 : 7;
    const placed = [];

    for (let attempt = 0; attempt < 2000 && placed.length < target; attempt++) {
      const location = [minLon + random() * (maxLon - minLon), minLat + random() * (maxLat - minLat)];
      if (!d3.geoContains(country, location)) continue;
      const pixel = projection(location);
      if (pixel[0] < 22 || pixel[0] > 678 || pixel[1] < 90 || pixel[1] > 485) continue;
      if (placed.some((other) => Math.hypot(other[0] - pixel[0], other[1] - pixel[1]) < 7)) continue;
      placed.push(pixel);
    }
    dots.push(...placed);
  }

  dots.push(projection(anchors.BA));
  return dots;
}

function renderCoverageMap(elementId, countries, type) {
  const carrier = type === "carrier";
  const includedIds = carrier ? carrierCountryIds : forwardingCountryIds;
  const projection = d3.geoMercator().center([10, 50]).scale(490).translate([350, 275]);
  const path = d3.geoPath(projection);
  const svg = d3.select(`#${elementId}`).html("").append("svg")
    .attr("viewBox", "0 0 700 520").attr("aria-hidden", "true");

  svg.append("g").selectAll("path").data(countries).join("path")
    .attr("class", (country) => includedIds.has(Number(country.id)) ? "coverage-country is-covered" : "coverage-country")
    .attr("d", path);

  const connections = carrier ? carrierConnections : forwardingConnections;
  svg.append("g").selectAll("path").data(connections).join("path")
    .attr("class", "coverage-connection")
    .attr("d", ([from, to]) => {
      const a = projection(anchors[from]);
      const b = projection(anchors[to]);
      return `M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${(a[1] + b[1]) / 2 - 24} ${b[0]},${b[1]}`;
    });

  svg.append("g").selectAll("circle").data(coverageDots(countries, includedIds, projection, carrier ? 0.38 : 0.71))
    .join("circle").attr("class", "coverage-dot")
    .attr("cx", ([x]) => x).attr("cy", ([, y]) => y).attr("r", 1.9);
}

async function startCoverageMaps() {
  try {
    if (!window.d3 || !window.topojson) throw new Error("Map libraries unavailable");
    const atlas = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json");
    const countries = topojson.feature(atlas, atlas.objects.countries).features.filter((country) => {
      const [lon, lat] = d3.geoCentroid(country);
      return lon > -30 && lon < 49 && lat > 29 && lat < 72;
    });
    renderCoverageMap("carrier-map", countries, "carrier");
    renderCoverageMap("forwarding-map", countries, "forwarding");
  } catch (error) {
    document.querySelectorAll(".coverage-fallback").forEach((fallback) => {
      fallback.textContent = "El mapa no está disponible en este momento. Puede enviarnos su ruta para revisarla.";
    });
  }
}

startCoverageMaps();
