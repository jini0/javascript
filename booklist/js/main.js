function loadBooks(){
   return fetch('data/data.json')           //return 을 꼭 해줘야함!!
  .then((response) => response.json())
  .then((data) => data.books);
}
function displayBooks(books){
    const container = document.querySelector('.books');
                            //맨위에 고정적인요소(글쓴이/제목/년도)는 바뀌는 값이 아니니까 ""이렇게 따로 추가해줘야함!
    container.innerHTML = " <tr><th>글쓴이</th><th>제목</th><th>년도</th></tr>"+books.map(book=>{
        return `
        <tr>
            <td class='book'>${book.writer}</td>
            <td class='book'>${book.title}</td>
            <td class='book'>${book.year}</td>
        </tr>`
    }).join("");
}
function setEventListeners(books){
    const buttons = document.querySelector('.buttonDiv');
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', ()=> displayBooks(books));    
    buttons.addEventListener('click', event => onButtonClick(event, books));
}
function onButtonClick(event, books){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    if(key == null || value == null ){
        return;                 
    }
    const filterd = books.filter(book=> book[key] === value );
    console.log(filterd);
    displayBooks(filterd);
}

//main 프로미스 소비자
loadBooks()
.then(books => {                
    console.log(books);
    displayBooks(books);
    setEventListeners(books);
})
.catch(error=>{
    console.log(error);
})
.finally(()=>{
    console.log('Promise 끝');
})