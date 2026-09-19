# Gharo site — split build

```
index.html               landing page + quick lookup      20 KB   (was 6.4 MB)
dictionary.html          full search / browse-by-letter   11 KB   (was 4.0 MB)
assets/styles.css        stylesheet                      105 KB
assets/bg-page.webp      page background                 197 KB
assets/bg-hero.webp      hero background                 267 KB
assets/gharo-logo.jpg    logo                              8 KB
data/dictionary.json     25,792 entries                  4.1 MB  (1.2 MB over gzip)
```

Upload the whole folder, keeping the `assets/` and `data/` subfolders in place.

## What changed

The word list and the two background photos were embedded inside the HTML, so
every visit downloaded 6.4 MB before anything appeared on screen. Now:

- **The word list is one shared file.** `data/dictionary.json` replaces the two
  separate copies that were inside the pages. Both pages read it.
- **It loads after the page paints.** `index.html` renders immediately, then
  fetches the word list during the browser's idle time (or the moment you focus
  the search box, whichever comes first). The search box shows `loading…` until
  it's ready. `dictionary.html` fetches it on load and enables its input when
  the data arrives.
- **The file is cached.** After the first visit the browser keeps a copy in
  Cache Storage, so later visits and the other page use it instantly.
- **Backgrounds and the logo are real image files**, not base64 inside the CSS,
  so they load in parallel instead of blocking the first paint. They were
  re-encoded at quality 82; the logo was 788px serving a 49px slot and is now
  160px.
- The two pages now link to each other (`Browse all` in the nav, `Back to Gharo
  Project` in the dictionary header).

## One thing to know before deploying

These pages now fetch a file, so they need to be served over http(s).
GitHub Pages is fine. Opening `index.html` by double-clicking it from your
desktop will not work any more — the browser blocks the request. To check
locally:

```
cd gharo-site
python3 -m http.server 8000     # then open http://localhost:8000
```

If the fetch fails, both pages say so on screen rather than showing an empty
dictionary.

## About the Arabic

The two original files disagreed: for 24,579 of the 25,792 entries the Arabic
gloss in `index.html` differed from the one in `dictionary.html` (e.g. for
*aback*, `إلى الوراء , بغتة` vs `إلى الخلف، إلى الوراء`). Rather than pick one,
each entry keeps both:

```json
{"w":"aback","p":"አባክ","o":"adv.","t":"ገጽ-ግ'ረ፡ ገጽ-ሐር","a":"إلى الوراء , بغتة","a2":"إلى الخلف، إلى الوراء"}
```

`a` is what the landing page showed, `a2` what the dictionary page showed, and
both pages still display exactly what they displayed before. Once you decide
which reading is correct, dropping the other field takes the file down by about
600 KB.

Field names are short (`w`ord, `p`ronunciation, part of speech `o`, `t`igre,
`a`rabic) to keep the download small.
