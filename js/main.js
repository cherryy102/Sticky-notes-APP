let idNotes = [];
let notesTitle = [];
let saveContent = [];
let saveTitle = [];
let notesContent = [];
let listContentSave = [];
let listActive = [];
//start notes
if (localStorage.getItem('idNotesLocal')) {
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
    <div class="notes__mode notes__mode--bold" title="Bold"><i class="fas fa-bold"></i></div>
    <div class="notes__mode notes__mode--cursive" title="Italic"><i class="fas fa-italic"></i></div>
    <div class="notes__mode notes__mode--strikethrough" title="Strikethrough"><i class="fas fa-strikethrough" ></i>
    </div>
    <div class="notes__mode notes__mode--list" title="List"  data-list="${idNotes[i]}"><i class="fas fa-list-ul"></i></div>
    </div>`;
        document.querySelector('.box').appendChild(startDiv);
    }

    if (localStorage.getItem('listActive')) {
        listActive = JSON.parse(localStorage.getItem('listActive'));
    }
    if (localStorage.getItem('listContentSave')) {
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
    //start title of notes from localStorage

    if (localStorage.getItem('notesTitle')) {
        saveTitle = JSON.parse(localStorage.getItem('notesTitle'));
        for (let i = 0; i < saveTitle.length; i++) {
            document.querySelector(`[data-title='${idNotes[i]}']`).textContent = saveTitle[i];
        }
    }

    //start contents of notes from localStorage
    if (localStorage.getItem('notesText')) {
        saveContent = JSON.parse(localStorage.getItem('notesText'));
        for (let i = 0; i < saveContent.length; i++) {
            if (saveContent[i] != null && saveContent[i] != '') {
                document.querySelector(`[data-text='${idNotes[i]}']`).textContent = saveContent[i];
            }

        }
    }
}

//define variables
const notes = document.querySelectorAll('.notes');
let savePositionX;
let savePositionY;
let notesX = [];
let notesY = [];
//start notes position from localStorage
if (localStorage.getItem('notesPositionX')) {
    savePositionX = JSON.parse(localStorage.getItem('notesPositionX'));
    savePositionY = JSON.parse(localStorage.getItem('notesPositionY'))
    for (let i = 0; i < savePositionX.length; i++) {
        notes[i].style.top = `${savePositionY[i]}px`;
        notes[i].style.left = `${savePositionX[i]}px`;
        notesX[i] = savePositionX[i];
        notesY[i] = savePositionY[i];
    }
}
//list content from localStorage

//dataNameNUmber from localStorage
let dataNameNUmber = 0;
if (localStorage.getItem('dataNameNubmerLocal')) {
    dataNameNUmber = localStorage.getItem('dataNameNubmerLocal');

}
//fix disappearing variables
if (localStorage.getItem('notesText')) {
    for (let i = 0; i < saveContent.length; i++) {
        notesContent[i] = saveContent[i];
    }
}
if (localStorage.getItem('notesTitle')) {
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
<div class="notes__mode notes__mode--bold" title="Bold"><i class="fas fa-bold"></i></div>
<div class="notes__mode notes__mode--cursive" title="Italic"><i class="fas fa-italic"></i></div>
<div class="notes__mode notes__mode--strikethrough" title="Strikethrough"><i class="fas fa-strikethrough" ></i>
</div>
<div class="notes__mode notes__mode--list" title="List"  data-list="${dataName}"><i class="fas fa-list-ul"></i></div>
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
let active = false;
let insertX;
let insertY;
let moveNote;
let dataNote;
const startMove = function(e) {
    active = !active;
    moveNote = document.querySelector(`[data-note='${this.dataset.bar}'] `)
    dataNote = this.dataset.bar;
    insertX = e.offsetX;
    insertY = e.offsetY;
}
$(document).on('mousedown', '.notes__move-bar', startMove);
//mouseup function
let index;
const moving = function(e) {
    if (active) {
        index = idNotes.indexOf(dataNote);
        notesX[index] = e.clientX - insertX;
        notesY[index] = e.clientY - insertY;
        moveNote.style.top = `${notesY[index]}px`
        moveNote.style.left = `${notesX[index]}px`
    }
}
document.addEventListener('mousemove', moving);
//mousemove function
const endMove = function(e) {
    active = !active;
    //if localStorage can be used create variable
    localStorage.setItem('notesPositionX', JSON.stringify(notesX));
    localStorage.setItem('notesPositionY', JSON.stringify(notesY));
}

$(document).on('mouseup', '.notes__move-bar', endMove);

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

//get note names
let noteNameId;
let dataItemID;

function getNotesName() {
    noteNameId = this.dataset.note;
}
$(document).on('mousedown', '.notes', getNotesName);
//get data-item
function getDataItem() {
    dataItemID = this.dataset.item;
}
$(document).on('mousedown', '[data-item]', getDataItem);

//start value from localStorage of autoMoveCursorNumber
let autoMoveCursorNumber = [];
if (localStorage.getItem('autoMoveCursorNumber')) {
    autoMoveCursorNumber = JSON.parse(localStorage.getItem('autoMoveCursorNumber'));
}
//change to list mode
const addListmode = function() {
    let noteIndexList = idNotes.indexOf(this.dataset.list);
    autoMoveCursorNumber[noteIndexList] = 1;
    if (notesContent[noteIndexList] === '' || notesContent.length === 0 || notesContent[noteIndexList] === undefined) {
        let dataContent = this.dataset.list;
        listActive[noteIndexList] = true;

        if (listActive[noteIndexList] === true) {
            document.querySelector(`[data-content='${dataContent}']`).innerHTML = `<textarea type="text" class="notes__title" data-title="${dataContent}" placeholder='Title'></textarea>
            <ul data-lists='${dataContent}'>
           
            <li data-item-li="${autoMoveCursorNumber[noteIndexList]}"><input type="text" class=notes__list-item data-item="${autoMoveCursorNumber[noteIndexList]}" value='' data-focus='${autoMoveCursorNumber[noteIndexList]}'></li>
        </ul>`;
            localStorage.setItem('listActive', JSON.stringify(listActive));
            localStorage.setItem('autoMoveCursorNumber', JSON.stringify(autoMoveCursorNumber));
        }
    }
}

$(document).on('click', '.notes__mode--list', addListmode);

//add new list item
const addNextItemToList = function(e) {
    let listIndex = idNotes.indexOf(noteNameId);
    const dataItem = this.dataset.item;
    const valueItem = document.querySelector(`[data-lists='${noteNameId}'] [data-item='${dataItem}']`).value;
    const itemText = document.querySelector(`[data-lists='${noteNameId}'] [data-item='${dataItem}']`);
    itemText.setAttribute('value', valueItem);
    const ulSave = document.querySelector(`[data-lists='${noteNameId}']`);
    listContentSave[listIndex] = ulSave.innerHTML;
    const enter = e.keyCode;
    let focus = this.dataset.focus;
    focus = Number(focus);
    if (enter === 13) {
        autoMoveCursorNumber[listIndex] += 1;
        const li = document.createElement('li');
        li.setAttribute('data-item-li', autoMoveCursorNumber[listIndex]);
        li.innerHTML = `<input type="text" class='notes__list-item' data-item="${autoMoveCursorNumber[listIndex]}" data-focus='${autoMoveCursorNumber[listIndex]}'>`;
        document.querySelector(`[data-lists='${noteNameId}']`).appendChild(li);
        listContentSave[listIndex] = ulSave.innerHTML;
        localStorage.setItem('listContentSave', JSON.stringify(listContentSave));
        localStorage.setItem('autoMoveCursorNumber', JSON.stringify(autoMoveCursorNumber));
        //cursor go to next input
        while (document.querySelector(`[data-lists='${noteNameId}'] [data-focus='${focus + 1}']`) === null) {
            ++focus;
        }
        document.querySelector(`[data-lists='${noteNameId}'] [data-focus='${focus + 1}']`).focus();
    }
    listContentSave[listIndex] = ulSave.innerHTML;
    localStorage.setItem('listContentSave', JSON.stringify(listContentSave));
    localStorage.setItem('autoMoveCursorNumber', JSON.stringify(autoMoveCursorNumber));
}
$(document).on('keyup', `[data-item]`, addNextItemToList);
//remove list item
const removeListItem = function(e) {
    const dataItemRemove = this.dataset.item;
    const item = document.querySelector(`[data-item='${dataItemRemove}']`);
    let focusRemove = this.dataset.focus;
    focusRemove = Number(focusRemove);
    const firstElementUl = document.querySelectorAll(`[data-lists='${noteNameId}'] li`);
    let firstElementData = firstElementUl[0].getAttribute('data-item-li');
    if (e.keyCode === 8 && item.value === '') {
        let listIndexRemove = idNotes.indexOf(noteNameId);
        const itemLi = document.querySelector(`[data-lists='${noteNameId}'] [data-item-li='${dataItemRemove}']`);
        const notesContent = document.querySelector(`[data-content = '${noteNameId}']`);
        const ulSave = document.querySelector(`[data-lists='${noteNameId}']`);
        itemLi.remove();
        listContentSave[listIndexRemove] = ulSave.innerHTML;
        localStorage.setItem('listContentSave', JSON.stringify(listContentSave))
        const li = document.querySelectorAll(`[data-lists='${noteNameId}'] li`);

        if (li.length >= 1) {
            //cursor go to prev input
            if (focusRemove != firstElementData) {
                while (document.querySelector(`[data-lists='${noteNameId}'] [data-focus='${focusRemove - 1}']`) === null) {
                    --focusRemove;
                }
                document.querySelector(`[data-lists='${noteNameId}'] [data-focus='${focusRemove - 1}']`).focus();
            }
        }

        if (li.length === 0) {
            notesContent.innerHTML = `<textarea  class="notes__title" data-title="${noteNameId}" placeholder='Title'></textarea><textarea class="notes__text" data-text="${noteNameId}"  placeholder='Text'></textarea>`;
            listActive[listIndexRemove] = false;
            localStorage.setItem('listActive', JSON.stringify(listActive));
        }
    }
}
$(document).on('keyup', `[data-item]`, removeListItem);
//change font style - bold or cursive
const changeFontStyle = function(style) {
    const styleIndex = idNotes.indexOf(noteNameId);

    if (listActive[styleIndex] === false) {
        switch (style) {
            case 'italic':
                document.querySelector(`[data-text='${noteNameId}']`).classList.toggle('notes--cursive');
                break;
            case 'bold':
                document.querySelector(`[data-text='${noteNameId}']`).classList.toggle('notes--bold');
                break;
            case 'strikethrough':
                document.querySelector(`[data-text='${noteNameId}']`).classList.toggle('notes--strikethrough');
                break;
        }

    }
    if (listActive[styleIndex] === true && dataItemID != undefined) {
        switch (style) {
            case 'italic':
                document.querySelector(`[data-lists='${noteNameId}'] [data-item='${dataItemID}']`).classList.toggle('notes--cursive');
                listContentSave[styleIndex] = document.querySelector(`[data-lists='${noteNameId}']`).innerHTML;
                localStorage.setItem('listContentSave', JSON.stringify(listContentSave))
                break;
            case 'bold':
                document.querySelector(`[data-lists='${noteNameId}'] [data-item='${dataItemID}']`).classList.toggle('notes--bold');
                listContentSave[styleIndex] = document.querySelector(`[data-lists='${noteNameId}']`).innerHTML;
                localStorage.setItem('listContentSave', JSON.stringify(listContentSave))
                break;
            case 'strikethrough':
                document.querySelector(`[data-lists='${noteNameId}'] [data-item='${dataItemID}']`).classList.toggle('notes--strikethrough');
                listContentSave[styleIndex] = document.querySelector(`[data-lists='${noteNameId}']`).innerHTML;
                localStorage.setItem('listContentSave', JSON.stringify(listContentSave))
                break;
        }

    }
}
$(document).on('click', '.notes__mode--bold', () => {
    changeFontStyle('bold');
})
$(document).on('click', '.notes__mode--cursive', () => {
    changeFontStyle('italic');
})
$(document).on('click', '.notes__mode--strikethrough', () => {
    changeFontStyle('strikethrough');
})


//delete note
const deleteNote = function() {
    let dataClose = this.dataset.close;
    let closeIndex = idNotes.indexOf(dataClose);
    const removeDiv = document.querySelector(`[data-note='${dataClose}']`);
    removeDiv.remove();
    idNotes.splice(closeIndex, 1);
    notesX.splice(closeIndex, 1);
    notesY.splice(closeIndex, 1);
    notesContent.splice(closeIndex, 1);
    notesTitle.splice(closeIndex, 1);
    listActive.splice(closeIndex, 1);
    listContentSave.splice(closeIndex, 1);
    autoMoveCursorNumber.splice(closeIndex, 1);
    localStorage.setItem('idNotesLocal', JSON.stringify(idNotes));
    localStorage.setItem('notesPositionX', JSON.stringify(notesX));
    localStorage.setItem('notesPositionY', JSON.stringify(notesY));
    localStorage.setItem('notesText', JSON.stringify(notesContent));
    localStorage.setItem('notesTitle', JSON.stringify(notesTitle));
    localStorage.setItem('listActive', JSON.stringify(listActive));
    localStorage.setItem('listContentSave', JSON.stringify(listContentSave));
    localStorage.setItem('autoMoveCursorNumber', JSON.stringify(autoMoveCursorNumber));
    //reset variables
    if (idNotes.length === 0) {
        dataNameNUmber = 0;
        localStorage.setItem('dataNameNubmerLocal', dataNameNUmber);
    }
}
$(document).on('click', '.notes__close-box', deleteNote);