'use strict'

// Retrived the Notes saved
let notes = getSavedNotes();

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters);

document.querySelector('#create-note').addEventListener('click', (e) => {
    //alert('Click on create note')
    //document.querySelector.
    const id = uuidv4();
    const timestamp = moment().valueOf();
    console.log(moment(timestamp).toString())
    
    
    notes.push ({
        id:id,
        title:'',
        body:'',
        createdAt:timestamp,
        updatedAt:timestamp
    })
    console.log(notes)
    saveNotes(notes);
    location.assign(`/note.html#${id}`);
   // renderNotes(notes, filters);
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value;
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes') {
        notes = JSON.parse(e.newValue);
        saveNotes(notes)
        renderNotes(notes, filters)

    }
})

// Unix Epoch Jan 1st 1970 00:00:00

// let now = moment();
// now.add(1, 'year').subtract(20, 'days')
// console.log(now.format('MMMM, Do, YYYY'));

// const nowTimestamp = now.valueOf();
// console.log(moment(nowTimestamp).toString())

// const birthday = moment();
// birthday.year(1982).month(6).date(8);
// console.log(birthday.format('MMMM, Do, YYYY'))