// 두 수 사이의 랜덤 실수를 반환해주는 함수
function randomeFloatBetween(min, max){
    return Math.random() * (max-min+1) + min;       //최소값을 마지막에 더해주니까 최소값부터 나오는거임!
    //ex> 5,3 라면
    //Math.random() * (max-min+1) 이렇게 하면 실수가 나옴 + 거기에 min을 더하니까 
}
// 두 점 (x1, y1) 과 (x2, y2) 사이의 거리를 반환하는 함수 
// 각각 x끼리 비교 y끼리 비교 (거리 측정하는 애)
// ex)점과 점 사이의 거리를 구해서 그 거리가 300보다 작으면 -> 안이어지게 하는거 ->main.js에서!
function distance(x1, y1, x2, y2){
    const distX = x2 - x1;
    const distY = y2 - y1;
    return Math.sqrt(distX * distX + distY * distY);        
}
export default { randomeFloatBetween, distance };