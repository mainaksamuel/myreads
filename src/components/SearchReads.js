import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { search } from '../BooksAPI';
import MyReadsContext from "../MyReadsContext";
import BookItem from '../components/BookItem';
import NotFound from './errors/NotFound';


const SearchReads = () => {
  const inputRef = useRef("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [onFindResults, setOnFindResults] = useState(true);

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
        setOnFindResults(true);
        setSearchResults([]);
        return;
      }
      const results = await search(searchTerm);
      if (!results || results.error) {
        setSearchResults([]);
        setOnFindResults(false);
        return;
      }
      const resultsNotInShelves = results.filter(book => !myReadsBookIDs.includes(book.id));
      setSearchResults(resultsNotInShelves);
      setOnFindResults(true);
    }
    getSearchResults();
  }, [searchTerm, myReadsBookIDs]);


  let timeout = null;
  let input = document.getElementById('searchInput');

  const handleSearch = () => {
    input.addEventListener('keyup', () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setSearchTerm(inputRef.current.value);
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
            id='searchInput'
            type="text"
            placeholder="Search by title, author, or ISBN"
            ref={inputRef}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {onFindResults
            ? searchResults?.map(result => (
              <BookItem
                key={result.id}
                book={result}
              />
            ))
            : (<NotFound />)
          }
        </ol>
      </div>
    </div>
  );
};
export default SearchReads;
