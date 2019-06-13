import { setEditPage, generatelastEdited } from './views'
import { updateNote, removeNote } from './notes'

const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const removeElement = document.querySelector('#remove-note');
const dateElement = document.querySelector('#last-edit');

const noteId = location.hash.substring(1)

setEditPage(noteId)

//Set input even for title
titleElement.addEventListener('change', (e) => {
    // update the note object and save it
    const note = updateNote(noteId, {title:e.target.value})
    dateElement.textContent = generatelastEdited(note.updatedAt);
})

//Set input even for body
bodyElement.addEventListener('change', (e) => {
    // update the note object and save it
    const note = updateNote(noteId, {body:e.target.value})
    dateElement.textContent = generatelastEdited(note.updatedAt);

})

removeElement.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('/index.html')
})

// Syncying values across editing pages 
// When notes are changed on window a - storage event will fire on window b. 
// e.key = notes will be with oldValue and newValue. 
window.addEventListener('storage', (e) => {
    if(e.key === 'notes') {
        setEditPage(noteId)
    }
})

