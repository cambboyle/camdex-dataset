#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('./data/pokemon');
const outDir = path.resolve('./out');
const outFile = path.join(outDir, 'species.jsonl');

if (!fs.existsSync(dataDir)) {
  console.error('data/pokemon not found');
  process.exit(1);
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json'));
let written = 0;
for (const f of files) {
  const p = path.join(dataDir, f);
  try {
    const raw = fs.readFileSync(p, 'utf8');
    const src = JSON.parse(raw);
    const doc = {
      id: src.id,
      name: src.name || (src.names && src.names.eng) || null,
      types: [src.type1].concat(src.type2 ? [src.type2] : []).filter(Boolean),
      baseStats: {
        hp: src.baseHp || null,
        atk: src.baseAtk || null,
        def: src.baseDef || null,
        spa: src.baseSpAtk || null,
        spd: src.baseSpDef || null,
        spe: src.baseSpeed || null,
      },
      sprites: src.sprites || null,
      forms: src.forms || [],
      moves: src.moves || [],
      provenance: {
        source: 'pokepc-snapshot',
        upstreamTag: null,
        importedAt: new Date().toISOString(),
        license: 'MIT',
      },
    };
    fs.appendFileSync(outFile, JSON.stringify(doc) + '\n');
    written++;
  } catch (err) {
    console.error('failed to transform', p, err.message);
  }
}

console.log(`Wrote ${written} species to ${outFile}`);
