const BookshelfSelector = ({ currentShelf, bookshelves, onBookshelfSelect }) => {

  const handleSelect = (evt) => {
    onBookshelfSelect(evt.target.value);
  }

  return (
    <div className="book-shelf-changer">
      <select onChange={handleSelect}
        defaultValue={currentShelf}
      >
        <option value="none" disabled>
          Move to...
        </option>
        {
          Object.keys(bookshelves).map((bookshelf) => (
            <option
              key={bookshelf}
              value={bookshelf}
            >
              {bookshelves[bookshelf]}
            </option>
          ))
        }
        <option value="none" >None</option>
      </select>
    </div>
  );
};
export default BookshelfSelector;
