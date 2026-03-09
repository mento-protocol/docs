# Syncing this folder with GitBook

If GitBook does not find your content or sync fails, the usual cause is **content root**.

This book lives in **`vendor/docs_old/`**, not at the repository root. GitBook needs to be told to use this folder as the **root** of the book.

## Fix: set the content root in GitBook

1. In **GitBook**, open your space and go to **Configure** (or **Settings**).
2. Open **Git Sync** / **GitHub** (or **Content**).
3. Find **Content path**, **Root directory**, or **Path to your content**.
4. Set it to: **`vendor/docs_old`** (no leading slash).
5. Save and run sync again.

Then GitBook will use:

- **README.md** in this folder as the introduction
- **SUMMARY.md** in this folder as the table of contents
- All paths in SUMMARY as relative to this folder

## If your GitBook has no “content path” option

Some plans or setups only sync from the **repository root**. In that case you have two options:

- **Option A:** Move or copy the contents of `vendor/docs_old` to the repo root (e.g. a `docs` folder at root), and point GitBook at that folder if it allows a subfolder; or at repo root and put SUMMARY.md and README.md there.
- **Option B:** Use a separate repository that has only the docs (e.g. clone the repo and push only the contents of `vendor/docs_old` as the root of the new repo), then connect that repo to GitBook.

## SUMMARY.md format

GitBook expects a clean SUMMARY: list items only, no horizontal rules (`---`) in the list. Section headers use `## Part name`. If you edit SUMMARY.md, keep that format so sync and TOC work.
