import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { books } from "../assets";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchBook = () => {
        setLoading(true)
      try {
        const foundBook = books.find((book) => book.id === parseInt(bookId));

        if (!foundBook) {
          return "Book not Found";
        }
        setBook(foundBook);
        console.log(bookId);
      } catch (error) {
        console.log("Something went wrong!", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  useEffect(() => {
    if (book) {
      const similar = books.filter(
        (bookItem) =>
          bookItem.category === book.category && bookItem.id !== book.id
      );
      setRelated(similar);
    }
  }, [book]);
  if (!book) return <div className="mt-10">Book not found</div>;
  return (
    <div className="container px-4 py-2 h-full flex items-center justify-center flex-col">
      {book && (
        <div className="h-96 flex gap-6 bg-white px-6 py-3 rounded-lg w-200 ">
          <img src={book.coverImage} alt="" className="h-full" />
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
                  {book.category}
                </span>
              </h3>
            </div>

            <div className="mb-3">
              <h1 className="font-bold text-3xl"> {book.title}</h1>
            </div>
            <div className="flex flex-col gap-6">
              <p>
                <small className="text-base text-gray-700 ">
                  {book.description}
                </small>
              </p>
              <p className="font-bold text-2xl">{book.price}</p>
            </div>

            <button className="flex bg-blue-400 w-full py-2 items-center gap-2 justify-center rounded-full cursor-pointer">
              Add to cart
              <FaCartShopping />
            </button>
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-10 w-full">
          <h2 className="text-xl font-semibold mb-4">Related Books</h2>
          <div className="flex gap-4">
            {related.map((relBook) => (
              <div
                key={relBook.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group w-64 "
              >
                <div className="h-64 overflow-hidden w-full">
                  <img
                    src={relBook.coverImage}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
                        {relBook.category}
                      </span>
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-auto">
                    by {relBook.author}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                
                      <span className="text-gray-700 font-medium">
                        {relBook.rating}
                      </span>
                    </div>

                    <span className="text-lg font-bold text-indigo-600">
                      ${relBook.price}
                    </span>
                  </div>

                  <div className="mt-4 flex space-x-2 justify-center items-center">
                    <Link
                      to={`/books/${relBook.id}`}
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
        </div>
      )}
    </div>
  );
};

export default BookDetails;
