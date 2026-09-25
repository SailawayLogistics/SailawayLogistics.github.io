import fs from "node:fs";

const pages = [
  {
    slug: "transporte-zaragoza-europa",
    eyebrow: "Aragón · corredor del Ebro",
    title: "Transporte desde Zaragoza hacia Europa",
    description: "Transporte Zaragoza Europa para empresas: carga parcial, completa, urgente y furgoneta 3,5t con seguimiento CMR/POD.",
    intro: "Coordinamos mercancía desde Zaragoza, Huesca, Teruel y el corredor del Ebro hacia Francia, Alemania, Italia, Benelux y otros destinos europeos.",
    area: "Zaragoza y Aragón",
    zones: "PLAZA, Malpica, Empresarium, Huesca, Teruel y conexiones A-2, AP-2, A-23 y AP-68.",
    routes: "Francia, Alemania, Italia, Benelux, Portugal y conexiones nacionales con Madrid, Barcelona, Bilbao y Valencia.",
    cargo: "Palets, componentes industriales, recambios, mercancía comercial y envíos sensibles al tiempo."
  },
  {
    slug: "transporte-bilbao-pais-vasco-europa",
    seoTitle: "Transporte Bilbao Europa | País Vasco",
    eyebrow: "Bilbao · País Vasco",
    title: "Transporte desde Bilbao y País Vasco hacia Europa",
    description: "Transporte desde Bilbao y País Vasco hacia Europa: cargas parciales, completas y urgentes con coordinación de vehículo y documentos.",
    intro: "Organizamos transporte desde Bilbao, Vitoria-Gasteiz, San Sebastián y zonas industriales del País Vasco hacia Francia y el resto de Europa.",
    area: "Bilbao y País Vasco",
    zones: "Gran Bilbao, Puerto de Bilbao, Vitoria-Gasteiz, Donostia-San Sebastián, Irun y polígonos industriales vascos.",
    routes: "Francia, Benelux, Alemania, Italia y conexiones con Madrid, Zaragoza, Barcelona y Portugal.",
    cargo: "Mercancía industrial, automoción, maquinaria, palets y envíos urgentes por carretera."
  },
  {
    slug: "transporte-murcia-europa",
    eyebrow: "Murcia · sureste de España",
    title: "Transporte desde Murcia hacia Europa",
    description: "Transporte Murcia Europa para mercancía comercial, industrial y urgente: carga parcial, completa, furgoneta y documentación.",
    intro: "Ayudamos a empresas de Murcia, Cartagena, Lorca y el sureste español a coordinar transporte por carretera hacia mercados europeos.",
    area: "Región de Murcia",
    zones: "Murcia, Cartagena, Lorca, Molina de Segura, Alcantarilla y conexiones con Alicante y Almería.",
    routes: "Francia, Alemania, Benelux, Italia, Portugal y corredores mediterráneos hacia Cataluña y Europa.",
    cargo: "Palets, alimentación no refrigerada, suministros, embalajes, recambios y mercancía comercial."
  },
  {
    slug: "transporte-galicia-europa",
    eyebrow: "Galicia · noroeste de España",
    title: "Transporte desde Galicia hacia Europa",
    description: "Transporte Galicia Europa desde Vigo, A Coruña, Santiago y Ourense: cargas parciales, completas y urgentes.",
    intro: "Coordinamos transporte desde Galicia hacia Portugal, Francia, Alemania, Benelux y otros destinos europeos con seguimiento operativo.",
    area: "Galicia",
    zones: "Vigo, A Coruña, Santiago de Compostela, Ourense, Lugo, Pontevedra y principales áreas industriales gallegas.",
    routes: "Portugal, Francia, Benelux, Alemania y conexiones con Madrid, País Vasco y el corredor atlántico.",
    cargo: "Componentes industriales, mercancía comercial, palets, recambios y cargas urgentes o planificadas."
  },
  {
    slug: "transporte-sevilla-europa",
    eyebrow: "Sevilla · Andalucía occidental",
    title: "Transporte desde Sevilla hacia Europa",
    description: "Transporte Sevilla Europa para empresas: carga parcial, completa, urgente y furgoneta 3,5t con soporte documental.",
    intro: "Coordinamos mercancía desde Sevilla y Andalucía occidental hacia Portugal, Francia, Alemania, Italia y otros destinos europeos.",
    area: "Sevilla y Andalucía occidental",
    zones: "Sevilla, Dos Hermanas, Alcalá de Guadaíra, La Rinconada, Carmona y conexiones con Huelva, Cádiz y Córdoba.",
    routes: "Portugal, Francia, Alemania, Italia, Benelux y conexiones con Madrid, Málaga y Algeciras.",
    cargo: "Palets, suministros, mercancía industrial y comercial, carga urgente, parcial o dedicada."
  },
  {
    slug: "transporte-algeciras-europa",
    seoTitle: "Transporte Algeciras Europa | Mercancías",
    eyebrow: "Algeciras · Campo de Gibraltar",
    title: "Transporte desde Algeciras hacia España y Europa",
    description: "Transporte desde Algeciras y Campo de Gibraltar hacia España y Europa con coordinación de cargas, vehículo, CMR y POD.",
    intro: "Apoyamos cargas desde Algeciras, Los Barrios, San Roque y La Línea hacia la península y Europa, incluyendo conexiones relacionadas con el puerto.",
    area: "Algeciras y Campo de Gibraltar",
    zones: "Puerto de Algeciras, Los Barrios, San Roque, La Línea, Tarifa y el corredor A-7 hacia Málaga y la red nacional.",
    routes: "Málaga, Sevilla, Madrid, Portugal, Francia, Alemania, Benelux, Italia y otros destinos europeos.",
    cargo: "Mercancía comercial e industrial, palets, conexiones portuarias y envíos urgentes por carretera."
  },
  {
    slug: "transporte-alicante-europa",
    eyebrow: "Alicante · Costa Blanca · corredor mediterráneo",
    title: "Transporte desde Alicante hacia Europa",
    description: "Transporte Alicante Europa para empresas: carga parcial, completa, urgente y furgoneta 3,5t desde Alicante, Elche y Costa Blanca.",
    intro: "Coordinamos mercancía desde Alicante, Elche y la Costa Blanca hacia Francia, Alemania, Italia, Benelux y otros destinos europeos.",
    area: "Alicante, Elche y Costa Blanca",
    zones: "Alicante, Elche Parque Empresarial, Torrellano, Alcoy, Elda, Villena, Benidorm y conexiones por la A-7 y AP-7.",
    routes: "Francia, Alemania, Italia, Benelux y conexiones con Valencia, Murcia, Barcelona y Madrid.",
    cargo: "Calzado, componentes, textiles, palets, mercancía comercial y envíos urgentes o planificados."
  },
  {
    slug: "transporte-granada-europa",
    eyebrow: "Granada · Andalucía oriental",
    title: "Transporte desde Granada hacia Europa",
    description: "Transporte Granada Europa para empresas: cargas parciales, completas, urgentes y furgoneta 3,5t con seguimiento CMR/POD.",
    intro: "Organizamos transporte desde Granada y Andalucía oriental hacia los principales corredores nacionales y europeos.",
    area: "Granada y Andalucía oriental",
    zones: "Granada, Santa Fe, Atarfe, Peligros, Loja, Motril y conexiones A-44, A-92 y A-7.",
    routes: "Francia, Alemania, Italia, Portugal, Benelux y conexiones con Málaga, Almería, Sevilla y Madrid.",
    cargo: "Palets, suministros, alimentación no refrigerada, materiales, recambios y mercancía industrial o comercial."
  },
  {
    slug: "transporte-cordoba-europa",
    eyebrow: "Córdoba · centro de Andalucía",
    title: "Transporte desde Córdoba hacia Europa",
    description: "Transporte Córdoba Europa para empresas: carga parcial, completa, urgente y furgoneta 3,5t desde Córdoba y provincia.",
    intro: "Coordinamos cargas desde Córdoba y sus áreas empresariales hacia España, Portugal, Francia y el resto de Europa.",
    area: "Córdoba y provincia",
    zones: "Córdoba, La Torrecilla, Las Quemadas, Lucena, Montilla, Puente Genil y conexiones A-4 y A-45.",
    routes: "Portugal, Francia, Alemania, Italia, Benelux y conexiones con Sevilla, Málaga, Madrid y Algeciras.",
    cargo: "Mercancía industrial, mobiliario, componentes, palets, suministros y cargas urgentes o planificadas."
  },
  {
    slug: "transporte-cadiz-europa",
    eyebrow: "Cádiz · Jerez · Bahía de Cádiz",
    title: "Transporte desde Cádiz y Jerez hacia Europa",
    description: "Transporte Cádiz Europa desde Jerez, Bahía de Cádiz y provincia: cargas parciales, completas, urgentes y furgoneta 3,5t.",
    intro: "Ayudamos a empresas de Cádiz, Jerez y la Bahía a coordinar mercancía hacia España y destinos europeos por carretera.",
    area: "Cádiz, Jerez y Bahía de Cádiz",
    zones: "Cádiz, Jerez de la Frontera, El Puerto de Santa María, Puerto Real, San Fernando, Chiclana y corredor A-4/AP-4.",
    routes: "Portugal, Francia, Alemania, Italia, Benelux y conexiones con Sevilla, Málaga, Algeciras y Madrid.",
    cargo: "Mercancía comercial, suministros, componentes, palets, conexiones portuarias y envíos urgentes."
  },
  {
    slug: "transporte-almeria-europa",
    eyebrow: "Almería · poniente almeriense",
    title: "Transporte desde Almería hacia Europa",
    description: "Transporte Almería Europa para empresas: carga parcial, completa, urgente y furgoneta 3,5t desde Almería y El Ejido.",
    intro: "Coordinamos transporte desde Almería y el poniente almeriense hacia España y los principales mercados europeos.",
    area: "Almería y poniente almeriense",
    zones: "Almería, El Ejido, Roquetas de Mar, Vícar, Níjar, Huércal de Almería y conexiones A-7 y A-92.",
    routes: "Francia, Alemania, Benelux, Italia y conexiones con Murcia, Alicante, Granada, Málaga y Madrid.",
    cargo: "Embalajes, suministros, palets, mercancía comercial y cargas industriales compatibles con transporte por carretera."
  }
];

const services = [
  {
    slug: "transporte-urgente-espana-europa",
    eyebrow: "Respuesta rápida · España y Europa",
    title: "Transporte urgente desde España hacia Europa",
    description: "Transporte urgente España Europa para mercancía sensible al tiempo: vehículo dedicado, furgoneta 3,5t, seguimiento y entrega directa.",
    intro: "Para mercancía que no puede esperar, revisamos con rapidez origen, destino, disponibilidad de vehículo y plazo realista de entrega.",
    area: "Toda España",
    zones: "Recogidas urgentes desde ciudades, almacenes, polígonos industriales y proveedores accesibles por carretera.",
    routes: "España hacia Francia, Alemania, Portugal, Italia, Benelux y otros destinos de la Unión Europea.",
    cargo: "Recambios, muestras, palets urgentes, material de producción y mercancía que necesita una ruta directa."
  },
  {
    slug: "carga-parcial-espana-europa",
    eyebrow: "Carga parcial · LTL",
    title: "Carga parcial desde España hacia Europa",
    description: "Carga parcial España Europa para palets y mercancía que no necesita un vehículo completo, con coordinación y seguimiento documental.",
    intro: "Buscamos capacidad adecuada para empresas que necesitan mover uno o varios palets sin contratar un vehículo completo.",
    area: "Toda España",
    zones: "Recogidas coordinadas según espacio disponible, fechas, dimensiones, peso y compatibilidad de la mercancía.",
    routes: "Corredores frecuentes desde España hacia Francia, Alemania, Portugal, Italia, Benelux y Europa Central.",
    cargo: "Palets, cajas, componentes, mercancía comercial y envíos pequeños con fechas planificadas o flexibles."
  },
  {
    slug: "carga-completa-espana-europa",
    eyebrow: "Carga completa · vehículo dedicado",
    title: "Carga completa desde España hacia Europa",
    description: "Carga completa España Europa con vehículo dedicado, coordinación directa, seguimiento de ruta y documentos CMR/POD.",
    intro: "Coordinamos vehículos dedicados para empresas que necesitan capacidad completa, una ruta definida y comunicación clara hasta la entrega.",
    area: "Toda España",
    zones: "Fábricas, almacenes, centros logísticos, distribuidores y proveedores con carga completa o dedicada.",
    routes: "España, Portugal, Francia, Alemania, Italia, Benelux y rutas conectadas dentro de la Unión Europea.",
    cargo: "Mercancía industrial y comercial, palets, maquinaria, suministros y cargas que requieren uso exclusivo del vehículo."
  },
  {
    slug: "transporte-furgoneta-lona-espana-europa",
    seoTitle: "Furgoneta con lona España Europa | Transporte 3,5t",
    eyebrow: "Furgoneta con lona · 3,5t",
    title: "Transporte en furgoneta con lona desde España hacia Europa",
    description: "Transporte en furgoneta con lona 3,5t desde España hacia Europa para carga lateral, superior, parcial, completa o urgente.",
    intro: "Coordinamos furgonetas con lona para mercancía que necesita flexibilidad de carga lateral o superior y transporte directo por Europa.",
    area: "España y Unión Europea",
    zones: "Recogidas en empresas, almacenes y polígonos industriales con acceso adecuado para furgoneta profesional.",
    routes: "España hacia Francia, Alemania, Portugal, Italia, Benelux, Austria y otros mercados europeos.",
    cargo: "Palets, maquinaria ligera, piezas largas, recambios y mercancía compatible con dimensiones y carga útil del vehículo."
  }
];

const allPages = [...pages, ...services];

function render(page) {
  const canonical = `https://sailawaylogistics.github.io/${page.slug}.html`;
  const seoTitle = page.seoTitle || page.title;
  const whatsapp = `https://wa.me/34624246275?text=${encodeURIComponent(`Hola Sailaway Logistics, necesito información sobre ${page.title.toLowerCase()}.`)}`;
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="assets/sailaway-logo.png" type="image/png">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-F2PL5XNK4D"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-F2PL5XNK4D');</script>
    <meta name="description" content="${page.description}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="website"><meta property="og:locale" content="es_ES"><meta property="og:title" content="${seoTitle} | Sailaway Logistics"><meta property="og:description" content="${page.description}"><meta property="og:image" content="https://sailawaylogistics.github.io/assets/sailaway-hero-banner.png">
    <title>${seoTitle} | Sailaway Logistics</title>
    <link rel="stylesheet" href="styles.css?v=20260924-national-seo">
    <script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Service",name:page.title,description:page.description,serviceType:"Freight forwarding y transporte de mercancías por carretera",provider:{"@type":"LocalBusiness",name:"Sailaway Logistics",telephone:"+34624246275",url:"https://sailawaylogistics.github.io/"},areaServed:page.area,url:canonical})}</script>
  </head>
  <body class="service-page">
    <header class="site-header simple-header"><a class="brand" href="index.html" aria-label="Inicio de Sailaway Logistics"><img src="assets/sailaway-logo.png" alt="Logotipo de Sailaway Logistics"><span>Sailaway Logistics</span></a><nav class="simple-nav"><a href="transporte-espana-europa.html">España Europa</a><a href="freight-forwarding-espana.html">Freight forwarding</a><a href="request-quote.html">Solicitar transporte</a></nav></header>
    <main class="service-main">
      <section class="service-hero-page"><div><p class="eyebrow">${page.eyebrow}</p><h1>${page.title}</h1><p>${page.intro}</p><div class="hero-actions"><a class="button primary" href="request-quote.html">Solicitar presupuesto</a><a class="button secondary" href="${whatsapp}" target="_blank" rel="noopener">WhatsApp España</a></div></div><div class="service-hero-card"><strong>Cobertura</strong><p>${page.area}</p><strong>Opciones</strong><p>Carga parcial, carga completa, transporte urgente y furgoneta 3,5t según disponibilidad.</p><strong>Seguimiento</strong><p>Coordinación de ruta, comunicación operativa, CMR, POD y confirmación de entrega.</p></div></section>
      <section class="service-content-page"><article class="service-content-card"><h2>Zonas y recogidas</h2><p>${page.zones}</p></article><article class="service-content-card"><h2>Rutas habituales</h2><p>${page.routes}</p></article><article class="service-content-card"><h2>Mercancía que podemos revisar</h2><p>${page.cargo}</p><p>La opción final depende de dimensiones, peso, fecha, método de carga y disponibilidad.</p></article><article class="service-content-card"><h2>Solicite una opción de transporte</h2><p>Envíe código postal de carga y descarga, fecha, mercancía, peso, dimensiones y requisitos especiales. Respondemos con los siguientes pasos de forma clara.</p><a class="button primary" href="request-quote.html">Enviar datos de la carga</a></article></section>
      <section class="section compact"><div class="section-heading"><p class="eyebrow">Servicios relacionados</p><h2>Más opciones desde España</h2></div><div class="services-grid"><article class="service-card"><h3><a href="transporte-espana-europa.html">Transporte España Europa</a></h3><p>Cobertura nacional y rutas por carretera dentro de la Unión Europea.</p></article><article class="service-card"><h3><a href="carga-parcial-espana-europa.html">Carga parcial</a></h3><p>Opciones para palets y mercancía que no necesita un vehículo completo.</p></article><article class="service-card"><h3><a href="carga-completa-espana-europa.html">Carga completa</a></h3><p>Vehículo dedicado y coordinación directa hasta la entrega.</p></article><article class="service-card"><h3><a href="transporte-urgente-espana-europa.html">Transporte urgente</a></h3><p>Respuesta rápida para mercancía sensible al tiempo.</p></article></div></section>
    </main>
    <footer class="site-footer"><img src="assets/sailaway-logo.png" alt="Logotipo de Sailaway Logistics"><p>© <span data-year></span> Sailaway Logistics · Málaga, España · <a href="tel:+34624246275">+34 624 246 275</a></p></footer>
    <a class="whatsapp-float-button" href="${whatsapp}" target="_blank" rel="noopener" aria-label="Contactar con Sailaway Logistics por WhatsApp"><span>WhatsApp</span><strong>Solicitar transporte</strong></a><script src="script.js"></script><script src="analytics-events.js"></script>
  </body>
</html>`;
}

for (const page of allPages) fs.writeFileSync(`${page.slug}.html`, render(page));

console.log(`Generated ${allPages.length} SEO pages.`);
