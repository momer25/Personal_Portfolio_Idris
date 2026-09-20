# Gharo Project — English–Tigre–Arabic Dictionary

```
index.html            single-page app (dictionary + books + about)
data/dictionary.json  25,792+ word entries, fetched at runtime
assets/               book cover images
CNAME                 gharo-tigre-english-dictionary.com
```

`index.html` renders immediately, then fetches `data/dictionary.json` and
caches it in the browser's Cache Storage so later visits load instantly.
Everything else (styling, logo, favicon) is embedded directly in
`index.html`.

## Running locally

The page fetches a file, so it needs to be served over http(s) — opening
`index.html` by double-clicking it will not work.

```
python -m http.server 8000     # then open http://localhost:8000
```

On Windows, `python3` is often a Microsoft Store alias that does nothing until
Python is installed from the Store — use `python` instead if `python3` prints
an install prompt. Alternatively, any static file server works, e.g.
`npx serve .` or `npx http-server .`.

**In VS Code:** the "Launch Chrome against localhost" debug config (F5) only
opens a browser tab at `http://localhost:8080` — it does not start a server by
itself. It has a `preLaunchTask` wired up (`.vscode/tasks.json`) that runs
`python -m http.server 8080` automatically first, so pressing F5 should just
work. If Chrome still shows "refused to connect", check the integrated
terminal for a task that failed to start (usually because `python` isn't on
PATH) and run the command from it manually.

## Editing the dictionary

Add or edit entries in `data/dictionary.json`. Each entry looks like:

```json
{"w":"aback","p":"አባክ","o":"adv.","t":"ገጽ-ግ'ረ፡ ገጽ-ሐር","a":"إلى الوراء , بغتة"}
```

Field names are short (`w`ord, `p`ronunciation, part of speech `o`, `t`igre,
`a`rabic) to keep the download small.
