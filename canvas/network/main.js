import utils from './utils.js';

// console.log(utils);      //찍어보고 잘 뜨면 randomeFloatBetween 이거 쓰면됨 
console.log(utils.randomeFloatBetween(10,15));
// 1. 캔버스 불러오기
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

// 2. 파티클 클래스 정의
// class는 대문자로 정의
class Particle {
    constructor(x, y, radius, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
    }
    draw() {
        //파티클은 draw라는 메서드 가지고 있어야함!
        //펜시작
        ctx.beginPath();
        //호 그리기(x,y,radius,startA,endA,방향)
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "#fff";                 //색상지정
        ctx.fill();                             //칠하기
        ctx.closePath();                        //펜툴 끝       
    }
    animate() {
        //파티클의 좌표가 canvas의 크기를 벗어날때
        //0이 되거나 canvas 크기보다 커질 때
        if(this.x <= 0 || this.x >= innerWidth || this.y <= 0 || this.y >= innerHeight){
            this.x = utils.randomeFloatBetween(0, innerWidth);
            this.y = utils.randomeFloatBetween(0, innerHeight);
        }
        //움직이게 하는 애들(좌표를 계속 바꿔주는 애들)
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        //파티클 사이에 선그리기
        //선객체 생성
        particles.forEach(particle=>{
            // 거리 구해주는 함수 utils에 만들어주기
            let distance = utils.distance(particle.x, particle.y, this.x, this.y);
            //점과 점 사이 거리가 300보다 작으면 선을 그림
            if(distance < 300){
                let from = {x: this.x, y: this.y };
                let to = {x: particle.x, y: particle.y};    
                new Line(from, to, distance).draw();            //new Line(from, to, distance)생성 .draw() 실행
            }
        })


        this.draw();
    }
}
// * 선클래스 정의 하기 (선 객체도 하나가 아니고 여러개라서! -> class를 만들어서 해줌)
class Line {
    constructor(from, to, distance){            // from 시작점 / to 끝점 -> 점 두개가 있고 이 두 사이의 거리를 이어야 -> 선이됨!
        this.from = from;
        this.to = to;
        this.distance = distance;
    }
    draw() {    
        ctx.beginPath();
        ctx.moveTo(this.from.x, this.from.y);
        ctx.lineTo(this.to.x, this.to.y);
        ctx.strokeStyle = `rgba(215,205,0,0.4)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }
}
// 추가 마우스 객체 만들기 
//화면에서 마우스를 움직이면 그 위치에서 따라다니는 원을 만들어주려고!
let mouse = {
    x:0,
    y:0,
    isActive : false,
    radius: 5,
}

// 3. 파티클 만들기
const TOTAL = 50;
let particles = [];
for(let i=0; i<TOTAL; i++){
    let x = utils.randomeFloatBetween(0,innerWidth);            //0부터 너비까지 랜덤한 값을 받겠다
    let y = utils.randomeFloatBetween(0,innerHeight);           //0부터 높이까지 랜덤한 값을 받겠다
    let radius = utils.randomeFloatBetween(0,5.2);
    let velocity = {
        x:utils.randomeFloatBetween(-2,2),
        y:utils.randomeFloatBetween(-2,2),
    }
    particles.push(new Particle(x,y,radius,velocity));
}
// console.log(particles);

// 4. 매 프레임마다 실행되는 재귀함수
function render(){
    //제거를 안해주면 계속해서 쌓여서 원이 아니고 선이 될거임!
    ctx.clearRect(0,0,canvas.width, canvas.height); 
    requestAnimationFrame(render);          //계속해서 frame을 돌려주겠다.
    particles.forEach(particle=>particle.animate());
    if(mouse.isActive) {
        let velocity = {
            x:0,
            y:0,
        }
        new Particle(mouse.x, mouse.y, mouse.radius, velocity).animate();
    }
}
// 5. 실행하기
render();

// 6. 윈도우 resize 이벤트 정의(창의 크기가 변하면 canvas크기도 창의 크기로 변경)
window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

// 7. 마우스 이벤트 연결하기
//아직 그린거 아님 animate로 그릴거임!
canvas.addEventListener('mouseenter',function(){
                        //*mouseenter : mouseenter - 사용자가 마우스를 해당 element 바깥에서 안으로 옮겼을 때 발생합니다.
                        // - 버블링이 발생하지 않습니다.
    mouse.isActive = true;
})
canvas.addEventListener('mouseleave',function(){ 
    mouse.isActive = false;
})
canvas.addEventListener('mousemove',function(e){
    mouse.x = e.pageX;
    mouse.y = e.pageY;
})