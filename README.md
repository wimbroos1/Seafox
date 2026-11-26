# Seafox Blankenberge: website

Website voor seafox.be met de drie appartementen (207, 301, 303), beschikbaarheid gesynchroniseerd met Airbnb en een aanvraagformulier.

## Hoe het werkt

- **Inhoud** van de appartementen staat in `data/apartments.json`. Teksten op de site zelf staan in `index.html`.
- **Beschikbaarheid uit Airbnb:** elk uur haalt GitHub (de workflow in `.github/workflows/sync-calendars.yml`) de Airbnb-agenda van elk appartement op en zet de bezette nachten in `data/availability.json`. De site toont die als bezet.
- **Directe boekingen naar Airbnb:** zet een boeking die je rechtstreeks krijgt in `data/direct-bookings.json`, bijvoorbeeld:
  ```json
  { "207": [{ "start": "2027-04-03", "end": "2027-04-07" }], "301": [], "303": [] }
  ```
  (`end` is de vertrekdag.) De workflow maakt daar `ical/207.ics` van. Airbnb leest die link en blokkeert die data ook.
- **Aanvragen:** het formulier opent een ingevulde e-mail naar info@seafox.be. Er zijn geen online betalingen.

## Ontwerp en foto's

De huisstijl (kleuren en lettertypes) staat bovenaan in `assets/style.css`. De illustraties staan in `assets/illustrations/`: de kust, het dakzwembad en een eigen illustratie per appartement.

Echte foto's toevoegen kan in `assets/photos/`, als JPG van ongeveer 2000 pixels breed:
- `assets/photos/207/01.jpg` tot `05.jpg` (en zo ook voor 301 en 303). Foto 01 vervangt de illustratie in de boog; zodra er foto's zijn verschijnt op de appartementspagina vanzelf een galerij. De labels staan in `data/apartments.json`.
- `assets/photos/algemeen/hero.jpg` en `zwembad.jpg` vervangen, als je dat wilt, de illustraties van de opening en het zwembad.

## Eenmalig instellen

1. **Airbnb-links als geheim bewaren.** In Airbnb: Agenda > Beschikbaarheid > Agenda's koppelen > Airbnb-agenda exporteren. Kopieer de link per appartement.
   In GitHub: Settings > Secrets and variables > Actions > New repository secret. Maak `AIRBNB_ICAL_207`, `AIRBNB_ICAL_301` en `AIRBNB_ICAL_303` aan.
2. **Website aanzetten.** GitHub: Settings > Pages > Source: "Deploy from a branch", branch `main`, map `/ (root)`. De site staat dan op het testadres `https://wimbroos1.github.io/Seafox/`. Vul pas bij Custom domain `seafox.be` in wanneer je klaar bent om live te gaan, en vink dan "Enforce HTTPS" aan zodra dat kan.
3. **Domein koppelen bij OVHcloud.** In de DNS-zone van seafox.be:
   - A-records voor `seafox.be` naar 185.199.108.153, 185.199.109.153, 185.199.110.153 en 185.199.111.153 (verwijder andere A-records voor het hoofddomein).
   - CNAME voor `www` naar `<jouw-github-naam>.github.io.`
   - Laat de MX-records (e-mail) ongemoeid.
4. **Directe boekingen in Airbnb importeren.** In Airbnb per appartement: Agenda koppelen > Agenda importeren, met de link `https://seafox.be/ical/207.ics` (en 301, 303).
