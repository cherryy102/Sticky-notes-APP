const notes = document.querySelector('div');
let notePositionX;
let notePositionY;
if (JSON.parse(localStorage.getItem('notePositionXX')) !== 'null') {
    notePositionX = JSON.parse(localStorage.getItem('notePositionX'));
    notePositionY = JSON.parse(localStorage.getItem('notePositionY'))
    notes.style.top = `${notePositionY[0]}px`;
    notes.style.left = `${notePositionX[0]}px`;
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
    e.target.style.backgroundColor = 'grey';
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
        e.target.style.backgroundColor = 'black';
        //sprawdzanie czy mozna korzystac z localstorage
        if (localStorageTest()) {
            localStorage.setItem('notePositionX', JSON.stringify(notesX));
            localStorage.setItem('notePositionY', JSON.stringify(notesY));
        }
    }
    //wywolanie
notes.addEventListener('mousedown', startMove);
document.addEventListener('mousemove', moving)
notes.addEventListener('mouseup', endMove)