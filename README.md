# VIAGGI UZBEKISTAN 🇺🇿 🇮🇹 🇬🇧

**Piattaforma Web Ufficiale per Tour Operator e Guida a Tashkent**  
*Sito web incoming per viaggiatori italiani ed internazionali alla scoperta di Tashkent con Sardor e servizio biglietteria treni ad alta velocità.*

---

## 🌟 Punti di Forza

- **Bilingue Istantaneo (Italiano / Inglese):**
  - Versione primaria in **Italiano** (`it`) per intercettare il crescente flusso di viaggiatori dall'Italia.
  - Switcher a 1 clic in **Inglese** (`en`) per viaggiatori internazionali.
  - Architettura a dizionari in [`js/translations.js`](file:///d:/Agents/VIAGGI%20UZBEKISTAN/js/translations.js).

- **Guida Ufficiale di Stato:**
  - Profilo dedicato a **Sardor**, guida abilitata dal Ministero del Turismo della Repubblica dell'Uzbekistan.
  - Fluente in 4 lingue: **Italiano, Inglese, Uzbeko, Russo**.
  - Contatto WhatsApp diretto: **+998 93 885 03 09**.

- **Focus Guidato su Tashkent:**
  - *Tashkent Millenaria & La Città Vecchia* (Complesso Hazrati Imam col Corano di Othman del VII sec., Bazar Chorsu, Madrasa Kukeldash, pranzo tradizionale plov).
  - *Metropolitana d'Arte & Tashkent Moderna* (Le 6 stazioni più celebri della metro, Piazza Amir Timur, iconico Hotel Uzbekistan, Magic City).
  - *Tashkent al Tramonto, Moschea Bianca & Sapori* (Moschea Minore in marmo bianco, shashlik e somsa calde, fontane musicali di Tashkent City).

- **Biglietteria Ufficiale Treni ad Alta Velocità (Concierge):**
  - **Afrosiyob** (treno proiettile Talgo a 250 km/h per Samarcanda e Bukhara).
  - **Jaloliddin Manguberdi** (il nuovissimo treno espresso ad alta velocità per Khiva e Urgench).
  - Garanzia dei biglietti con prenotazione prioritaria per proseguire in autonomia verso le altre città dell'Uzbekistan.

- **Calcolatore "Tour su Misura":**
  - Configurazione durata a Tashkent, opzione biglietti treno (Afrosiyob / Manguberdi) e singole esperienze gastronomiche/culturali.
  - Calcolo prezzo in tempo reale e generazione automatica del messaggio su WhatsApp.

---

## 📁 Struttura del Progetto

```
VIAGGI UZBEKISTAN/
├── assets/
│   └── images/
│       ├── tashkent_hazrati_imam.jpg       # Complesso Hazrati Imam
│       ├── tashkent_chorsu_bazaar.jpg      # Cupola turchese Bazar Chorsu
│       ├── train_afrosiyob_manguberdi.jpg  # Treni Afrosiyob & Manguberdi
│       ├── guide_portrait.jpg              # Foto ufficiale Sardor
│       └── uzbek_gastronomy.jpg            # Plov e pane tandir
├── css/
│   └── style.css                           # Stili di lusso Silk Road & responsive
├── js/
│   ├── translations.js                     # Dizionario bilingue (IT/EN)
│   └── main.js                             # Logica interattiva, calcolatore e WhatsApp
├── CNAME                                   # viaggiuzbekistan.uz (GitHub Pages)
├── index.html                              # Pagina principale HTML5 semantica e SEO
└── README.md                               # Documentazione
```

---

## 🚀 Esecuzione Locale

Il server locale è attivo all'indirizzo:
`http://localhost:8099/`

Per avviarlo manualmente:
```bash
python -m http.server 8099
```

---

## 🌐 Pubblicazione su GitHub Pages e Dominio `viaggiuzbekistan.uz`

1. **Creare un nuovo repository vuoto su GitHub:**
   - Nome: `viaggi-uzbekistan`

2. **Collegare ed inviare i file:**
   ```bash
   git remote add origin https://github.com/<tuo-account>/viaggi-uzbekistan.git
   git push -u origin main
   ```

3. **Attivare GitHub Pages:**
   - Vai su **Settings ➔ Pages**
   - Seleziona **Branch: main** e cartella `/ (root)`, poi clicca **Save**.
   - Il file `CNAME` già incluso collegherà automaticamente il dominio `viaggiuzbekistan.uz`.

4. **Configurare i record DNS su Eskiz.uz:**
   - **Record A (@):**
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **Record CNAME (www):** `<tuo-account>.github.io`
