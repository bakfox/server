//const db = await JSONFilePreset('db.json', defaultData);

//쓰는법
/*const { posts } = db.data;
const first = posts.at(0);
//const results = posts.filter((post) => post.title.includes('lowdb'));
const post1 = posts.find((post) => post.id === 1);
const sortedPosts = posts.toSorted((a, b) => a.views - b.views);
//await db.update(({ posts }) => posts.push(first));

//업데이트

await db.update(({ posts }) => posts.push('hello world'));
db.data.posts.push('hello world');
await db.write();*/

import { Low } from 'lowdb';
import { JSONFile, JSONFilePreset } from 'lowdb/node';

import fs from 'fs';

let max_Object = {
  luck_Max: 0,
  stage_Max: 0,
  gold_Max: 0,
  dex_Max: 0,
  monsterKiller_Max: 0,
};
//const db = new Low(new JSONFile('file.json'), max_Object);
const db = fs.existsSync('./file.json')
  ? await JSONFilePreset('file.json', {})
  : new Low(new JSONFile('file.json'), {});

console.log(fs.existsSync('./file.json'));

async function return_save_file() {
  fs.existsSync('./file.json') == true ? 0 : makeFile();
}
function readFile() {
  db.read();
}
function makeFile() {
  db.data = max_Object;
  db.write();
}

const checkMonsterKiller_max = async () => {
  await db.read();
  db.data.monsterKiller_Max++;
  await db.write();
};
return_save_file();
checkMonsterKiller_max();
console.log(db.data.monsterKiller_Max);
