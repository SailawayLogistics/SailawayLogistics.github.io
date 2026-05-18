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

const translations = {
  en: {
    "nav.services": "Services",
    "nav.coverage": "Coverage",
    "nav.process": "Process",
    "nav.contact": "Contact",
    "hero.eyebrow": "EU sleeper-cabin van freight up to 3.5t",
    "hero.copy": "Part load and full load transport across the whole European Union, with 24/7 dispatch assistance and complete document support.",
    "hero.primary": "Request transport",
    "hero.secondary": "View services",
    "metrics.eu": "whole European Union coverage",
    "metrics.vans": "sleeper-cabin van focus",
    "metrics.dispatch": "dispatch assistance",
    "metrics.loads": "load options for clients",
    "services.eyebrow": "What we do",
    "services.title": "EU transport with 3.5t sleeper-cabin vans",
    "services.copy": "Sailaway Logistics focuses on part loads and full loads across the EU, using vans up to 3.5t with sleeper capsules for long-distance routes and flexible delivery planning.",
    "services.partTitle": "Part Load Transport",
    "services.partCopy": "Efficient transport for smaller shipments, urgent pallets, partial van capacity and flexible routes across the EU.",
    "services.fullTitle": "Full Load Transport",
    "services.fullCopy": "Dedicated van capacity for direct shipments where the client needs one vehicle, one route and clear delivery timing.",
    "services.dispatchTitle": "Dispatch Services",
    "services.dispatchCopy": "24/7 dispatch assistance, driver communication, route follow-up, shipment status updates and practical problem solving on the road.",
    "services.docsTitle": "Import / Export Documents",
    "services.docsCopy": "Support with necessary transport documentation for import and export, including CMR, POD, transport orders and delivery confirmations.",
    "fleet.eyebrow": "Fleet & partnership",
    "fleet.title": "Dispatch for your vans, capacity from our fleet",
    "fleet.copy": "For transport companies that already have their own vans, Sailaway Logistics can support daily dispatch, freight coordination, documentation and client follow-up. When extra capacity is needed, we also operate our own 3.5t sleeper-cabin van fleet.",
    "fleet.partnerTitle": "For companies with their own vans",
    "fleet.partnerCopy": "We help partners keep vehicles moving with dispatch assistance, freight search, route communication, paperwork support and transport follow-up.",
    "fleet.ownTitle": "Own van fleet",
    "fleet.ownCopy": "Sailaway Logistics has 8 vans available for EU part loads and full loads, giving clients extra flexibility when dedicated capacity is needed.",
    "fleet.dimTitle": "Cargo dimensions",
    "fleet.dimCopy": "All vans have cargo dimensions of 430 x 220 x 230 cm, suitable for professional EU van freight up to 3.5t.",
    "fleet.equipmentOneTitle": "NEO LIFT equipment",
    "fleet.equipmentOneCopy": "One van is equipped with NEO LIFT pallet jack and lift support for easier loading and unloading.",
    "fleet.equipmentTwoTitle": "Roof loading option",
    "fleet.equipmentTwoCopy": "One van has the possibility for loading and unloading from the roof when the shipment requires it.",
    "fleet.equipmentThreeTitle": "Client-ready support",
    "fleet.equipmentThreeCopy": "Dispatch, documents and transport updates stay in one clear communication flow for customers and partners.",
    "clients.eyebrow": "For clients",
    "clients.title": "One contact for EU part loads and full loads",
    "clients.copy": "When your shipment needs a fast answer, Sailaway Logistics gives you a direct process: confirmed van capacity, clear route details, driver communication, 24/7 dispatch support and document follow-up after delivery.",
    "clients.bestTitle": "Best for",
    "clients.bestCopy": "Part loads, full loads, urgent pallets, smaller cargo and dedicated sleeper-van routes across the EU.",
    "clients.benefitTitle": "Client benefit",
    "clients.benefitCopy": "Fast response, simple communication, clear shipment status, dispatch assistance and reliable import/export documentation support.",
    "coverage.eyebrow": "Coverage",
    "coverage.title": "Built for companies that need reliable EU van capacity",
    "coverage.copy": "Sailaway Logistics works in partnership with Wolf Express DOO, established in 2022, combining modern logistics communication with practical road transport experience.",
    "coverage.item1": "3.5t sleeper-cabin vans for EU freight",
    "coverage.item2": "Part load and full load transport options",
    "coverage.item3": "24/7 dispatch assistance for clients and drivers",
    "coverage.item4": "Import, export and delivery document follow-up",
    "coverage.partner": "In partnership with Wolf Express DOO, established in 2022.",
    "map.eyebrow": "European coverage",
    "map.title": "From capitals to small industrial towns",
    "map.copy": "Our work is built around road transport across the whole European Union. The marked points show representative cities, regions and freight corridors where van transport is commonly needed. Coverage is not limited to the dots: we support pickups and deliveries in major cities, smaller towns, villages and industrial zones when accessible by road.",
    "map.toolbar": "Representative EU freight coverage",
    "map.toolbarStrong": "Part loads · Full loads · 24/7 dispatch",
    "map.note": "Dots are representative service areas and common freight corridors, not a false claim of every exact completed delivery location.",
    "process.eyebrow": "How it works",
    "process.title": "A simple transport workflow",
    "process.step1Title": "Send shipment details",
    "process.step1Copy": "Share loading place, unloading place, cargo details, loading date, weight and whether it is part load or full load.",
    "process.step2Title": "Confirm van availability",
    "process.step2Copy": "We align timing, price, sleeper-van capacity, driver details and loading instructions before dispatch.",
    "process.step3Title": "24/7 dispatch support",
    "process.step3Copy": "Communication stays clear through pickup, transit and unloading so the client knows what is happening.",
    "process.step4Title": "Close documents",
    "process.step4Copy": "CMR, POD and necessary import/export transport documents are followed so the shipment can be closed cleanly.",
    "contact.eyebrow": "Contact",
    "contact.title": "Request EU sleeper-van freight capacity",
    "contact.copy": "Send the route and shipment details. We will respond with availability, timing and pricing for part load or full load transport up to 3.5t.",
    "contact.ceo": "CEO",
    "contact.address": "Address",
    "contact.spain": "Spain",
    "contact.serbia": "Serbia",
    "form.company": "Company name",
    "form.route": "Loading and unloading route",
    "form.routePlaceholder": "Example: Madrid, ES to Munich, DE",
    "form.details": "Shipment details",
    "form.detailsPlaceholder": "Cargo, weight, loading date, part load or full load, import/export documents",
    "form.submit": "Send request",
    "footer.prefix": "©",
    "footer.copy": "Partnership with Wolf Express DOO, established in 2022. CEO: Marko Vukobratovic",
    "language.eyebrow": "Choose language",
    "language.title": "Select your preferred language"
  },
  es: {
    "nav.services": "Servicios",
    "nav.coverage": "Cobertura",
    "nav.process": "Proceso",
    "nav.contact": "Contacto",
    "hero.eyebrow": "Transporte UE con furgones 3,5t con cabina dormitorio",
    "hero.copy": "Transporte de carga parcial y carga completa en toda la Unión Europea, con asistencia dispatch 24/7 y soporte completo de documentación.",
    "hero.primary": "Solicitar transporte",
    "hero.secondary": "Ver servicios",
    "metrics.eu": "cobertura en toda la Unión Europea",
    "metrics.vans": "furgones con cabina dormitorio",
    "metrics.dispatch": "asistencia dispatch",
    "metrics.loads": "opciones de carga para clientes",
    "services.eyebrow": "Qué hacemos",
    "services.title": "Transporte UE con furgones 3,5t con cabina dormitorio",
    "services.copy": "Sailaway Logistics trabaja con cargas parciales y completas en la UE, utilizando furgones de hasta 3,5t con cápsula dormitorio para rutas largas y planificación flexible.",
    "services.partTitle": "Transporte de carga parcial",
    "services.partCopy": "Transporte eficiente para envíos pequeños, palets urgentes, capacidad parcial de furgón y rutas flexibles por la UE.",
    "services.fullTitle": "Transporte de carga completa",
    "services.fullCopy": "Capacidad dedicada de furgón para envíos directos cuando el cliente necesita un vehículo, una ruta y tiempos claros.",
    "services.dispatchTitle": "Servicios de dispatch",
    "services.dispatchCopy": "Asistencia dispatch 24/7, comunicación con conductores, seguimiento de ruta, actualizaciones del envío y solución práctica de problemas en carretera.",
    "services.docsTitle": "Documentos de importación / exportación",
    "services.docsCopy": "Soporte con la documentación necesaria para importación y exportación, incluyendo CMR, POD, órdenes de transporte y confirmaciones de entrega.",
    "fleet.eyebrow": "Flota y colaboración",
    "fleet.title": "Dispatch para sus furgones y capacidad de nuestra flota",
    "fleet.copy": "Para empresas de transporte que ya tienen sus propios furgones, Sailaway Logistics puede apoyar el dispatch diario, coordinación de cargas, documentación y seguimiento con clientes. Cuando se necesita capacidad adicional, también operamos nuestra propia flota de furgones 3,5t con cabina dormitorio.",
    "fleet.partnerTitle": "Para empresas con sus propios furgones",
    "fleet.partnerCopy": "Ayudamos a los partners a mantener vehículos en movimiento con dispatch, búsqueda de cargas, comunicación de ruta, soporte documental y seguimiento del transporte.",
    "fleet.ownTitle": "Flota propia",
    "fleet.ownCopy": "Sailaway Logistics tiene 8 furgones disponibles para cargas parciales y completas en la UE, dando más flexibilidad cuando se necesita capacidad dedicada.",
    "fleet.dimTitle": "Dimensiones de carga",
    "fleet.dimCopy": "Todos los furgones tienen dimensiones de carga de 430 x 220 x 230 cm, adecuadas para transporte profesional UE hasta 3,5t.",
    "fleet.equipmentOneTitle": "Equipo NEO LIFT",
    "fleet.equipmentOneCopy": "Un furgón está equipado con transpaleta NEO LIFT y soporte de elevación para carga y descarga más fácil.",
    "fleet.equipmentTwoTitle": "Opción de carga por techo",
    "fleet.equipmentTwoCopy": "Un furgón tiene posibilidad de carga y descarga desde el techo cuando el envío lo requiere.",
    "fleet.equipmentThreeTitle": "Soporte listo para clientes",
    "fleet.equipmentThreeCopy": "Dispatch, documentos y actualizaciones del transporte quedan en una comunicación clara para clientes y partners.",
    "clients.eyebrow": "Para clientes",
    "clients.title": "Un solo contacto para cargas parciales y completas en la UE",
    "clients.copy": "Cuando su envío necesita una respuesta rápida, Sailaway Logistics ofrece un proceso directo: capacidad confirmada, ruta clara, comunicación con el conductor, dispatch 24/7 y seguimiento documental después de la entrega.",
    "clients.bestTitle": "Ideal para",
    "clients.bestCopy": "Cargas parciales, cargas completas, palets urgentes, mercancía pequeña y rutas dedicadas con furgón dormitorio en la UE.",
    "clients.benefitTitle": "Beneficio para el cliente",
    "clients.benefitCopy": "Respuesta rápida, comunicación simple, estado claro del envío, asistencia dispatch y soporte fiable para documentación de importación/exportación.",
    "coverage.eyebrow": "Cobertura",
    "coverage.title": "Para empresas que necesitan capacidad fiable de furgones en la UE",
    "coverage.copy": "Sailaway Logistics trabaja en colaboración con Wolf Express DOO, fundada en 2022, combinando comunicación logística moderna con experiencia práctica en transporte por carretera.",
    "coverage.item1": "Furgones 3,5t con cabina dormitorio para transporte UE",
    "coverage.item2": "Opciones de carga parcial y carga completa",
    "coverage.item3": "Asistencia dispatch 24/7 para clientes y conductores",
    "coverage.item4": "Seguimiento de documentos de importación, exportación y entrega",
    "coverage.partner": "En colaboración con Wolf Express DOO, fundada en 2022.",
    "map.eyebrow": "Cobertura europea",
    "map.title": "De capitales a pequeñas zonas industriales",
    "map.copy": "Nuestro trabajo se basa en el transporte por carretera en toda la Unión Europea. Los puntos marcados muestran ciudades, regiones y corredores representativos donde se necesita transporte con furgón. La cobertura no se limita a los puntos: realizamos recogidas y entregas en grandes ciudades, pueblos, aldeas y zonas industriales accesibles por carretera.",
    "map.toolbar": "Cobertura representativa de transporte UE",
    "map.toolbarStrong": "Cargas parciales · Cargas completas · Dispatch 24/7",
    "map.note": "Los puntos son áreas representativas de servicio y corredores comunes, no una afirmación falsa de cada entrega exacta realizada.",
    "process.eyebrow": "Cómo funciona",
    "process.title": "Un flujo de transporte simple",
    "process.step1Title": "Enviar detalles del envío",
    "process.step1Copy": "Comparta lugar de carga, descarga, detalles de mercancía, fecha, peso y si es carga parcial o completa.",
    "process.step2Title": "Confirmar disponibilidad",
    "process.step2Copy": "Acordamos tiempo, precio, capacidad del furgón dormitorio, datos del conductor e instrucciones de carga.",
    "process.step3Title": "Soporte dispatch 24/7",
    "process.step3Copy": "La comunicación se mantiene clara desde la carga hasta el tránsito y la descarga.",
    "process.step4Title": "Cerrar documentos",
    "process.step4Copy": "Seguimos CMR, POD y documentos necesarios de importación/exportación para cerrar el transporte correctamente.",
    "contact.eyebrow": "Contacto",
    "contact.title": "Solicite capacidad de furgón dormitorio en la UE",
    "contact.copy": "Envíe la ruta y los detalles del envío. Responderemos con disponibilidad, tiempos y precio para carga parcial o completa hasta 3,5t.",
    "contact.ceo": "CEO",
    "contact.address": "Dirección",
    "contact.spain": "España",
    "contact.serbia": "Serbia",
    "form.company": "Nombre de la empresa",
    "form.route": "Ruta de carga y descarga",
    "form.routePlaceholder": "Ejemplo: Madrid, ES a Munich, DE",
    "form.details": "Detalles del envío",
    "form.detailsPlaceholder": "Mercancía, peso, fecha de carga, carga parcial o completa, documentos import/export",
    "form.submit": "Enviar solicitud",
    "footer.prefix": "©",
    "footer.copy": "Colaboración con Wolf Express DOO, fundada en 2022. CEO: Marko Vukobratovic",
    "language.eyebrow": "Elegir idioma",
    "language.title": "Seleccione su idioma preferido"
  },
  fr: {
    "nav.services": "Services",
    "nav.coverage": "Couverture",
    "nav.process": "Processus",
    "nav.contact": "Contact",
    "hero.eyebrow": "Transport UE en vans 3,5t avec cabine couchette",
    "hero.copy": "Transport en chargement partiel et complet dans toute l'Union européenne, avec assistance dispatch 24/7 et support documentaire complet.",
    "hero.primary": "Demander un transport",
    "hero.secondary": "Voir les services",
    "metrics.eu": "couverture dans toute l'Union européenne",
    "metrics.vans": "vans avec cabine couchette",
    "metrics.dispatch": "assistance dispatch",
    "metrics.loads": "options de chargement clients",
    "services.eyebrow": "Nos services",
    "services.title": "Transport UE avec vans 3,5t à cabine couchette",
    "services.copy": "Sailaway Logistics se concentre sur les chargements partiels et complets dans l'UE, avec des vans jusqu'à 3,5t équipés de capsules couchettes pour les longues distances et une planification flexible.",
    "services.partTitle": "Transport en chargement partiel",
    "services.partCopy": "Transport efficace pour petits envois, palettes urgentes, capacité partielle et routes flexibles dans l'UE.",
    "services.fullTitle": "Transport en chargement complet",
    "services.fullCopy": "Capacité dédiée pour les envois directs lorsqu'un client a besoin d'un véhicule, d'une route et d'un délai clair.",
    "services.dispatchTitle": "Services de dispatch",
    "services.dispatchCopy": "Assistance dispatch 24/7, communication chauffeur, suivi de route, mises à jour du transport et résolution pratique des problèmes.",
    "services.docsTitle": "Documents import / export",
    "services.docsCopy": "Support pour les documents nécessaires à l'import et à l'export, y compris CMR, POD, ordres de transport et confirmations de livraison.",
    "fleet.eyebrow": "Flotte et partenariat",
    "fleet.title": "Dispatch pour vos vans, capacité de notre flotte",
    "fleet.copy": "Pour les sociétés de transport qui ont déjà leurs propres vans, Sailaway Logistics peut soutenir le dispatch quotidien, la coordination des frets, la documentation et le suivi client. Quand une capacité supplémentaire est nécessaire, nous opérons aussi notre propre flotte de vans 3,5t avec cabine couchette.",
    "fleet.partnerTitle": "Pour les sociétés avec leurs propres vans",
    "fleet.partnerCopy": "Nous aidons les partenaires à garder les véhicules en mouvement avec assistance dispatch, recherche de fret, communication de route, support documentaire et suivi transport.",
    "fleet.ownTitle": "Flotte propre",
    "fleet.ownCopy": "Sailaway Logistics dispose de 8 vans pour les chargements partiels et complets en UE, avec plus de flexibilité quand une capacité dédiée est nécessaire.",
    "fleet.dimTitle": "Dimensions cargo",
    "fleet.dimCopy": "Tous les vans ont des dimensions cargo de 430 x 220 x 230 cm, adaptées au fret professionnel UE jusqu'à 3,5t.",
    "fleet.equipmentOneTitle": "Equipement NEO LIFT",
    "fleet.equipmentOneCopy": "Un van est équipé d'un transpalette NEO LIFT et d'un support de levage pour faciliter le chargement et le déchargement.",
    "fleet.equipmentTwoTitle": "Option chargement par le toit",
    "fleet.equipmentTwoCopy": "Un van permet le chargement et déchargement par le toit lorsque l'expédition le demande.",
    "fleet.equipmentThreeTitle": "Support prêt pour clients",
    "fleet.equipmentThreeCopy": "Dispatch, documents et mises à jour transport restent dans un flux de communication clair pour clients et partenaires.",
    "clients.eyebrow": "Pour les clients",
    "clients.title": "Un seul contact pour chargements partiels et complets en UE",
    "clients.copy": "Quand votre expédition demande une réponse rapide, Sailaway Logistics propose un processus direct: capacité confirmée, détails de route, communication chauffeur, dispatch 24/7 et suivi documentaire après livraison.",
    "clients.bestTitle": "Idéal pour",
    "clients.bestCopy": "Chargements partiels, chargements complets, palettes urgentes, petites marchandises et routes dédiées en van couchette dans l'UE.",
    "clients.benefitTitle": "Avantage client",
    "clients.benefitCopy": "Réponse rapide, communication simple, statut clair du transport, assistance dispatch et support fiable des documents import/export.",
    "coverage.eyebrow": "Couverture",
    "coverage.title": "Pour les entreprises qui ont besoin de capacité fiable en vans UE",
    "coverage.copy": "Sailaway Logistics travaille en partenariat avec Wolf Express DOO, fondée en 2022, en combinant communication logistique moderne et expérience pratique du transport routier.",
    "coverage.item1": "Vans 3,5t avec cabine couchette pour le fret UE",
    "coverage.item2": "Options de chargement partiel et complet",
    "coverage.item3": "Assistance dispatch 24/7 pour clients et chauffeurs",
    "coverage.item4": "Suivi des documents d'import, d'export et de livraison",
    "coverage.partner": "En partenariat avec Wolf Express DOO, fondée en 2022.",
    "map.eyebrow": "Couverture européenne",
    "map.title": "Des capitales aux petites zones industrielles",
    "map.copy": "Notre travail est construit autour du transport routier dans toute l'Union européenne. Les points marqués montrent des villes, régions et corridors représentatifs où le transport en van est souvent nécessaire. La couverture ne se limite pas aux points: nous soutenons les enlèvements et livraisons dans les grandes villes, petites villes, villages et zones industrielles accessibles par route.",
    "map.toolbar": "Couverture représentative du fret UE",
    "map.toolbarStrong": "Chargements partiels · Chargements complets · Dispatch 24/7",
    "map.note": "Les points sont des zones de service et corridors représentatifs, pas une fausse affirmation de chaque lieu exact déjà livré.",
    "process.eyebrow": "Fonctionnement",
    "process.title": "Un processus de transport simple",
    "process.step1Title": "Envoyer les détails",
    "process.step1Copy": "Partagez lieu de chargement, livraison, détails marchandises, date, poids et chargement partiel ou complet.",
    "process.step2Title": "Confirmer la disponibilité",
    "process.step2Copy": "Nous alignons délai, prix, capacité du van couchette, données chauffeur et instructions de chargement.",
    "process.step3Title": "Support dispatch 24/7",
    "process.step3Copy": "La communication reste claire pendant l'enlèvement, le transit et la livraison.",
    "process.step4Title": "Clôture des documents",
    "process.step4Copy": "CMR, POD et documents import/export nécessaires sont suivis pour clôturer le transport proprement.",
    "contact.eyebrow": "Contact",
    "contact.title": "Demander une capacité van couchette en UE",
    "contact.copy": "Envoyez la route et les détails. Nous répondrons avec disponibilité, délai et prix pour chargement partiel ou complet jusqu'à 3,5t.",
    "contact.ceo": "CEO",
    "contact.address": "Adresse",
    "contact.spain": "Espagne",
    "contact.serbia": "Serbie",
    "form.company": "Nom de l'entreprise",
    "form.route": "Route de chargement et livraison",
    "form.routePlaceholder": "Exemple: Madrid, ES à Munich, DE",
    "form.details": "Détails de l'expédition",
    "form.detailsPlaceholder": "Marchandise, poids, date, chargement partiel ou complet, documents import/export",
    "form.submit": "Envoyer la demande",
    "footer.prefix": "©",
    "footer.copy": "Partenariat avec Wolf Express DOO, fondée en 2022. CEO: Marko Vukobratovic",
    "language.eyebrow": "Choisir la langue",
    "language.title": "Sélectionnez votre langue préférée"
  },
  sr: {
    "nav.services": "Usluge",
    "nav.coverage": "Pokrivenost",
    "nav.process": "Proces",
    "nav.contact": "Kontakt",
    "hero.eyebrow": "EU prevoz kombijima do 3.5t sa spavacom kabinom",
    "hero.copy": "Parcijalni i kompletni utovari kroz celu Evropsku uniju, uz 24/7 dispatch podrsku i kompletnu pomoc oko dokumentacije.",
    "hero.primary": "Posalji upit",
    "hero.secondary": "Pogledaj usluge",
    "metrics.eu": "pokrivenost cele Evropske unije",
    "metrics.vans": "fokus na kombije sa spavacom kabinom",
    "metrics.dispatch": "dispatch podrska",
    "metrics.loads": "opcije utovara za klijente",
    "services.eyebrow": "Sta radimo",
    "services.title": "EU prevoz kombijima do 3.5t sa spavacom kabinom",
    "services.copy": "Sailaway Logistics je fokusiran na parcijalne i kompletne utovare kroz EU, koristeci kombije do 3.5t sa spavacim kapsulama za duge relacije i fleksibilno planiranje.",
    "services.partTitle": "Parcijalni utovari",
    "services.partCopy": "Efikasan prevoz za manje posiljke, hitne palete, delimican kapacitet kombija i fleksibilne rute kroz EU.",
    "services.fullTitle": "Kompletni utovari",
    "services.fullCopy": "Namenski kapacitet kombija za direktne posiljke kada klijent treba jedno vozilo, jednu rutu i jasno vreme isporuke.",
    "services.dispatchTitle": "Dispatch usluge",
    "services.dispatchCopy": "24/7 dispatch podrska, komunikacija sa vozacem, pracenje rute, status posiljke i prakticno resavanje problema na putu.",
    "services.docsTitle": "Import / Export dokumentacija",
    "services.docsCopy": "Podrska za potrebnu transportnu dokumentaciju za uvoz i izvoz, ukljucujuci CMR, POD, transportne naloge i potvrde isporuke.",
    "fleet.eyebrow": "Flota i partnerstvo",
    "fleet.title": "Dispatch za vase kombije i kapacitet iz nase flote",
    "fleet.copy": "Za transportne firme koje vec imaju svoje kombije, Sailaway Logistics moze da podrzi dnevni dispatch, koordinaciju tura, dokumentaciju i pracenje klijenata. Kada je potreban dodatni kapacitet, imamo i sopstvenu flotu kombija do 3.5t sa spavacom kabinom.",
    "fleet.partnerTitle": "Za firme sa svojim kombijima",
    "fleet.partnerCopy": "Pomazemo partnerima da vozila ostanu u poslu kroz dispatch podrsku, trazenje tura, komunikaciju rute, dokumentaciju i pracenje transporta.",
    "fleet.ownTitle": "Sopstvena flota kombija",
    "fleet.ownCopy": "Sailaway Logistics ima 8 kombija za EU parcijalne i kompletne utovare, sto klijentima daje dodatnu fleksibilnost kada je potreban namenski kapacitet.",
    "fleet.dimTitle": "Dimenzije tovarnog prostora",
    "fleet.dimCopy": "Svi kombiji imaju dimenzije 430 x 220 x 230 cm, pogodne za profesionalni EU kombi transport do 3.5t.",
    "fleet.equipmentOneTitle": "NEO LIFT oprema",
    "fleet.equipmentOneCopy": "Jedan kombi ima NEO LIFT paletar i lift podrsku za laksi utovar i istovar.",
    "fleet.equipmentTwoTitle": "Opcija utovara preko krova",
    "fleet.equipmentTwoCopy": "Jedan kombi ima mogucnost utovara i istovara preko krova kada posiljka to zahteva.",
    "fleet.equipmentThreeTitle": "Podrska spremna za klijente",
    "fleet.equipmentThreeCopy": "Dispatch, dokumentacija i status transporta ostaju u jednom jasnom toku komunikacije za klijente i partnere.",
    "clients.eyebrow": "Za klijente",
    "clients.title": "Jedan kontakt za EU parcijalne i kompletne utovare",
    "clients.copy": "Kada vam treba brz odgovor za posiljku, Sailaway Logistics daje direktan proces: potvrdjen kapacitet kombija, jasne detalje rute, komunikaciju sa vozacem, 24/7 dispatch i pracenje dokumentacije posle isporuke.",
    "clients.bestTitle": "Najbolje za",
    "clients.bestCopy": "Parcijalne utovare, kompletne utovare, hitne palete, manju robu i namenske rute kombijima sa spavacom kabinom kroz EU.",
    "clients.benefitTitle": "Prednost za klijenta",
    "clients.benefitCopy": "Brz odgovor, jednostavna komunikacija, jasan status posiljke, dispatch podrska i pouzdana pomoc oko import/export dokumentacije.",
    "coverage.eyebrow": "Pokrivenost",
    "coverage.title": "Za firme kojima treba pouzdan kapacitet kombija u EU",
    "coverage.copy": "Sailaway Logistics radi u partnerstvu sa Wolf Express DOO, osnovanim 2022. godine, kombinujući modernu logisticku komunikaciju sa prakticnim iskustvom drumskog transporta.",
    "coverage.item1": "Kombiji do 3.5t sa spavacom kabinom za EU transport",
    "coverage.item2": "Opcije parcijalnog i kompletnog utovara",
    "coverage.item3": "24/7 dispatch podrska za klijente i vozace",
    "coverage.item4": "Pracenje import, export i dostavne dokumentacije",
    "coverage.partner": "U partnerstvu sa Wolf Express DOO, osnovanim 2022. godine.",
    "map.eyebrow": "Evropska pokrivenost",
    "map.title": "Od glavnih gradova do manjih industrijskih mesta",
    "map.copy": "Nas rad je zasnovan na drumskom transportu kroz celu Evropsku uniju. Oznacene tacke prikazuju reprezentativne gradove, regione i transportne koridore gde je transport kombijem cesto potreban. Pokrivenost nije ogranicena samo na tacke: podrzavamo utovare i istovare u velikim gradovima, manjim mestima, selima i industrijskim zonama dostupnim putem.",
    "map.toolbar": "Reprezentativna EU freight pokrivenost",
    "map.toolbarStrong": "Parcijalni utovari · Kompletni utovari · Dispatch 24/7",
    "map.note": "Tacke su reprezentativne servisne oblasti i cesti koridori, ne lazna tvrdnja o svakoj tacnoj lokaciji zavrsene isporuke.",
    "process.eyebrow": "Kako funkcionise",
    "process.title": "Jednostavan transportni proces",
    "process.step1Title": "Posaljite detalje posiljke",
    "process.step1Copy": "Posaljite mesto utovara, istovara, detalje robe, datum utovara, tezinu i da li je parcijalni ili kompletan utovar.",
    "process.step2Title": "Potvrda dostupnosti kombija",
    "process.step2Copy": "Uskladjujemo vreme, cenu, kapacitet kombija sa spavacom kabinom, podatke vozaca i instrukcije za utovar.",
    "process.step3Title": "24/7 dispatch podrska",
    "process.step3Copy": "Komunikacija ostaje jasna kroz utovar, tranzit i istovar da klijent zna sta se desava.",
    "process.step4Title": "Zatvaranje dokumentacije",
    "process.step4Copy": "Pratimo CMR, POD i potrebnu import/export dokumentaciju da se transport zatvori uredno.",
    "contact.eyebrow": "Kontakt",
    "contact.title": "Posaljite upit za EU kombi transport",
    "contact.copy": "Posaljite rutu i detalje posiljke. Odgovoricemo sa dostupnoscu, vremenom i cenom za parcijalni ili kompletni utovar do 3.5t.",
    "contact.ceo": "CEO",
    "contact.address": "Adresa",
    "contact.spain": "Spanija",
    "contact.serbia": "Srbija",
    "form.company": "Naziv firme",
    "form.route": "Ruta utovara i istovara",
    "form.routePlaceholder": "Primer: Madrid, ES do Munich, DE",
    "form.details": "Detalji posiljke",
    "form.detailsPlaceholder": "Roba, tezina, datum utovara, parcijalni ili kompletan utovar, import/export dokumentacija",
    "form.submit": "Posalji upit",
    "footer.prefix": "©",
    "footer.copy": "Partnerstvo sa Wolf Express DOO, osnovanim 2022. godine. CEO: Marko Vukobratovic",
    "language.eyebrow": "Izaberite jezik",
    "language.title": "Izaberite zeljeni jezik"
  }
};

const languageModal = document.querySelector("[data-language-modal]");
const languageOpenButtons = document.querySelectorAll("[data-language-open]");
const currentLanguage = document.querySelector("[data-current-language]");
const languageButtons = document.querySelectorAll("[data-language-choice]");
const supportedLanguages = Object.keys(translations);

function setLanguage(lang, shouldStore = true) {
  const safeLang = supportedLanguages.includes(lang) ? lang : "en";
  const dictionary = translations[safeLang];

  document.documentElement.lang = safeLang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dictionary[key]) element.setAttribute("placeholder", dictionary[key]);
  });

  if (currentLanguage) currentLanguage.textContent = safeLang.toUpperCase();
  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.languageChoice === safeLang);
  });
  if (shouldStore) localStorage.setItem("sailaway-language", safeLang);
}

function openLanguageModal() {
  if (!languageModal) return;
  languageModal.classList.add("is-open");
  languageModal.setAttribute("aria-hidden", "false");
}

function closeLanguageModal() {
  if (!languageModal) return;
  languageModal.classList.remove("is-open");
  languageModal.setAttribute("aria-hidden", "true");
}

languageOpenButtons.forEach((button) => {
  button.addEventListener("click", openLanguageModal);
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.languageChoice);
    closeLanguageModal();
  });
});

const storedLanguage = localStorage.getItem("sailaway-language");
setLanguage(storedLanguage || "en", Boolean(storedLanguage));
if (!storedLanguage) openLanguageModal();

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
