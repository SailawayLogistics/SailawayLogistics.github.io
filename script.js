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
  ["Madrid", -3.7038, 40.4168], ["Barcelona", 2.1734, 41.3851], ["Valencia", -0.3763, 39.4699],
  ["Seville", -5.9845, 37.3891], ["Bilbao", -2.9350, 43.2630], ["Zaragoza", -0.8891, 41.6488],
  ["Valladolid", -4.7245, 41.6523], ["Burgos", -3.6969, 42.3439], ["Pamplona", -1.6458, 42.8125],
  ["Logrono", -2.4456, 42.4627], ["Murcia", -1.1307, 37.9922], ["Alicante", -0.4907, 38.3452],
  ["Castellon", -0.0377, 39.9864], ["Tarragona", 1.2445, 41.1189], ["Girona", 2.8249, 41.9794],
  ["Vitoria-Gasteiz", -2.6727, 42.8467], ["Santander", -3.8099, 43.4623], ["Oviedo", -5.8448, 43.3614],
  ["Paris", 2.3522, 48.8566], ["Lyon", 4.8357, 45.7640], ["Marseille", 5.3698, 43.2965],
  ["Toulouse", 1.4442, 43.6047], ["Lille", 3.0573, 50.6292], ["Nantes", -1.5536, 47.2184],
  ["Bordeaux", -0.5792, 44.8378], ["Strasbourg", 7.7521, 48.5734], ["Rennes", -1.6778, 48.1173],
  ["Rouen", 1.0993, 49.4431], ["Le Havre", 0.1079, 49.4944], ["Reims", 4.0317, 49.2583],
  ["Metz", 6.1757, 49.1193], ["Nancy", 6.1844, 48.6921], ["Dijon", 5.0415, 47.3220],
  ["Besancon", 6.0241, 47.2378], ["Clermont-Ferrand", 3.0870, 45.7772], ["Limoges", 1.2611, 45.8336],
  ["Poitiers", 0.3404, 46.5802], ["Tours", 0.6848, 47.3941], ["Orleans", 1.9093, 47.9029],
  ["Le Mans", 0.1996, 48.0061], ["Angers", -0.5632, 47.4784], ["Brest", -4.4861, 48.3904],
  ["Montpellier", 3.8767, 43.6108], ["Perpignan", 2.8956, 42.6887], ["Nice", 7.2620, 43.7102],
  ["Grenoble", 5.7245, 45.1885], ["Saint-Etienne", 4.3872, 45.4397], ["Amiens", 2.2958, 49.8941],
  ["Brussels", 4.3517, 50.8503], ["Antwerp", 4.4025, 51.2194], ["Ghent", 3.7174, 51.0543],
  ["Liege", 5.5797, 50.6326], ["Charleroi", 4.4447, 50.4108], ["Bruges", 3.2247, 51.2093],
  ["Hasselt", 5.3378, 50.9307], ["Kortrijk", 3.2649, 50.8268], ["Namur", 4.8719, 50.4674],
  ["Amsterdam", 4.9041, 52.3676], ["Rotterdam", 4.4777, 51.9244], ["Eindhoven", 5.4697, 51.4416],
  ["Utrecht", 5.1214, 52.0907], ["The Hague", 4.3007, 52.0705], ["Tilburg", 5.0913, 51.5555],
  ["Breda", 4.7683, 51.5719], ["Venlo", 6.1724, 51.3704], ["Arnhem", 5.8987, 51.9851],
  ["Nijmegen", 5.8528, 51.8126], ["Groningen", 6.5665, 53.2194], ["Zwolle", 6.0944, 52.5168],
  ["Maastricht", 5.6900, 50.8514], ["Luxembourg", 6.1296, 49.8153],
  ["Hamburg", 9.9937, 53.5511], ["Bremen", 8.8017, 53.0793], ["Berlin", 13.4050, 52.5200],
  ["Dortmund", 7.4653, 51.5136], ["Cologne", 6.9603, 50.9375], ["Frankfurt", 8.6821, 50.1109],
  ["Stuttgart", 9.1829, 48.7758], ["Munich", 11.5820, 48.1351], ["Nuremberg", 11.0767, 49.4521],
  ["Leipzig", 12.3731, 51.3397], ["Hannover", 9.7320, 52.3759], ["Dusseldorf", 6.7735, 51.2277],
  ["Duisburg", 6.7623, 51.4344], ["Essen", 7.0116, 51.4556], ["Bielefeld", 8.5325, 52.0302],
  ["Munster", 7.6261, 51.9607], ["Osnabruck", 8.0472, 52.2799], ["Kassel", 9.4797, 51.3127],
  ["Erfurt", 11.0299, 50.9848], ["Dresden", 13.7373, 51.0504], ["Chemnitz", 12.9253, 50.8278],
  ["Magdeburg", 11.6276, 52.1205], ["Wolfsburg", 10.7865, 52.4227], ["Braunschweig", 10.5268, 52.2689],
  ["Mainz", 8.2473, 49.9929], ["Mannheim", 8.4660, 49.4875], ["Karlsruhe", 8.4037, 49.0069],
  ["Freiburg", 7.8421, 47.9990], ["Ulm", 9.9934, 48.4011], ["Augsburg", 10.8978, 48.3705],
  ["Regensburg", 12.1016, 49.0134], ["Passau", 13.4319, 48.5667], ["Wurzburg", 9.9534, 49.7913],
  ["Saarbrucken", 6.9969, 49.2402], ["Kiel", 10.1228, 54.3233], ["Rostock", 12.0991, 54.0924],
  ["Vienna", 16.3738, 48.2082], ["Graz", 15.4395, 47.0707], ["Linz", 14.2858, 48.3069],
  ["Salzburg", 13.0550, 47.8095], ["Innsbruck", 11.4041, 47.2692], ["Klagenfurt", 14.3050, 46.6247],
  ["Wels", 14.0252, 48.1575], ["Sankt Polten", 15.6256, 48.2047], ["Wiener Neustadt", 16.2465, 47.8114],
  ["Villach", 13.8506, 46.6086], ["Budapest", 19.0402, 47.4979], ["Gyor", 17.6347, 47.6875],
  ["Debrecen", 21.6273, 47.5316], ["Szeged", 20.1414, 46.2530], ["Miskolc", 20.7784, 48.1035],
  ["Pecs", 18.2323, 46.0727], ["Szekesfehervar", 18.4108, 47.1860], ["Kecskemet", 19.6913, 46.9062],
  ["Szolnok", 20.1940, 47.1621], ["Nyiregyhaza", 21.7244, 47.9495], ["Tatabanya", 18.3933, 47.5692],
  ["Prague", 14.4378, 50.0755], ["Brno", 16.6068, 49.1951], ["Ostrava", 18.2625, 49.8209],
  ["Warsaw", 21.0122, 52.2297], ["Poznan", 16.9252, 52.4064], ["Wroclaw", 17.0385, 51.1079],
  ["Krakow", 19.9450, 50.0647], ["Bratislava", 17.1077, 48.1486], ["Belgrade", 20.4489, 44.7866],
  ["Novi Sad", 19.8335, 45.2671], ["Nis", 21.8958, 43.3209], ["Subotica", 19.6676, 46.1005],
  ["Bucharest", 26.1025, 44.4268], ["Timisoara", 21.2087, 45.7489], ["Arad", 21.3123, 46.1866]
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
