let comscoreElem = document.querySelector('#comscore');
let userscoreElem = document.querySelector('#userscore');
let textElem = document.querySelector('#text');
let Strike_event = document.querySelector('#btn_strike');
let Ball_event = document.querySelector('#btn_ball');
let strike_count = 0;
let ball_count= 0;
let out_count = 0;
let first_base = 0;
let second_base = 0;
let third_base = 0;
let round = document.querySelector('#round1');
let base1 = document.querySelector('#Base1');
let base2 = document.querySelector('#Base2');
let base3 = document.querySelector('#Base3');
let homeBase = document.querySelector('#homeBase');
let count_strike = document.querySelector('#strike');
let count_ball = document.querySelector('#ball');
let count_out = document.querySelector('#out');
let com_score = 0;
let user_score = 0;
let com_turn = true;
let com_name = document.querySelector('#com_name');
let user_name = document.querySelector('#user_name');

Strike_event.addEventListener("click", Strike);
Ball_event.addEventListener("click", Ball);

// 스트라이크 버튼을 눌렀을때
function Strike() {
    if(com_turn == false) {
        com_select()
        if(com_select() == "strike") {
            strikeHit();
        }else {
            ballHit();
        }
    }else {
        com_select()
        if(com_select() == "stay") {
            strike();
        }else {
            strikeHit();
        }
    }
}
// 볼 버튼을 눌렀을때
function Ball() {
    if(com_turn == false) {
        let com = com_select();
        if(com == "strike") {
            return strike();
        }else {
            ball();
        }
    }else {
        if(com_select() == "stay") {
            ball();
        }else {
            ballHit();
        }
    }
}
// 점수판에 점수변경하는 함수
function updateScore(score, mal) {
    if(mal == 0) {
        com_score += score;
        comscoreElem.innerHTML = com_score;
    }else {
        user_score += score;
        userscoreElem.innerHTML = user_score;
    }
}
// 글자 변경하는 함수
function showText(msg) {
    textElem.innerHTML = msg;
}
// 컴퓨터의 선택
function com_select() {
    if(com_turn == false) {
        let ballStrike = Math.floor(Math.random()*2);
        if(ballStrike == 0) {
            return "ball";
        }else {
            return "strike";
        }
    }else {
        let hitStay = Math.floor(Math.random()*2);
        if(hitStay == 0) {
            return "stay";
        }else {
            return "hit";
        }
    }
}
// 스트라이크를 던졌을때 결과의 랜덤값
function hitProb() {
    let event = Math.ceil(Math.random()*100);
    if(event <= 15) {
        return 0;
    }else if(event <= 60) {
        return 1;
    }else if(event <= 99) {
        return 2;
    }else {
        return 3;
    }
}
// 볼을 던졌을대 스윙을 할경우 랜덤값
function ballHit() {
    switch(hitProb()) {
        case 0:
            out()
            break;
        case 1:
            out()
            break;
        case 2:
            strike()
            break;
        case 3:
            hit()
            break;
    }
}
// 스트라이크 공을 쳤을때
function strikeHit() {
    switch(hitProb()) {
        case 0:
            out()
            break;
        case 1:
            strike()
            break;
        case 2:
            hit()
            break;
        case 3:
            homerun()
            break;
    }
}
// 스트라이크를 치지못함(스윙을 했으나 맞지않은 경우 또는 지켜보기를 한 경우)
// 스트라이크 카운트가 1증가되며 스트라이크 카운터가 3이 되면 out() 이 실행됨
function strike(){
    count_strike++
    if (count_strike ==1){
        strike.innerHTML = "S ●○"
    }
    if (count_strike ==2){
        strike.innerHTML = "S ●●"
    }
    if (count_strike == 3){
        out()
    }
    else {
        text.innerHTML = "스트라이크!"
    }
}
function ball(){
    count_ball++
    if (count_ball ==1){
        ball.innerHTML = "B ●○○"
    }
    if (count_ball ==2){
        ball.innerHTML = "B ●●○"
    }
    if (count_ball ==3){
        ball.innerHTML = "B ●●●"
    }
    if (count_ball == 4){
        ball.innerHTML = "B ○○○"
        count_ball = 0
        hit()
        text.innerHTML = "볼넷! 진루합니다"
    }
    else {
        text.innerHTML = "볼!"
    }
}
function out(){
    //스트라이크 카운터 : 0  /볼 카운트 : 0 /아웃 : +1
    strike.innerHTML = "S ○○"
    count_strike = 0
    count_ball = 0
    ball.innerHTML = "B ○○○"
    count_out ++
    //화면변경!!!
    text.innerHTML = "배터 아웃!"
    if (count_out == 1){
        out.innerHTML = "O ●○"
    }
    if (count_out == 2){
        out.innerHTML = "O ●●"
    }
    if (count_out == 3){
        out.innerHTML = "O ○○"
        count_out = 0
        //1루수,2루수,3루수변경
        boardReset()
        count_ball = 0
        text.innerHTML = "3아웃 필드교체!"


        if (home == true){
            userName.setAttribute("style", "color: blue")
            base.setAttribute("style", "background-color: bisque")
            homeName.removeAttribute("style")
            A_event.innerHTML = "스윙"
            B_event.innerHTML = "지켜보기"
            home = false
            if(count >= 9 && awayScore>homeScore){
                game_alert.innerHTML = "player 팀의 승리!"
                game_set()

            }
            round.innerText = count + "회 말"
        }
        else{
            mound.removeAttribute("style")
            homeName.setAttribute("style", "color: blue")
            base.removeAttribute("style")
            awayName.removeAttribute("style")
            A_event.innerHTML = "스트라이크"
            B_event.innerHTML = "볼"
            home = true
            if (count >= 9){
                if(awayScore>homeScore){
                    game_alert.innerHTML = "user 팀의 승리!"
                    game_set()
                    round1.innerText = count + "회 말"
                    gameOver = true    
                }
                else if (homeScore>awayScore){
                    game_alert.innerHTML = "computer 팀의 승리!"
                    game_set()
                    round1.innerText = count + "회 말"
                    gameOver = true        
                }
                else {
                    round.innerText = count + "회 초"        
                }
            }
            if (gameOver == false){
                count ++
                round1.innerText = count + "회 초"
            }
        }
    }
}
function hit(){
    strike_count = 0
    countstrike.innerHTML = "S ○○"
    ball_count = 0
    countBall.innerHTML = "B ○○○"
    if (first_base == 1){
        if (second_base == 1){
            if (thrid_base == 1){
                if(home == false){
                    awayScore ++
                    awayScoreB.innerHTML = awayScore
                }
                else{
                    homeScore ++
                    homeScoreB.innerHTML = homeScore
                }
            }
            else{
                thrid_base = 1
            }
        }
        else{
            second_base=1
        }
    }
    else{
        first_base = 1
    }
    if (first_base == 1){
        base1.setAttribute("style", "background-color:brown")
    }
    if (second_base == 1){
        base2.setAttribute("style", "background-color:brown")
    }
    if (thrid_base == 1){
        base3.setAttribute("style", "background-color:brown")
    }
    text.innerHTML = "안타! 진루합니다 ❗"
    strike_count =0
    ball_count = 0
    addtionalTime()
}