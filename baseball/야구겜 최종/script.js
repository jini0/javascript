let A_event = document.querySelector("#A_btns")
let B_event = document.querySelector("#B_btns")
let game_alert = document.querySelector("#result")
let strike_count = 0
let ball_count = 0
let out_count = 0
let first_base = 0
let second_base = 0
let thrid_base = 0
let homeScoreB = document.querySelector("#comScore")
let awayScoreB = document.querySelector("#playerScore")
let homeScore = 0
let awayScore = 0
let home = true
let count = 1
let fstBase = document.querySelector("#firBase")
let sndBase = document.querySelector("#secBase")
let trdBase = document.querySelector("#thrBase")
let round = document.querySelector("#round")
let countstrike = document.querySelector("#count_strike")
let countBall = document.querySelector("#count_ball")
let countOut = document.querySelector("#count_out")
let gameOver = false
let mound = document.querySelector("#filed3")
let base = document.querySelector("#Base")
let homeName = document.querySelector(".display_2_nameH")
let awayName = document.querySelector(".display_2_nameA")

A_event.addEventListener("click", hitOrStrike) //스윙 or 스트라이크 버튼
B_event.addEventListener("click",stayOrBall) //지켜보기 or 볼 버튼

function hitOrStrike(){ //A버튼을 클릭했을때 호출되는 함수
    if (home == false){ // 플레이어의 턴(스윙을 함-공을침)
        comDecision() //컴퓨터가 볼을할지 스트라이크를 할지 결정
        if (comDecision()== "strike"){ //컴퓨터가 스트라이크존에 공을 던졌을때
            //스트라이크 존에 공을 던졌을때 실행;
            strikeHit()
        }
        else{ //컴퓨터가 볼존에 공을 던졌을때
            ballHit()
        }
   }
   else{ //컴퓨터의 공격턴 //// 플레이어의 턴(스크라이크를 함-스트라이크를 던짐)
       comDecision() //컴퓨터는 칠건지 말것인지를 결정
       if(comDecision() =="stay"){ //컴퓨터가 배트를 안휘둘렀을때
            //스크라이크 결정
           strike()
       }
       else{ //컴퓨터가 배트를 휘둘렀을대
            //스크라이트 hit결정
           strikeHit()
       }
   }
}
//B버튼을 클릭했을때 호출되는 함수
function stayOrBall(){
    //플레이어의 턴
    //지켜보기를 했을 때
    if (home == false){
        //컴퓨터의 결정 
        let com = comDecision()
        //컴이 스트라이크를 던졌을 때
        if (com == "strike"){
            //스트라이크 확인
            return strike()
        }
        //컴이 볼을 던졌을때
        else{
            //볼 확인
            ball()
        }
    }
    //컴퓨터의 턴
    //볼을 던짐
    else {
        //컴퓨터의 결정
        //컴이 지켜보기를 했을때
        if (comDecision() == "stay") {
            ball()
        }
        //컴이 스윙을 했을때
        else{
            ballHit()
        }
    }
}
//컴퓨터의 판단
function comDecision(){
    //플레이어의 차례인지
    if (home == false){
        //볼인지 스트라이크 인지 구분
        let ballStrike = Math.floor(Math.random()*2)
        if (ballStrike ==0){
            return "ball"
        }
        else{
            return "strike"
        }
    }
    //내 차례인지
    else{
        //칠건지 말건지 구분
        let hitOrStay = Math.floor(Math.random()*2)
        if (hitOrStay == 0){
            return "stay"
        }
        else{
            return "hit"
        }
    }
}
//스트라이크를 던졌을때 결과의 렌덤값을 보내줌
function hitProb(){
    let event = Math.ceil(Math.random()*100)
    if (event <=15){
        return 0;
    }
    else if (event <=60){
        return 1;
    }
    else if (event <=99){
        return 2;
    }
    else{
        return 3;
    }
}
//볼을 던졌을때 스윙을 할경우 렌덤값을 보내줌
function ballHit(){
    switch(hitProb()){
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
//스트라이크 존에 공을 던졌는데 그공을 쳤을때 실행;
function strikeHit(){
    switch(hitProb()){
        //0이면 쳤는데 그공을 수비가 잡음  
        case 0:
            out()
            break;
        //1이면 안맞음 -> 스트라이크 
        case 1:
            strike()
            break;
        //2이면 안타
        case 2:
            hit()
            break;
        //3이면 홈런
        case 3:
            homerun()
            break;
    }
}
//스트라이크를 던졌으나 치지못함(스윙을 했으나 맞지않은 경우 또는 지켜보기를 한경우)
//스트라이크 카운트가 1증가되며 스트라이크 카운트가 3이 되면 out()이 실행됨
function strike(){
    strike_count++
    if (strike_count ==1){
        countstrike.innerHTML = "S ●○"
    }
    if (strike_count ==2){
        countstrike.innerHTML = "S ●●"
    } 
    if (strike_count == 3){
        out()
    }
    else {
        game_alert.innerHTML = "스트라이크!"
    }
}
// 플레이어가 아웃되며 턴이변경됨
function out(){
    //스트라이크 카운터 : 0  /볼 카운트 : 0 /아웃 : +1
    countstrike.innerHTML = "S ○○"
    strike_count = 0
    ball_count = 0
    countBall.innerHTML = "B ○○○"
    out_count ++
    //화면변경!!!
    game_alert.innerHTML = "배터 아웃!"
    if (out_count == 1){
        countOut.innerHTML = "O ●○"
    }
    if (out_count == 2){
        countOut.innerHTML = "O ●●"
    }
    if (out_count == 3){
        countOut.innerHTML = "O ○○"
        out_count = 0
        //1루수,2루수,3루수변경
        boardReset()
        ball_count = 0
        game_alert.innerHTML = "3아웃 필드교체!"


        if (home == true){
            mound.setAttribute("style", "background-color:red")
            awayName.setAttribute("style", "color: blue")
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
                    game_alert.innerHTML = "player 팀의 승리!"
                    game_set()
                    round.innerText = count + "회 말"
                    gameOver = true     
                }
                else if (homeScore>awayScore){
                    game_alert.innerHTML = "computer 팀의 승리!"
                    game_set()
                    round.innerText = count + "회 말"
                    gameOver = true        
                }
                else {
                    round.innerText = count + "회 초"        
                }
            }
            if (gameOver == false){
                count ++
                round.innerText = count + "회 초"
            } 
        }
    }
}

function ball(){
    ball_count++
    if (ball_count ==1){
        countBall.innerHTML = "B ●○○"
    }
    if (ball_count ==2){
        countBall.innerHTML = "B ●●○"
    }
    if (ball_count ==3){
        countBall.innerHTML = "B ●●●"
    }
    if (ball_count == 4){
        countBall.innerHTML = "B ○○○"
        ball_count = 0
        hit()
        game_alert.innerHTML = "포볼! 진루합니다"
    }
    else {
        game_alert.innerHTML = "볼!"
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
        fstBase.setAttribute("style", "background-color:brown")
    }
    if (second_base == 1){
        sndBase.setAttribute("style", "background-color:brown")
    }
    if (thrid_base == 1){
        trdBase.setAttribute("style", "background-color:brown")
    }
    game_alert.innerHTML = "안타! 진루합니다"
    strike_count =0
    ball_count = 0
    addtionalTime()
}

function boardReset(){
    first_base =0
    second_base = 0
    thrid_base = 0
    fstBase.removeAttribute("style")
    sndBase.removeAttribute("style")
    trdBase.removeAttribute("style")
}

function homerun(){
    strike_count = 0
    countstrike.innerHTML = "S ○○"
    ball_count = 0
    countBall.innerHTML = "B ○○○"
    if (first_base == 1){
        if (second_base == 1){
            if (thrid_base == 1){
                if(home == false){
                    awayScore += 4
                    awayScoreB.innerHTML = awayScore
                }
                else{
                    homeScore +=  4
                    homeScoreB.innerHTML = homeScore
                }
            }
            else{
                if(home == false){
                    awayScore += 3
                    awayScoreB.innerHTML = awayScore
                }
                else{
                    homeScore +=  3
                    homeScoreB.innerHTML = homeScore
                }            
            }
        }
        else{
            if(home == false){
                awayScore += 2
                awayScoreB.innerHTML = awayScore
            }
            else{
                homeScore +=  2
                homeScoreB.innerHTML = homeScore
            }            
        }
    }
    else{
        if(home == false){
            awayScore += 1
            awayScoreB.innerHTML = awayScore
        }
        else{
            homeScore +=  1
            homeScoreB.innerHTML = homeScore
        }            
    }
    if (home == true){
        game_alert.innerHTML = "컴퓨터팀! 홈런! 홈런입니다!"
    }
    else{
        game_alert.innerHTML = "플레이어팀! 홈런! 홈런입니다!"
    }
    boardReset()
    addtionalTime()
}
function addtionalTime(){
    if (count >= 10 && home ==false && awayScore>homeScore){
        game_alert.innerHTML = "player 팀의 승리!"
        gameOver =true
    }
}
function game_set(){
    A_event.setAttribute('disabled',"")
    B_event.setAttribute('disabled',"")
}