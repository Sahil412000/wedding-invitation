# GitHub Pages Deployment Guide

Follow these steps to deploy your wedding invitation website to GitHub Pages.

## Step 1: Add Your Assets

1. Copy your files to the `assets/` folder:
   - `beach-arch.jpg` (Image #1)
   - `couple-image.jpg` (Image #2)
   - `intro-video.mp4` (Video)
   - `bg-music.mp3` or `bg-music.m4a` (Audio)

2. Test locally by opening `index.html` in your browser

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name your repository (e.g., `wedding-invitation`)
4. Choose "Public" (required for free GitHub Pages)
5. Click "Create repository"

## Step 3: Upload Your Website

### Option A: Using GitHub Desktop (Easiest)

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Click "Add" → "Add Existing Repository"
3. Select your `wedding-invitation` folder
4. Click "Publish repository"
5. Uncheck "Keep this code private"
6. Click "Publish repository"

### Option B: Using Terminal/Command Line

```bash
# Navigate to your project folder
cd /Users/sahil.punjabi/Desktop/wedding-invitation

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial wedding invitation website"

# Add your GitHub repository as remote
# Replace YOUR-USERNAME and YOUR-REPO-NAME with your actual values
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option C: Using GitHub Web Interface

1. On your repository page, click "uploading an existing file"
2. Drag and drop all your project files
3. Click "Commit changes"

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" (top menu)
3. Click "Pages" (left sidebar)
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait 1-2 minutes for deployment

## Step 5: Access Your Website

Your website will be live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

Example: `https://johndoe.github.io/wedding-invitation/`

## Important Notes

### Large Video Files

If your video file is very large (>25MB), GitHub may reject it. Solutions:

1. **Compress your video**: Use [HandBrake](https://handbrake.fr/) or online tools
2. **Use external hosting**:
   - Upload video to Google Drive, Vimeo, or YouTube
   - Update `index.html` to point to external URL
3. **Use Git LFS** (Large File Storage):
   ```bash
   git lfs install
   git lfs track "*.mp4"
   git add .gitattributes
   git add .
   git commit -m "Add video with LFS"
   git push
   ```

### Custom Domain (Optional)

To use a custom domain (e.g., www.yourwedding.com):

1. Buy a domain from a registrar (Namecheap, GoDaddy, etc.)
2. In your repository, create a file named `CNAME` with your domain:
   ```
   www.yourwedding.com
   ```
3. In your domain registrar's DNS settings, add:
   - CNAME record: `www` → `YOUR-USERNAME.github.io`
   - A records pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
4. Wait for DNS propagation (up to 24 hours)

## Updating Your Website

Whenever you make changes:

```bash
git add .
git commit -m "Update website content"
git push
```

Changes will appear on your live site within 1-2 minutes.

## Troubleshooting

### Website shows 404
- Wait 2-3 minutes after enabling Pages
- Check that repository is public
- Verify branch is set to "main" in Pages settings

### Video not loading
- Check file size (<100MB recommended)
- Ensure video is in `assets/` folder
- Try compressing the video

### Music not playing
- Some browsers block autoplay with audio
- User must interact with page (click "Open" button) first
- Try both MP3 and M4A formats

### Images broken
- Verify exact file names (case-sensitive)
- Check that files are in `assets/` folder
- Clear browser cache and reload

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Desktop Guide](https://docs.github.com/en/desktop)
- [Git Tutorial](https://git-scm.com/docs/gittutorial)

---

Happy Wedding! 🎉💍
