import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import axios from "axios";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {

      
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`http://localhost:4050/api/books/${bookId}`);
        if (!response.data) {
          setError("Book not found.");
          return;
        }
        setBook(response.data);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to fetch book data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  useEffect(() => {
    const fetchRelatedBooks = async () => {
      try {
        const response = await axios.get("http://localhost:4050/api/books");
        const allBooks = response.data;

        const relatedBooks = allBooks.filter(
          (b) =>
            b.category?.toLowerCase() === book.category?.toLowerCase() &&
            b._id !== book._id
        );

        setRelated(relatedBooks);
      } catch (err) {
        console.error("Error fetching related books:", err);
      }
    };

    if (book) {
      fetchRelatedBooks();
    }
  }, [book]);

  if (loading) return <div className="mt-10">Loading...</div>;
  if (error) return <div className="mt-10 text-red-600">{error}</div>;

  return (
    <div className="container px-4 py-6 flex flex-col items-center">
      <div className="h-96 flex gap-6 bg-white px-6 py-4 rounded-lg w-full max-w-5xl shadow-md">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-full object-contain rounded-md"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
            <p className="text-sm text-gray-600 mb-4">by {book.author}</p>
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
              {book.category}
            </span>
            <p className="mt-4 text-gray-700">{book.description || "No description available."}</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-indigo-600 mb-4">${book.price}</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-blue-600">
              Add to Cart
              <FaCartShopping />
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-10 w-full max-w-6xl">
          <h2 className="text-xl font-bold mb-4">Related Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((relBook) => (
              <div
                key={relBook._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
              >
                <img
                  src={relBook.coverImage}
                  alt={relBook.title}
                  className="h-56 w-full object-cover mb-4 rounded"
                />
                <h3 className="font-semibold text-lg mb-1">{relBook.title}</h3>
                <p className="text-sm text-gray-500 mb-2">by {relBook.author}</p>
                <span className="text-xs bg-gray-200 rounded-full px-2 py-1 text-gray-700 mb-2 inline-block">
                  {relBook.category}
                </span>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-indigo-600 font-bold">${relBook.price}</span>
                  <Link
                    to={`/books/${relBook._id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </Link>
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
