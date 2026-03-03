#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const schemaPath = path.resolve(__dirname, '../schema/species.schema.json');
if (!fs.existsSync(schemaPath)) {
  console.error('species.schema.json not found in schema/');
  process.exit(1);
}
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

function validateFolder(folder) {
  const files = fs.readdirSync(folder).filter((f) => f.endsWith('.json'));
  let failed = 0;
  for (const f of files) {
    const p = path.join(folder, f);
    const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
    const ok = validate(data);
    if (!ok) {
      failed++;
      console.error(`Validation failed for ${p}:`);
      console.error(validate.errors);
    }
  }
  return failed;
}

const speciesDir = path.resolve(__dirname, '../data/pokemon');
if (!fs.existsSync(speciesDir)) {
  console.error('data/pokemon not found — is the data folder populated?');
  process.exit(1);
}

const failures = validateFolder(speciesDir);
if (failures) {
  console.error(`${failures} files failed validation`);
  process.exit(2);
}

console.log('All species valid (basic schema)');
