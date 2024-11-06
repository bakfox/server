import chalk from 'chalk';
import readlineSync from 'readline-sync';

let day = 1; // 날자
let dayStack = 1; //아침 점심 오후

let battleEnd = true; // 배틀 상태

let playerGold = 0; // 플레이어 관련
let playerInventory = {
  //플레이어 인벤토리
  0: [0, 0],
  1: [0, 0],
  2: [0, 0],
  3: [0, 0],
  4: [0, 0],
  5: [0, 0],
};

class Dice {
  constructor() {
    this._luck = 0;
    this._str = 0;
    this._dex = 0;
  }
  random() {
    function randomTemp(value) {
      let index = 0; //반복 확인 값
      while (value > 0) {
        let temp = parseInt(Math.random() * value);
        switch (index) {
          case 0:
            this._luck += temp;
            value -= temp;
            break;
          case 1:
            this._str += temp;
            value -= temp;
            break;
          case 2:
            this._dex += value;
            value -= value;
            break;
        }
        index++;
      }
    }
    this._luck = 0;
    this._str = 0;
    this._dex = 0;

    let statsPoint = 0; //스텟 기본값

    if (randomMaker(10)) {
      statsPoint += 15;
      randomTemp.call(this, statsPoint);
    } else {
      statsPoint += 10;
      randomTemp.call(this, statsPoint);
    }
  }
}

class Player {
  constructor() {
    this._hp = 100;
    this._hpPercent = 1;
    this._level = 1;
    this._exp = 0;
    this._levelUp_Exp = 100; //레벨업에 필요한 경험치량
    this._atck = 1;
    this._luck = 0;
    this._str = 0;
    this._dex = 0;
    this._playerSkillPoint = 0; //스킬 포인트
  }
  level_up() {
    this._level++;
    this._playerSkillPoint += 5;
    this._exp = this._exp - this._levelUp_Exp;
    this._hp += parseInt((this._str / 5) * 10 + 10);
    this._atck += parseInt((this._str * 5) / 10 + 1); // 기본 1올라감 힘비례 해서 강해짐
  }
  attack() {
    // 플레이어의 공격
  }
  sellItem() {
    // 아이템 판매
  }
}

class Monster {
  //몬스터 데이터
  constructor() {
    this._hp = 100;
    this._atck = 1;
    this._exp = 40;
    this._firstCheck = true;
  }
  get hp() {
    if (this._firstCheck) {
      this._firstCheck = false;
      this._hp += (this._hp / 10) * day;
    } else return this._hp;
  }
  set hp(value) {
    this._hp = value;
  }
  drop_item() {
    // 몬스터의 아이템 드랍
  }
  attack() {
    // 몬스터의 공격
  }
  die() {
    if (this._hp <= 0) {
    }
  }
}

export async function startGame() {
  console.clear();
  const player = new Player();
  const dice = new Dice();
  await playerStatusDice(dice, player);
  while (day <= 10) {
    console.clear();
    console.log(chalk.green(`\n1. 인벤토리 2. 숲속으로 떠니기 3. 휴식`));
    while (true) {
      // 입력값 받아오기
      const choice = readlineSync.question(`choose_number : `);
      switch (parseInt(choice)) {
      }
    }

    // 스테이지 클리어 및 게임 종료 조건
    console.log(chalk.clear);
    day++;
  }
}

const battle = async (day, player, monster) => {
  let logs = [];

  while (player._hp > 0) {
    console.clear();
    displayStatus(day, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(chalk.green(`\n1. 공격한다 2. 아무것도 하지않는다.`));
    const choice = readlineSync.question('당신의 선택은? ');

    // 플레이어의 선택에 따라 다음 행동 처리
    logs.push(chalk.green(`${choice}를 선택하셨습니다.`));
  }
};
const inventory = async (day, player, monster) => {
  let logs = [];

  while (player._hp > 0) {
    console.clear();
    displayStatus(day, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(chalk.green(`\n1. 공격한다 2. 아무것도 하지않는다.`));
    const choice = readlineSync.question('당신의 선택은? ');

    // 플레이어의 선택에 따라 다음 행동 처리
    logs.push(chalk.green(`${choice}를 선택하셨습니다.`));
  }
};
const camp = async (day, player, monster) => {
  let logs = [];

  while (player.hp > 0) {
    console.clear();
    displayStatus(day, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(chalk.green(`\n1. 공격한다 2. 아무것도 하지않는다.`));
    const choice = readlineSync.question('choose_number : ');
    // 플레이어의 선택에 따라 다음 행동 처리
    logs.push(chalk.green(`${choice}를 선택하셨습니다.`));
  }
};
const playerStatusDice = async (dice, player) => {
  dice.random();
  while (true) {
    console.clear();
    // 입력값 받아오기
    displayFristDice(dice);
    console.log(chalk.green(`\n1.선택 2.다시 `));
    const choice = readlineSync.question(`choose_number : `);
    switch (parseInt(choice)) {
      case 1:
        player._luck = dice._luck;
        player._str = dice._str;
        player._dex = dice._dex;
        return;
      case 2:
        dice.random();
        break;
      default:
        console.log(chalk.green(`다시 입력해주세요.`));
        break;
    }
  }
};
function displayFristDice(dice) {
  console.clear();
  console.log(
    chalk.magentaBright(
      `\n===================== 주사위 를 던져주세요 ====================`,
    ),
  );
  console.log(
    chalk.cyanBright(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣴⣶⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⠿⠟⠛⠉⠁⠈⠙⠿⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⡾⠟⠉⠀⠀⠀⣠⣤⣄⡀⠀⠀⠀⠉⠻⢷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⠿⠛⠁⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠉⠛⠿⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⡾⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⢿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⣶⣄⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣀⣤⣶⠟⠋⠁⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠙⠻⣶⣄⡀⠀⠀⠀
⠀⠀⣀⣤⣶⠿⠛⠉⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣷⠄⠀⠀⠀⠀⠀⣠⣴⣶⣤⡀⠀⠀⠀⠀⠀⣾⣿⣿⣿⡆⠀⠀⠀⠀⠈⠙⠻⣶⣤⡀
⢰⡾⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⡿⠁⠀⠀⠀⠀⠐⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⢿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⣻⡇
⠘⣿⡀⠿⠷⣦⣤⣀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠀⠀⠀⠀⠀⠀⠀⠉⠛⠛⠃⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⢀⣠⣴⡾⠟⠂⢽⡇
⠀⢻⣇⠀⠀⠀⠉⠛⠿⣶⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣶⠟⠋⠁⠀⠀⠀⣺⡇
⠀⠘⣿⡀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠿⢶⣦⣤⣀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⣀⣴⡾⠛⠉⠀⠀⠀⠀⠀⠀⠀⣺⡇
⠀⠀⢻⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⢷⣦⣄⡀⠀⠀⠸⣿⣿⡿⠏⠀⠀⢀⣤⣶⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇
⠀⠀⠘⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⠷⣶⣄⡀⠀⠀⣀⣤⡾⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⣿⠆
⠀⠀⠀⢻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢃⣄⠾⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  ⠀⠀⣿⠁
⠀⠀⠀⠸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⢰⣾⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  ⢨⣿⠀
⠀⠀⠀⠀⢿⡇⠀⠀⠀⠀⠀⠀⠀⢠⣴⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠙⢿⣿⠿⠃⠀⠀⣴⣶⣦⡀⠀⠀⠀⠀⠀⢸⣏⠀
⠀⠀⠀⠀⢸⣷⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⡇⠀⠀⡀⡀⠀⢸⡗⠀
⠀⠀⠀⠀⠀⢿⡆⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠛⠋⠀⠀⣼⣿⣿⡆⢸⡯⠀
⠀⠀⠀⠀⠀⠘⣿⡀⠀⠀⠀⠀⠀⠀⠉⠋⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠿⠟⠁⣸⡿⠀
⠀⠀⠀⠀⠀⠀⢻⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡿⠋⠁⠀
⠀⠀⠀⠀⠀⠀⠈⢿⣶⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢺⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⠟⠉⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⢷⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⠿⠋⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⢷⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢘⣿⠀⠀⠀⠀⠀⠀⠀⢀⣤⡾⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⢷⣤⣀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⢀⣴⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⣶⣄⡀⠀⠀⢸⣿⠀⠀⢀⣠⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣶⣄⣸⣿⣠⣴⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`),
  );
  console.log(
    chalk.magentaBright(`| LUCK : ${dice._luck} `) +
      chalk.magentaBright(`| STR : ${dice._str} `) +
      chalk.magentaBright(`| DEX : ${dice._dex} `),
  );
  console.log(
    chalk.magentaBright(
      `====================================================================\n`,
    ),
  );
}
function displayDefolt(player) {
  console.log(
    chalk.magentaBright(
      `\n===================== 주사위 를 던져주세요 ====================`,
    ),
  );
  console.log(
    chalk.cyanBright(`
      ⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠
      ⢻⡀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⢀⡟
      ⠘⢧⠀⠀⠀⠀⣰⠏⢷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡾⠹⣆⠀⠀⠀⢀⡼⠁
      ⠀⠈⢷⡄⢀⡼⠃⠀⠸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠇⠀⠘⢧⠀⣠⠞⠁⠀
      ⠀⠀⠀⠙⢿⡅⠀⠀⠀⢻⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡟⠀⠀⠀⢸⡿⠉⠀⠀⠀
      ⠀⠀⠀⠀⠈⡧⠀⠀⠀⠀⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡾⠀⠀⠀⠀⢼⠁⠀⠀⠀⠀
      ⠀⠀⠀⠀⣸⠇⠀⠀⠀⠀⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠁⠀⠀⠀⠀⠸⣇⠀⠀⠀⠀
      ⠀⣤⠦⠟⠁⠀⠀⠀⠀⠀⠀⠀⢹⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠏⠀⠀⠀⠀⠀⠀⠀⠈⠳⢦⣤⠀
      ⠀⠈⠻⣄⠀⠀⠀⠀⠀⠉⠳⠲⢾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⡷⠖⠟⠁⠀⠀⠀⠀⠀⣠⠟⠀⠀
      ⠀⠀⠀⠙⣦⠀⠀⠀⠀⠀⠀⠀⠘⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡼⠁⠀⠀⠀⠀⠀⠀⠀⣼⠋⠀⠀⠀
      ⠀⠀⠀⠀⠈⢷⡀⠀⠀⠀⠀⠀⠀⠈⢳⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠁⠀⠀⠀⠀⠀⠀⢀⡾⠁⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠻⣆⡀⠀⠀⠀⠀⠀⣀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡀⠀⠀⠀⠀⠀⢀⣴⠛⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⢀⣻⠄⠀⢰⡾⠚⠉⠀⠀⠀⠀⠀⠀⣀⣀⢀⡀⠀⠀⠀⠀⢀⣀⣄⠀⠀⠀⠙⠓⢶⡆⠀⢐⣯⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠐⢷⣋⠉⠙⢳⡟⠃⠀⠀⠀⠀⠀⣀⣰⠞⠉⠈⠁⠉⠛⣦⣤⠞⢋⣁⠈⢷⡀⠀⠀⠀⠈⠙⣾⠋⠉⣙⡷⠂⠀⠀⠀⠀⠀
      ⠲⢶⠴⣤⣤⣠⣀⣍⣛⣶⢼⡇⠀⠀⠀⢀⡴⠞⢩⡏⠀⠀⠀⠀⠀⠀⠘⣏⠛⠿⣭⣧⠸⣇⠀⠀⠀⠀⢀⡷⣾⣫⣉⣠⣠⣤⡤⡴⡶⠒
      ⠀⠠⣇⠀⠀⠀⢽⠈⠀⠀⠸⡅⠀⠀⠀⠹⢦⣀⣼⡇⠀⠀⠀⠀⠀⠀⠠⣗⣄⡴⢞⣹⠄⣹⠄⠀⠀⠀⢐⡇⠀⠀⢁⡯⠀⠀⠀⢴⠀⠀
      ⠀⠀⣿⠖⠶⣄⢸⡅⠀⠀⠨⡇⠀⠀⠀⠀⠀⠁⠈⣧⠀⣀⠀⠀⠀⠀⢨⣷⡟⣋⣋⣁⡴⠏⠀⠀⠀⠀⢸⡇⠀⠀⢰⡇⢰⠖⠶⣿⠀⠀
      ⠀⠀⢽⠀⠀⢿⣸⡃⠀⠀⢈⡿⠒⠂⠀⠀⠀⠀⠀⣸⠟⠙⠓⠶⠾⡖⢻⣿⣿⠉⠀⠁⠁⠀⠀⠀⠐⠚⢾⡃⠀⠀⢸⡇⡿⠀⢀⡗⠀⠀
      ⠀⠀⢺⠅⠀⠈⠙⢙⡦⠀⠘⠃⠀⠀⠀⠀⠀⠀⣰⠏⠀⠀⠀⠀⠀⠀⠀⠹⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⢘⣧⣄⢴⡋⠋⠁⠀⢐⡇⠀⠀
      ⠀⠀⢸⡇⠀⠀⠀⣸⠃⠀⠀⠀⠀⠀⠀⠀⠀⢰⣾⣷⡶⠶⠆⠛⠙⠛⠛⢻⡁⠀⠀⠀⠀⠀⢀⡴⠛⠚⠞⠥⣾⣝⣦⠀⠀⠀⢸⠇⠀⠀
      ⠀⠀⠈⡧⠀⠀⠀⠋⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⡿⣿⠅⠀⠀⠀⠀⠀⠀⠘⣇⠀⠀⠀⠀⠀⣾⠁⠀⠀⠀⠀⠀⠈⢹⡆⠀⠀⣼⠁⠀⠀
      ⠀⠀⠀⣻⠀⣼⠛⠆⠀⠀⠀⠀⠀⠀⢠⣾⡿⠃⢀⡟⠀⠀⠀⠀⠀⠀⠀⠀⢹⡄⠀⠀⠀⠀⠈⢧⣀⣠⣀⣀⣀⡀⣸⠟⣧⠀⡯⠀⠀⠀
      ⠀⠀⠀⠸⠅⠗⠀⠀⠀⠀⠀⠀⠀⠐⠿⠋⠀⠀⣼⠃⠀⠀⢀⣠⠴⣤⡀⠀⠀⠹⢦⡀⠀⠀⠀⠀⠉⠈⣽⣹⠉⠉⠉⠀⠺⠨⠇⠀⠀⠀
      ⠀⠀⠀⢰⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣇⣀⣠⣰⠞⠁⠀⠀⠀⢹⣶⣾⣿⠁⠀⠀⠀⠀⠀⠀⠈⠋⠀⠀⠀⠀⠀⢸⡆⠀⠀⠀
      ⠀⠀⣠⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣯⠀⠀⠀⠀⢠⣾⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢷⣄⠀⠀
`),
  );
  console.log(
    chalk.magentaBright(`| 날짜 : ${day} `) +
      chalk.magentaBright(`| 시간 :`) +
      chalk.magentaBright(`| 플레이어 소지금 : ${playerGold} : G `),
  );
  console.log(
    chalk.magentaBright(
      `====================================================================\n`,
    ),
  );
}
function displayBattle(day, player) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${day} `) +
      chalk.blueBright(`| 플레이어 정보 :`) +
      chalk.redBright(`| 몬스터 정보 |`),
  );
  console.log(chalk.magentaBright(`=====================\n`));
}
function displayAdventure(day, player) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${day} `) +
      chalk.blueBright(`| 플레이어 정보 :`) +
      chalk.redBright(`| 몬스터 정보 |`),
  );
  console.log(chalk.magentaBright(`=====================\n`));
}
function displayinventory(day, player) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${day} `) +
      chalk.blueBright(`| 플레이어 정보 :`) +
      chalk.redBright(`| 몬스터 정보 |`),
  );
  console.log(chalk.magentaBright(`=====================\n`));
}

const randomMaker = function (sucess) {
  //성공시 true 로 반환
  if (parseInt(Math.random() * 100) <= sucess - 1) {
    return true;
  } else {
    return false;
  }
};
