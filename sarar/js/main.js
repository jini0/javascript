let sec = document.querySelector('section');
let domImg = document.querySelector('#img');
let imgArr = [];
for(let i=0; i<=200; i++){
    imgArr.push(`img/pic${i}.jpg`);
}

sec.addEventListener('mousemove',function(e){
    let winw = window.innerWidth;
    let num = Math.floor(e.pageX/winw * 200);
                        //e.pageX : x좌표만 필요함!!!  / Math.floor(e.pageX/winw * 200) -->0~199까지 나옴
    // *퍼센트 구하기
    // 부분/전체 * 100
    // 부분/전체 * 200   --> 200을 곱해주면 200기준으로!!
    console.log(imgArr[num]);   
    domImg.src = imgArr[num];
        //.src는 innerHTML처럼 추가할 수 있음!!! img태그 안에 추가되는거 !!
})