//moveing notes
// const notes = document.querySelectorAll('.notes');
const notesBar = document.querySelectorAll('.notes');

let savePositionX;
let savePositionY;
notesBar.forEach(noteBar => {
    if (JSON.parse(localStorage.getItem('notesPositionX')) != null) {
        savePositionX = JSON.parse(localStorage.getItem('notesPositionX'));
        savePositionY = JSON.parse(localStorage.getItem('notesPositionY'))
        noteBar.style.top = `${savePositionY[0]}px`;
        noteBar.style.left = `${savePositionX[0]}px`;
    }
})
let active = false;
let notesX = [];
let notesY = [];
let insertX;
let insertY;
let moveNote;
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
    moveNote = document.querySelector(`[data-note='${this.getAttribute('data-note')}'] `)
    insertX = e.offsetX;
    insertY = e.offsetY;
}
const moving = function(e) {
    if (active) {
        notesX[0] = e.clientX - insertX;
        notesY[0] = e.clientY - insertY;
        moveNote.style.top = `${notesY[0]}px`
        moveNote.style.left = `${notesX[0]}px`
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
notesBar.forEach(noteBar => {
    noteBar.addEventListener('mousedown', startMove);
    noteBar.addEventListener('mouseup', endMove)
})
document.addEventListener('mousemove', moving)


//save text