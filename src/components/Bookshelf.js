// import { useState } from "react";
import BookItem from "./BookItem";

const Bookshelf = ({ currentShelf, books, bookshelves, onBookshelfUpdate }) => {

  const handleBookshelfChange = (updatedRead, newShelf) => {
    onBookshelfUpdate(updatedRead, newShelf, currentShelf);
  }


  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookshelves[currentShelf]}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map((myRead) => (
              <li key={currentShelf + myRead.title}>
                <BookItem
                  book={myRead}
                  currentShelf={currentShelf}
                  bookshelves={bookshelves}
                  onBookshelfChange={handleBookshelfChange} />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  );
};
export default Bookshelf;
