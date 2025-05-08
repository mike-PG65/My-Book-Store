import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { books } from '../assets'
import { FaCartShopping } from "react-icons/fa6";

const BookDetails = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchBook = () => {
            try {
                const foundBook = books.find(book => book.id === parseInt(bookId))

                if (!foundBook) {
                    return "Book not Found"
                }
                setBook(foundBook)
                console.log(bookId)

            } catch (error) {
                console.log("Something went wrong!", error)

            } finally {
                setLoading(false)
            }


        };
        fetchBook();
    }, [bookId])
    return (
        <div className='container px-4 py-2 h-screen flex items-center justify-center'>
            {
                book && <div className='h-96 flex gap-6 bg-white px-6 py-3 rounded-lg w-200 '>

                    <img src={book.coverImage} alt="" className='h-full' />
                    <div className='flex flex-col gap-4'>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
                                    {book.category}
                                </span>
                            </h3>
                        </div>

                        <div className='mb-3'>
                            <h1 className='font-bold text-3xl'> {book.title}</h1>
                        </div>
                        <div className='flex flex-col gap-6'>

                            <p>
                                <small className='text-base text-gray-700 '>
                                    {book.description}
                                </small>
                            </p>
                            <p className='font-bold text-2xl'>{book.price}</p>
                        </div>

                        <button className='flex bg-blue-400 w-full py-2 items-center gap-2 justify-center rounded-full cursor-pointer'>
                            Add to cart
                            <FaCartShopping />
                        </button>
                    </div>

                </div>}
        </div>
    )
}

export default BookDetails
