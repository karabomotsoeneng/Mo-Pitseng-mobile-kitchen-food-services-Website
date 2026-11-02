# Mo'Pitseng Mobile Kitchen - Website Project

A fully responsive, dynamic website created for Mo'Pitseng Mobile Kitchen Food Services. This project was built as part of the final web development submission (WEDE5020POE). The website is designed to showcase traditional South African street food, allow users to view the menu dynamically, and make enquiries.

## Live Demo
You can view the live deployed website here: **[PASTE YOUR GITHUB PAGES LINK HERE ONCE DEPLOYED]**

## Technologies Used
* **HTML5:** Semantic structure (header, nav, main, section, article, footer).
* **CSS3:** Custom properties (variables), Flexbox, CSS Grid, Media Queries for responsiveness, and neon glow effects.
* **JavaScript (Vanilla):** DOM manipulation, dynamic menu rendering, form validation, interactive lightbox, and Leaflet map integration.
* **External Libraries:** 
  * **Leaflet.js** (for interactive maps).
  * **Google Fonts** (Bebas Neue, Kaushan Script, Poppins).

## Project Structure
* `index.html` - Home page with hero section and specials.
* `aboutus.html` - Business story, mission, vision, values, and an interactive FAQ accordion.
* `menu.html` - Dynamic menu generated via JavaScript, featuring live search, category filters, and price sorting.
* `gallery.html` - Interactive photo gallery with a custom JavaScript lightbox.
* `enquiry.html` - Enquiry form with real-time validation and a dynamic cost estimation calculator based on the menu items.
* `contacts.html` - Contact information, business hours table, contact form (mailto integration), and a multi-location interactive map.
* `css/style.css` - Main stylesheet.
* `js/script.js` - All JavaScript functionality.
* `robots.txt` & `sitemap.xml` - SEO configurations.

## Key Features Implemented (Part 3 Requirements)

1. **JavaScript Enhancements:**
   * **Dynamic Content:** The Menu page is entirely generated using a JavaScript array (`menuData`), allowing users to instantly search, filter by category, and sort items by price.
   * **Interactive Elements:** 
     * A custom **Lightbox** on the Gallery page (supports mouse clicks, keyboard Enter/Space, and Escape to close).
     * An **Accordion** for the FAQ on the About page.
     * A dynamic **Cost Estimator** on the Enquiry form that calculates the total based on user selection and quantity.
   * **Interactive Map:** Utilizes Leaflet.js to display two business locations with custom popups.
2. **Form Functionality & Validation:** 
   * Both the Contact and Enquiry forms feature custom client-side JavaScript validation (checking for valid SA phone numbers, proper email formats, and minimum message lengths) with real-time error handling.
   * The contact form compiles the input into an email format and triggers the user's default mail client.
3. **SEO Best Practices:** 
   * Descriptive `<title>` tags and `<meta name="description">` on every page.
   * Clean header tag hierarchy (H1, H2, H3).
   * Descriptive image file names and `alt` text.
   * `robots.txt` and `sitemap.xml` included in the root directory.
   * Mobile-friendly responsive design.

## Changelog (Part 2 Feedback Implementation)
* **HTML Structure:** Fixed invalid nesting (moved images out of `<ul>` tags) and improved semantic HTML (using `<main>`, `<section>`, `<article>`).
* **CSS Styling:** Rebuilt the layout to match the high-fidelity visual mockup. Implemented glowing red/blue neon borders, CSS Grid layouts for the menu, and a fully responsive mobile navigation menu using media queries.
* **Accessibility:** Added ARIA labels to navigation menus and form inputs, and ensured keyboard navigability for the gallery lightbox.

## References
* Google Fonts. (2026). *Bebas Neue, Kaushan Script, Poppins*. Available at: https://fonts.google.com/
* Leaflet. (2026). *Leaflet: an open-source JavaScript library for mobile-friendly interactive maps*. Available at: https://leafletjs.com/
* Esri. (2026). *World Street Map Basemap*. Available at: https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer
* W3Schools. (2026). *HTML and CSS Tutorials*. Available at: https://www.w3schools.com/
* MDN Web Docs. (2026). *JavaScript Form Validation*. Available at: https://developer.mozilla.org/