import { getNotes, createNote } from './notes'
import { setFilters } from './filters'
import { renderNotes } from './views'

console.table(getNotes())
//[{"id":"ec5e0088-7b11-4ae5-91b3-6845b465ba97","title":"Test note 2","body":"Test note 2","createdAt":1559851339905,"updatedAt":1559851348766},{"id":"8da64de9-860c-4e4f-9362-f052a267372c","title":"Test Note 1 ","body":"Test notes","createdAt":1559851328136,"updatedAt":1559851338208},{"id":"7f1f6d20-9068-41da-b4a4-c5745b8f37b3","title":"Test Note 3","body":"Test note 3","createdAt":1559851350817,"updatedAt":1559851359577}]

renderNotes();

document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = createNote()
    location.assign(`/edit.html#${id}`);
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({searchText:e.target.value})
    renderNotes()
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    setFilters({sortBy:e.target.value})
    renderNotes()
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes') {
        renderNotes()
    }
})

