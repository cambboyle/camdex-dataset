#!/usr/bin/env node
// Helper used by CI to run validation and produce a simple report exit code
import { execSync } from 'child_process';
import path from 'path';

const cwd = path.resolve(process.cwd());
try {
  execSync('node ./scripts/validate.js', { stdio: 'inherit', cwd });
  process.exit(0);
} catch (err) {
  console.error('Validation failed');
  process.exit(2);
}
