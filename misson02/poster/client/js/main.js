/* 

1. 클릭 이벤트 활성화 -> O
2. nav 클릭시 배경 색상 변경 -> O
3. 이미지 변경 -> O
4. 텍스트 변경 -> O
5. 함수 분리 -> O

*/
const nav = document.querySelector(".nav");

function setBgColor(node, colorA, colorB = "#000") {
  if (typeof node === "string") {
    node = document.querySelector(node);
  }
  node.style.background = `linear-gradient(to bottom, ${colorA}, ${colorB})`;
}

function setImage(node, data) {
  if (typeof node === "string") {
    node = document.querySelector(node);
  }
  node.src = `./assets/${data.name}.jpeg`;
  node.alt = data.alt;
}

function setNameText(node, data) {
  if (typeof node === "string") {
    node = document.querySelector(node);
  }
  node.textContent = data.name;
}

function handleClick(e) {
  e.preventDefault();

  const target = e.target.closest("li");

  if (!target) return;

  const index = target.dataset.index;
  const datas = data[index - 1];
  const { color } = data[index - 1];

  setBgColor("body", color[0], color[1]);

  setImage(".visual img", datas);

  setNameText(".nickName", datas);

  const children = nav.querySelectorAll("li");
  children.forEach((item) => {
    item.classList.remove("is-active");
  });

  target.classList.add("is-active");
}

nav.addEventListener("click", handleClick);
