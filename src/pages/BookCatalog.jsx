import React, { useEffect, useState } from "react";
import { books as allBooks } from "../assets";
import { FaMagnifyingGlass, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BookCatalog = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        setLoading(true);
        try {
            setBooks(allBooks);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!search.trim()) {
            setFilteredBooks([]);
            return;
        }

        const trimmedSearch = search.trim().toLowerCase();
        const results = books.filter(
            (book) =>
                book.title.toLowerCase().includes(trimmedSearch) ||
                book.author.toLowerCase().includes(trimmedSearch) ||
                book.category.toLowerCase().includes(trimmedSearch)
        );
        setFilteredBooks(results);
    }, [search, books]);

    return (
        <div className="">
            <div className="flex items-center flex-col my-4 mx-auto gap-12 py-4">
                {/* Search and Results Container */}
                <div className="relative w-96">
                    <input
                        type="text"
                        placeholder="Search Title, Author, Category"
                        className="border-gray-600 border-2 w-full px-6 py-2 rounded-full"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <div className="absolute bg-blue-500 right-1 cursor-pointer px-2 py-2 top-1.5 rounded-full">
                        <FaMagnifyingGlass className="text-white" />
                    </div>

                    {/* Overlayed Filtered Results */}
                    {filteredBooks.length > 0 && (
                        <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-lg z-10 max-h-96 flex flex-col gap-2">
                            {filteredBooks.map((book) => (
                                <Link to={`/books/${book.id}`}>
                                <div
                                    key={book.id}
                                    className="px-4 py-2 hover:bg-gray-100 flex gap-4 items-center"
                                >
                                    <div className="h-14 w-10 overflow-hidden flex-shrink-0">
                                        <img
                                            src={book.coverImage}
                                            alt={book.title}
                                            className="h-full w-full object-cover rounded"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{book.title}</p>
                                        <p className="text-sm text-gray-500">{book.author}</p>
                                    </div>
                                </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

              

                {/* Book Grid */}
                <div>
                <h1 className="text-2xl font-semibold mb-4 ml-3">
                        My library
                    </h1>
                    {books ? (
                        <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                            {books.map((book) => (
                                <div
                                    key={book.id}
                                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group w-64"
                                >
                                    <div className="h-64 overflow-hidden w-full">
                                        <img
                                            src={book.coverImage}
                                            alt=""
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                                                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
                                                    {book.category}
                                                </span>
                                            </h3>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-auto">
                                            by {book.author}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <FaStar className="text-yellow-500 mr-1" />
                                                <span className="text-gray-700 font-medium">
                                                    {book.rating}
                                                </span>
                                            </div>

                                            <span className="text-lg font-bold text-indigo-600">
                                                ${book.price}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex space-x-2 justify-center items-center">
                                            <Link
                                                to={`/books/${book.id}`}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 px-4 rounded-lg transition-colors"
                                            >
                                                View Details
                                            </Link>

                                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg transition-colors">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookCatalog;
