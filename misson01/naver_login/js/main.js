
const user = {
  id:'asd@naver.com',
  pw:'spdlqj123!@'
}

/*

1. email 정규표현식을 사용한 validation  
2. pw 정규표현식을 사용한 validation 
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

function emailReg(text){
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase())
}

function pwReg(text){
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

// 과제 시작 부분

const form = document.querySelector('.login-form');
let userID = '';
let userPW = '';

// validation 함수 부분
function validateLoginInfo(e){
  e.preventDefault();

  const input = e.target.closest('input');
  const targetId = e.target.id;

  if(targetId === 'userEmail'){
    userID = input.value;
    if(!emailReg(userID)){
      input.classList.add('is--invalid');
    }
    else{
      input.classList.remove('is--invalid');
    }
  }

  if(targetId === 'userPassword'){
    userPW = input.value;
    if(!pwReg(userPW)){
      input.classList.add('is--invalid');
    }
    else{
      input.classList.remove('is--invalid');
    }
  }
}

// 로그인 버튼 클릭 시 조건 확인 함수
function checkLogIn(id, pw){
  if(id === user.id && pw === user.pw){
    window.location.href = 'welcome.html';
  }
  else if(id === '' || pw === ''){
    alert('아이디 또는 비밀번호를 입력하지 않으셨습니다!!');
  }
  else{
    alert('아이디 또는 비밀번호가 일치하지 않습니다.');
  }
}

form.addEventListener('input', validateLoginInfo);
form.addEventListener('click', (e)=>{
  e.preventDefault()// 서버가 없으므로 서버로 submit 하는 것을 막기 위해 사용 없으면 405에러 발생
  if(e.target.classList.contains('btn-login')){
    checkLogIn(userID, userPW);
  }
})

// event delegation 사용 x
// const id = document.querySelector('.user-email-input');
// const pw = document.querySelector('.user-password-input');
// const loginBtn = document.querySelector('.btn-login');

// // email validation 함수
// function validationID(e){
//   e.preventDefault()
 
//   if(!emailReg(id.value)){
//     id.classList.add('is--invalid');
//   }
//   else{
//     id.classList.remove('is--invalid');
//   }
// }

// // password validation 함수
// function validationPW(e){
//   e.preventDefault();
 
//   if(!pwReg(pw.value)){
//     pw.classList.add('is--invalid');
//   }
//   else{
//     pw.classList.remove('is--invalid');
//   }
// }


// id.addEventListener('input', validationID);
// pw.addEventListener('input', validationPW);
// loginBtn.addEventListener('click', checkLogIn);









