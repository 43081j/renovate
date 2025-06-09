import * as replacements from 'module-replacements';
import { updateJsonFile } from './utils.mjs';

/** @typedef {import('../../lib/config/types.js').PackageRule} PackageRule */

await (async () => {
  console.log('Generating e18e replacements');
  /** @type {PackageRule[]} */
  const packageRules = [];

  for (const replacement of replacements.nativeReplacements.moduleReplacements) {
    if (replacement.type === 'native') {
      packageRules.push({
        description: `\`${replacement.moduleName}\` should be replaced with the native \`${replacement.replacement}\``,
        matchCurrentVersion: '*',
        matchDatasources: ['npm'],
        matchPackageNames: [replacement.moduleName],
        replacementName: 'TBD',
        replacementVersion: '0.0.0'
      });
    }
  }
  await updateJsonFile('./lib/data/e18e-replacements.json', JSON.stringify({
    $schema: '../../tools/schemas/replacements-schema.json',
    e18e: {
      packageRules
    }
  }, null, 2));
})();
