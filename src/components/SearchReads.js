import { useContext, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI';

import BookItem from '../components/BookItem';
import MyReadsContext from "../MyReadsContext";


const SearchReads = () => {
  const searchRef = useRef("");
  const [searchResults, setSearchResults] = useState([]);

  const { myReads } = useContext(MyReadsContext);

  const myReadsBookIDs = useMemo(() => {
    return Object.values(myReads)
      .flat()
      .reduce((acc, book) => {
        acc.push(book.id);
        return acc;
      }, []);
  }, [myReads]);

  const handleSearch = () => {
    let timer;

    return () => {

      if (timer) clearTimeout(timer);
      if (searchRef.current.value.trim().length < 1) return;

      timer = setTimeout(async () => {
        const results = await search(searchRef.current.value);
        console.log("Search Results: ", results);
        if (results.error) {
          setSearchResults([]);
          return;
        }
        const books = results.filter(book => !myReadsBookIDs.includes(book.id));
        setSearchResults(books);
      }, 500);
    };
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search" >
          Close
        </Link>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            ref={searchRef}
            onChange={handleSearch()}
          /* onChange={handleSearch} */
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {
            searchResults.map(result => (
              <BookItem
                key={result.id}
                book={result}
              />
            ))
          }
        </ol>
      </div>
    </div>
  );
};
export default SearchReads;
