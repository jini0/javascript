// ✔지금은 로컬에 있는 json을 불렀지만 나중에는 서버에 있는 json 불러오고 할 거임
function loadItems(){
    //https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch - fetch코드 보기
    //fetch => 라이브서버에서 되는 애!
    //fetch api 
    //fetch('url')  -> 네트워크 주소를 적으면 받아옴
    return fetch('data/data.json')       //index기준으로 봐야함!!!(main.js기준이 아니라)
    //성공하면 받아온 데이터를 제이슨으로 변환
    .then((response) => response.json())
    .then(data => data.items);      //data.json파일의 items 안에 있는 내용들만 받겠다!(books라는 건 안받는다는 의미!)
                                    //자바스크립트의 객체처럼 생각하기!
}

function displayItems(items){
    //html문서의 ul을 선택
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item=> createHTMLString(item)).join("");
    // container.innerHTML = items.map(item=>{
    //     return createHTMLString(item);
    // }).join("");
}
//보기 어려울까바 함수로 빼둔거임!
function createHTMLString(item){
    return `
        <li class='item'>
            <img src='${item.image}' alt='${item.type}' class='item_thumnail'>
            <span>${item.gender}, ${item.size}</span>
        </li>
    `;
}
//이벤트 설정하기
function setEventListeners(items){
    const buttons = document.querySelector('.buttonDiv');
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', ()=> displayItems(items));    //로고 클릭하면 전체 items들이 나오게!  / addEventListeners('이벤트',함수) - 함수가 들어가야해서 ()=>{} 화살표 함수 넣어준거임!
    buttons.addEventListener('click', event => onButtonClick(event, items));
}
//버튼을 클릭할 때 실행되는 함수
function onButtonClick(event, items){
    // console.log(event);
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    //key값과 value값 중 하나라도 없으면 리턴(종료)
    if(key == null || value == null ){
        return;                 //함수는 return 해주면 끝남 / cf. 반복문은 break 해주면 끝
    }
    const filterd = items.filter(item=> item[key] === value );
                                        // html에서 img에 data-key: type / data-key: color 을 지정해줬었음
                                        // 각각의 color를 클릭하면 key에 color가 들어감!+value값으로 각각의 색이 들어가는거(index.html 파일 보기)
                                        // type을 클릭하면 tshirt 등등 이 클릭됨
    console.log(filterd);
    displayItems(filterd);
}
//★함수는 불러줘야 실행됨 - 그냥 불러주면 안되고 데이터를 다 받고 불러줘야함!★
//main프로미스 소비자!!!!! json데이터 받아와!!!!!
loadItems()
.then(items => {                //items는 배열! 이 배열안에 여러 객체들 값이 있음(data.json 보면)
    console.log(items);         //json 데이터를 다 받고 나서 displayItems()와 setEventListeners()를 해줌
    displayItems(items);        //화면에 목록으로 보이게 해줌
    setEventListeners(items);   //버튼에 이벤트를 달아주기 위한 함수
})
.catch(error=>{
    console.log(error);
})
.finally(()=>{
    console.log('프로미스 끝');
})