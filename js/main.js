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
let listActive = [];
let listContentSave = [];
if (JSON.parse(localStorage.getItem('listActive'))) {
    listActive = JSON.parse(localStorage.getItem('listActive'));
}
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
    <div class="notes__content" data-content="${idNotes[i]}"><textarea  class="notes__title" data-title="${idNotes[i]}" placeholder='Title'></textarea><textarea class="notes__text" data-text="${idNotes[i]}"  placeholder='Text'></textarea></div>
    <div class="notes__bottom-bar">
        <div class="notes__mode notes__mode--bold"><i class="fas fa-bold"></i></div>
        <div class="notes__mode notes__mode--cursive"><i class="fas fa-italic"></i></div>
        <div class="notes__mode notes__mode--list" data-list="${idNotes[i]}"><i class="fas fa-list-ul"></i></div>
    </div>`;
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
//list content 
if (JSON.parse(localStorage.getItem('listContentSave'))) {
    listContentSave = JSON.parse(localStorage.getItem('listContentSave'));
    for (let i = 0; i < idNotes.length; i++) {
        if (listActive[i] === true) {
            document.querySelector(`[data-content='${idNotes[i]}']`).innerHTML = `<textarea  class="notes__title" data-title="${idNotes[i]}" placeholder='Title'></textarea><ul data-lists='${idNotes[i]}'><ul>`;
            document.querySelector(`[data-lists='${idNotes[i]}']`).innerHTML = listContentSave[i];
        } else if (listActive[i] === false) {
            document.querySelector(`[data-content='${idNotes[i]}']`).innerHTML = `<textarea  class="notes__title" data-title="${idNotes[i]}" placeholder='Title'></textarea><textarea class="notes__text" data-text="${idNotes[i]}"  placeholder='Text'></textarea>`;
        }

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
        if (saveContent[i] != null && saveContent[i] != '') {
            document.querySelector(`[data-text='${idNotes[i]}']`).textContent = saveContent[i];
        }

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
<div class="notes__content" data-content="${dataName}"><textarea class="notes__title" data-title="${dataName}" placeholder='Title'></textarea><textarea class="notes__text" data-text="${dataName}" placeholder='Text'></textarea></div>
<div class="notes__bottom-bar">
    <div class="notes__mode notes__mode--bold"><i class="fas fa-bold"></i></div>
    <div class="notes__mode notes__mode--cursive"><i class="fas fa-italic"></i></div>
    <div class="notes__mode notes__mode--list" data-list="${dataName}"><i class="fas fa-list-ul" ></i></div>
</div>`
    document.querySelector('.box').appendChild(div);
    idNotes.push(dataName);
    listActive.push(false);
    localStorage.setItem('dataNameNubmerLocal', dataNameNUmber);

    localStorage.setItem('idNotesLocal', JSON.stringify(idNotes));
    localStorage.setItem('listActive', JSON.stringify(listActive));

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
    let contentIndex = idNotes.indexOf(this.dataset.text);
    if (!listActive[contentIndex]) {
        notesContent[contentIndex] = this.value;
        localStorage.setItem('notesText', JSON.stringify(notesContent));
    }

}
$(document).on('keyup', '.notes__text', saveText);
let noteNameId;
//get note names
function getNotesName() {
    noteNameId = this.dataset.note;
}
$(document).on('click', '.notes', getNotesName);
//declare id of data-item
let dataItemNumber = 1;
if (localStorage.getItem('dataItemNumber')) {
    dataItemNumber = localStorage.getItem('dataItemNumber');
}
const dataItemNumberPlus = () => {
    dataItemNumber++;
}
$(document).on('keydown', `[data-item]`, dataItemNumberPlus);
//list mode 
let focusNumber = 0;
if (localStorage.getItem('focusNumber')) {
    focusNumber = localStorage.getItem('focusNumber');
}
const addListmode = function() {
    dataItemNumber++;
    focusNumber++;
    let noteIndexList = idNotes.indexOf(this.dataset.list);
    if (notesContent[noteIndexList] === '' || notesContent.length === 0 || notesContent[noteIndexList] === undefined) {
        let dataContent = this.dataset.list;
        listActive[noteIndexList] = true;

        if (listActive[noteIndexList] === true) {
            document.querySelector(`[data-content='${dataContent}']`).innerHTML = `<textarea type="text" class="notes__title" data-title="${dataContent}" placeholder='Title'></textarea>
            <ul data-lists='${dataContent}'>
           
            <li data-item-li="${dataItemNumber}"><input type="text" class=notes__list-item data-item="${dataItemNumber}" value='' data-focus='${focusNumber}'></li>
        </ul>`;
            // <li data-item-li="${dataItemNumber}"><input type="text" class=notes__list-item data-item="${dataItemNumber}" value='' data-foxus='${focusNumber}'></li>
            localStorage.setItem('listActive', JSON.stringify(listActive));
            localStorage.setItem('dataItemNumber', dataItemNumber);
            localStorage.setItem('focusNumber', focusNumber);
        }
    }
}

$(document).on('click', '.notes__mode--list', addListmode);
//add next list item
const addNextItemToList = function(e) {
        let listIndex = idNotes.indexOf(noteNameId);
        const dataItem = this.dataset.item;
        const valueItem = document.querySelector(`[data-item='${dataItem}']`).value;
        const itemText = document.querySelector(`[data-item='${dataItem}']`);
        itemText.setAttribute('value', valueItem);
        const ulSave = document.querySelector(`[data-lists='${noteNameId}']`);
        listContentSave[listIndex] = ulSave.innerHTML;
        const enter = e.keyCode;
        let focus = this.dataset.focus;
        focus = Number(focus);
        if (enter === 13) {
            dataItemNumber++;
            focusNumber++;
            const li = document.createElement('li');
            li.setAttribute('data-item-li', dataItemNumber);
            li.innerHTML = `<input type="text" class='notes__list-item' data-item="${dataItemNumber}" data-focus='${focusNumber}'>`;
            document.querySelector(`[data-lists='${noteNameId}']`).appendChild(li);

            listContentSave[listIndex] = ulSave.innerHTML;
            localStorage.setItem('listContentSave', JSON.stringify(listContentSave))
            localStorage.setItem('dataItemNumber', dataItemNumber);
            localStorage.setItem('focusNumber', focusNumber);
            document.querySelector(`[data-focus='${focus + 1}']`).focus();
        }

        localStorage.setItem('listContentSave', JSON.stringify(listContentSave))
        localStorage.setItem('dataItemNumber', dataItemNumber);
    }
    //remove list item
const removeListItem = function(e) {
    const dataItemRemove = this.dataset.item;
    const item = document.querySelector(`[data-item='${dataItemRemove}']`);
    let focusRemove = this.dataset.focus;
    focusRemove = Number(focusRemove);
    if (e.keyCode === 8 && item.value === '') {
        let listIndexRemove = idNotes.indexOf(noteNameId);
        const itemLi = document.querySelector(`[data-item-li='${dataItemRemove}']`);
        const notesContent = document.querySelector(`[data-content = '${noteNameId}']`);
        const ulSave = document.querySelector(`[data-lists='${noteNameId}']`);
        itemLi.remove();
        listContentSave[listIndexRemove] = ulSave.innerHTML;
        localStorage.setItem('listContentSave', JSON.stringify(listContentSave))
        const li = document.querySelectorAll(`[data-lists='${noteNameId}'] [data-item-li]`);
        if (li.length > 0) {
            document.querySelector(`[data-focus='${focusRemove - 1}']`).focus();
        }

        if (li.length === 0) {
            notesContent.innerHTML = `<textarea  class="notes__title" data-title="${noteNameId}" placeholder='Title'></textarea><textarea class="notes__text" data-text="${noteNameId}"  placeholder='Text'></textarea>`;
            listActive[listIndexRemove] = false;
            localStorage.setItem('listActive', JSON.stringify(listActive));
        }
    }
}
$(document).on('keyup', `[data-item]`, addNextItemToList);
$(document).on('keyup', `[data-item]`, removeListItem);
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
    listActive.splice(closeIndex, 1);
    listContentSave.splice(closeIndex, 1);
    localStorage.setItem('idNotesLocal', JSON.stringify(idNotes));
    localStorage.setItem('notesPositionX', JSON.stringify(notesX));
    localStorage.setItem('notesPositionY', JSON.stringify(notesY));
    localStorage.setItem('notesText', JSON.stringify(notesContent));
    localStorage.setItem('notesTitle', JSON.stringify(notesTitle));
    localStorage.setItem('listActive', JSON.stringify(listActive));
    localStorage.setItem('listContentSave', JSON.stringify(listContentSave));
    //reset dataNameNUmber
    if (idNotes.length === 0) {
        dataNameNUmber = 0;
        dataItemNumber = 0;
        localStorage.setItem('dataNameNubmerLocal', dataNameNUmber);
        localStorage.setItem('dataItemNumber', dataItemNumber);
    }
}
$(document).on('click', '.notes__close-box', deleteNote);