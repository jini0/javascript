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
let homebase = document.querySelector("#homeBase");
let comName = document.querySelector(".com_name");
let userName = document.querySelector(".user_name");
let mal = true; //mal true - 컴퓨터 / false -사용자
document.querySelector('#btn_strike').addEventListener('click',Strike);
document.querySelector('#btn_ball').addEventListener('click',Ball);

// 글자가 변경되는 함수
function showText(msg) {
    textElem.innerHTML = msg;
}

// // 점수판에 점수를 변경하는 함수
// function updateScore(score, mal) {
//     if(mal==0) {
//         computer.score += score;
//         comScoreElem.innerHTML = computer.score;
//     }else {
//         user.score += score;
//         userScoreElem.innerHTML = user.score;
//     }
// }

//스트라이크 버튼 클릭시 호출되는 함수
function Strike(){ 
    //user차례(공격)
    if (mal == false){ 
        Decision() // 컴퓨터의 판단(볼할지 스트라이크할지)
        if (Decision() == "strike"){
            //스트라이크존으로 침
            strikeHit();
        }else{
            //볼존으로 침
            ballHit();
        }
   }
   else{ 
       //컴퓨터 차례(공격)
       Decision() //컴퓨터의 판단(컴퓨터는 볼을 칠건지 말것인지를 결정)
       if(Decision() =="stay"){ 
            //컴퓨터가 배트를 안휘두름
           strike1()
       }
       else{ 
            //컴퓨터가 배트를 휘두름
           strikeHit()
       }
   }
}
//볼버튼을 클릭시 호출되는 함수
function Ball(){
    //user의 차례
    if (mal == false){
        //컴퓨터의 판단
        let com = Decision()
        if (com == "strike"){
            return strike1();
        }
        //컴퓨터가 볼을 던졌을때
        else{
            ball1();
        }
    }
    //컴퓨터 차례
    //볼을 던짐
    else {
        //컴퓨터의 판단
        //컴-보기를 했을때
        if (Decision() == "stay") {
            ball1();
        }
        //컴-스윙을 했을때
        else{
            ballHit();
        }
    }
}
//컴퓨터의 판단
function Decision(){
    //플레이어의 차례인지
    if (mal == false){
        let ballStrike = Math.floor(Math.random()*2)
        if (ballStrike ==0){
            return "ball"
        }
        else{
            return "strike"
        }
    }
    //컴퓨터 차례인지
    else{
        //칠건지 말건지 구분
        let hitStay = Math.floor(Math.random()*2)
        if (hitStay == 0){
            return "stay"
        }
        else{
            return "hit"
        }
    }
}
//스트라이크 함수
function strike1(){
    strike_count++
    if (strike_count ==1){
        countStrike.innerHTML = "S ●○";
    }
    if (strike_count ==2){
        countStrike.innerHTML = "S ●●";
    } 
    if (strike_count == 3){
        out();
    }
    else {
        showText(`스트라이크!`);
    }
}
//볼 함수
function ball1(){
    ball_count++
    if (ball_count ==1){
        countBall.innerHTML = "S ●○";
    }
    if (ball_count ==2){
        countBall.innerHTML = "S ●●";
    } 
    if (ball_count == 3){
        out();
    }
    else {
        showText(`스트라이크!`);
    }
}
//안타(hit) 함수
function hit(){
    strike_count = 0;
    countstrike.innerHTML = "S ○○";
    ball_count = 0;
    countBall.innerHTML = "B ○○○";
    if (first_base == 1){
        if (second_base == 1){
            if (thrid_base == 1){
                if(home == false){
                    awayScore ++;
                    awayScoreB.innerHTML = awayScore;
                }
                else{
                    homeScore ++;
                    homeScoreB.innerHTML = homeScore;
                }
            }
            else{
                thrid_base = 1;
            }
        }
        else{
            second_base=1;
        }
    }
    else{
        first_base = 1;
    }
    if (first_base == 1){
        fstBase.setAttribute("style", "background-color:brown");
    }
    if (second_base == 1){
        sndBase.setAttribute("style", "background-color:brown");
    }
    if (thrid_base == 1){
        trdBase.setAttribute("style", "background-color:brown");
    }
    game_alert.innerHTML = "안타! 진루합니다"
    strike_count =0
    ball_count = 0
    addtionalTime()
}