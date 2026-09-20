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
python3 -m http.server 8000     # then open http://localhost:8000
```

## Editing the dictionary

Add or edit entries in `data/dictionary.json`. Each entry looks like:

```json
{"w":"aback","p":"አባክ","o":"adv.","t":"ገጽ-ግ'ረ፡ ገጽ-ሐር","a":"إلى الوراء , بغتة"}
```

Field names are short (`w`ord, `p`ronunciation, part of speech `o`, `t`igre,
`a`rabic) to keep the download small.
