class Recipe {
  constructor() {
    this.luckPotion = {
      needItem: [1, 2],
      needItem_Value: [2, 5],
      item_Str: '행운 물약 섭취시 즉시 럭 1~5 증가 대성공시 3~7 증가',
    };
    this.dexPotion = {
      needItem: [5],
      needItem_Value: [2],
      item_Str: '민첩 물약 섭취시 즉시 민첩 1~5 증가 대성공시 3~7 증가',
    };
    this.hpPotion = {
      needItem: [6, 7],
      needItem_Value: [4, 4],
      item_Str:
        '최대체력 증가 물약 섭취시 즉시 럭 100~1000 증가 대성공시 200~1200 증가',
    };
    this.atckPotion = {
      needItem: [2],
      needItem_Value: [10],
      item_Str:
        '공격력 증가 물약 섭취시 즉시 공격력 1~10 증가 대성공시 10~20 증가',
    };
  }
  luckPotion_Check(itemID, itemValue) {
    if (
      this.luckPotion.needItem[0] === itemID[0] &&
      this.luckPotion.needItem[1] === itemID[1]
    ) {
      if (
        this.luckPotion.needItem_Value[0] >= itemValue[0] &&
        this.luckPotion.needItem_Value[1] >= itemValue[1]
      ) {
        return true;
      }
    }
    return false;
  }
  dexPotion_Check(itemID, itemValue) {
    if (this.dexPotion.needItem[0] === itemID[0]) {
      if (this.dexPotion.needItem_Value[0] >= itemValue[0]) {
        return true;
      }
    }
    return false;
  }
  hpPotion_Check(itemID, itemValue) {
    if (
      this.hpPotion.needItem[0] === itemID[0] &&
      this.hpPotion.needItem[1] === itemID[1]
    ) {
      if (
        this.hpPotion.needItem_Value[0] >= itemValue[0] &&
        this.hpPotion.needItem_Value[1] >= itemValue[1]
      ) {
        return true;
      }
    }
    return false;
  }
  atckPotion_Check(itemID, itemValue) {
    if (
      this.atckPotion.needItem[0] === itemID[0] &&
      this.atckPotion.needItem[1] === itemID[1]
    ) {
      if (
        this.atckPotion.needItem_Value[0] >= itemValue[0] &&
        this.atckPotion.needItem_Value[1] >= itemValue[1]
      ) {
        return true;
      }
    }
    return false;
  }
}

export default Recipe; // 기본 export
