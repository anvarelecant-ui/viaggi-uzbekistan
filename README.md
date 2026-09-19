# Viaggi Uzbekistan 🇺🇿 🇮🇹

**Piattaforma Web Ufficiale per Tour Operator Locale in Uzbekistan**  
*Sito web incoming di alta gamma orientato ai viaggiatori italiani e dei paesi CSI lungo la Via della Seta.*

---

## 🌟 Caratteristiche Principali

- **Bilingue Istantaneo (Italiano / Russo):**
  - Versione primaria in **Italiano** (`it`), con linguaggio turistico editoriale raffinato ed elegante.
  - Switcher a 1 clic per la versione in **Russo** (`ru`) per visitatori e turisti dell'area CSI.
  - Architettura a dizionari modulari in `js/translations.js` (estendibile facilmente a Inglese e Tedesco).

- **Design di Lusso Awwwards & Silk Road:**
  - Tavolozza cromatica: Blu Notte Zaffiro (`#060913`), Turchese Cupole di Samarcanda (`#0284C7`), Oro Sabbia del Kyzylkum (`#D4AF37`), Terracotta di Khiva (`#C85A32`).
  - Tipografia svizzera e italiana: `Cinzel`, `Cormorant Garamond` e `Plus Jakarta Sans`.
  - Componenti glassmorphism, gradienti luminosi e micro-animazioni.

- **Mappa Interattiva della Via della Seta:**
  - Esplorazione dinamica di **Tashkent**, **Khiva**, **Bukhara**, **Samarcanda** e **Deserto di Kyzylkum & Yurt**.
  - Schede informative con tempi di percorrenza del treno ad alta velocità **Afrosiyob** e punti d'interesse UNESCO.

- **Pacchetti Turistici di Punta:**
  - *Classico Via della Seta* (8 Giorni / 7 Notti - Bestseller)
  - *Gran Tour & Deserto di Kyzylkum* (11 Giorni / 10 Notti - Notte in iurta & cammelli)
  - *Sapori & Maestri Artigiani* (9 Giorni / 8 Notti - Plov Masterclass & cantine storiche)
  - Itinerari completi giorno per giorno e sezioni "Cosa è Incluso / Non Incluso".

- **Calcolatore Interattivo "Tour su Misura":**
  - Selezione durata, categoria hotel (Boutique, 4*, 5*), tipologia di gruppo e singole esperienze.
  - Stima di prezzo reattiva in tempo reale.
  - Generatore di messaggio personalizzato pre-compilato con invio diretto su **WhatsApp**.

- **Profilo Guida Certificata:**
  - Presentazione della guida ufficiale abilitata dallo Stato con 1 anno di esperienza formativa in Italia, licenza ministeriale e perfetto bilinguismo IT/RU.

- **SEO & Schema.org:**
  - Microdati `TravelAgency` e `TouristTrip` in formato JSON-LD per indicizzazione organica su Google.
  - Metatag OpenGraph, Twitter card e tag `hreflang`.

---

## 📁 Struttura del Progetto

```
viaggi-uzbekistan/
├── assets/
│   └── images/
│       ├── hero_registan.jpg       # Panorama Registan al tramonto
│       ├── tour_bukhara.jpg        # Complesso Po-i-Kalyan
│       ├── tour_khiva.jpg          # Fortezza di Ichan-Kala
│       ├── tour_desert.jpg         # Campo iurte nel deserto di Kyzylkum
│       ├── guide_portrait.jpg      # Foto professionale guida ufficiale
│       └── uzbek_gastronomy.jpg    # Plov tradizionale e pane tandir
├── css/
│   └── style.css                   # Stili CSS completi e responsive
├── js/
│   ├── translations.js             # Dizionario multilingue completo (IT/RU)
│   └── main.js                     # Logica interattiva, calcolatore e filtri
├── CNAME                           # Configurazione dominio viaggiuzbekistan.uz per GitHub Pages
├── index.html                      # Pagina principale HTML5 semantica
└── README.md                       # Documentazione del progetto
```

---

## 🚀 Come Eseguire Localmente

Non sono richieste dipendenze o librerie esterne. È sufficiente un qualsiasi server HTTP:

```bash
# Con Python:
python -m http.server 8099

# Oppure con Node.js npx serve:
npx serve .
```

Aprire il browser su `http://localhost:8099/`.

---

## 🌐 Istruzioni per la Pubblicazione su GitHub Pages & Dominio `viaggiuzbekistan.uz`

1. **Creare un nuovo repository su GitHub:**
   - Ad esempio: `viaggi-uzbekistan` (pubblico o privato).

2. **Collegare il repository locale e fare push:**
   ```bash
   git remote add origin https://github.com/<tuo-account>/viaggi-uzbekistan.git
   git push -u origin main
   ```

3. **Attivare GitHub Pages:**
   - Vai su GitHub in **Settings -> Pages**.
   - Sotto **Branch**, seleziona `main` e cartella `/ (root)`. Clicca **Save**.
   - Il file `CNAME` già presente imposterà automaticamente il dominio `viaggiuzbekistan.uz`.

4. **Configurare i DNS sul pannello del provider (Eskiz.uz):**
   - Nel pannello DNS del dominio `viaggiuzbekistan.uz`, aggiungere i record di GitHub Pages:
     - **Record A** (@):
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`
     - **Record CNAME** (www):
       - `<tuo-account>.github.io`
   - Il certificato SSL gratuito (HTTPS) verrà generato automaticamente da GitHub entro 10-30 minuti.
