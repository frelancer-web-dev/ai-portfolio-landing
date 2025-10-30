# Mykola Portfolio

Modern, minimal, and fully responsive portfolio website built with clean HTML, CSS, and JavaScript.

## Features

### Core Functionality
- **Multi-language Support** - English, Ukrainian, and Russian translations
- **Smooth Animations** - AOS (Animate On Scroll) library integration
- **Responsive Design** - Mobile-first approach, works on all devices
- **Dark Theme** - Modern dark UI with gradient accents
- **Project Showcase** - 8 portfolio projects with preview images
- **Toast Notifications** - User-friendly feedback system
- **Smooth Scrolling** - Enhanced navigation experience
- **Language Persistence** - Saves user language preference

### Project Cards
Each project card includes:
- Preview image with fallback gradient icon
- Project title and description
- Technology tags
- Live demo link or status notification
- Hover effects and animations

### Sections
- **Hero** - Introduction with animated floating cards
- **Projects** - Grid layout showcasing portfolio work
- **About** - Personal information and skills
- **Contact** - Social media links (Upwork, Telegram, GitHub)

## Project Structure

```
portfolio/
├── index.html                    # Main HTML file
├── src/
│   ├── main.js                   # JavaScript logic
│   ├── styles.css                # All CSS styles
│   ├── translations/             # Language files
│   │   ├── en.json               # English
│   │   ├── uk.json               # Ukrainian
│   │   └── ru.json               # Russian
│   └── images/                   # Project preview images
│       ├── dodep_coder.png
│       ├── favicon_techstore.png
│       ├── favicon_quote.png
│       ├── favicon_focustime.png
│       ├── web_develop.png
│       └── favicon.png
└── README.md
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables, flexbox, and grid
- **JavaScript (ES6+)** - Vanilla JS, async/await, fetch API
- **AOS Library** - Scroll animations
- **Google Fonts** - Inter font family

## Installation

1. Clone the repository
2. Ensure you have all files in the correct structure
3. Add project preview images to `src/images/`
4. Open `index.html` in a browser or deploy to a web server

No build process or dependencies required - just open and run!

## Configuration

### Adding New Language
1. Create new JSON file in `src/translations/` (e.g., `de.json`)
2. Copy structure from existing language file
3. Translate all keys
4. Add language to `TRANSLATIONS` loader in `main.js`
5. Add flag emoji to `FLAGS` object
6. Add language option in HTML dropdown

### Adding New Project
1. Add project card HTML in `index.html`
2. Include preview image in `src/images/`
3. Add translations for title and description in all language files
4. Set appropriate gradient and icon
5. Add data-project attribute (`current`, `soon`, or `external`)

### Customizing Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;
  --bg-card: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --accent: #6366f1;
  --accent-hover: #4f46e5;
  --border: #27272a;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Breakdown

### Toast Notifications
- `current` - Shows "Already viewing" message
- `soon` - Shows "Coming soon" message
- `external` - Shows "Redirecting" before external link
- Auto-dismisses after 3 seconds (2 for redirects)

### Language System
- Loads JSON translations asynchronously
- Stores preference in localStorage
- Updates all `data-i18n` elements
- Refreshes AOS animations on language change

### Image Loading
- Progressive enhancement approach
- Shows gradient placeholder while loading
- Fallback to icon if image fails
- Smooth fade-in animation on load
- Hover scale effect on loaded images

## Performance

- No external dependencies except AOS and Google Fonts
- Minimal JavaScript footprint
- Optimized CSS with minimal specificity
- Lazy image loading strategy
- Efficient scroll event handling with requestAnimationFrame

## Accessibility

- Semantic HTML structure
- Alt text for images
- Keyboard navigation support
- Focus states for interactive elements
- Sufficient color contrast

## License

MIT License

Copyright (c) 2025 Mykola

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Author

**Mykola**
- Frontend Developer & Designer
- Portfolio: This project
- GitHub: frelancer-web-dev

---

Built with ❤️ using vanilla HTML, CSS, and JavaScript
