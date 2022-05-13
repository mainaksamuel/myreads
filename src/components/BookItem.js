import PropTypes from 'prop-types';
import { useContext } from 'react';

import BookshelfSelector from './BookshelfSelector';
import MyReadsContext from '../MyReadsContext';

const BookItem = ({ book }) => {

  const { bookshelves, handleBookshelfUpdate } = useContext(MyReadsContext);

  const handleBookshelfSelect = (newShelf, previousShelf) => {
    const oldShelf = previousShelf || "none";
    handleBookshelfUpdate(book, newShelf, oldShelf);
  }

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage:
              `url(${book.imageLinks?.thumbnail})`,
          }}
        ></div>

        <BookshelfSelector
          currentShelf={book?.shelf || "none"}
          bookshelves={bookshelves}
          onBookshelfSelect={handleBookshelfSelect}
        />

      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors?.map(author => (
          <div key={book.id + author}> {author} </div>
        ))}
      </div>
    </div >
  );
};

BookItem.propType = {
  book: PropTypes.object.isRequired,
};

export default BookItem;
