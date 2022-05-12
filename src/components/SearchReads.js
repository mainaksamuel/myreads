import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI';

import BookItem from '../components/BookItem';


const SearchReads = () => {
  const searchRef = useRef("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // const results = await search(searchRef.current.value);
    // console.log("Search Results: ", results);
    // if (results.error) {
    //   setSearchResults([]);
    //   return;
    // }
    // setSearchResults(results)

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
        setSearchResults(results)
      }, 2000);
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
              <li key={Math.random()}>{result.title}</li>
            ))
          }
        </ol>
      </div>
    </div>
  );
};
export default SearchReads;
