import PropTypes from 'prop-types';

const BookshelfSelector = ({ currentShelf, bookshelves, onBookshelfSelect }) => {

  const handleSelect = (evt) => {
    onBookshelfSelect(evt.target.value, currentShelf);
  }

  return (
    <div className="book-shelf-changer">
      <select onChange={handleSelect}
        defaultValue={currentShelf}
      >
        <option value="moveTo" disabled>
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

BookshelfSelector.propType = {
  currentShelf: PropTypes.string.isRequired,
  bookshelves: PropTypes.object.isRequired,
  onBookshelfSelect: PropTypes.func.isRequired,
};

export default BookshelfSelector;
