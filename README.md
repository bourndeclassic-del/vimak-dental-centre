# Vimak Dental Centre — Official Client Website

**"Giving you something to smile about"**

A responsive, accessible, multi-page dental healthcare website built for **Vimak Dental Centre** (Nairobi & Thika, Kenya), adapted from the provided Bootstrap 5 template foundation.

---

## Project Structure

- `index.html` — Home page (Hero, Quick Appointment Bar, Introduction, Services Preview, Why Choose Vimak, Dental Education Modals, TikTok Integration, Clinic Gallery, FAQ, Book Appointment Form & Clinic Locations)
- `Whyus.html` — About / Why Choose Vimak Dental Centre
- `service.html` — Our Dental Services
- `team.html` — Meet The Vimak Dental Team (with client confirmation placeholders; no fictional doctors)
- `DentalSolutions.html` — Dental Solutions & Treatment Care
- `Pricing.html` — Appointments & Dental Care / Book an Appointment & Contact (replaces template's fictional pricing with consultation pathways, booking form, and clinic contact details)
- `css/` — Bootstrap 5 (`bootstrap.min.css`), core Vimak design system (`style.css`), and page stylesheets (`whyus.css`, `services.css`, `team.css`, `pricing.css`, `Dentalsolutions.css`)
- `js/` — Bootstrap 5 bundle (`bootstrap.bundle.min.js`) and editable clinic configuration + appointment/WhatsApp/email logic (`main.js`)
- `img/` — Official Vimak Dental Centre logo (`vimak-logo.svg`, `vimak-logo-hd.png`), reception image (`vimak-clinic-reception.jpg`), and clearly badged template placeholder images.

---

## Editable Business Configuration

Publicly listed clinic details are centralized in `js/main.js` (`VIMAK_CONFIG`) and in the HTML contact sections:

- **Nairobi Clinic:** ICEA Building (JKUAT Towers), 2nd Floor, Kenyatta Avenue
- **Thika Clinic:** Maisha Heights Building, Ground Floor, Kenyatta Avenue
- **Phone Numbers:** `020 222 89000` | `0720 285 819` | `0714 481 158`
- **Email:** `info@vimakdentalcentre.co.ke`
- **Opening Hours:** Monday–Saturday: 8:00 AM – 8:00 PM | Sunday: 8:00 AM – 5:00 PM
- **TikTok:** `@_vimak_dental_centre` (`https://www.tiktok.com/@_vimak_dental_centre`)

---

## Running Locally

Because the project uses standard HTML5, CSS3, Bootstrap 5, and vanilla JavaScript with no build step required:

1. Open `index.html` directly in any modern browser, **or**
2. Serve the folder with any static HTTP server:
   ```bash
   python3 -m http.server 8000 --bind 0.0.0.0
   ```
   Then visit `http://localhost:8000`.
