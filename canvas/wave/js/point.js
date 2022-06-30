export class Point {
    constructor(index, x,y) {
        // 몇번째 point인지 알려고 index도 주기
        this.x = x;
        this.y = y;
        // this.index = index;
        this.fixedY = y;
        this.speed = 0.01;      //웨이브 속도!
        this.cur = index;       //current 에 지정해주기!
        this.max = Math.random() * 100 + 150;
    }
    //update를 이용해서
    update(){
        this.cur += this.speed;
        this.y = this.fixedY + (Math.sin(this.cur) * this.max);
        //Math.sin -> cosine을 이용하는 수학함수 --> 인터넷 검색해보기!
        //삼각형의 세 변과 한 각의 코사인 사이에 성립하는 정리이다. 
        //이에 따르면, 삼각형의 두 변의 제곱합에서 사잇각의 코사인과 그 두 변의 곱의 2배를 빼면, 남은 변의 제곱과 같아진다. 
        //삼각형의 두 변의 직각 삼각형에 대한 피타고라스의 정리에 대한 일반화이다. 
        //코사인 법칙은 삼각형의 두 변과 그 사잇각을 알 때 남은 한 변을 구하거나, 세 변을 알 때 세 각을 구하는 데 사용될 수 있다.
    }
}
