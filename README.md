# Junior Alhassan: portfolio site

A static site (HTML, CSS, JavaScript). No build step and no dependencies.

```
index.html      page structure and text
css/style.css   all styling
js/main.js      career timeline data and behaviour
js/certs.js     certifications list (section appears when it has entries)
```

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

## Edit your content

- Role details and dates: the `ROLES` list at the top of `js/main.js`.
- Certifications: add entries to `js/certs.js`.
- Skills, projects, education: `index.html`.

## Put it on GitHub (new repository)

1. On github.com, click New repository. Name it `portfolio` (or `junior-alhassan`). Leave "Add a README" unticked. Create it.
2. In a terminal, from inside this folder:

```
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/Jbankx/portfolio.git
git push -u origin main
```

Use your own repository name in the URL. GitHub will ask you to sign in; use a personal access token if it asks for a password.

If you prefer no terminal: on the new repository page choose "uploading an existing file" and drag in everything from this folder, keeping the `css` and `js` folders.

## Deploy on Netlify from GitHub

1. In Netlify, choose Add new site, then Import an existing project, then GitHub, and pick the repository.
2. Leave the build command empty and set the publish directory to `.` (or leave it blank).
3. Deploy. Every `git push` to `main` will update the live site.
4. Change the address under Site configuration, then Domain management (for example `junior-alhassan.netlify.app`).

## Quick alternative without GitHub

Netlify, Add new site, Deploy manually: drag this whole folder onto the page.
