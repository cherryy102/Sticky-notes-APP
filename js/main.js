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
if (!localStorageTest()) {
    alert('Twoja przeglądarka nie obsługuje localStorage lub jest ono wyłączone. Notatki nie będą działać.');
}

let idNotes = [];
let saveIdNotes;
//start notes
if (JSON.parse(localStorage.getItem('idNotesLocal'))) {
    idNotes = JSON.parse(localStorage.getItem('idNotesLocal'));
    for (let i = 0; i < idNotes.length; i++) {
        const startDiv = document.createElement('div');
        startDiv.classList.add('notes');
        startDiv.dataset.note = `${idNotes[i]}`;
        startDiv.innerHTML = `  <div class="notes__top-bar">
        <div class="notes__create-box"><img class="notes__create" src="img/add.png" alt=""></div>
        <div class="notes__move-bar" data-bar='${idNotes[i]}'></div>
        <div class="notes__close-box" data-close='${idNotes[i]}' ><img class="notes__close" src="img/cancel.png" alt="">
        </div>
    </div>
    <div class="notes__content"><textarea  class="notes__title" data-title="${idNotes[i]}" placeholder='Title'></textarea><textarea class="notes__text" data-content="${idNotes[i]}"  placeholder='Text'></textarea></div>
    <div class="notes__bottom-bar">
        <div class="notes__mode notes__mode--bold"><i class="fas fa-bold"></i></div>
        <div class="notes__mode notes__mode--cursive"><i class="fas fa-italic"></i></div>
        <div class="notes__mode notes__mode--list"><i class="fas fa-list-ul"></i></div>
    </div>`
        document.querySelector('.box').appendChild(startDiv);
    }

}

//define variables
const notes = document.querySelectorAll('.notes');
let savePositionX;
let savePositionY;
let saveContent;
let saveTitle;
let active = false;
let notesX = [];
let notesY = [];
let notesContent = [];
let notesTitle = [];
let dataNameNUmber = 0;
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
        notesX[i] = savePositionX[i];
        notesY[i] = savePositionY[i];
    }
}
//start title of notes

if (JSON.parse(localStorage.getItem('notesTitle'))) {
    saveTitle = JSON.parse(localStorage.getItem('notesTitle'));
    for (let i = 0; i < saveTitle.length; i++) {
        document.querySelector(`[data-title='${idNotes[i]}']`).textContent = saveTitle[i];
    }
}

//start contents of notes
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
if (JSON.parse(localStorage.getItem('notesTitle'))) {
    for (let i = 0; i < saveTitle.length; i++) {
        notesTitle[i] = saveTitle[i];
    }
}

//create new note
const addNote = function() {
    const div = document.createElement('div');
    div.classList.add('notes');
    dataNameNUmber++;
    let dataName = `note${dataNameNUmber}`
    div.dataset.note = `${dataName}`;
    div.innerHTML = `  <div class="notes__top-bar">
    <div class="notes__create-box"><img class="notes__create" src="img/add.png" alt=""></div>
    <div class="notes__move-bar" data-bar='${dataName}'></div>
    <div class="notes__close-box" data-close='${dataName}'><img class="notes__close" src="img/cancel.png" alt="">
    </div>
</div>
<div class="notes__content"><textarea class="notes__title" data-title="${dataName}" placeholder='Title'></textarea><textarea class="notes__text" data-content="${dataName}" placeholder='Text'></textarea></div>
<div class="notes__bottom-bar">
    <div class="notes__mode notes__mode--bold"><i class="fas fa-bold"></i></div>
    <div class="notes__mode notes__mode--cursive"><i class="fas fa-italic"></i></div>
    <div class="notes__mode notes__mode--list"><i class="fas fa-list-ul"></i></div>
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
        moveNote.style.top = `${notesY[index]}px`
        moveNote.style.left = `${notesX[index]}px`
    }
}

//mousemove function
const endMove = function(e) {
    active = !active;
    //if localStorage can be used create variable
    localStorage.setItem('notesPositionX', JSON.stringify(notesX));
    localStorage.setItem('notesPositionY', JSON.stringify(notesY));
}
$(document).on('mousedown', '.notes__move-bar', startMove);
$(document).on('mouseup', '.notes__move-bar', endMove);
document.addEventListener('mousemove', moving);

//save title
const saveTitleLocal = function() {
    let titleIndex = idNotes.indexOf(this.dataset.title);
    notesTitle[titleIndex] = this.value;
    localStorage.setItem('notesTitle', JSON.stringify(notesTitle));
}
$(document).on('keyup', '.notes__title', saveTitleLocal);


//save text
const saveText = function() {
    let contentIndex = idNotes.indexOf(this.dataset.content);
    notesContent[contentIndex] = this.value;
    localStorage.setItem('notesText', JSON.stringify(notesContent));
}
$(document).on('keyup', '.notes__text', saveText);


//delete note
const deleteNote = function() {
    let dataClose = this.dataset.close;
    let closeIndex = idNotes.indexOf(dataClose);
    const removeDiv = document.querySelector(`[data-note='${dataClose}']`);
    document.querySelector('.box').removeChild(removeDiv);
    idNotes.splice(closeIndex, 1);
    notesX.splice(closeIndex, 1);
    notesY.splice(closeIndex, 1);
    notesContent.splice(closeIndex, 1);
    notesTitle.splice(closeIndex, 1);
    localStorage.setItem('idNotesLocal', JSON.stringify(idNotes));
    localStorage.setItem('notesPositionX', JSON.stringify(notesX));
    localStorage.setItem('notesPositionY', JSON.stringify(notesY));
    localStorage.setItem('notesText', JSON.stringify(notesContent));
    localStorage.setItem('notesTitle', JSON.stringify(notesTitle));

    //reset dataNameNUmber
    if (idNotes.length === 0) {
        dataNameNUmber = 0;
        localStorage.setItem('dataNameNubmerLocal', dataNameNUmber);
    }

}
$(document).on('click', '.notes__close-box', deleteNote);