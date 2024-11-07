import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Dice {
  constructor() {
    this._luck = 0;
    this._str = 0;
    this._dex = 0;
  }
  random() {
    function randomTemp(value) {
      let index = 0; //반복 확인 값
      console.log(value);
      while (value > 0) {
        console.log('어어' + value);
        let temp = parseInt(Math.random() * value);
        switch (index) {
          case 0:
            this._luck += temp;
            value -= temp;
            console.log('성공함' + value);
            console.log(this._luck + '럭 값');
            break;
          case 1:
            this._str += temp;
            value -= temp;
            console.log('성공함' + value);
            break;
          case 2:
            this._dex += value;
            value -= value;
            console.log('성공함' + value);
            break;
        }
        index++;
      }
    }
    console.log(this._luck + '럭 값');
    this._luck = 0;
    this._str = 0;
    this._dex = 0;
    console.log(this._luck + '럭 값');
    let statsPoint = 0; //스텟 기본값
    console.log(statsPoint + '럭 값');
    if (randomMaker(10)) {
      statsPoint += 15;
      console.log('성공함' + statsPoint);
      randomTemp.call(this, statsPoint);
    } else {
      statsPoint += 10;
      console.log('실패함' + statsPoint);
      randomTemp.call(this, statsPoint);
    }
  }
}
const randomMaker = function (sucess) {
  let i = parseInt(Math.random() * 100);
  //성공시 true 로 반환
  if (i <= sucess - 1) {
    console.log(i);
    return true;
  } else {
    console.log(i);
    return false;
  }
};
const playerStatusDice = async (dice) => {
  dice.random();
  while (true) {
    // 입력값 받아오기
    console.log(
      chalk.magentaBright(`| LUCK : ${dice._luck} `) +
        chalk.magentaBright(`| STR : ${dice._str} `) +
        chalk.magentaBright(`| DEX : ${dice._dex} `),
    );
    console.log(chalk.green(`\n1.선택 2.다시 `));
    const choice = readlineSync.question(`choose_number : `);
    switch (choice) {
      case 1:
        console.log(chalk.green(`안녕`));
        console.log('1선택');
        return;
      case 2:
        dice.random();
        console.log(chalk.green(`다시`));
        break;
      default:
        console.log(chalk.green(`다시 입력해주세요.`));
        break;
    }
  }
};
const dice = new Dice();
playerStatusDice(dice);
