let arts = document.querySelectorAll('article');
let lis = document.querySelectorAll('.leftnav li');
document.addEventListener('scroll',function(){
    let sct = document.documentElement.scrollTop;
    for(let i=0; i<arts.length; i++){
        let znum = i*-5000;
        let znum2 = znum+sct;
        arts[i].style.transform = `translateZ(${znum2}px)`;
    }
    if(sct < 1000){
        arts[0].style.opacity = 0.5;
    }
    // if(sct >=1000 ){
    //     arts[0].style.opacity = 1; 
    //     arts[1].style.opacity = 0.5; 
    //     arts[2].style.opacity = 0.5;
    //     arts[3].style.opacity = 0.5; 
    //     arts[4].style.opacity = 0.5;
    // }
    // if( sct>=5000 ){
    //     arts[1].style.opacity = 1;
    //     arts[0].style.opacity = 0.5; 
    //     arts[2].style.opacity = 0.5; 
    //     arts[3].style.opacity = 0.5; 
    //     arts[4].style.opacity = 0.5;
    // }
    // if( sct >=9000 ){
    //     arts[2].style.opacity = 1;
    //     arts[0].style.opacity = 0.5; 
    //     arts[1].style.opacity = 0.5; 
    //     arts[3].style.opacity = 0.5; 
    //     arts[4].style.opacity = 0.5;
    // }
    // if( sct >= 13000 ){
    //     arts[3].style.opacity = 1;
    //     arts[0].style.opacity = 0.5; 
    //     arts[1].style.opacity = 0.5; 
    //     arts[2].style.opacity = 0.5; 
    //     arts[4].style.opacity = 0.5; 
    // }
    // if ( sct >= 17000 ){
    //     arts[4].style.opacity = 1;
    //     arts[0].style.opacity = 0.5; 
    //     arts[1].style.opacity = 0.5; 
    //     arts[2].style.opacity = 0.5;
    //     arts[3].style.opacity = 0.5; 
    // }
    for(let i=0; i<arts.length; i++){
        if(sct >= 1000+(4000*i)){
            arts[i].style.opacity = 1;
            lis[i].classList.add('on');
            arts.forEach((art,index)=>{
                if(i!=index){
                    art.style.opacity = 0.5;
                }
            })
            lis.forEach((li,index)=>{
                if(i!=index){
                    li.classList.remove('on');
                }
            })
        }
    }
})
lis.forEach((li,index)=>{
    li.addEventListener('click',function(e){
        //이벤트를 제거 
        e.preventDefault();
        let scTop = 1000+(index*4000);
        window.scrollTo({top:scTop,behavior:'smooth'});
        console.log(scTop);
    })
})
