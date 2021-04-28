//moveing notes
// const notes = document.querySelectorAll('.notes');
const notes = document.querySelectorAll('.notes');
const notesBar = document.querySelectorAll('.notes__top-bar');
const noteText = document.querySelectorAll('.notes__text');
let idNotes = [];
notes.forEach(id => {
    idNotes.push(id.dataset.note)
})
let savePositionX;
let savePositionY;
let saveContent;
if (JSON.parse(localStorage.getItem('notesPositionX')) != null) {
    savePositionX = JSON.parse(localStorage.getItem('notesPositionX'));
    savePositionY = JSON.parse(localStorage.getItem('notesPositionY'))
    for (let i = 0; i < savePositionX.length; i++) {
        notes[i].style.top = `${savePositionY[i]}px`;
        notes[i].style.left = `${savePositionX[i]}px`;
    }
}
if (JSON.parse(localStorage.getItem('notesText')) != null) {
    saveContent = JSON.parse(localStorage.getItem('notesText'));
    for (let i = 0; i < saveContent.length; i++) {

        document.querySelector(`[data-content='${idNotes[i]}']`).textContent = saveContent[i];

    }
}
//define variables
let active = false;
let notesX = [];
let notesY = [];
let notesContent = [];
if (JSON.parse(localStorage.getItem('notesText')) != null) {
    for (let i = 0; i < saveContent.length; i++) {
        notesContent[i] = saveContent[i];
    }
}
// notesContent.length = idNotes.length;
let insertX;
let insertY;
let moveNote;

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

const startMove = function(e) {
    active = !active;
    moveNote = document.querySelector(`[data-note='${this.dataset.bar}'] `)

    dataNote = this.dataset.bar;
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
    //save text


const saveText = function() {
    let contentIndex = idNotes.indexOf(this.dataset.content);
    notesContent[contentIndex] = this.value;
    localStorage.setItem('notesText', JSON.stringify(notesContent));
}

noteText.forEach(noteText => {
    noteText.addEventListener('keyup', saveText);
})