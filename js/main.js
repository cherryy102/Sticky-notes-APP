const notesBar = document.querySelectorAll('.notes__top-bar');
const noteText = document.querySelectorAll('.notes__text');
let idNotes = ['note1'];
//start notes
if (JSON.parse(localStorage.getItem('idNotesLocal'))) {
    idNotes = JSON.parse(localStorage.getItem('idNotesLocal'));
    for (let i = 1; i < idNotes.length; i++) {
        const startDiv = document.createElement('div');
        startDiv.classList.add('notes');
        startDiv.dataset.note = `${idNotes[i]}`;
        startDiv.innerHTML = ` <div class="notes__top-bar" data-bar='${idNotes[i]}'>
    <div class="notes__create-box"><img class="notes__create" src="img/add.png" alt=""></div>
    <div class="notes__close-box"><img class="notes__close" src="img/cancel.png" alt=""></div>
</div>
<div class="notes__content"><textarea class="notes__text" data-content="${idNotes[i]}"></textarea></div>
<div class="notes__bottom-bar">
    <div class="notes__bold"></div>
    <div class="notes__cursive"></div>
    <div class="notes__underline"></div>
    <div class="notes__add-list"></div>
</div>`
        document.querySelector('.box').appendChild(startDiv);
    }

}

//define variables
const notes = document.querySelectorAll('.notes');
let savePositionX;
let savePositionY;
let saveContent;
let active = false;
let notesX = [];
let notesY = [];
let notesContent = [];
let dataNameNUmber = 1;
let insertX;
let insertY;
let moveNote;
let dataNote;
let index;

//start notes position
if (JSON.parse(localStorage.getItem('notesPositionX'))) {
    savePositionX = JSON.parse(localStorage.getItem('notesPositionX'));
    savePositionY = JSON.parse(localStorage.getItem('notesPositionY'))
    for (let i = 0; i < savePositionX.length; i++) {
        notes[i].style.top = `${savePositionY[i]}px`;
        notes[i].style.left = `${savePositionX[i]}px`;
    }
}

//start contenst of notes
if (JSON.parse(localStorage.getItem('notesText'))) {
    saveContent = JSON.parse(localStorage.getItem('notesText'));
    for (let i = 0; i < saveContent.length; i++) {

        document.querySelector(`[data-content='${idNotes[i]}']`).textContent = saveContent[i];

    }
}

//save number to lcoal
if (localStorage.getItem('dataNameNubmerLocal')) {
    dataNameNUmber = localStorage.getItem('dataNameNubmerLocal');
}

//fix disappearing variables
if (JSON.parse(localStorage.getItem('notesText'))) {
    for (let i = 0; i < saveContent.length; i++) {
        notesContent[i] = saveContent[i];
    }
}
notesContent.length = idNotes.length;

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

//create new note
const addNote = function() {
    const div = document.createElement('div');
    div.classList.add('notes');
    dataNameNUmber++;
    let dataName = `note${dataNameNUmber}`
    div.dataset.note = `${dataName}`;
    div.innerHTML = ` <div class="notes__top-bar" data-bar='${dataName}'>
    <div class="notes__create-box"><img class="notes__create" src="img/add.png" alt=""></div>
    <div class="notes__close-box"><img class="notes__close" src="img/cancel.png" alt=""></div>
</div>
<div class="notes__content"><textarea class="notes__text" data-content="${dataName}"></textarea></div>
<div class="notes__bottom-bar">
    <div class="notes__bold"></div>
    <div class="notes__cursive"></div>
    <div class="notes__underline"></div>
    <div class="notes__add-list"></div>
</div>`
    document.querySelector('.box').appendChild(div);
    idNotes.push(dataName);
    localStorage.setItem('dataNameNubmerLocal', dataNameNUmber);
    localStorage.setItem('idNotesLocal', JSON.stringify(idNotes));

}
$(document).on('click', '.notes__create', addNote);

//mousedown function
const startMove = function(e) {
    active = !active;
    moveNote = document.querySelector(`[data-note='${this.dataset.bar}'] `)

    dataNote = this.dataset.bar;
    insertX = e.offsetX;
    insertY = e.offsetY;
}

//mouseup function
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

//mousemove function
const endMove = function(e) {
    active = !active;
    //if localStorage can be used create variable
    if (localStorageTest()) {
        localStorage.setItem('notesPositionX', JSON.stringify(notesX));
        localStorage.setItem('notesPositionY', JSON.stringify(notesY));
    }
}
$(document).on('mousedown', '.notes__top-bar', startMove);
$(document).on('mouseup', '.notes__top-bar', endMove);
document.addEventListener('mousemove', moving);

//save text
const saveText = function() {
    let contentIndex = idNotes.indexOf(this.dataset.content);
    notesContent[contentIndex] = this.value;
    localStorage.setItem('notesText', JSON.stringify(notesContent));
}
$(document).on('keyup', '.notes__text', saveText);