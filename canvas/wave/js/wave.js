import { Point } from "./point.js";

export class Wave {
    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }
    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;

        //포인트 생성간격
        this.pointGap = this.stageWidth / (this.totalPoints - 1);
        this.init();
    }
    init() {
        //포인트 배열을 생성
        this.points = [];
        for (let i=0; i<this.totalPoints; i++){
            const point = new Point(
                this.index + i,
                this.pointGap * i,
                this.centerY
            );
            //배열에 순서대로 포인트 객체를 넣음
            this.points[i] = point;
        }
        this.point = new Point(
            this.centerX,
            this.centerY,
        )
    }
    draw(ctx){
        ctx.beginPath();
        // ctx.fillStyle = '#ff0000';
        // this.point.update();
        // ctx.arc(this.point.x, this.point.y, 30, 0, Math.PI * 2);
        // ctx.fill();
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);
        //첫번째와 마지막 점은 그 위치에 두고 나머지만 업데이트
        //점을 6개찍어서 wave를 만들건데! 시작점 마지막점은 가만히 두고 중간에 있는 4개만 움직여줄거임!
        for(let i=1; i<this.totalPoints; i++){
            if(i < this.totalPoints -1){
                this.points[i].update();
            }
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            //곡선으로 변경
            // 2차 베지에 곡선 ( 컨트롤 포인트 1개) => quadraticCurveTo(제어점x, 제어점y, 종료점x, 종료점y)
            // 3차 베지에 곡선 ( 컨트롤 포인트 2개) => bezierCurveTo(제어점x1, 제어점y1, 제어점x2, 제어점y2, 종료점x, 종료점y)
            ctx.quadraticCurveTo(prevX, prevY, cx, cy);
            // ctx.lineTo(cx, cy); //직선
            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }
        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.closePath();
    }
}