import {
    WaveGroup
} from './wavegroup.js';
class App {
    constructor() {
        //캔버스 생성하기
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.WaveGroup = new WaveGroup();
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);
        this.WaveGroup.resize(this.stageWidth, this.stageHeight);
    }
    animate(t){
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
        this.WaveGroup.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    }
}
//window가 업로드 될 때 실행!
window.onload = ()=>{
    new App();
}