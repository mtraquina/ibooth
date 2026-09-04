iBooth — static site
====================

TWO WAYS TO PUBLISH. Pick one.

A) ONE FILE (easiest, and the one to use on GitHub)
   Upload the single index.html from the one-file build. That is the
   whole app: the barcode engine and the PDF writer are carried inside
   it. Nothing else to upload, no folders to lose, no hidden files.
   Keep the name index.html exactly.
   The only thing not inside it is business-card reading — that engine
   is 11MB, so it comes from the internet the first time a card is read.
   Everything else works with no signal at all.

B) THIS FOLDER (a smaller first download, more to upload)
   Publish this WHOLE FOLDER to any https address. index.html here is
   about 420KB and loads the engines from the folders beside it.

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
* The event setup page decides which capture methods the scanner offers,
  which languages transcription expects, AND which MEDDIC fields are
  captured. The fields belong to the EVENT, not the phone, so everyone
  working one stand captures the same set — which is what makes two
  phones mergeable. They travel in the event code and the handover file.
  A new event inherits the field set from your most recent one.
  There is no longer a separate "What a note turns into" screen; the
  sliders icon on the leads list opens the event settings at that section.
* Every field is editable — tap any line to correct it. Your version is
  kept and marked YOURS; a later note never overwrites it.
* WHO IS USING THIS PHONE is now a full page rather than a panel that
  slid up over the app, because on a small screen the panel could grow
  taller than the phone and push its own "That's me" button out of reach,
  with nothing behind it able to be tapped. It has a back arrow once you
  are known, and it is the first thing you see when you sign in.
  The app asks your name and email and remembers them. Every lead and every note is stamped
  with that, so a colleague's captures can be told from yours. Tap the
  circle top right of the events list to change it.
* TWO PEOPLE AT ONE STAND. There is still no server, so you cannot see
  each other live. What you can do:
    1. One person sets the event up. Event settings then shows a code
       like MONEY2020EUR-9174-WYW3 — three groups you can read out across
       a stand. Tap it to copy.
         MONEY2020EUR  the event, so you can see what you are joining
         9174          its number, fixed for life — this is what makes
                       both phones the SAME event, and mergeable
         WYW3          its settings: which MEDDIC fields are captured and
                       which ways of capturing someone the scanner offers
       The first two groups never change. The last one changes if the
       organiser changes the settings, so a colleague joining later gets
       the current set.
       The letters avoid I, L, O and U, so nothing can be mistaken for 1,
       0 or V, and a code typed wrong fails a checksum and is refused
       rather than quietly creating a second, unmergeable event.
    2. The other taps "Join a colleague's event" and types it in. Case
       does not matter. Both phones now hold the SAME event, which is what
       makes step 3 possible — without it the two days can never be lined
       up. The joining phone names the event after the code; rename it if
       you like, the code will not change.
       Codes sent before this change — the long iBOOTH1: ones — still work.
    3. At the end of the day, one of you opens the leads list > export >
       "Save my day as a handover file" and sends the .ibooth.json.
    4. The other opens the same sheet and taps "Merge in a colleague's
       file". People scanned by both are matched on email and merged, not
       duplicated; the fuller record wins and both scanners are recorded.
       Companies match on domain, then on name. Notes are all kept.
  Merge onto ONE phone and export from there, or you will have two
  partial spreadsheets.
* NO API KEY SHIPS IN THIS BUILD. The repo can safely be public.
* Claude reads the notes by default, but each phone needs its own key.
  It is asked for during registration, under "How your notes get read" —
  tap the circle top right of the events list to get back to it.
  It is kept in that phone's browser storage, greyed out afterwards and
  never shown again. "Forget it" wipes it from the phone.
  Until a key is pasted the app quietly reads notes on the phone with
  keyword matching instead, and marks each note so you can tell.
* CAMERA AND MICROPHONE ARE ASKED FOR ONCE PER VISIT, not once per screen.
  The app now holds the camera while you move between scanning, the leads
  list and the event settings, and holds the microphone between notes, so
  you are not prompted every time. It hands the camera back after three
  minutes of not scanning, the microphone after two, and both the moment
  you switch away from the app — so the lens is never left open across a
  coffee break.
  To stop iOS asking even once per visit: Safari > "aA" in the address bar
  > Website Settings > Camera and Microphone > Allow. Better still, Share >
  Add to Home Screen and open it from the icon: it then keeps its
  permissions like an installed app. On Android, Chrome remembers the
  answer for the site by itself.
* IPHONE: THE BAR AT THE FOOT OF EVERY SCREEN. Safari lays a page out
  against the tall viewport it would have if its own toolbar were hidden,
  so the bottom of the app used to sit behind that toolbar — the panel
  with "New event" and "Join a colleague's event" in it looked cut off and
  could not be tapped or dismissed. A laptop has no toolbar, which is why
  it only ever showed up on the phone. The app is now sized to the small
  viewport, which always excludes the browser's own furniture.
  Add to Home Screen and open it from the icon and there is no toolbar at
  all, which is the nicest way to run it.
* PANELS THAT SLIDE UP FROM THE BOTTOM — join an event, export, send to
  Salesforce — now have four ways out, because one was not enough: the X
  in the top right, pulling the panel down by its handle, the Escape key,
  and tapping the dark area, which now answers the first touch instead of
  being swallowed by the on-screen keyboard. None of them can survive a
  change of screen either, so a panel can never be left sitting over the
  rest of the app.
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
