Booth prototype — static site
=============================

Publish this WHOLE FOLDER to any https address. Two easy routes:

GitHub Pages
------------
1. Create a new repository on github.com.
2. "Add file" > "Upload files", then drag in EVERYTHING from this
   folder, including the ocr/ folder and the .nojekyll file.
3. Repository "Settings" > "Pages" > Source: "Deploy from a branch",
   Branch: main, Folder: / (root). Save.
4. After a minute the site is live at
   https://<your-account>.github.io/<repository-name>/

Netlify
-------
Drag this folder onto https://app.netlify.com/drop

Contents
--------
  index.html   the app — everything except card reading is in this file
  ocr/         the offline text-recognition engine used by "Business card"
               mode (reads cards live off the camera, like the QR mode)
  .nojekyll    stops GitHub Pages processing the folder. Keep it.

Notes
-----
* It must be served over https. Opening index.html straight from your
  disk will not work: browsers only grant camera and microphone access
  on a secure address.
* The ocr/ folder is about 11 MB and downloads only the first time
  somebody reads a business card. Don't rename or move it.
* Every field is editable — tap any line on the badge, card or write-up
  screens to correct it. Your version is kept and marked YOURS; a later
  re-read never overwrites it.
* Nothing leaves the device. Captured leads are held in the browser's
  own storage. Sign-in and the Salesforce sync are mocked.
* Export produces a CSV that opens in Excel, Numbers or Sheets.
