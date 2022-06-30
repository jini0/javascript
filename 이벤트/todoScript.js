//변수 선언 btn input ul 
let btn = document.querySelector('#insertBtn');
let input = document.querySelector('#todoInput');
let ul = document.querySelector('#listUl');

btn.addEventListener('click',addList);
input.addEventListener('keydown',function(e){
    console.log(e);
    //한글은 key값이 Process로 되어있고 영어는 e -> key값:e 이렇게~!!
    if(e.key === 'Enter') addList();
});
//btn클릭시 실행되는 함수
//input의 value가 있는지 확인 없으면 return 있으면 그 값을 
//li에 넣어주고 li를 ul에 추가 
function addList(){
    if(!input.value) return;    //input.value의 값이 true가 아니라면(!) return 반환
    let li = document.createElement('li');
    li.innerHTML = `${input.value}<span>X</span>`;
    ul.append(li);
    input.value = '';
    //input에 값을 입력하고 버튼을 누르면 그 값을 input창에서 리셋시켜주고 싶음
    removeEvent();              //li가 추가될 때마다 span이 하나 더 생김 -> 그럴때마다 remove되게 -> 여기서 실행
}

//x를 클릭했을때 실행되는 함수
//클릭한 X의 부모요소를 삭제하기 (X를 누르면 지워지게 하기)
function removeEvent(){
    let spans = document.querySelectorAll('#listUl span');   // #listUl span : listUl 안에 있는 모든 span
    spans.forEach(span => span.addEventListener('click',function(){
        this.parentElement.remove();
        //parentElement 부모요소 탐색
    }))     
    // querySelectorAll로 쓴 애들은 forEach사용가능
}

//li 옆에 체크표시뜨게하기! 체크 클릭하면 글자에 줄 그어지게 하기(css로 style줬음)
//ul을 클릭하면 클릭한 대상이 li면 check클래스를 지정
//check클래스가 있으면 제거
ul.addEventListener('click',function(e){
    console.log(e);
    if(e.target.nodeName === 'LI') e.target.classList.toggle('check');
    //target을 주면 클릭한 애 찾을 수 있음              //'click'시 check라는 class가 생기게 하기!!!
})