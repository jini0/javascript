//게임로직
//1.컴퓨터 차례로 시작
//2.사용자가 컴퓨터의 슛 버튼을 클릭한다.
//3.컴퓨터는 2점슛을 던질지 3점슛을 던질지 랜덤하게 결정
//4.슛이 성공하면 컴퓨터의 점수가 올라감
//5.사용자의 차례로 변경됨
//6.2점슛인지 3점슛인지 버튼을 클릭한다.
//7.슛이 성공하면 사용자의 점수를 올려준다.
//8.컴퓨터의 차례로 변경되며 슛횟수를 1씩 감소시킴
//9.남은 슛횟수가 0이 될 때까지 1~8을 반복한다.
//10.양쪽의 점수를 비교해 승자를 결정한다.
//* 2점슛의 성공률은 50% 3점슛의 성공률은 30% 

let shortsLeftElem = document.querySelector('#shorts-left');
let comScoreElem = document.querySelector('#computer-score');
let userScoreElem = document.querySelector('#user-score');
let textElem = document.querySelector('#text');
document.querySelector('.btn-computer').addEventListener('click',onComputerShoot);          
                                                        //마우스로 클릭시 밑에 함수를 불러올거니까  
                                                        //onComputerShoot() 이렇게 괄호를 붙이면 클릭도 전에 함수가 실행됨
                                                        //그래서 괄호 빼고!!적어줘야함!                                                  
// document.querySelectorAll('.btn-user')[0].addEventListener('click',function(){  
//                                                                 //원래는 이렇게 함수 자체가 들어와야하는 식임!!
//     onUserShoot(2);
// }); 
// document.querySelectorAll('.btn-user')[1].addEventListener('click',function(){
//     onUserShoot(3);
// });  
//마크업에 아이디 만들어서 이렇게 적어줘도 됨~! 
document.querySelector('#btn-user2').addEventListener('click',function(){
    onUserShoot(2);
})    
document.querySelector('#btn-user3').addEventListener('click',function(){
    onUserShoot(3);
})           
//이렇게 변수 넣고 해도 됨
// let userbuttons = document.querySelectorAll('.btn-user');  
// userbuttons[0].addEventListener('click',function(){  
//     onUserShoot(2);
// });
// userbuttons[1].addEventListener('click',function(){  
//     onUserShoot(3);
// });                                         
//컴퓨터 오브젝트
let computer = {
    score: 0,
    percent2: 0.5,
    percent3: 0.3, 
}
//사용자 오브젝트
let user = {
    score: 0,
    percent2: 0.5,
    percent3: 0.3,
}
//게임 오브젝트
let game = {
    isComputerTurn: true,
    shortsleft: 15,
}
//글자 변경되는 함수
function showText(msg){
    textElem.innerHTML = msg;
}
//점수판에 점수변경하는 함수
function updateScore(score, mal){
                            //mal이 0인지 1인지에 따라 컴퓨터인지 사람인지 나눌거임
    if(mal==0){
        computer.score += score;
        comScoreElem.innerHTML = computer.score;
    }else {
        user.score += score;
        userScoreElem.innerHTML = user.score;
    }
}
//버튼 안보이게 하는 함수
function disableComputer(flag){
    let computerButton = document.querySelector('.btn-computer');
    computerButton.disabled = flag;
}
//유저 버튼 안보이게 하는 함수
function disableUser(flag){
    let userButton = document.querySelectorAll('.btn-user');
                                    //유저 버튼은 두개라서 클래스로 둘 다 해주려면 querySelectorAll로!!
    for(let i=0; i<userButton.length; i++){
        //버튼 여러개라서 for문으로
        userButton[i].disabled = flag;
    }
}
//컴퓨터 슛실행
function onComputerShoot(){
    if(!game.isComputerTurn) return;
      //! 이 붙어서  ->false일때 임!!
    //슛타입을 결정
    let shootType = Math.random() < 0.5? 2 : 3;
    //삼항연산자     //조건 Math.random() < 0.5이 맞으면 -> 2점 / 안맞으면 -> 3점
    //슛을 확률대로 성공시키기
    if(Math.random() < computer['percent'+shootType]){
        showText(`컴퓨터가 ${shootType}점슛을 성공시켰습니다.`);
                            // let shootType 에 넣은 변수가 결정~!
        updateScore(shootType, 0);
    }else {
        showText(`컴퓨터가 ${shootType}점슛을 실패했습니다.`);
    }
    game.isComputerTurn = false;
    disableComputer(true);
    disableUser(false);
}
//사용자 슛실행
function onUserShoot(jum){
    if(game.isComputerTurn) return;
    if(Math.random() < user['percent'+jum]){
        showText(`당신이 ${jum}점슛을 성공시켰습니다.`);
                            // let shootType 에 넣은 변수가 결정~!
        updateScore(jum, 1);
    }else {
        showText(`당신이 ${jum}점슛을 실패했습니다.`);
    }
    game.isComputerTurn = true;
    disableComputer(false);
    disableUser(true);
    gameTurn();
    //여기서 아래에 만든 함수 호출
}
function gameTurn(){
    game.shortsleft--;
    shortsLeftElem.innerHTML = game.shortsleft;
    if(game.shortsleft==0){
        if(user.score > computer.score) showText('사용자가 승리했습니다.');
        else if(user.score < computer.score) showText('컴퓨터가 승리했습니다.');
        else showText('비겼습니다.');
        disableComputer(true);
        //컴퓨터의 버튼이 안보이게
    }
}