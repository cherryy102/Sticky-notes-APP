const div = document.querySelector('div');
let width;
let height;
if (localStorage.getItem('widthX') !== null) {
    width = localStorage.getItem('widthX');
    height = localStorage.getItem('heightY');
    div.style.top = `${height}px`;
    div.style.left = `${width}px`;
}
let active = false;
let divX = 0;
let divY = 0;
let insertX;
let insertY;
//funkcja sprawdza czy mozna uzywac localStorage
function localStorageTest() {
    const test = "test" + new Date().valueOf();
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}
const startMove = function(e) {
    active = !active;
    e.target.style.backgroundColor = 'grey';
    insertX = e.offsetX;
    insertY = e.offsetY;
}
const moving = function(e) {
    if (active) {
        divX = e.clientX - insertX;
        divY = e.clientY - insertY;
        div.style.top = `${divY}px`
        div.style.left = `${divX}px`
    }
}
const endMove = function(e) {
        active = !active;
        e.target.style.backgroundColor = 'black';
        //sprawdzanie czy mozna korzystac z localstorage
        if (localStorageTest()) {
            localStorage.setItem('widthX', divX);
            localStorage.setItem('heightY', divY);
        }
    }
    //wywolanie
div.addEventListener('mousedown', startMove);
document.addEventListener('mousemove', moving)
div.addEventListener('mouseup', endMove)