
# 🚀 How to Host Your Romantic Web App on Vercel

Vercel is a premium hosting platform. Note that unlike Netlify, Vercel **does not** have a "drag-and-drop zip" button in the browser. You must use one of the two methods below.

## Option 1: The "No-Code" GitHub Method (Recommended)
This is the best way to keep your site live and easy to update.
1.  **Extract your .zip** file into a folder on your desktop.
2.  Go to [GitHub.com](https://github.com) and create a new repository (name it something like `my-valentine`).
3.  Click **"uploading an existing file"** and drag all the files from your folder into GitHub. Commit changes.
4.  Log in to [Vercel.com](https://vercel.com).
5.  Click **"Add New" > "Project"**.
6.  Find your GitHub repository in the list and click **"Import"**.
7.  Click **"Deploy"**. Vercel will give you a premium `.vercel.app` link!

## Option 2: The Command Line Method (Fastest)
Use this if you don't want to use GitHub.
1.  **Extract your .zip** file into a folder.
2.  Open your **Terminal** (Mac) or **Command Prompt/PowerShell** (Windows).
3.  Type `cd ` and then drag your folder into the terminal window to get the path, then press **Enter**.
4.  Run the following command:
    ```bash
    npx vercel
    ```
5.  Follow the prompts:
    - Log in if required.
    - "Set up and deploy? [Y/n]" → Type `y` and Enter.
    - "Which scope?" → Press Enter.
    - "Link to existing project?" → Type `n` and Enter.
    - "What's your project's name?" → Press Enter.
    - "In which directory?" → Press Enter.
6.  Once it finishes, it will provide a **Production URL**.

---

### ⚠️ Reminder: Before You Deploy
Ensure `OWNER_MODE` is set to `false` in `config.ts` so your partner doesn't see the "Owner Editor Active" bar or any developer tools!

```typescript
// config.ts
export const OWNER_MODE = false;
```

**If you specifically want a "Drag and Drop Zip" experience:**
Use [Netlify Drop](https://app.netlify.com/drop). It is the only major service that lets you simply slide a folder onto the screen to go live instantly.
