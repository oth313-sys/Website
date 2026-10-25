import * as migration_20261025_165554_initial from './20261025_165554_initial';
import * as migration_20261025_170000_seed_content from './20261025_170000_seed_content';
import * as migration_20261025_200000_remove_old_cms_tables from './20261025_200000_remove_old_cms_tables';
import * as migration_20261025_213032_instagram_feed from './20261025_213032_instagram_feed';

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
  {
    up: migration_20261025_200000_remove_old_cms_tables.up,
    down: migration_20261025_200000_remove_old_cms_tables.down,
    name: '20261025_200000_remove_old_cms_tables'
  },
  {
    up: migration_20261025_213032_instagram_feed.up,
    down: migration_20261025_213032_instagram_feed.down,
    name: '20261025_213032_instagram_feed'
  },
];
