# Hub: how to update it

Alexei's personal dashboard, served by GitHub Pages from the default branch root. He tells Claude an update in conversation; Claude edits `data.json` and pushes.

## Rules
- The repo and site are PUBLIC, and Alexei has accepted that (Nov 16 2026): his to-dos, work checklist and project notes go in `data.json` so they update automatically. Still keep out anything that would do real harm if public: account or ID numbers, passwords, addresses, health details, and anything about other people beyond a first name in a to-do. If an item seems too sensitive, say so and offer the app's "Paste an update from Claude" box instead: `{"todos":[{"cat":"General","text":"..."}],"checklists":{"tvc":["..."]},"lists":[{"list":"books","title":"...","by":"..."}]}`.
- Project checklists (the Vancouver Clinic card) are `todos` entries with `cat` set to `p:<project id>`, for example `p:tvc`.
- Never change the `id` of an existing item: ticks on his phone are keyed by id. New items get new unique ids.
- Set `updated` to today's date on every content change.
- No due dates on cards. Order projects with `urgency` (1 is most urgent). The workout tile is always pinned first by the app.
- Quiet projects move from `projects` to `other` (name plus a one-line note). "Bring X back" moves it the other way.
- In `think`, mark Claude's own suggestions `"by":"claude"` and his notes `"by":"me"`.
- Plain text only in `data.json`; the app does not render HTML or markdown.

## data.json shape
- `mantras`: `{id,text,by?}` daily mantras or quotes. The front page shows one under the title and moves to the next each day, in order, looping. Add new ones to the end.
- `habits`: `{id,label,days:[0-6, Sunday is 0],period:"day"|"week",hideWhenDone}`
- `projects`: `{id,name,urgency,status,next:[{id,text}],think:[{by,text}],refs:[{title,body:[...]}|{title,url}],checklist:true?}`
- `projects[].until` (optional): `"YYYY-MM-DD"` last day the card shows on the front page; after that date the app hides it. Remove the project and its `p:<id>` todos from `data.json` once it has passed.
- `projects[].links` (optional): `[{title,items:[{title,url,note?}]}]` each group shows as its own headed card of links on the project page, above Reference (for example "Keezer setup items" on cider).
- `todoCats`, `todos`: `{id,cat,text}`
- `dated`: `{id,date:"YYYY-MM-DD",text}` one-off tasks that appear in the Today area on their date and carry over until ticked. Remove old ones once their date is well past.
- `other`: `{name,note}`
- `lists`: `{id,name,items:[{id,title,by?,note?}]}` with ids `books`, `films`, `kidfilms`

## Checking a change
Serve the folder (`python3 -m http.server`) and open it; `?date=YYYY-MM-DD` previews another day. Bump `VERSION` in `sw.js` only when `index.html` changes in a way that must replace cached copies.

## Workout schedule
The 8-week plan, the trip-prep phase after week 8 (two rope days, one board day) and the 7-day taper before the trip are built into `index.html` (`DAYS`, `PREP`, `TAPER`). The start date and trip date are set by Alexei in the app and stored on his phone, not in this repo.
