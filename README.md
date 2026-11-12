# Wedding Invitation Website

A beautiful, animated wedding invitation website with smooth video transitions and elegant design.

## Features

- **Intro Screen**: Beach arch background with "Open" button
- **Video Intro**: Fullscreen video with background music that plays on button click
- **Smooth Transitions**: Elegant fade transitions from video to main content
- **Countdown Timer**: Real-time countdown to the wedding date
- **Responsive Design**: Works perfectly on all devices
- **Scroll Animations**: Beautiful AOS animations as you scroll
- **Watercolor Beach Theme**: Soft, elegant color palette matching the beach wedding aesthetic

## Required Assets

Please add the following files to the `assets/` folder:

### 1. beach-arch.jpg
- **Description**: Beach wedding arch background image (Image #1)
- **Location**: `assets/beach-arch.jpg`
- **Usage**: Initial screen background before "Open" button is clicked

### 2. couple-image.jpg
- **Description**: Couple in traditional attire (Image #2)
- **Location**: `assets/couple-image.jpg`
- **Usage**: Main hero section image after video ends

### 3. intro-video.mp4
- **Description**: Wedding intro video (Image #3)
- **Location**: `assets/intro-video.mp4`
- **Usage**: Plays fullscreen when "Open" button is clicked

### 4. bg-music.mp3 (or bg-music.m4a)
- **Description**: Background music for the video
- **Location**: `assets/bg-music.mp3` or `assets/bg-music.m4a`
- **Usage**: Plays during video and loops throughout the website

## File Structure

```
wedding-invitation/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling
├── js/
│   └── script.js       # Video controls, countdown, animations
├── assets/             # Place your images, video, and music here
│   ├── beach-arch.jpg
│   ├── couple-image.jpg
│   ├── intro-video.mp4
│   └── bg-music.mp3
└── README.md           # This file
```

## Setup Instructions

1. **Add Assets**: Copy your images, video, and music files to the `assets/` folder with the exact names listed above

2. **Customize Content**: Edit `index.html` to update:
   - Couple names (currently: "Aarav & Ananya")
   - Wedding date (currently: "Saturday, 14 February 2026")
   - Wedding location (currently: "Cavelossim Beach · Goa")
   - Ceremony times and details

3. **Test Locally**: Open `index.html` in a web browser to test

4. **Deploy to GitHub Pages**:
   - Create a new repository on GitHub
   - Push this folder to the repository
   - Go to Settings → Pages
   - Select "main" branch and click Save
   - Your site will be live at `https://yourusername.github.io/repository-name`

## Customization

### Update Wedding Date
Edit `js/script.js` line 97:
```javascript
const weddingDate = new Date('2026-02-14T16:00:00').getTime();
```

### Change Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary-gold: #c9a96e;
    --secondary-gold: #d4b896;
    --cream: #f8f6f1;
    /* ... */
}
```

### Add More Sections
Add new sections in `index.html` after the ceremony section and style them in `css/styles.css`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Features & Interactions

1. **Open Button**: Click to start the video experience
2. **Video Playback**: Automatically plays with music
3. **Auto Transition**: Smoothly transitions to main content when video ends
4. **Skip Video**: Click anywhere on the video overlay to skip
5. **Countdown**: Live countdown to your special day
6. **Scroll Animations**: Elements animate as you scroll down
7. **Responsive**: Perfect on desktop, tablet, and mobile

## Technical Details

- **No build tools required**: Pure HTML, CSS, and JavaScript
- **CDN Libraries**: AOS animation library loaded via CDN
- **Lightweight**: Fast loading and smooth performance
- **SEO Friendly**: Semantic HTML structure
- **GitHub Pages Ready**: Deploy in minutes

## Troubleshooting

### Video not playing
- Check that `intro-video.mp4` is in the `assets/` folder
- Ensure video format is MP4 (H.264 codec recommended)
- Some browsers may block autoplay

### Music not playing
- Browsers may block autoplay with sound
- User interaction (clicking "Open") should enable playback
- Try both `.mp3` and `.m4a` formats for compatibility

### Images not showing
- Verify file names match exactly (case-sensitive)
- Check that images are in the `assets/` folder
- Ensure image formats are web-compatible (JPG, PNG)

## Need Help?

If you encounter any issues or need customization help, feel free to reach out!

---

Made with ❤️ for your special day
