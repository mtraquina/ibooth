iBooth — static site
====================

Publish this WHOLE FOLDER to any https address.

GitHub Pages
------------
1. "Add file" > "Upload files" on your repository.
2. Drag in EVERYTHING here, including the ocr/ folder and .nojekyll
   (press Cmd+Shift+. in Finder to see .nojekyll).
3. Settings > Pages > Deploy from a branch, main, / (root).

Contents
--------
  index.html   the app
  ocr/         the offline text-recognition engine used for business cards
  .nojekyll    stops GitHub Pages processing the folder. Keep it.

Notes
-----
* Must be served over https — browsers only grant camera and microphone
  access on a secure address.
* The ocr/ folder is about 11 MB and downloads only the first time
  somebody reads a business card. Don't rename or move it.
* IF CARD READING SAYS IT CANNOT START: you almost certainly uploaded
  index.html without the ocr/ folder. The app now tells you which it is
  — the panel in the viewfinder names the exact cause. As a safety net
  it falls back to fetching the reader from the internet, so it will
  still work on a phone with signal, just slower on the first card.
* The event setup page decides which capture methods the scanner offers
  and which languages transcription expects. Both are multi-select.
* Every field is editable — tap any line to correct it. Your version is
  kept and marked YOURS; a later note never overwrites it.
* Claude reads the notes BY DEFAULT. The transcript text — not the
  audio — is sent to Anthropic's API. Switch to "On the phone" under
  Rules > How the note gets read to keep everything local.

  !! THE API KEY IS EMBEDDED IN index.html !!
  Anyone who opens this site can read it. Before publishing:
    - if the GitHub repo is public, the key is public too
    - set a spend limit on the key at console.anthropic.com
    - rotate the key when testing is finished
  A real build must call Claude from a small server-side proxy so the
  key never reaches the phone at all.
* Sign-in, Salesforce and Apollo are still mocked.

Brand
-----
Colours are taken from the iProov logo: navy #023047, orange #FF8300,
amber #FEB306. The logo is embedded as a data URI in ONE place — search
index.html for LOGO_SRC. Anything with a data-logo attribute renders it,
so changing that one string updates every screen.
