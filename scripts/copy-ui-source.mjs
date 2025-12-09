import { cpSync, rmSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const sourceDir = join(rootDir, 'node_modules/@povio/ui/dist');
const destDir = join(rootDir, '.povio-ui-source');

// Remove existing copy if it exists
if (existsSync(destDir)) {
  rmSync(destDir, { recursive: true });
}

// Copy the source
cpSync(sourceDir, destDir, { recursive: true });

console.log('✓ Copied @povio/ui source to .povio-ui-source');

