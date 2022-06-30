let round1 = document.querySelector('#round1');
let comScoreElem = document.querySelector('#comscore');
let userScoreElem = document.querySelector('#userscore');
let textElem = document.querySelector('#text');
let Base1 = document.querySelector("#Base1");
let Base2 = document.querySelector("#Base2");
let Base3 = document.querySelector("#Base3");
let countStrike = document.querySelector("#strike");
let countBall = document.querySelector("#ball");
let countOut = document.querySelector("#out");
let Strike_event = document.querySelector('#btn_strike');
let Ball_event = document.querySelector('#btn_ball');
let Swing_event = document.querySelector('#btn_swing');
let See_event = document.querySelector('#btn_see');
let homebase = document.querySelector("#homeBase");
let homeName = document.querySelector(".com_name");
let awayName = document.querySelector(".user_name");
// document.querySelector('#btn_strike').addEventListener('click',onStrike);
// document.querySelector('#btn_ball').addEventListener('click',onBall);
// document.querySelector('#com_btn_hit').addEventListener('click',onComputerHit);
// document.querySelector('#com_btn_homerun').addEventListener('click',onComputerHomerun);
// document.querySelector('#com_btn_out').addEventListener('click',onComputerOut);
// document.querySelector('#com_btn_homerun').addEventListener('click',function() {
//     onUserHit(2);
// });
// document.querySelector('#com_btn_out').addEventListener('click',function() {
//     onUserHit(3);
// });
// 컴퓨터 오브젝트
let computer = {
    score: 0,
    hit: 0.45,
    homerun: 0.05,
    out: 0.5
}
// 유저 오브젝트
let user = {
    score: 0,
    hit: 0.45,
    homerun: 0.05,
    out: 0.5
}
// 게임 오브젝트
let game = {
    isComputerTurn: true,
    round1: 18,
}
// // 글자가 변경되는 함수
// function showText(msg) {
//     textElem.innerHTML = msg;
// }
// 점수판에 점수를 변경하는 함수
// function updateScore(score, mal) {
//     if(mal==0) {
//         computer.score += score;
//         comScoreElem.innerHTML = computer.score;
//     }else {
//         user.score += score;
//         userScoreElem.innerHTML = user.score;
//     }
// }
// //컴퓨터 차례 - 스트라이크 버튼
// function onStrike() {
//     if(!game.isComputerTurn) return;
//     let shootType = Math.floor(Math.random()*3);
//     if(shootType === 0) {
//         showText(`컴퓨터가 아웃 당했습니다.`)
//     }else if(shootType === 1) {
//         showText(`컴퓨터가 안타를 쳤습니다.`)
//     }else if(shootType === 2) {
//         showText(`컴퓨터가 홈런을 쳤습니다.`)
//     }
// }
// //컴퓨터 차례 - 볼 버튼
// function onBall() {
//     if(!game.isComputerTurn) return;
//     let ballType = Math.floor(Math.random()*3);
//     if(ballType === 0) {
//         showText(`컴퓨터가 아웃 당했습니다.`)
//     }else if(ballType === 1) {
//         showText(`컴퓨터가 안타를 쳤습니다.`)
//     }else if(ballType === 2) {
//         showText(`컴퓨터가 홈런을 쳤습니다.`)
//     }
// }

function onComputerShoot() {        
    if(!game.isComputerTurn) return;
    let shootType;
    //삼항 연산자 
    shootType = Math.random() < 0.50 ? 'hit' : Math.random() < 0.45 ? 'out' : 'homerun';
    console.log(shootType);
    if(shootType==='hit'){
        if(Math.random() < 0.50){
            // 안타 50%확률로 성공
            textElem.innerHTML = '컴퓨터가 안타를 성공시켰습니다!';
        
        }else {
            // 실패시
            textElem.innerHTML = '컴퓨터가 아웃되었습니다.';
        }
    }else if(shootType==='out'){
        // 아웃 45%
        if(Math.random() < 0.45){
            textElem.innerHTML = '컴퓨터가 아웃되었습니다!';
        }
    }else{
        if(Math.random() < 0.05){
            // 홈런 5%확률로 성공
            textElem.innerHTML = '컴퓨터가 홈런을 성공시켰습니다!';
            // comScore += 3;
        }else {
            // 실패시
            textElem.innerHTML = '컴퓨터가 아웃되었습니다.';
        } 
    }
}

function onUserShoot(usertype) {           
    if(game.isComputerTurn) return;
    let userType;
    //삼항 연산자 
    userType = Math.random() < 0.50 ? 'hit' : Math.random() < 0.45 ? 'out' : 'homerun';
    console.log(userType);
    if(userType==='hit'){
        if(Math.random() < 0.50){
            // 안타 50%확률로 성공
            textElem.innerHTML = '사용자가 안타를 성공시켰습니다!';
        }else {
            // 실패시
            textElem.innerHTML = '사용자가 아웃되었습니다.';
        }
    }else if(userType==='out'){
        // 아웃 45%
        if(Math.random() < 0.45){
            textElem.innerHTML = '사용자가 아웃되었습니다!';
        }
    }else{
        if(Math.random() < 0.05){
            // 홈런 5%확률로 성공
            textElem.innerHTML = '사용자가 홈런을 성공시켰습니다!';
        }else {
            // 실패시
            textElem.innerHTML = '사용자가 아웃되었습니다.';
        } 
    }
}







// // 컴퓨터 차례 -  안타 버튼
// function onComputerHit() {
//     if(!game.isComputerTurn) return;
//     // 치는 결정
//     let hitType = Math.floor(Math.random()*3);
//     if(hitType === 0) {
//         showText(`컴퓨터가 아웃 당했습니다.`)
//     }else if(hitType === 1) {
//         showText(`컴퓨터가 안타를 쳤습니다.`)
//     }else if(hitType === 2) {
//         showText(`컴퓨터가 홈런을 쳤습니다.`)
//     }
// }
// // 컴퓨터 차례- 홈런 버튼
// function onComputerHomerun() {
//     if(!game.isComputerTurn) return;
//     // 치는 결정
//     let homerunType = Math.floor(Math.random()*3);
//     if(homerunType === 0) {
//         showText(`컴퓨터가 아웃 당했습니다.`)
//     }else if(homerunType === 1) {
//         showText(`컴퓨터가 안타를 쳤습니다.`)
//     }else if(homerunType === 2) {
//         showText(`컴퓨터가 홈런을 쳤습니다.`)
//     }
// }
// // 컴퓨터 차례 - 아웃 버튼
// function onComputerOut() {
//     if(!game.isComputerTurn) return;
//     // 치는 결정
//     let outType = Math.floor(Math.random()*3);
//     if(outType === 0) {
//         showText(`컴퓨터가 아웃 당했습니다.`)
//     }else if(outType === 1) {
//         showText(`컴퓨터가 안타를 쳤습니다.`)
//     }else if(outType === 2) {
//         showText(`컴퓨터가 홈런을 쳤습니다.`)
//     }
// }
