# 240630 Poster UI 만들기

## 썸네일 이미지를 클릭하면 메인 이미지와 배경이 바뀔 수 있도록 코드 로직을 작성해주세요.

### 과제 수행을 위한 함수 소개

#### setBgColor

- 썸네일 이미지 클릭 시 배경 색을 변경시켜주는 함수로 node와 색깔을 나타내는 변수 값인 colorA, colorB를 입력받음
- 조건대로 colorB에는 기본값 `#000`을 줌
- 노드 값으로 문자가 왔을 경우 `querySelector`를 통해 변환시킴
- `elem.style.background`를 통해 배경색을 변경시킴

#### setImage

- 썸네일 이미지 클릭 시 클릭된 이미지로 변경시켜주는 함수로 node와 이미지 정보 객체를 입력받음
- 노드 값으로 문자가 왔을 경우 `querySelector`를 통해 변환시킴
- 사진과 사진의 대한 설명을 각각 .src와 .alt를 변경시켜 변화시킴

#### setNameText

- 썸네일 이미지 클릭 시 클릭된 이미지에 맞는 이름으로 변경시켜주는 함수로 node와 이미지 정보 객체를 입력받음
- 노드 값으로 문자가 왔을 경우 `querySelector`를 통해 변환시킴
- `textContent`를 사용해서 입력받은 객체의 name으로 선택한 노드를 변경시켜 줌

#### handleClick

- li 요소 안에 있는 썸네일 이미지를 클릭했을 때 사진 변경, 배경색 변경, 이름 변경 등과 같은 이벤트를 처리하도록 하는 함수임
- `e.target.closest("li")`를 사용하여 `nav`안에 있는 모든 `li`요소에 이벤트 위임을 걸어줌
- `li`요소가 아닌 다른 요소를 클릭하면 에러가 발생하므로 li 요소가 아닐경우 return을 하여 에러를 유발하지 않도록 함
- `targe.dataset.index`를 이용해 인덱스의 값을 받아와서 data[index]를 하여 안에 data.js 안에 있는 값을 가져옴
  - 여기서 -1을 해주는 이유는 html요소에 작성된 index 요소는 1부터 시작하지만 실제 시작은 0부터 시작하기 때문에 -1을 해줘야함
- 위에서 만든 함수들을 각각 실행시킴
- 그 후 아래 코드와 같이 우선 `classList.remove`를 사용해 모든 li 요소의 class를 삭제시키고 클릭한 이미지만 `classList.add`를 사용해 'is-active'클래스를 추가하도록 함

```js
const children = nav.querySelectorAll("li");
children.forEach((item) => {
  item.classList.remove("is-active");
});

target.classList.add("is-active");
```

<br/>

### 과제 수행 중 문제 발생과 해결법

#### 문제 발생

```js
for (let item of nav.children) {
  item.classList.remove("is-active");
}
```

- 위 코드와 같이 처음에는 nav.children을 사용해서 li요소에 접근해 li요소의 모든 클래스를 제거하려고 하였으나 제대로 동작하지 않음
  - 이는 구조상 nav 밑에 ul이 있고 그 밑에 li가 있기 때문에 nav의 바로 자식인 ul의 값은 접근 가능 하지만 그 아래인 li값에는 접근하지 못해서 발생하는 문제였음

#### 해결 방법

```js
const children = nav.querySelectorAll("li");
children.forEach((item) => {
  item.classList.remove("is-active");
});
```

- 위 문제를 해결하기 위해서 우선 nav안에 있는 모든 li요소들을 `querySelectorAll`을 사용하여 children 변수 안에 넣어주고 querySelectorAll은 유사 배열 객체인 `NodeList`를 내보내기 때문에 forEach를 사용해 모든 요소의 클래스를 remove해 줌

## 위 과제 수행 후 느낀점

- 이번 과제를 하면서 역시 html의 구조 파악을 하는 것이 정말 중요하다는 것을 다시 한 번 느낄 수 있었는데 구조 파악에 따라 내가 원하는 행동이 제대로 동작할 수도 있고 그렇지 않을 수도 있다는 것을 알 수 있었다.
- 함수를 분리해서 사용하니 확실히 코드가 깔끔해 보인다는 것을 느낄 수 있었다.
