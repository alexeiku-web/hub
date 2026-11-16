# Hub: how to update it

Alexei's personal dashboard, served by GitHub Pages from the default branch root. He tells Claude an update in conversation; Claude edits `data.json` and pushes.

## Rules
- The repo and site are PUBLIC. Never put colleague or family names, work details, money or health items in `data.json` or anywhere else in the repo. Give those to him as a paste block for the app's "Paste an update from Claude" box: `{"todos":[{"cat":"General","text":"..."}],"checklists":{"tvc":["..."]},"lists":[{"list":"books","title":"...","by":"..."}]}`.
- Never change the `id` of an existing item: ticks on his phone are keyed by id. New items get new unique ids.
- Set `updated` to today's date on every content change.
- No due dates on cards. Order projects with `urgency` (1 is most urgent). The workout tile is always pinned first by the app.
- Quiet projects move from `projects` to `other` (name plus a one-line note). "Bring X back" moves it the other way.
- In `think`, mark Claude's own suggestions `"by":"claude"` and his notes `"by":"me"`.
- Plain text only in `data.json`; the app does not render HTML or markdown.

## data.json shape
- `habits`: `{id,label,days:[0-6, Sunday is 0],period:"day"|"week",hideWhenDone}`
- `projects`: `{id,name,urgency,status,next:[{id,text}],think:[{by,text}],refs:[{title,body:[...]}|{title,url}],checklist:true?}`
- `todoCats`, `todos`: `{id,cat,text}`
- `other`: `{name,note}`
- `lists`: `{id,name,items:[{id,title,by?,note?}]}` with ids `books`, `films`, `kidfilms`

## Checking a change
Serve the folder (`python3 -m http.server`) and open it; `?date=YYYY-MM-DD` previews another day. Bump `VERSION` in `sw.js` only when `index.html` changes in a way that must replace cached copies.
