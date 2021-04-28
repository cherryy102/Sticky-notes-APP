//moveing notes
// const notes = document.querySelectorAll('.notes');
const notesBar = document.querySelectorAll('.notes');

let savePositionX;
let savePositionY;
if (JSON.parse(localStorage.getItem('notesPositionX')) != null) {
    savePositionX = JSON.parse(localStorage.getItem('notesPositionX'));
    savePositionY = JSON.parse(localStorage.getItem('notesPositionY'))
    for (let i = 0; i < savePositionX.length; i++) {
        notesBar[i].style.top = `${savePositionY[i]}px`;
        notesBar[i].style.left = `${savePositionX[i]}px`;
    }
}
//define variables
let active = false;
let notesX = [];
let notesY = [];
let notesContent = [];
let insertX;
let insertY;
let moveNote;
let idNotes = [];
let index;
//function check if localStorage can be used
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
notesBar.forEach(id => {
    idNotes.push(id.dataset.note)
})
const startMove = function(e) {
    active = !active;
    moveNote = document.querySelector(`[data-note='${this.dataset.note}'] `)

    dataNote = this.dataset.note;
    insertX = e.offsetX;
    insertY = e.offsetY;
}
const moving = function(e) {
    if (active) {
        index = idNotes.indexOf(dataNote);

        notesX[index] = e.clientX - insertX;
        notesY[index] = e.clientY - insertY;
        if (savePositionX) {
            for (let i = 0; i < savePositionX.length; i++) {
                if (notesX[i] == null) {
                    notesX[i] = savePositionX[i];
                    notesY[i] = savePositionY[i];
                }
            }
        }
        moveNote.style.top = `${notesY[index]}px`
        moveNote.style.left = `${notesX[index]}px`
    }
}
const endMove = function(e) {
        active = !active;
        //if localStorage can be used create variable
        if (localStorageTest()) {
            localStorage.setItem('notesPositionX', JSON.stringify(notesX));
            localStorage.setItem('notesPositionY', JSON.stringify(notesY));
        }
    }
    //function call
notesBar.forEach(noteBar => {
    noteBar.addEventListener('mousedown', startMove);
    noteBar.addEventListener('mouseup', endMove)
})
document.addEventListener('mousemove', moving)