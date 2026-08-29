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
  zxing/       the barcode engine — QR, Code 128, PDF417, Data Matrix, Aztec
  pdf/         the PDF writer, used only when you export a summary
  .nojekyll    stops GitHub Pages processing the folder. Keep it.

Notes
-----
* Must be served over https — browsers only grant camera and microphone
  access on a secure address.
* The ocr/ folder is about 11 MB and downloads only the first time
  somebody reads a business card. Don't rename or move it.
* The zxing/ folder is about 1 MB and downloads the first time the
  scanner opens. Without it the app still reads square QR codes, but
  nothing else — the status pill in the viewfinder says which engine
  is running, so you can tell at a glance.
* iPhones have no barcode reader of their own, which is why this is
  bundled. Android phones use Chrome's built-in one and don't need it.
* IF CARD READING SAYS IT CANNOT START: you almost certainly uploaded
  index.html without the ocr/ folder. The app now tells you which it is
  — the panel in the viewfinder names the exact cause. As a safety net
  it falls back to fetching the reader from the internet, so it will
  still work on a phone with signal, just slower on the first card.
* EVENT WEBSITE is checked for shape only — no request is made to see if
  the address exists. It is a STARTING POINT for the research, not the
  source: "Research the event" has Claude look the show up across public
  sources — trade press, exhibitor lists, past-year write-ups — because an
  organiser's own site sells the show rather than describing it.
  You get two things back: what the event is, and why it matters to iProov
  (who is in the room, which themes touch identity and fraud, which
  competitors exhibit — and a candid "weak fit" where that is the truth).
  The research runs on Anthropic's servers; a browser cannot read another
  site's HTML. It tries Sonnet first and falls back through search-only and
  Haiku until a route answers, so a workspace key that cannot reach every
  model still works. The stamp says which route it took. If Claude answers
  without looking anything up, the brief is thrown away rather than saved
  as a guess.
* Both parts open the executive summary PDF, before any of our own numbers.
* THE PENCIL ICON on the events list opens that event's settings, for any
  event, without making it the one you are scanning. Saving from there
  returns you to the list and leaves the active event alone.
* EXECUTIVE SUMMARY: the document icon under the bin on the events list
  builds a PDF at any time, for any event, including finished ones.
  Hot companies first, names and job titles only, no emails, no phones,
  no raw transcripts — so it can be forwarded without becoming a
  mailing list. With a Claude key the opening read is written from the
  notes; without one it is counted on the phone and says so.
* The event setup page decides which capture methods the scanner offers
  and which languages transcription expects. Both are multi-select.
* Every field is editable — tap any line to correct it. Your version is
  kept and marked YOURS; a later note never overwrites it.
* NO API KEY SHIPS IN THIS BUILD. The repo can safely be public.
* Claude reads the notes by default, but each phone needs its own key:
  Rules > How the note gets read > Your Anthropic key. Paste it once.
  It is kept in that phone's browser storage, greyed out afterwards and
  never shown again. "Forget it" wipes it from the phone.
  Until a key is pasted the app quietly reads notes on the phone with
  keyword matching instead, and marks each note so you can tell.
* The key is per phone AND per browser. Clearing browsing data, a
  private tab, or a different browser all mean pasting it again.
* Anyone holding that key can spend against your Anthropic account, so
  keep the spend limit on and delete the key in the Claude Console the
  moment a phone goes missing or somebody leaves.
* Only the note TEXT is sent, never the audio.
* Sign-in, Salesforce and Apollo are still mocked.

Brand
-----
Colours are taken from the iProov logo: navy #023047, orange #FF8300,
amber #FEB306. The logo is embedded as a data URI in ONE place — search
index.html for LOGO_SRC. Anything with a data-logo attribute renders it,
so changing that one string updates every screen.
