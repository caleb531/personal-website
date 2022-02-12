import fs from 'fs';
import { glob } from 'glob-promise';
import matter from 'gray-matter';
import path from 'path';
import { Entry } from '../components/types';

export function getEntriesOfType(entryType: string): Entry[] {
  const entryDirectory = path.join(process.cwd(), 'src', entryType);
  const entryPaths = glob.sync(`${entryDirectory}/*.md`);
  return entryPaths.map((entryPath) => {
    return {
      id: path.basename(entryPath, '.md'),
      ...matter(fs.readFileSync(entryPath)).data
    } as Entry;
  });
}
