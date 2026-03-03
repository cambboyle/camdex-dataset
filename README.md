CamDex Dataset

This repo will hold the canonical CamDex dataset. It is intentionally separate from the application repo and is a standalone git repo at `git@github.com:cambboyle/camdex-dataset.git`.

Layout (initial):

- `species/` — one file per species (`001.json`, `bulbasaur.json`), minimal fields to start.
- `builds/` — curated competitive builds (later).
- `moves/` — canonical move definitions.
- `schema/` — JSON Schemas and types.
- `scripts/` — validation and transform helpers.

Workflow (brief):

- Work on dataset in this repo. CI will validate changes and publish releases.
- Backend will consume a pinned release and seed Supabase.
