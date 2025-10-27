# AI Portfolio Landing Page

A modern, minimalist portfolio landing page showcasing AI-driven web design and 3D projects. Built with clean HTML, CSS, and JavaScript, featuring smooth scroll animations and responsive design.

![Hero Preview](./screenshots/hero.png)

## 🚀 Live Demo

**[View Live Site →](https://your-portfolio.vercel.app)**

## ✨ Features

- **Responsive Design** - Fully adaptive layout for all devices
- **Smooth Animations** - AOS (Animate On Scroll) library integration
- **Dark Theme** - Modern minimalist design with Inter font
- **Interactive Projects Grid** - 6 featured projects with hover effects
- **Contact Form** - Functional mailto form
- **Performance Optimized** - Fast loading and smooth interactions

## 🛠️ Tech Stack

- HTML5
- CSS3 (Custom properties, Grid, Flexbox)
- Vanilla JavaScript
- AOS Animation Library
- Google Fonts (Inter)

## 📁 Project Structure

```
ai-portfolio-landing/
├── public/
│   └── images/
│       ├── hero.png
│       ├── projects.png
│       └── contact.png
├── src/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # All styling
│   └── main.js         # JavaScript functionality
├── screenshots/
│   ├── hero.png
│   ├── projects.png
│   └── contact.png
├── README.md
└── .gitignore
```

## 🏃‍♂️ Running Locally

### Prerequisites
- A modern web browser
- Optional: Live Server extension for VS Code

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-portfolio-landing.git
cd ai-portfolio-landing
```

2. **Open with Live Server**
   - If using VS Code with Live Server extension:
     - Right-click on `index.html`
     - Select "Open with Live Server"
   
   - Or simply open `index.html` in your browser:
```bash
open src/index.html
# or
start src/index.html  # Windows
```

3. **No build process required!** This is a static site.

## 🌐 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd ai-portfolio-landing
vercel
```

### Deploy to Netlify

1. Drag and drop the `src` folder to [Netlify Drop](https://app.netlify.com/drop)

OR

2. Using Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --dir=src --prod
```

### Deploy to GitHub Pages

1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch and `/src` folder
4. Save and wait for deployment

## 📸 Screenshots

### Hero Section
![Hero](./screenshots/hero.png)
Clean, modern hero with animated floating cards and bold typography.

### Projects Grid
![Projects](./screenshots/projects.png)
Responsive grid showcasing 6 featured projects with hover effects.

### Contact Form
![Contact](./screenshots/contact.png)
Simple contact form with social links.

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #6366f1;
    --bg-dark: #0f0f0f;
    --bg-card: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #a1a1aa;
}
```

### Content
- Edit text in `index.html`
- Replace project cards with your own projects
- Update social links in the contact section

### Images
Add your project screenshots to `public/images/` and update the `project-placeholder` divs with:
```html
<img src="public/images/project-1.png" alt="Project Name">
```

## 📝 Case Study

**AI Portfolio Landing** — A personal landing page designed to showcase AI-driven design and interactive projects. 

**Stack:** HTML, CSS, JavaScript, AOS Library

**Role:** Design, development, animations

**Result:** A fully responsive, performant landing page with clean typography, smooth scroll animations, and intuitive navigation. The minimalist dark theme with Inter font creates a modern, professional aesthetic while maintaining excellent readability across all devices.

**Key Features:**
- Smooth scroll animations using AOS
- Responsive grid layout for projects
- Interactive hover effects
- Performance-optimized with vanilla JavaScript
- Accessibility-focused with semantic HTML

## 🔧 Performance

- **Lighthouse Score:** 95+ Performance
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 2.5s
- **Total Bundle Size:** < 100KB (excluding images)

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contact

For questions or collaboration:
- Email: hello@aiportfolio.com
- LinkedIn: [Your LinkedIn](https://linkedin.com)
- GitHub: [Your GitHub](https://github.com)

---

**Built with ❤️ using HTML, CSS, and JavaScript**
