import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI';

import BookItem from '../components/BookItem';
import MyReadsContext from "../MyReadsContext";


const SearchReads = () => {
  const inputRef = useRef("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { myReads } = useContext(MyReadsContext);

  const myReadsBookIDs = useMemo(() => {
    return Object.values(myReads)
      .flat()
      .reduce((acc, book) => {
        acc.push(book.id);
        return acc;
      }, []);
  }, [myReads]);


  useEffect(() => {
    const getSearchResults = async () => {
      if (searchTerm.trim().length < 1) {
        setSearchResults([]);
        return;
      }
      const results = await search(searchTerm);
      if (!results || results.error) {
        setSearchResults([]);
        return;
      }
      const resultsNotInShelves = results.filter(book => !myReadsBookIDs.includes(book.id));
      setSearchResults(resultsNotInShelves);
    }
    getSearchResults();
  }, [searchTerm, myReadsBookIDs]);


  let timeout = null;
  let input = document.getElementById('search-input');

  const handleSearch = (evt) => {
    input.addEventListener('keyup', () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setSearchTerm(evt.target.value);
      }, 1000)
    });
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search" >
          Close
        </Link>

        <div className="search-books-input-wrapper">
          <input
            id='search-input'
            type="text"
            placeholder="Search by title, author, or ISBN"
            ref={inputRef}
            onChange={handleSearch}
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
