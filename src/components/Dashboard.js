import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Bookshelf from "./Bookshelf";
import { get, getAll, update } from "../BooksAPI";

const Dashboard = ({ bookshelves }) => {

  const [myReads, setMyReads] = useState({});

  const getAllReads = () => {
    const getReadsByShelf = async () => {
      const bookReads = await getAll();
      if (bookReads.error) {
        setMyReads([]);
        return;
      }
      const booksByShelf = bookReads.reduce((acc, currentBook) => {
        acc[currentBook.shelf] = acc[currentBook.shelf] || [];
        acc[currentBook.shelf].push(currentBook);
        return acc;
      }, {});

      setMyReads(booksByShelf);
    }
    getReadsByShelf();
  };

  useEffect(() => {
    getAllReads();
  }, []);

  const handleBookshelfUpdate = (updatedRead, newShelf) => {
    update(updatedRead, newShelf)
      .then(() => getAllReads())
      .catch(e => console.log("Encountered an error: ", e));
  };


  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {
            Object.keys(myReads).map((shelf) => {
              return (
                <Bookshelf
                  key={shelf}
                  currentShelf={shelf}
                  books={myReads[shelf]}
                  bookshelves={bookshelves}
                  onBookshelfUpdate={handleBookshelfUpdate}
                />
              )
            })
          }
        </div>
      </div>
      <div className="open-search">
        <Link to={'/search'}>
          Add a book
        </Link>
      </div>
    </div>
  );
};
export default Dashboard;
