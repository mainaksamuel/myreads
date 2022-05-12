import BookshelfSelector from './BookshelfSelector';
import MyReadsContext from '../MyReadsContext';
import { useContext } from 'react';

const BookItem = ({ book }) => {

  const { bookshelves, handleBookshelfUpdate } = useContext(MyReadsContext);

  const handleBookshelfSelect = (newShelf) => {
    handleBookshelfUpdate(book, newShelf);
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
export default BookItem;
