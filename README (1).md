# 💍 Farah & Marwan — Wedding Invitation Website

An elegant, minimal digital wedding invitation for **Farah & Marwan**, celebrating their marriage on **29 May 2026** at **Air Defense Wedding Halls – Tulip Hall, Cairo**.

---

## ✅ Completed Features

| Section | Description |
|---|---|
| **Hero** | Full-screen cinematic photo backdrop with couple names, wedding date/time, and "View Details" CTA |
| **Welcome** | Graceful welcome message with gold dividers and ornamental accents |
| **Countdown Timer** | Live ticking countdown to the wedding date (days · hours · minutes · seconds) |
| **Our Story** | 4-step romantic timeline (First Meeting → Falling in Love → Proposal → Wedding) |
| **Wedding Details** | 3 cards: Date & Time, Venue, Celebration type |
| **Map Section** | Embedded Google Maps iframe + direct navigation button |
| **Closing Section** | Final romantic quote, couple names, and date |
| **Footer** | Subtle branded footer |

### Design Highlights
- Elegant minimal aesthetic — cream, white, charcoal & warm gold palette
- Cormorant Garamond (serif) + Jost (sans-serif) typography pairing
- Smooth scroll-reveal animations on every section
- Staggered entrance animations for timeline and detail cards
- Fully **mobile-first** and responsive
- Zero JavaScript frameworks — pure vanilla JS

---

## 📂 File Structure

```
index.html          → Main one-page invitation
css/
  style.css         → All styles (variables, layout, animations, responsive)
js/
  main.js           → Countdown timer, scroll-reveal, smooth scroll
README.md
```

---

## 🔗 Entry Point

| Path | Description |
|---|---|
| `/index.html` | Main invitation page (root) |
| `#hero` | Landing / hero section |
| `#welcome` | Welcome message |
| `#countdown` | Countdown timer |
| `#story` | Our story timeline |
| `#details` | Date, time & venue details |
| `#map` | Embedded Google Maps |
| `#closing` | Romantic closing section |

---

## 📅 Event Details

| Field | Value |
|---|---|
| **Bride** | Farah |
| **Groom** | Marwan |
| **Date** | Friday, 29 May 2026 |
| **Time** | 7:00 PM |
| **Venue** | Tulip Hall — Air Defense Wedding Halls |
| **Address** | Salah Salem, Cairo |
| **Google Maps** | https://maps.app.goo.gl/9xyp2ReTSaVsJdRy9 |

---

## 🚀 Recommended Next Steps

- [ ] Add real couple photos to the gallery / hero background
- [ ] Add RSVP form (name, attending yes/no, meal choice) connected to Table API
- [ ] Add a wedding schedule / timeline section
- [ ] Add dress code section
- [ ] Add background music (optional toggle)
- [ ] Customize story paragraphs with real couple story
- [ ] Add social sharing buttons
- [ ] Add a photo gallery section

---

## 🛠 Tech Stack

- HTML5, CSS3, Vanilla JavaScript (no frameworks)
- Google Fonts — Cormorant Garamond + Jost
- Font Awesome 6 (icons)
- IntersectionObserver API (scroll animations)
- Native setInterval (countdown timer)
