import BookItem from "./BookItem";
import MyReadsContext from "../MyReadsContext";
import { useContext } from "react";

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
export default Bookshelf;
