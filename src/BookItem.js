import BookshelfSelector from './BookshelfSelector';


const BookItem = ({ currentShelf, book, bookshelves, onBookshelfChange }) => {
  const handleBookshelfSelect = (newShelf) => {
    onBookshelfChange(book, newShelf);
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
              `url(${book.coverURL})`,
          }}
        ></div>

        <BookshelfSelector currentShelf={currentShelf} bookshelves={bookshelves} onBookshelfSelect={handleBookshelfSelect} />

      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.author}</div>
    </div >

  );
};
export default BookItem;
