/* -------------------------------------------------------------------------- */
/*        문제 1. 객체에서 특정 키의 값을 안전하게 가져오는 함수를 작성하세요.     */
/* -------------------------------------------------------------------------- */

function getValueAtObject(obj, key) {
  for(let keyValue of Object.entries(obj)){
    let keys = keyValue[0];
    let values = keyValue[1];
    if(keys === key){
      return values;
    }
  }

  //for문 안에 작성 시 첫번째 키만 확인되고 다른 키랑은 비교를 못하고 바로 에러를 발생시키므로 밖에다 작성해야 함
  throw new Error(`입력한 ${key}는 해당 객체에 들어있는 키가 아닙니다.`); 
  
}

const person = {
  name: '홍길동',
  age: 25,
  city: 'Seoul',
  job: "soccer player",
  isMarried : false,
};


// console.log(getValueAtObject(person, 'name'));
// console.log(getValueAtObject(person, 'age'));  
// console.log(getValueAtObject(person, 'city'));
// console.log(getValueAtObject(person, 'job'));  
// console.log(getValueAtObject(person, 'isMarried'));
// console.log(getValueAtObject(person, 'country'));
// console.log(getValueAtObject(person, 'lovelee')); // 얘는 에러가 앞에서 발생했으므로 위 에러를 해결하기 전까지는 수행 x


/* -------------------------------------------------------------------------- */
/*      문제 2. 배열에서 특정 인덱스의 값을 안전하게 가져오는 함수를 작성하세요.   */
/* -------------------------------------------------------------------------- */

function getNumberAtArray(arr, index) {
  // 인덱스가 0보다 작을 시 에러 발생
  if(index < 0){
    throw new Error("인덱스 값이 0보다 커야 합니다.");
  }
  
  // 인덱스가 배열 크기보다 클 때 에러 발생
  if(index >= arr.length){
    throw new Error("입력한 인덱스 값이 배열 크기보다 큽니다.");
  }

  // 배열이 아닐 시 에러 발생
  if(Array.isArray(arr) === false){
    throw new Error("첫번째 인자의 값은 배열이여야 합니다.");
  }

  // 유효한 값일 경우 해당 인덱스 값 반환
  for(let i = 0; i < arr.length; i++){
    if(i === index){
      return arr[i];
    }
  }
}

// 배열이 아닐 시 에러 발생 확인
// const checkObj = {name : "영희"};
// console.log(getNumberAtArray(checkObj, 3));

const numbers = [10, -20, 30, 50, 1000, 100, -34];
const strings = ["Hi", "my", "name", "is", "Suji"];

console.log(getNumberAtArray(numbers, 2)); 
console.log(getNumberAtArray(numbers, 4)); 
console.log(getNumberAtArray(numbers, 6));
// console.log(getNumberAtArray(numbers, 7)); // 인덱스가 numbers 배열보다 큰 경우

console.log('\n');

console.log(getNumberAtArray(strings, 1)); 
console.log(getNumberAtArray(strings, 2)); 
console.log(getNumberAtArray(strings, 4)); 
// console.log(getNumberAtArray(strings, 6)); // 인덱스가 strings 배열보다 큰 경우

console.log(getNumberAtArray(numbers, -1)); // 배열이 0보다 작은 경우
console.log(getNumberAtArray(strings, -1)); // 배열이 0보다 작은 경우


