# 📜 HTTPS & Custom Domain Fix Guide

Your site is hosted on **GitHub Pages** with the custom domain **www.bennpattara.com**. If you see a *"Your connection is not private"* warning, follow these steps:

1. **CNAME file** – Ensure the repository root contains a file named `CNAME` (no extension) with exactly:
   ```
   www.bennpattara.com
   ```
   The file already exists and is correct.

2. **DNS configuration** – In your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.) set the following records:
   - **A records** for the apex domain (`bennpattara.com`):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME record** for `www` pointing to `bennpattara.github.io`.
   - Propagation can take up to 48 h, but usually a few minutes.

3. **GitHub Pages settings** – Go to **Settings → Pages** in the repository:
   - Under **Custom domain**, type `www.bennpattara.com` and save.
   - After the domain shows as *Configured*, toggle **Enforce HTTPS** to **ON**.
   - GitHub will automatically obtain a free TLS certificate from Let’s Encrypt.

4. **Mixed‑content check** – Open the site, press `F12 → Console` and look for any `http://` warnings. Replace any insecure URLs in the code (e.g., in `constants.tsx`, component props, or external embeds) with `https://` or protocol‑relative URLs.

5. **Deploy** – Run the build and push:
   ```bash
   npm run build && git add . && git commit -m "Deploy after HTTPS fix" && git push
   ```
   GitHub Pages will redeploy the updated site.

6. **Verify** – Visit `https://www.bennpattara.com`. The browser padlock should appear, and the GitHub Pages settings page should show **HTTPS enforced**.

---
If you still see the warning after DNS propagation, double‑check the records with a tool like `dig` or an online DNS checker, and ensure the CNAME file matches exactly the domain you entered in GitHub.
