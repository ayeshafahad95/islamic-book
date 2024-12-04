'use client'

import { useState, useEffect } from 'react'

interface Book {
  id: number
  title: string
  author: string
  image: string
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [image, setImage] = useState('')

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    const response = await fetch('/api/books')
    const data = await response.json()
    setBooks(data)
  }

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, image }),
    })
    if (response.ok) {
      setTitle('')
      setAuthor('')
      setImage('')
      fetchBooks()
    }
  }

  const updateBook = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingBook) return
    const response = await fetch('/api/books', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingBook.id, title, author, image }),
    })
    if (response.ok) {
      setEditingBook(null)
      setTitle('')
      setAuthor('')
      setImage('')
      fetchBooks()
    }
  }

  const deleteBook = async (id: number) => {
    const response = await fetch('/api/books', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (response.ok) {
      fetchBooks()
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-gradient-to-b from-blue-500 via-gray-100 to-gray-200"
      style={{
        backgroundImage: `url('https://example.com/your-background-image.jpg')`,
      }}
    >
      <div className="bg-gradient-to-b from-blue-500 via-gray-50 to-transparent py-8 px-4 min-h-screen">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          📚 Book Management
        </h1>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md p-6 transform transition hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-4">Author: {book.author}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setEditingBook(book)
                    setTitle(book.title)
                    setAuthor(book.author)
                    setImage(book.image)
                  }}
                  className="px-4 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {editingBook ? 'Edit Book' : 'Add a New Book'}
          </h2>
          <form
            onSubmit={editingBook ? updateBook : addBook}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="w-full p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
              >
                {editingBook ? 'Update' : 'Add'} Book
              </button>
              {editingBook && (
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="px-6 py-2 bg-gray-400 text-white rounded shadow hover:bg-gray-500 focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
