import { NextResponse } from "next/server";

let books = [
  { 
    id: 1, 
    title: 'The Sealed Nectar', 
    author: 'Safi-ur-Rahman al-Mubarakpuri', 
    image:'/id-1.jpg'
  },
  { 
    id: 2, 
    title: 'Fortress of the Muslim', 
    author: 'Saeed bin Ali bin Wahf Al-Qahtani', 
     image:'/id -2.jpg'
  },
  { 
    id: 3, 
    title: 'In the Footsteps of the Prophet', 
    author: 'Tariq Ramadan',
    image:'/id -3.jpg' 
  },
  { 
    id: 4, 
    title: 'Mans Search for Meaning', 
    author: 'Viktor E. Frankl', 
     image:'/id-4.jpg'
  },
  { 
    id: 5, 
    title: 'A Brief Illustrated Guide to Understanding Islam', 
    author: 'I.A. Ibrahim',
    image:'/id-5.jpg' 
  },
  { 
    id: 6, 
    title: 'Purification of the Heart', 
    author: 'Hamza Yusuf',  
     image:'/id-6.jpg'
  },
  { 
    id: 7, 
    title: 'Lost Islamic History', 
    author: 'Firas Alkhateeb',
    image:'/id-7.jpg' 
  },
  { 
    id: 8, 
    title: 'Dont Be Sad', 
    author: 'Aaidh ibn Abdullah al-Qarni', 
     image:'/id-8.jpg'
  },
];

export async function GET() {
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const book = await request.json();
  book.id = books.length + 1;
  books.push(book);
  return NextResponse.json(book, { status: 201 });
}

export async function PUT(request: Request) {
  const book = await request.json();
  const index = books.findIndex((b) => b.id === book.id);
  if (index !== -1) {
    books[index] = book;
    return NextResponse.json(book);
  }
  return NextResponse.json({ error: 'Book not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  books = books.filter((book) => book.id !== id);
  return NextResponse.json({ message: 'Book deleted' });
}