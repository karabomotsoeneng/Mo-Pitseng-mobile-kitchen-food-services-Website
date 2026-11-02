// Mo'Pitseng website JavaScript

// ---------- 1. Mobile menu button ----------
var toggle = document.querySelector('.menu-toggle');
var nav = document.querySelector('nav');
if (toggle) {
  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
}

// ---------- 2. Accordion (about page) ----------
var accButtons = document.querySelectorAll('.accordion-btn');
for (var a = 0; a < accButtons.length; a++) {
  accButtons[a].setAttribute('aria-expanded', 'false');
  accButtons[a].addEventListener('click', function () {
    var isOpen = this.classList.toggle('open');
    this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    this.nextElementSibling.classList.toggle('show');
  });
}

// ---------- 3. Menu data (single source for the menu page AND the enquiry form) ----------
// Prices and names match the official Mo'Pitseng menu board (images/menu-board.jpg).
var menuData = [
  { name: 'Snacks & Extras', col: 'left', items: [
    { name: 'Fat cakes (Dibeko)', price: 1 }, { name: 'Garlic Snoek', price: 5 }, { name: 'Plain Snoek', price: 4 },
    { name: 'French (Polony)', price: 3 }, { name: 'Fali', price: 3 }, { name: 'Achaar', price: 4 } ] },
  { name: 'Sides', col: 'left', items: [
    { name: 'Fish Bone', price: 10 }, { name: 'Russian', price: 7 }, { name: 'Snoek Fish', price: 15 },
    { name: 'Skop', price: 40 }, { name: 'Lehlaha', price: 25 }, { name: 'Tlhakoana', price: 15 },
    { name: 'Pap', price: 10 }, { name: 'Dumpling', price: 15 } ] },
  { name: 'Chips', col: 'right', items: [
    { name: 'Small', price: 25 }, { name: 'Medium', price: 35 }, { name: 'Large', price: 45 } ] },
  { name: 'Combos', col: 'right', items: [
    { name: 'Russian & Small Chips', price: 30 }, { name: 'Fish & Small Chips', price: 40 }, { name: 'Full Skop', price: 200 } ] },
  { name: 'Plates', col: 'right', items: [
    { name: 'Pap, Gravy & Liver', price: 30 }, { name: 'Dumpling & Tripes', price: 35 }, { name: 'Dumpling, Skop & Veg', price: 55 } ] },
  { name: 'Skhumbane', col: 'wide', items: [
    { name: 'Classic', price: 30, desc: 'Bread, Achaar, French, Cheese & Chips' },
    { name: 'Egg', price: 32, desc: 'Bread, Achaar, French, Cheese, Chips & Egg' },
    { name: 'Russian', price: 45, desc: 'Bread, Achaar, French, Cheese, Chips & Russian' },
    { name: 'Lettuce', price: 50, desc: 'Bread, Achaar, French, Cheese, Chips & Lettuce' } ] }
];

// Full display name of an item, e.g. "Small Chips" or "Classic Skhumbane"
function fullItemName(cat, item) {
  if (cat.name === 'Chips') { return item.name + ' Chips'; }
  if (cat.name === 'Skhumbane') { return item.name + ' Skhumbane'; }
  return item.name;
}

// ---------- 4. Menu page: dynamic content, search, filter and sort ----------
var menuLeft = document.getElementById('menu-left');
if (menuLeft) {
  var menuRight = document.getElementById('menu-right');
  var menuWide = document.getElementById('menu-sk');
  var searchBox = document.getElementById('search');
  var categoryBox = document.getElementById('category');
  var sortBox = document.getElementById('sort');

  for (var c = 0; c < menuData.length; c++) {
    var option = document.createElement('option');
    option.value = menuData[c].name;
    option.textContent = menuData[c].name;
    categoryBox.appendChild(option);
  }

  function showMenu() {
    var term = searchBox.value.trim().toLowerCase();
    var html = { left: '', right: '', wide: '' };
    var found = 0;
    for (var i = 0; i < menuData.length; i++) {
      var cat = menuData[i];
      if (categoryBox.value !== 'all' && categoryBox.value !== cat.name) { continue; }
      // Searching a category name (e.g. "plates") shows the whole category
      var catMatches = cat.name.toLowerCase().indexOf(term) !== -1;
      var items = cat.items.slice();
      if (sortBox.value === 'low') { items.sort(function (x, y) { return x.price - y.price; }); }
      if (sortBox.value === 'high') { items.sort(function (x, y) { return y.price - x.price; }); }
      var rows = '';
      for (var j = 0; j < items.length; j++) {
        var it = items[j];
        var text = (fullItemName(cat, it) + ' ' + (it.desc || '')).toLowerCase();
        if (!catMatches && text.indexOf(term) === -1) { continue; }
        found++;
        if (cat.col === 'wide') {
          rows += '<div class="sk-item"><b>' + it.name + '</b><span class="price">R' + it.price + '</span><small>' + it.desc + '</small></div>';
        } else {
          rows += '<li><span>' + it.name + '</span><strong>R' + it.price + '</strong></li>';
        }
      }
      if (rows === '') { continue; }
      if (cat.col === 'wide') {
        html.wide += '<div class="sk-panel"><div class="sk-title">SKHUMBANE <small>Big bread. Big fillings. Big flavour.</small></div><div class="sk-items">' + rows + '</div></div>';
      } else {
        html[cat.col] += '<div class="menu-card"><h3>' + cat.name + '</h3><ul>' + rows + '</ul></div>';
      }
    }
    if (found === 0) { html.left = '<p>No items found. Try a different search.</p>'; }
    menuLeft.innerHTML = html.left;
    menuRight.innerHTML = html.right;
    menuWide.innerHTML = html.wide;
  }

  searchBox.addEventListener('input', showMenu);
  categoryBox.addEventListener('change', showMenu);
  sortBox.addEventListener('change', showMenu);
  showMenu();
}

// ---------- 5. Gallery lightbox (mouse and keyboard) ----------
var lightbox = document.getElementById('lightbox');
if (lightbox) {
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.getElementById('lightbox-close');
  var pictures = document.querySelectorAll('.gallery img, .gallery-img');
  var lastFocused = null;

  function openLightbox(pic) {
    lastFocused = pic;
    var figure = pic.closest('figure');
    var caption = figure ? figure.querySelector('figcaption') : null;
    lightboxImg.src = pic.src;
    lightboxImg.alt = pic.alt;
    lightboxCaption.textContent = caption ? caption.textContent : pic.alt;
    lightbox.classList.add('show');
    lightboxClose.focus();
  }
  function closeLightbox() {
    if (!lightbox.classList.contains('show')) { return; }
    lightbox.classList.remove('show');
    if (lastFocused) { lastFocused.focus(); }
  }

  for (var p = 0; p < pictures.length; p++) {
    pictures[p].setAttribute('tabindex', '0');
    pictures[p].setAttribute('role', 'button');
    pictures[p].addEventListener('click', function () { openLightbox(this); });
    pictures[p].addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(this); }
    });
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) { closeLightbox(); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeLightbox(); } });
}

// ---------- 6. Form validation helpers ----------
function setError(input, message) {
  input.parentElement.querySelector('.error').textContent = message;
  return message === '';
}
function checkName(input) {
  return setError(input, input.value.trim().length < 2 ? 'Please enter your full name.' : '');
}
function checkEmail(input) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return setError(input, pattern.test(input.value.trim()) ? '' : 'Please enter a valid email address.');
}
function checkPhone(input) {
  // Accepts 0711234567 or +27711234567 (spaces, dashes and brackets are ignored)
  var digits = input.value.replace(/[\s\-()]/g, '');
  var ok = /^0[0-9]{9}$/.test(digits) || /^\+27[0-9]{9}$/.test(digits);
  return setError(input, ok ? '' : 'Enter a valid SA number, e.g. 071 123 4567 or +27 71 123 4567.');
}
function checkSelect(input, text) {
  return setError(input, input.value === '' ? text : '');
}
function checkMessage(input) {
  return setError(input, input.value.trim().length < 10 ? 'Your message must be at least 10 characters.' : '');
}
// Builds a <p> safely (user input is treated as text, never as HTML)
function addLine(box, text) {
  var para = document.createElement('p');
  para.textContent = text;
  box.appendChild(para);
}

// ---------- 7. Enquiry form: cost estimate ----------
var enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  var itemBox = document.getElementById('item');
  // Fill the item list from the same menu data used on the menu page
  for (var m = 0; m < menuData.length; m++) {
    var group = document.createElement('optgroup');
    group.label = menuData[m].name;
    for (var n = 0; n < menuData[m].items.length; n++) {
      var entry = menuData[m].items[n];
      var opt = document.createElement('option');
      opt.value = m + '-' + n;
      opt.textContent = fullItemName(menuData[m], entry) + ' - R' + entry.price;
      group.appendChild(opt);
    }
    itemBox.appendChild(group);
  }

  enquiryForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var phone = document.getElementById('phone');
    var type = document.getElementById('type');
    var qty = document.getElementById('qty');
    var message = document.getElementById('message');
    var result = document.getElementById('enquiryResult');

    var amount = Number(qty.value);
    var ok1 = checkName(name);
    var ok2 = checkEmail(email);
    var ok3 = checkPhone(phone);
    var ok4 = checkSelect(type, 'Please select a type of enquiry.');
    var ok5 = itemBox.value === '' || setError(qty, (Number.isInteger(amount) && amount >= 1 && amount <= 50) ? '' : 'Enter a whole number from 1 to 50.');
    if (itemBox.value === '') { setError(qty, ''); }
    var ok6 = checkMessage(message);

    result.innerHTML = '';
    if (ok1 && ok2 && ok3 && ok4 && ok5 && ok6) {
      result.className = 'result ok';
      addLine(result, 'Thank you, ' + name.value.trim() + '! We have received your ' + type.value.toLowerCase() + ' enquiry.');
      if (itemBox.value !== '') {
        var idx = itemBox.value.split('-');
        var cat = menuData[Number(idx[0])];
        var chosen = cat.items[Number(idx[1])];
        addLine(result, 'Estimate: ' + amount + ' x ' + fullItemName(cat, chosen) + ' = R' + (chosen.price * amount) + ' (R' + chosen.price + ' each).');
      }
      addLine(result, 'We will confirm availability and get back to you on ' + phone.value.trim() + ' or by email.');
      enquiryForm.reset();
    } else {
      result.className = 'result';
    }
  });
}

// ---------- 8. Contact form: compile an email ----------
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('cname');
    var email = document.getElementById('cemail');
    var phone = document.getElementById('cphone');
    var type = document.getElementById('ctype');
    var message = document.getElementById('cmessage');
    var result = document.getElementById('contactResult');

    var ok1 = checkName(name);
    var ok2 = checkEmail(email);
    var ok3 = checkPhone(phone);
    var ok4 = checkSelect(type, 'Please select a type of message.');
    var ok5 = checkMessage(message);

    if (ok1 && ok2 && ok3 && ok4 && ok5) {
      var recipient = 't.motsoeneng112@gmail.com';
      var subject = "Mo'Pitseng website: " + type.value;
      var body = 'Name: ' + name.value.trim() + '\nEmail: ' + email.value.trim() + '\nPhone: ' + phone.value +
        '\nType: ' + type.value + '\n\nMessage:\n' + message.value.trim();
      result.className = 'result ok';
      result.innerHTML = '<p>Thank you! Your email app will open so you can send your message. If nothing opens, email us at <a href="mailto:t.motsoeneng112@gmail.com">t.motsoeneng112@gmail.com</a>.</p>';
      window.location.href = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    } else {
      result.className = 'result';
      result.innerHTML = '';
    }
  });
}

// ---------- 9. Map with more than one location (Leaflet) ----------
var mapBox = document.getElementById('map');
if (mapBox && typeof L !== 'undefined') {
  var map = L.map('map');
  // Esri street tiles (free with attribution, no API key). OpenStreetMap's own tile
  // server returns 403 when the page is opened straight from a file (no Referer header).
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Sources: Esri, HERE, Garmin, OpenStreetMap contributors, and the GIS User Community',
    maxZoom: 19
  }).addTo(map);
  var locations = [
    { name: "Mo'Pitseng - Phola Park, Bochabela", lat: -29.1461, lng: 26.2376 },
    { name: "Mo'Pitseng Mobile Kitchen - Bloemfontein CBD", lat: -29.1217, lng: 26.2140 }
  ];
  var bounds = [];
  for (var k = 0; k < locations.length; k++) {
    L.marker([locations[k].lat, locations[k].lng]).addTo(map).bindPopup(locations[k].name);
    bounds.push([locations[k].lat, locations[k].lng]);
  }
  map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
}