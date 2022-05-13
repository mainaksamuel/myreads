import PropTypes from 'prop-types';
import { useContext } from "react";

import BookItem from "./BookItem";
import MyReadsContext from "../MyReadsContext";

const Bookshelf = ({ currentShelf, books }) => {

  const { bookshelves } = useContext(MyReadsContext);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookshelves[currentShelf]}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map((myRead) => (
              <li key={myRead.id} >
                <BookItem book={myRead} />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  );
};

BookItem.propType = {
  currentShelf: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
};

export default Bookshelf;
