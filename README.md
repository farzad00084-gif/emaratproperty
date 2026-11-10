# Kabul Property Finder

A property finder for Kabul. Homes are organized by the city's 22 numbered districts. Monthly rent, total sale prices, and gerawi advances are shown plainly on every listing. Publishers write a listing, check it, and submit it for review. Buyers contact the owner through in-site chat or WhatsApp, whichever the publisher chose.

## Demo tour

- **240 demo listings** across all 22 districts, with a mix of published, pending, draft, returned, and closed records.
- **Two-way in-site chat**: buyers send an inquiry from a listing; publishers reply from the listing dialog or from **Messages** in the dashboard.
- **Individual and agency accounts**: choose a personal or agency account at signup. Agency accounts add an agency name, contact person, and license number.
- **Budget search**: filter by minimum and maximum AFN price. Listings can be rent, sale, or **gerawi**.
- **Light editorial theme** by default; the header toggle restores the raven-black, powder-blue, and poppy-red dark palette.
- **English, Dari, and Pashto** interface languages, with right-to-left layout for Dari and Pashto.

All demo publisher passwords are `password123`.

## Run locally

Open `index.html` in a browser. No build step is required.

Files:
- `index.html`: page shell, fonts, header and footer
- `styles.css`: the full visual system
- `app.js`: routing, listings, publisher account, editor, preview, and moderation
- `favicon.svg`: current brand mark (replace with the final logo)
- `images/fallback.svg`: shown when a photo cannot load

## Moderation

Open **Moderation** in the footer and enter the prototype passcode `kabul-admin`. The desk shows the review queue, live listings, and returned listings.

- **Approve** sets the listing to `Published`, updates its date, and clears any moderator note. It appears on the home page, the listings grid, and its detail page immediately.
- **Return** asks for a short note, sets the listing to `Returned`, and shows that note on the publisher's dashboard. The publisher can revise and resubmit.
- **Take down** returns a live listing to the publisher with a note and removes it from public pages.
- **Lock desk** clears the unlocked session.

The passcode is stored in `app.js` and remembered in `sessionStorage` for the current tab. This is a demo gate for a browser-only build, not real security.

## Contact methods

Every listing has a **Contact the owner** card on its public page. The publisher picks the method in the editor:

- **In-site chat**: the button opens a message dialog. The inquiry is saved on the listing and appears under **Messages** on the publisher's dashboard.
- **WhatsApp**: the button opens `wa.me` with a ready-to-send message. The publisher's number is used only for that link and is not printed on the page.

Exact addresses stay private on public listings.

## Before launch

- Set `CONTACT_EMAIL` in `app.js` to the real inbox.
- Replace `ADMIN_CODE` and move moderation behind real authentication and a server.
- Replace the favicon and logo with the final brand files.
- Replace the demo photography in `images/` with final licensed assets and record the photographer/source attribution.

## Current limits

Accounts, listings, drafts, inquiries, and moderation state are stored in the browser's local storage on one device. There is no server, no secure sign-in, and no shared data. In-site messages are visible only in the publisher's dashboard on that device. The moderation desk is a functional prototype on top of that local data. Contact messages open the visitor's email app.
