//let arr = [0, 5, 6, 7, 8, 5];
/* 링크드 리스트 

poop(){
  const getNode = ()=>{
    let re_Head = this.head;
    this.head = this.nextHead;
    return re_Head;
  }
  const node_Temp =  this.head != null?  getNode() :  null;
  return node_Temp;
}
// C#과 다르게 스텍과 큐를 직접 구현해햐는게 신기했습니다. 
//버블 정렬 
시간 복잡도가 O(N^2)이다.
*/
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  // 큐스텍
  constructor() {
    this.head = null; // 처음 들어간거
    this.tail = null; // 꼬리의 꼬리를 물기
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode; // 처음이니까 어짜피 마지막과 끝은 자기자신
    } else {
      this.tail.next = newNode;
      this.tail = newNode; //아니면 새로운걸로 채워주기
    }
  }

  dequeue() {
    if (this.head === null) {
      // 머리가 널이면 빈 큐
      return null;
    }
    const deleteHead = this.head; //아니면 해드 받아오고
    this.head = this.head.next; // ?

    return deleteHead.value;
  }
}
//
const selectionSort = (value) => {
  let temp = value;
  let temp_1 = 0;
  let check_2 = 0;
  for (let i = 0; i < temp.length; i++) {
    let min = temp[i];
    check_2 = i;
    for (let j = i; j < temp.length; j++) {
      if (min > temp[j]) {
        min = temp[j];
      }
    }
    temp_1 = temp[i];
    temp[i] = min;
    value[check_2] = temp_1;
  }
  return temp;
};
/*function solution(left, right) {
  let answer = 0;

  for (let i = left; i <= right; i++) {
    let divisorCount = 0;

    for (let j = 1; j * j <= i; j++) {
      if (i % j === 0) {
        divisorCount++; // j는 약수
        if (j !== i / j) divisorCount++; // i/j도 약수이지만, 중복을 피함
      }
    }

    // 약수의 개수가 짝수면 더하고, 홀수면 뺌
    answer += divisorCount % 2 === 0 ? i : -i;
  }

  return answer;
}*/
//console.log(selectionSort([0, 2, 5, 74, 45, 6]));
function solution(s) {
  var answer = '';
  let new_temp = [...s];
  new_temp.sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  });
  return new_temp.join('');
}
console.log(solution('affaafafasf'));
