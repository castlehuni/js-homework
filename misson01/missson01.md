# 240620 네이버 로그인 페이지 만들기

## 일치하는 아이디와 비밀번호를 입력했을 경우 welcome 페이지로 이동하는 코드 로직을 작성해주세요.

### 과제 수행을 위한 함수 소개

#### validateLoginInfo 함수
- 입력받은 이메일과 비밀번호의 값이 조건에 유효한 값인지 확인하는 함수
- 이벤트 위임을 사용하기 위해 `form`를 `queryselector`로 가져옴
- `closest`를 사용하여 모든 `input`요소들을 찾고 아이디와 비밀번호의 input을 구별하기 위해 각각의 id 또한 `e.target.id`를 통해 설정해 줌
- 위에서 설정해 준 id를 비교하여 id가 `userEmail`인 경우 input의 value를 전역변수로 설정해준 `userID`에 넣고 `userPassword`인 경우 역시 전역변수로 설정해준 `userPW`에 넣음
- 다음과 같이 입력받은 ID 또는 비밀번호 값이 정규표현식의 조건에 일치하지 않는 경우 add를 일치하는 경우 remove를 사용하여 `is--invalid`라는 class 제거함으로써 이메일과 비밀번호에 대한 validation 수행
```js
// 비밀번호일 경우 emailReg(userID) -> pwReg(userPW)로 변경
if(!emailReg(userID)){
  input.classList.add('is--invalid');
}
else{
  input.classList.remove('is--invalid');
}
```

#### checkLogIn 함수
- 입력받은 이메일과 비밀번호의 값이 일치하는지 일치하지 않는지 확인하는 함수
  - 일치하면 welcome 페이지로 이동
- 해당 함수는 아이디와 비밀번호의 값을 각각 입력받도록 함
- 입력받은 아이디와 비밀번호의 값이 지정된 아이디와 비밀번호의 값과 모두 일치 하는지 `&&` 연산자를 통해 확인
  - 일치하면 `window.location.href`를 통해 페이지 이동을 하도록 함
- 일치하지 않으면 `alert`를 사용하여 일치하지 않는다고 띄움
- 만약 사용자가 아이디 또는 비밀번호 input에 값을 넣지 않은 경우 역시 `alert`를 사용해 경고를 띄움

#### 이벤트 추가 방식
```js
form.addEventListener('input', validateLoginInfo);
form.addEventListener('click', (e)=>{
  e.preventDefault()
  if(e.target.classList.contains('btn-login')){
    checkLogIn(userID, userPW);
  }
})
```
- `input` 이벤트를 통해 사용자가 각각의 input 박스에 사용자가 값을 입력할 경우 실시간으로 받아올 수 있도록 함
- 버튼을 클릭 시 페이지 이동을 위해 `click` 이벤트를 추가하였는데 버튼을 selectquery를 통해 불러 이벤트를 추가하는 방식과 이벤트 위임을 통해 form 안에 click 이벤트를 넣는 방식 중 `이벤트 위임 방식`을 사용
  - 우선 `e.preventDefault()`를 넣어주고 그 안에 버튼을 찾기 위해 `e.target.classList.contains`를 사용함
  - 그 후 이전에 만든 `checkLogIn`함수를 수행하도록 함

<br/>

### 과제 수행 중 문제 발생과 해결법

#### 문제 발생

1. 입력을 마치고 로그인 버튼 클릭 시 화면이 잘 넘어가는지 안넘어가는지 확인하기 위해 버튼을 클릭했는데 아이디와 비밀번호를 잘못 입력했을 경우나 아이디와 비밀번호를 정확하게 입력했을 경우나 동일하게 `405 error`가 발생함
  - 405 에러는 `웹 서버에서 요청된 URL에 대해 HTTP 메서드를 허용하지 않을 때 발생`하는 에러로 지금 이 과정에서는 서버가 있지도 않음에도 불구하고 서버로 post를 요청했기 때문에 발생하는 문제임
2. 다음과 같은 코드를 작성했을 때 문제가 발생함
```js
function validateLoginInfo(e){

  ...

  if(targetId === 'userEmail'){ ... }

  if(targetId === 'userPassword'){ ... }

  form.addEventListener('click', (e)=>{
    e.preventDefault(); 
    checkLogIn(userID, userPW);
  });
}

form.addEventListener('input', checkLogInInfo);
```
- 다음과 같이 코드를 작성했을때 input에 글자를 입력할 때마다 alert창이 계속 뜨는 무한 루프가 발생함
  - 위 문제가 발생한 이유는 `checkLogInInfo` 함수 안에서 `click` 이벤트를 발생시켰기 때문에 위 함수가 호출될 때 마다 addEventListener에 의해 click 이벤트가 `계속 추가`되어 `중복된 형태에 이벤트가 생성`되어 버림
  - 그 결과 버튼을 클릭할 때 마다 `중복된 이벤트 리스너`의 의해 `무한 루프`가 수행되어버림


#### 해결 방법

1. 1번 문제를 해결하기 위해 `e.preventDefault()`를 사용하여 submit 시에 form 데이터를 서버로 보내주는 것을 막아줌
  - 찾아보니 POST를 GET으로 변경해도 해당 문제를 수정할 수 있다고 나와있음
2. 2번 문제를 해결하기 위해 다음과 같이 함수 안에 있던 `click` 이벤트 리스너를 함수 밖으로 빼내어 한번만 수행되도록 함 
```js
function validateLoginInfo(e){

  ...

  if(targetId === 'userEmail'){ ... }

  if(targetId === 'userPassword'){ ... }
}

form.addEventListener('input', checkLogInInfo);
form.addEventListener('click', (e)=>{...});
```

<br/>

## 위 과제 수행 후 느낀점
- 이벤트 위임이라는 것을 처음 써보다 보니 확실히 따로 queryselect를 통해 불러와서 사용하는 것보다 약간 어색하면서 어려운 것 같다.
  - 그렇기 때문에 조금 더 많이 사용해 봐야겠다.
- 405에러는 오랜만에 본 거 같은데 확실히 오랜만에 보니 어떤 에러였는지 기억도 잘 안나고 그랬던거 같다 역시 에러는 어려운 거 같다.
- 거의 클릭만 사용해보고 input이라는 이벤트는 거의 처음 사용해보는 것 같은데 이런 이벤트도 있다는 것을 배울 수 있어 좋았다.
- 이번에도 역시 함수에 값을 잘못 넣거나 잘못 호출하면 바로 오류나 무한루프같은 문제가 발생할 수 있다는 것을 다시 한번 느낄 수 있었고 함수의 값을 넣을 때 보다 신중하게 넣어야 한다는 것을 느낄 수 있었다.
