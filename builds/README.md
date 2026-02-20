# Release Builds

This folder contains versioned cgpv-main.js builds for the Release Navigator.

## Adding a New Version

1. Build the project: `rush build`
2. Copy the built file: `cp dist/cgpv-main.js public/builds/cgpv-main-{version}.js`
3. Update the versions array in `/templates/release-navigator.html`:
   ```javascript
   const versions = ['2.0.0', '2.1.0', '2.1.2', '{new-version}'];
   ```
4. Commit the new build file
5. The release navigator will automatically include it in the dropdown

## File Naming Convention

Files must follow the pattern: `cgpv-main-{version}.js`

Example: `cgpv-main-2.1.0.js`

## Deployment

Files in this folder are automatically:

- Copied to `dist/builds/` by webpack
- Deployed to GitHub Pages at `/builds/cgpv-main-{version}.js`
- Available for selection in the Release Navigator
