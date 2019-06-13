import uuidv4 from 'uuid/v4'
import moment from 'moment';


let notes = []

// Read exiting notes from local storage or the DB
const loadNotes = () => {
    // Check existing saved data
    const notesJSON = localStorage.getItem('notes');
    try {
        // If there are noted then parse them to an array. 
        return notesJSON ?  JSON.parse(notesJSON) :  []    
    } catch (error) {
        return []        
    }
}

// Save Notes 
const saveNotes = () => {
    console.table(`Saving ${notes}`)
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Returns notes
const getNotes = () => notes 


// Create a note
const createNote = () => {
    const id = uuidv4();
    const timestamp = moment().valueOf();
    
    notes.push ({
        id:id,
        title:'',
        body:'',
        createdAt:timestamp,
        updatedAt:timestamp
    })
    saveNotes()
    return id
}


// Remove Notes
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
       if(noteIndex > -1)  {
           notes.splice(noteIndex, 1)
           saveNotes()
       }
}


const sortNotes = (sortBy) => {
    if(sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if(a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0;
            }

        })
    } else if(sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if(a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'alphabetically'){
        return notes.sort((a, b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0;
            }
        })
    } else {
        return notes
    }
}

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if(!note) {
        return 
    }

    if(typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    } 
    if(typeof updates.body === 'string') { 
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()
    return note
}


notes = loadNotes()


export { getNotes , createNote, removeNote, sortNotes, updateNote }