import { computed, reactive, watch } from 'vue'

const initialBooks = [
  { id: 'b1', title: 'Cien años de soledad', author: 'Gabriel García Márquez', category: 'Realismo mágico', description: 'La saga de la familia Buendía en el mítico pueblo de Macondo.', year: 1967 },
  { id: 'b2', title: 'La ciudad y los perros', author: 'Mario Vargas Llosa', category: 'Novela', description: 'Una mirada intensa a la vida en un colegio militar de Lima.', year: 1963 },
  { id: 'b3', title: 'Ficciones', author: 'Jorge Luis Borges', category: 'Cuento', description: 'Relatos que exploran laberintos, bibliotecas y mundos posibles.', year: 1944 },
]

function loadBooks() {
  try {
    const saved = localStorage.getItem('booklist-books')
    return saved ? JSON.parse(saved) : initialBooks
  } catch {
    return initialBooks
  }
}

const state = reactive({ books: loadBooks() })
watch(() => state.books, books => localStorage.setItem('booklist-books', JSON.stringify(books)), { deep: true })

export function useBooks() {
  const count = computed(() => state.books.length)
  const findBook = id => state.books.find(book => book.id === String(id))
  function saveBook(payload) {
    if (payload.id) {
      const index = state.books.findIndex(book => book.id === payload.id)
      if (index !== -1) state.books[index] = { ...payload }
      return
    }
    state.books.unshift({ ...payload, id: crypto.randomUUID() })
  }
  function removeBook(id) {
    const index = state.books.findIndex(book => book.id === id)
    if (index !== -1) state.books.splice(index, 1)
  }
  return { books: state.books, count, findBook, saveBook, removeBook }
}
