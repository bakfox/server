import chalk from 'chalk';
import Trophy from './trophy.js';
import { main_menu } from './server.js';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import fs from 'fs';

import { Low } from 'lowdb';
import { JSONFile, JSONFilePreset } from 'lowdb/node';

const db = fs.existsSync('./file.json')
  ? await JSONFilePreset('file.json', {})
  : new Low(new JSONFile('file.json'), {});

let max_Object = {
  luck_Max: 0,
  stage_Max: 0,
  gold_Max: 0,
  dex_Max: 0,
  monsterKiller_Max: 0,
};
//진행도 체크용도
let luck_Progress = 0;
let stage_Progress = 0;
let gold_Progress = 0;
let dex_Progress = 0;
let monsterKiller_Progress = 0;

let achievement_Object = {
  luck_Max: 0,
  stage_Max: 0,
  gold_Max: 0,
  dex_Max: 0,
  monsterKiller_Max: 0,

  luck_Challenge: [20, 50, 100],
  stage_Challenge: [1, 2, 3],
  gold_Challenge: [1000, 10000, 100000],
  dex_Challenge: [20, 50, 100],
  monsterKiller_Challenge: [10, 100, 1000],

  default_Explanation: [' 당신의 여정을 응원합니다. '],
  luck_Explanation: [
    ' 당신의 여정에 행운이 있기를 ',
    ' 당신이 머무는 곳에 행운이 있길. ',
    ' 당신의 뜻대로 이루어지길. ',
  ],
  stage_Explanation: [
    ' 당신은 이제 여정을 시작하셨습니다. 그 여정이 즐거우시기를..  ',
    ' 당신은 절반 정도 도착했습니다. 지금까지 여정은 즐거우셨기를.. ',
    ' 당신의 여정은 여기까지입니다. 헤어짐이 있어야 만남이 있죠. 앞으로의 여정도 즐거우셨기를.. ',
  ],
  gold_Explanation: [
    ' 시작이 순조롭군요..   ',
    ' 여기까지 온 것도 대단한 겁니다. ',
    ' 당신은 정말 대단한 수집가시군요. ',
  ],
  dex_Explanation: [
    ' 당신은 아주 민첩합니다.   ',
    ' 누구도 당신을 따라올 수 없습니다. ',
    ' 당신은 바람보다 빠릅니다. ',
  ],
  monsterKiller_Explanation: [
    ' 당신은 견습 모험가 수준의 강함을 지니고 있습니다.   ',
    ' 당신은 베테랑 모험가 정도의 수준을 지니고 있습니다. ',
    ' 당신은 전설적인 모험가입니다. ',
  ],
};

export async function achievement() {
  achievementFirstSetting();
  const trophy = new Trophy();
  console.clear();
  console.log(
    chalk.yellowBright(
      `\n============= - ========================= |- 업적 -| ======================== - =============`,
    ),
  );

  luck_Check(trophy, luck_Progress);
  stage_Check(trophy, stage_Progress);
  gold_Check(trophy, gold_Progress);
  dex_Check(trophy, dex_Progress);
  monsterKiller_Check(trophy, monsterKiller_Progress);
  console.log(
    chalk.yellowBright(
      `========================= -  === 플레이 해주셔서 감사합니다. === - ========================\n`,
    ),
  );
  console.log(chalk.green(`\n1. 메인메뉴로 돌아기기 `));
  const choice = readlineSync.question(`choose_number : `);
  if (parseInt(choice) === 1) {
    return_menu();
  } else {
    achievement();
  }
}
const luck_Check = (trophy, value) => {
  console.log(
    chalk.blueBright(
      ` Luck ======================== ======================== ======================== ========================`,
    ),
  );
  console.log(
    chalk.yellow(`${value <= 0 ? trophy.defolt() : trophy.luck(value)}`) +
      chalk.blue(
        `| LUCK 진척도 : ${achievement_Object.luck_Max} | ${
          value <= 0
            ? achievement_Object.default_Explanation[0]
            : achievement_Object.luck_Explanation[value - 1]
        } | 다음 목표량 : ${
          achievement_Object.luck_Challenge[value < 3 ? value + 1 : 3]
        } |`,
      ),
  );
  console.log(
    chalk.blue(
      ` Luck ======================== ======================== ======================== ========================`,
    ),
  );
};
const stage_Check = (trophy, value) => {
  console.log(
    chalk.blue(
      ` STAGE ======================== ======================== ======================== ========================`,
    ),
  );
  console.log(
    chalk.yellow(`${value <= 0 ? trophy.defolt() : trophy.stage(value)}`) +
      chalk.blue(
        `| STAGE 진척도 : ${achievement_Object.stage_Max} | ${
          value <= 0
            ? achievement_Object.default_Explanation[0]
            : achievement_Object.stage_Explanation[value - 1]
        } | 다음 목표량 : ${
          achievement_Object.stage_Challenge[value < 3 ? value : 3]
        } |`,
      ),
  );
  console.log(
    chalk.blue(
      ` STAGE ======================== ======================== ======================== ========================`,
    ),
  );
};
const gold_Check = (trophy, value) => {
  console.log(
    chalk.blue(
      ` GOLD ======================== ======================== ======================== ========================`,
    ),
  );
  console.log(
    chalk.yellow(`${value <= 0 ? trophy.defolt() : trophy.gold(value)}`) +
      chalk.blue(
        `| GOLD 진척도 : ${achievement_Object.gold_Max} | ${
          value <= 0
            ? achievement_Object.default_Explanation[0]
            : achievement_Object.gold_Explanation[value - 1]
        } | 다음 목표량 : ${
          achievement_Object.gold_Challenge[value < 3 ? value : 3]
        } |`,
      ),
  );
  console.log(
    chalk.blue(
      ` GOLD ======================== ======================== ======================== ========================`,
    ),
  );
};
const dex_Check = (trophy, value) => {
  console.log(
    chalk.blue(
      ` DEX ======================== ======================== ======================== ========================`,
    ),
  );
  console.log(
    chalk.yellow(`${value <= 0 ? trophy.defolt() : trophy.dex(value)}`) +
      chalk.blue(
        `| DEX 진척도 : ${achievement_Object.dex_Max} | ${
          value <= 0
            ? achievement_Object.default_Explanation[0]
            : achievement_Object.dex_Explanation[value - 1]
        } | 다음 목표량 : ${
          achievement_Object.dex_Challenge[value < 3 ? value : 3]
        } |`,
      ),
  );
  console.log(
    chalk.blue(
      ` DEX ======================== ======================== ======================== ========================`,
    ),
  );
};
const monsterKiller_Check = (trophy, value) => {
  console.log(
    chalk.blue(
      ` MOSTER ======================== ======================== ======================== ========================`,
    ),
  );
  console.log(
    chalk.yellow(
      `${value <= 0 ? trophy.defolt() : trophy.monsterKiller(value)}`,
    ) +
      chalk.blue(
        `| MOSTER 진척도 : ${achievement_Object.monsterKiller_Max} | ${
          value <= 0
            ? achievement_Object.default_Explanation[0]
            : achievement_Object.monsterKiller_Explanation[value - 1]
        } | 다음 목표량 : ${
          achievement_Object.monsterKiller_Challenge[value < 3 ? value : 3]
        } |`,
      ),
  );
  console.log(
    chalk.blue(
      ` MOSTER ======================== ======================== ======================== ========================`,
    ),
  );
};
const return_menu = () => {
  main_menu();
};
const achievementFirstSetting = () => {
  readFile();
  //업적 체크용도
  achievement_Object.luck_Max = db.data.luck_Max;
  achievement_Object.dex_Max = db.data.dex_Max;
  achievement_Object.gold_Max = db.data.gold_Max;
  achievement_Object.monsterKiller_Max = db.data.monsterKiller_Max;
  achievement_Object.stage_Max = db.data.stage_Max;
  for (let i = 0; i < achievement_Object.luck_Challenge.length; i++) {
    if (achievement_Object.luck_Challenge[i] < achievement_Object.luck_Max) {
      luck_Progress++;
    }
  }
  for (let i = 0; i < achievement_Object.dex_Challenge.length; i++) {
    if (achievement_Object.dex_Challenge[i] < achievement_Object.dex_Max) {
      dex_Progress++;
    }
  }
  for (let i = 0; i < achievement_Object.stage_Challenge.length; i++) {
    if (achievement_Object.stage_Challenge[i] < achievement_Object.stage_Max) {
      stage_Progress++;
    }
  }
  for (let i = 0; i < achievement_Object.monsterKiller_Challenge.length; i++) {
    if (
      achievement_Object.monsterKiller_Challenge[i] <
      achievement_Object.monsterKiller_Max
    ) {
      monsterKiller_Progress++;
    }
  }
  for (let i = 0; i < achievement_Object.gold_Challenge.length; i++) {
    if (achievement_Object.gold_Challenge[i] < achievement_Object.gold_Max) {
      gold_Progress++;
    }
  }
};

//처음 파일 체크용도
export async function return_save_file() {
  fs.existsSync('./file.json') == true ? 0 : makeFile();
}
async function readFile() {
  await db.read();
}
async function makeFile() {
  db.data = max_Object;
  await db.write();
}
