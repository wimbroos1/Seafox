# Seafox Blankenberge: website

Website voor seafox.be met de drie appartementen (207, 301, 303), beschikbaarheid gesynchroniseerd met Airbnb en een aanvraagformulier.

## Hoe het werkt

- **Inhoud** van de appartementen staat in `data/apartments.json`. De andere teksten staan in de pagina's zelf.
- **Beschikbaarheid uit Airbnb:** elk uur haalt GitHub (de workflow in `.github/workflows/sync-calendars.yml`) de Airbnb-agenda van elk appartement op en zet de bezette nachten in `data/availability.json`. De site toont die als bezet.
- **Directe boekingen naar Airbnb:** zet een boeking die je rechtstreeks krijgt in `data/direct-bookings.json`, bijvoorbeeld:
  ```json
  { "207": [{ "start": "2027-04-03", "end": "2027-04-07" }], "301": [], "303": [] }
  ```
  (`end` is de vertrekdag.) De workflow maakt daar `ical/207.ics` van. Airbnb leest die link en blokkeert die data ook.
- **Aanvragen:** het formulier opent een ingevulde e-mail naar het adres uit `data/site.json`. Er zijn geen online betalingen.

## Pagina's

- `index.html`: de startpagina.
- `appartement.html`: de pagina per appartement, met foto's, kalender en aanvraagformulier.
- `omgeving.html`: wat er te doen is in en rond Blankenberge.
- `winter.html`: schaatsbaan en kerstmarkt op het plein, met de vrije nachten in die periode.
- `praktisch.html`: veelgestelde vragen (inchecken, zwembad, parkeren, huisregels).

De kop en de voet van elke pagina komen uit `assets/site.js`, zodat het menu overal hetzelfde is.

## Ontwerp en foto's

De huisstijl (kleuren en lettertypes) staat bovenaan in `assets/style.css`. De illustraties staan in `assets/illustrations/`.

**Foto's** komen uit je eigen Airbnb-advertenties. De lijst staat in `data/photo-sources.json`: per appartement de foto's in de volgorde van de website, elk met een bijschrift (`label`) en de link naar de foto (`url`). De eerste foto is de hoofdfoto. Pas je dat bestand aan, dan haalt GitHub (de workflow "Foto's ophalen van Airbnb") de foto's opnieuw op en zet ze in `assets/photos/`. Je kan die workflow ook met de hand starten onder Actions.

Er staat nog geen echte foto van het zwembad op de site. Zet er een neer als `assets/photos/algemeen/zwembad.jpg` en laat het weten, dan vervangt die de illustratie.

## Winterthema aan- en uitzetten

Het winterthema (sneeuw, lichtjes, het blok op de startpagina en de pagina Winter in het menu) wordt geregeld in `data/site.json` onder `winter`:

- `"show": "auto"` toont het thema vanzelf van `showFrom` tot en met `until`. Daarna verdwijnt het zonder dat je iets hoeft te doen.
- `"show": "aan"` toont het altijd, `"show": "uit"` nooit.
- `from`, `until` en `events` zijn de data en het programma van Winterpret. Pas ze volgend jaar aan.

In hetzelfde bestand staat ook het e-mailadres (`email`) waar aanvragen naartoe gaan.

## Eenmalig instellen

1. **Airbnb-links als geheim bewaren.** In Airbnb: Agenda > Beschikbaarheid > Agenda's koppelen > Airbnb-agenda exporteren. Kopieer de link per appartement.
   In GitHub: Settings > Secrets and variables > Actions > New repository secret. Maak `AIRBNB_ICAL_207`, `AIRBNB_ICAL_301` en `AIRBNB_ICAL_303` aan.
2. **Website aanzetten.** GitHub: Settings > Pages > Source: "Deploy from a branch", branch `main`, map `/ (root)`. De site staat dan op het testadres `https://wimbroos1.github.io/Seafox/`. Vul pas bij Custom domain `seafox.be` in wanneer je klaar bent om live te gaan, en vink dan "Enforce HTTPS" aan zodra dat kan.
3. **Domein koppelen bij OVHcloud.** In de DNS-zone van seafox.be:
   - A-records voor `seafox.be` naar 185.199.108.153, 185.199.109.153, 185.199.110.153 en 185.199.111.153 (verwijder andere A-records voor het hoofddomein).
   - CNAME voor `www` naar `<jouw-github-naam>.github.io.`
   - Laat de MX-records (e-mail) ongemoeid.
4. **Directe boekingen in Airbnb importeren.** In Airbnb per appartement: Agenda koppelen > Agenda importeren, met de link `https://seafox.be/ical/207.ics` (en 301, 303).
