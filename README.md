# De La Salle John Bosco College - Revised Website Borja And Onsayag 
https://daomingron.github.io/DLSJBC-Website/

A modern, responsive educational website redesign for De La Salle John Bosco College featuring advanced animations and interactive features. This is a school project demonstrating professional web development techniques.

**Project Type:** Class Assignment  
**Institution:** De La Salle John Bosco College (DLSJBC)  
**Location:** Bislig City, Surigao del Sur, Philippines  
**Tagline:** Committed to Excellence in Education

## 🎨 Animation Features Implemented

### ✅ All Required Animations:
1. **Loading Screen** - Animated spinner with fade-out effect when page loads
2. **Dark Mode Toggle** - Smooth theme switching with icon rotation and localStorage persistence
3. **Smooth Scroll** - Page-wide smooth scrolling and keyboard shortcuts
4. **Button Animations** - Pop effect on load, hover lift, and ripple click effects
5. **Card Hover Effects** - Cards lift up with shadow enhancement and border color changes
6. **Image Zoom** - Images scale smoothly on hover (1.15x magnification)
7. **Hover Effects** - Comprehensive hover effects on all interactive elements

## 🚀 Bonus Features

- **Scroll Progress Bar** - Visual indicator of page scroll position
- **Parallax Scrolling** - Hero section responds to scroll movement
- **Card Tilt Effect** - 3D perspective effect on card hover
- **Form Validation** - Email validation and user feedback notifications
- **Mobile Responsive** - Fully responsive hamburger menu for mobile devices
- **Keyboard Shortcuts** - Alt+H (Home), Alt+A (About), Alt+C (Contact), Alt+D (Dark Mode)
- **Intersection Observer** - Animations trigger as elements come into view
- **Social Media Links** - Footer with animated social icons
- **Navbar Active State** - Active navigation link highlighting based on scroll position

## 📁 Files Structure

```
Website/
├── index.html          # Main HTML structure
├── styles.css          # All CSS animations and styling
├── script.js           # JavaScript functionality and animations
└── README.md          # This file
```

## 🛠️ How to Use

1. **Open the Website:**
   - Simply open `index.html` in any modern web browser
   - All animations will start automatically

2. **Test Features:**
   - Hover over cards to see lift and border effects
   - Click the moon icon (top-right) to toggle dark mode
   - Scroll down to see parallax and progress bar effects
   - Hover over images to see the zoom effect
   - Click buttons to see ripple animations
   - Try keyboard shortcuts (Alt+H, Alt+A, Alt+C, Alt+D)

3. **Customize Content:**
   - Edit text in `index.html` to add your institution's information
   - Replace image URLs with your own images (currently using Unsplash placeholders)
   - Modify colors in CSS `:root` variables for brand colors
   - Update contact information in the Contact section

## � DLSJBC Brand Colors

Edit the `:root` section in `styles.css` to customize:

```css
:root {
    --primary-color: #003366;      /* De La Salle Blue */
    --secondary-color: #001a33;    /* Darker Blue */
    --accent-color: #d4af37;       /* Gold Accent */
    --text-dark: #1f2937;          /* Text color */
    --text-light: #6b7280;         /* Light text */
    --bg-light: #f9fafb;           /* Light background */
    --bg-white: #ffffff;           /* White background */
}
```

## 📱 Responsive Breakpoints

- **Desktop:** Full layout with all animations
- **Tablet (768px):** Optimized grid layout
- **Mobile (480px):** Hamburger menu and stacked content

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt + H` | Scroll to Home |
| `Alt + A` | Scroll to About |
| `Alt + C` | Scroll to Contact |
| `Alt + D` | Toggle Dark Mode |

## 🎭 Animation Specifications

### Loading Screen
- Duration: 2 seconds before fade out
- Spinner speed: Continuous rotation
- Gradient background: Purple to violet

### Dark Mode
- Smooth transition: 0.3 seconds
- Saves preference in localStorage
- Icon rotates 20 degrees on hover

### Button Animations
- Pop effect on initial load: 0.6 seconds
- Hover lift: -3px translation
- Ripple effect: 0.6 second duration
- Shadow enhancement on hover

### Card Hover Effects
- Lift effect: -10px translation
- Shadow intensity: Enhanced 20px blur
- Tilt effect: 3D perspective (5-degree rotation)

### Image Zoom
- Scale: 1.15x magnification
- Duration: 0.5 seconds smooth transition
- Rotation: Optional 2-degree tilt on some images

### Scroll Animations
- Smooth scroll: Native CSS behavior
- Progress bar: Gradient (blue to orange)
- Parallax: 50% of scroll distance

## 📝 Form Submission

The contact form includes:
- Input validation (empty field check)
- Email format validation
- Success/error notifications
- Form reset after submission

## 🔧 Customization Tips

1. **Change Color Scheme:**
   - Update CSS `:root` variables
   - Dark mode will automatically adapt

2. **Add More Sections:**
   - Duplicate any section block
   - Create new `section` element with unique `id`
   - Update navigation links

3. **Replace Images:**
   - Use local image paths or URLs
   - Recommended sizes:
     - Hero image: 400x500px
     - Program cards: 400x300px
     - News thumbnails: 400x250px

4. **Add More Programs/News:**
   - Duplicate `.program-card` or `.news-card` div
   - All animations will apply automatically

## 🐛 Troubleshooting

**Dark mode not persisting?**
- Check browser localStorage settings
- Clear browser cache and try again

**Images not loading?**
- Verify image URLs are correct
- Check internet connection for external images
- Use local image paths instead

**Animations not smooth?**
- Update browser to latest version
- Check hardware acceleration is enabled
- Reduce animation complexity on older devices

## 📜 License

This website is created for educational purposes. Feel free to customize and use it for your institution.

---

**Created for:** De La Salle John Bosco College  
**Date:** July 2024  
**Version:** 1.0  
**Project Type:** Class Assignment  
**Contact:** info@dlsjbc.edu.ph  
**Location:** Bislig City, Surigao del Sur, Philippines

Enjoy your animated website! 🎉
