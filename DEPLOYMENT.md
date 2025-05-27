# 🚀 Deployment Guide for GitHub Pages

This guide will walk you through deploying your F1 Explorer application to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Node.js 18+ installed

## Step-by-Step Deployment Instructions

### 1. Prepare Your Repository

1. **Create a new repository on GitHub:**

   - Go to [github.com](https://github.com) and click "New repository"
   - Name it `f1-task` (or your preferred name)
   - Make it public (GitHub Pages requires public repos for free accounts)
   - Don't initialize with README (since you already have one)

2. **Connect your local repository to GitHub:**
   ```bash
   git remote add origin https://github.com/yourusername/f1-task.git
   git branch -M main
   git push -u origin main
   ```

### 2. Configure GitHub Pages

1. **Go to your repository on GitHub**
2. **Navigate to Settings → Pages**
3. **Under "Source", select "GitHub Actions"**
4. **That's it!** The workflow is already configured

### 3. Enable Automatic Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that will:

- ✅ Automatically trigger on pushes to `main` branch
- ✅ Install dependencies
- ✅ Build the application in SPA mode
- ✅ Deploy to GitHub Pages
- ✅ Make your app available at `https://yourusername.github.io/f1-task/`

### 4. Test the Deployment

1. **Push your code to the main branch:**

   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

2. **Monitor the deployment:**

   - Go to the "Actions" tab in your GitHub repository
   - Watch the "Deploy to GitHub Pages" workflow run
   - It should complete in 2-3 minutes

3. **Access your deployed app:**
   - Visit `https://yourusername.github.io/f1-task/`
   - Replace `yourusername` with your actual GitHub username

## Configuration Details

### Base Path Configuration

The app is configured with the base path `/f1-task/` in `vite.config.ts`:

```typescript
export default defineConfig({
  base: "/f1-task/", // Matches your repository name
  // ... other config
});
```

**Important:** If you named your repository differently, update this base path to match your repository name.

### SPA Mode

The app runs in Single Page Application (SPA) mode for GitHub Pages:

```typescript
// react-router.config.ts
export default {
  ssr: false, // Disabled for static hosting
} satisfies Config;
```

## Troubleshooting

### Common Issues

1. **404 errors on page refresh:**

   - This is normal for SPAs on GitHub Pages
   - Users can navigate using the app's internal navigation
   - Consider adding a 404.html that redirects to index.html if needed

2. **Deployment fails:**

   - Check the Actions tab for error messages
   - Ensure your repository is public
   - Verify GitHub Pages is enabled in settings

3. **Assets not loading:**

   - Verify the base path in `vite.config.ts` matches your repository name
   - Check browser console for 404 errors

4. **Workflow doesn't trigger:**
   - Ensure the workflow file is in `.github/workflows/deploy.yml`
   - Check that you're pushing to the `main` branch
   - Verify the workflow syntax is correct

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the application
npm run build:static

# The build output will be in ./build/client/
# You can upload this directory to any static hosting service
```

## Alternative Hosting Options

This static build can also be deployed to:

- **Netlify**: Drag and drop the `build/client` folder
- **Vercel**: Connect your GitHub repository
- **Firebase Hosting**: Use Firebase CLI
- **AWS S3**: Upload static files to S3 bucket

## Environment-Specific Configuration

If you need different configurations for different environments, you can:

1. Create environment-specific config files
2. Use environment variables in GitHub Actions
3. Modify the base path dynamically based on deployment target

## Support

If you encounter issues:

1. Check the [React Router v7 documentation](https://reactrouter.com/start/library/installation)
2. Review [GitHub Pages documentation](https://docs.github.com/en/pages)
3. Check the repository's Issues tab for known problems

---

🏁 **Happy Racing!** Your F1 Explorer should now be live on GitHub Pages!
