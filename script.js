const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const coveragePoints = [
  ["Lisbon", -9.1393, 38.7223], ["Porto", -8.6291, 41.1579], ["Madrid", -3.7038, 40.4168],
  ["Barcelona", 2.1734, 41.3851], ["Valencia", -0.3763, 39.4699], ["Seville", -5.9845, 37.3891],
  ["Bilbao", -2.9350, 43.2630], ["Zaragoza", -0.8891, 41.6488], ["Paris", 2.3522, 48.8566],
  ["Lyon", 4.8357, 45.7640], ["Marseille", 5.3698, 43.2965], ["Toulouse", 1.4442, 43.6047],
  ["Lille", 3.0573, 50.6292], ["Nantes", -1.5536, 47.2184], ["Bordeaux", -0.5792, 44.8378],
  ["Brussels", 4.3517, 50.8503], ["Antwerp", 4.4025, 51.2194], ["Amsterdam", 4.9041, 52.3676],
  ["Rotterdam", 4.4777, 51.9244], ["Eindhoven", 5.4697, 51.4416], ["Luxembourg", 6.1296, 49.8153],
  ["Hamburg", 9.9937, 53.5511], ["Bremen", 8.8017, 53.0793], ["Berlin", 13.4050, 52.5200],
  ["Dortmund", 7.4653, 51.5136], ["Cologne", 6.9603, 50.9375], ["Frankfurt", 8.6821, 50.1109],
  ["Stuttgart", 9.1829, 48.7758], ["Munich", 11.5820, 48.1351], ["Nuremberg", 11.0767, 49.4521],
  ["Leipzig", 12.3731, 51.3397], ["Hannover", 9.7320, 52.3759], ["Zurich", 8.5417, 47.3769],
  ["Basel", 7.5886, 47.5596], ["Geneva", 6.1432, 46.2044], ["Milan", 9.1900, 45.4642],
  ["Turin", 7.6869, 45.0703], ["Genoa", 8.9463, 44.4056], ["Bologna", 11.3426, 44.4949],
  ["Verona", 10.9916, 45.4384], ["Venice", 12.3155, 45.4408], ["Florence", 11.2558, 43.7696],
  ["Rome", 12.4964, 41.9028], ["Naples", 14.2681, 40.8518], ["Vienna", 16.3738, 48.2082],
  ["Graz", 15.4395, 47.0707], ["Linz", 14.2858, 48.3069], ["Salzburg", 13.0550, 47.8095],
  ["Prague", 14.4378, 50.0755], ["Brno", 16.6068, 49.1951], ["Ostrava", 18.2625, 49.8209],
  ["Warsaw", 21.0122, 52.2297], ["Poznan", 16.9252, 52.4064], ["Wroclaw", 17.0385, 51.1079],
  ["Lodz", 19.4550, 51.7592], ["Katowice", 19.0238, 50.2649], ["Gdansk", 18.6466, 54.3520],
  ["Krakow", 19.9450, 50.0647], ["Bratislava", 17.1077, 48.1486], ["Kosice", 21.2611, 48.7164],
  ["Budapest", 19.0402, 47.4979], ["Gyor", 17.6347, 47.6875], ["Debrecen", 21.6273, 47.5316],
  ["Ljubljana", 14.5058, 46.0569], ["Maribor", 15.6459, 46.5547], ["Zagreb", 15.9819, 45.8150],
  ["Rijeka", 14.4422, 45.3271], ["Osijek", 18.6955, 45.5549], ["Belgrade", 20.4489, 44.7866],
  ["Novi Sad", 19.8335, 45.2671], ["Nis", 21.8958, 43.3209], ["Subotica", 19.6676, 46.1005],
  ["Sarajevo", 18.4131, 43.8563], ["Banja Luka", 17.1910, 44.7722], ["Sofia", 23.3219, 42.6977],
  ["Plovdiv", 24.7453, 42.1354], ["Bucharest", 26.1025, 44.4268], ["Timisoara", 21.2087, 45.7489],
  ["Cluj-Napoca", 23.5899, 46.7712], ["Arad", 21.3123, 46.1866], ["Craiova", 23.7949, 44.3302],
  ["Thessaloniki", 22.9444, 40.6401], ["Athens", 23.7275, 37.9838], ["Patras", 21.7346, 38.2466],
  ["Skopje", 21.4317, 41.9981], ["Tirana", 19.8189, 41.3275], ["Pristina", 21.1655, 42.6629],
  ["Copenhagen", 12.5683, 55.6761], ["Aarhus", 10.2039, 56.1629], ["Malmo", 13.0038, 55.6050],
  ["Gothenburg", 11.9746, 57.7089], ["Stockholm", 18.0686, 59.3293], ["Oslo", 10.7522, 59.9139],
  ["Helsinki", 24.9384, 60.1699], ["Tallinn", 24.7536, 59.4370], ["Riga", 24.1052, 56.9496],
  ["Vilnius", 25.2797, 54.6872], ["Kaunas", 23.9036, 54.8985], ["Dublin", -6.2603, 53.3498],
  ["London", -0.1276, 51.5072], ["Birmingham", -1.8904, 52.4862], ["Manchester", -2.2426, 53.4808]
];

async function renderEuropeMap() {
  const mapEl = document.querySelector("#europe-map");
  if (!mapEl || !window.d3 || !window.topojson) return;

  const width = 900;
  const height = 610;
  const svg = d3.select(mapEl)
    .html("")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("aria-hidden", "true");

  const projection = d3.geoMercator()
    .center([14, 50])
    .scale(640)
    .translate([width / 2, height / 2 + 42]);
  const path = d3.geoPath(projection);

  try {
    const world = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json");
    const countries = topojson.feature(world, world.objects.countries).features;
    const europe = countries.filter((feature) => {
      const [lon, lat] = d3.geoCentroid(feature);
      return lon > -25 && lon < 45 && lat > 34 && lat < 72;
    });

    svg.append("g")
      .selectAll("path")
      .data(europe)
      .join("path")
      .attr("class", "country")
      .attr("d", path);
  } catch (error) {
    mapEl.classList.add("map-fallback");
  }

  const points = coveragePoints
    .map(([name, lon, lat]) => ({ name, coords: projection([lon, lat]) }))
    .filter((point) => point.coords);

  const pointGroup = svg.append("g");

  pointGroup.selectAll(".coverage-ring")
    .data(points)
    .join("circle")
    .attr("class", "coverage-ring")
    .attr("cx", (d) => d.coords[0])
    .attr("cy", (d) => d.coords[1])
    .attr("r", 8);

  pointGroup.selectAll(".coverage-dot")
    .data(points)
    .join("circle")
    .attr("class", "coverage-dot")
    .attr("cx", (d) => d.coords[0])
    .attr("cy", (d) => d.coords[1])
    .attr("r", 3.2)
    .append("title")
    .text((d) => d.name);
}

renderEuropeMap();
