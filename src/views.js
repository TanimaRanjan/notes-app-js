import { removeNote, sortNotes, getNotes } from './notes'
import { getFilters } from './filters';
import moment from 'moment'


// Generate the DOM structure for a note 
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('div');
    const textEl = document.createElement('a')
    const noteButton = document.createElement('button');
    const notetime = document.createElement('span');

    //set up remove note button
    noteButton.textContent = 'x';
    noteButton.classList.add('button--secondary')
    noteButton.classList.add('button')
    noteEl.appendChild(noteButton);

    notetime.textContent = generatelastEdited(note.updatedAt)// moment(note.createdAt).format('MMMM, Do, YYYY').toString();

    // Add event listener to the button
    noteButton.addEventListener('click', (e) => {
        removeNote(note.id);
        renderNotes()
    })

    // set up note title text - Add the note to the Text Element (a tag)
    if(note.title.length > 0) {
        textEl.textContent = note.title;
    } else {
        textEl.textContent = 'Unamed note'
    }
    textEl.classList.add('list-item__title')
    textEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.appendChild(textEl)
    noteEl.classList.add('list-item')
    notetime.classList.add('list-item__subtitle')
    noteEl.appendChild(notetime);
    return noteEl;
}

// Render Notes
const renderNotes = () => {

    const filters = getFilters()
    const notes = sortNotes(filters.sortBy);

    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    const notesEl = document.querySelector('#notes')

    notesEl.innerHTML = ''

    if(filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note);
            notesEl.appendChild(noteEl);
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }

}


const generatelastEdited = (timestamp) => `Last Edited ${moment(timestamp).fromNow()}` 

const setEditPage = (noteId) => { 
    const titleElement = document.querySelector('#note-title');
    const bodyElement = document.querySelector('#note-body');
    const dateElement = document.querySelector('#last-edit');

    const notes = getNotes()

    const note = notes.find((note) => {
        return note.id === noteId
    })

    if(!note) {
        location.assign('/index.html')
    }

    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = generatelastEdited(note.updatedAt);
}

export { generateNoteDOM, renderNotes, generatelastEdited, setEditPage } 
