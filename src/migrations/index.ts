import * as migration_20261025_165554_initial from './20261025_165554_initial';
import * as migration_20261025_170000_seed_content from './20261025_170000_seed_content';

export const migrations = [
  {
    up: migration_20261025_165554_initial.up,
    down: migration_20261025_165554_initial.down,
    name: '20261025_165554_initial'
  },
  {
    up: migration_20261025_170000_seed_content.up,
    down: migration_20261025_170000_seed_content.down,
    name: '20261025_170000_seed_content'
  },
];
