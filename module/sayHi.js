// 내보내고 싶은 애 앞에서 export 붙임(얘를 쓸 수 있도록!)
// 선언부에 바로 적어도 되고 / 선언부와 떨어뜨려서 적어줘도 됨
// export function sayHi(user){
//     return `안녕! ${user}`;
// }
// export function sayHi2(user){
//     return `랄랄라! ${user}`;
// }


function sayHi(user){
    return `안녕! ${user}`;
}
function sayHi2(user){
    return `랄랄라! ${user}`;
}
export { sayHi, sayHi2 };   // 두 함수를 내보냄 (선언부와 떨어뜨려 적어준거)