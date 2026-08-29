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
* The event setup page decides which capture methods the scanner offers
  and which languages transcription expects. Both are multi-select.
* Every field is editable — tap any line to correct it. Your version is
  kept and marked YOURS; a later note never overwrites it.
* Nothing leaves the device. Sign-in, Salesforce and Apollo are mocked.

Brand
-----
Colours are taken from the iProov logo: navy #023047, orange #FF8300,
amber #FEB306. The logo is embedded as a data URI in ONE place — search
index.html for LOGO_SRC. Anything with a data-logo attribute renders it,
so changing that one string updates every screen.
