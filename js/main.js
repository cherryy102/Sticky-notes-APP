const notes = document.querySelector('.notes');
const notesBar = document.querySelector('.notes__top-bar');

let savePositionX;
let savePositionY;

if (JSON.parse(localStorage.getItem('notesPositionX')) != null) {
    savePositionX = JSON.parse(localStorage.getItem('notesPositionX'));
    savePositionY = JSON.parse(localStorage.getItem('notesPositionY'))
    notes.style.top = `${savePositionY[0]}px`;
    notes.style.left = `${savePositionX[0]}px`;
}
let active = false;
let notesX = [];
let notesY = [];
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
    insertX = e.offsetX;
    insertY = e.offsetY;
}
const moving = function(e) {
    if (active) {
        notesX[0] = e.clientX - insertX;
        notesY[0] = e.clientY - insertY;
        notes.style.top = `${notesY[0]}px`
        notes.style.left = `${notesX[0]}px`
    }
}
const endMove = function(e) {
        active = !active;
        //sprawdzanie czy mozna korzystac z localstorage
        if (localStorageTest()) {
            localStorage.setItem('notesPositionX', JSON.stringify(notesX));
            localStorage.setItem('notesPositionY', JSON.stringify(notesY));
        }
    }
    //wywolanie
notesBar.addEventListener('mousedown', startMove);
document.addEventListener('mousemove', moving)
notesBar.addEventListener('mouseup', endMove)