import { Route, Routes } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";

import "./App.css";
import { getAll, update } from "../../BooksAPI";
import SearchReads from "../SearchReads";
import Dashboard from "../Dashboard";
import MyReadsContext from "../../MyReadsContext";

function App() {
  const bookshelves = {
    "currentlyReading": "Currently Reading",
    "wantToRead": "Want to Read",
    "read": "Read",
  };

  const [myReads, setMyReads] = useState({});
  const getAllReads = () => {
    const getReadsByShelf = async () => {
      const bookReads = await getAll();
      if (bookReads.error) {
        setMyReads([]);
        return;
      }
      const booksByShelf = bookReads.reduce((acc, currentBook) => {
        acc[currentBook.shelf] = acc[currentBook.shelf] || [];
        acc[currentBook.shelf].push(currentBook);
        return acc;
      }, {});

      setMyReads(booksByShelf);
    }
    getReadsByShelf();
  };

  useEffect(() => {
    getAllReads();
  }, []);

  const readsInShelves = useMemo(() => {
    return Object.values(myReads)
      .flat();
  }, [myReads]);

  const checkIfBookInShelf = useCallback((book) => {
    const inShelf = readsInShelves.find(({ id }) => id === book.id);
    if (inShelf) return inShelf;

    return false;
  }, [readsInShelves]);

  // Send `update` request to API and Update the UI through state.
  const handleBookshelfUpdate = (updatedRead, newShelf, oldShelf) => {
    update(updatedRead, newShelf)
      .catch(e => console.log("Encountered an error: ", e));

    updatedRead.shelf = newShelf;
    setMyReads(() => {
      // check if old shelf was previously `none` i.e. from search page
      if (oldShelf === "none") return { ...myReads, [newShelf]: myReads[newShelf].concat([updatedRead]) };

      const updatedBooksInOldShelf = myReads[oldShelf]
        .filter(({ id }) => id !== updatedRead.id);

      // check if new shelf was currently `none` i.e. removing from shelf
      if (newShelf === "none") return { ...myReads, [oldShelf]: [...updatedBooksInOldShelf] };

      const updatedBooksInNewShelf = myReads[newShelf].concat([updatedRead]);

      return { ...myReads, [oldShelf]: [...updatedBooksInOldShelf], [newShelf]: [...updatedBooksInNewShelf] }
    });

  };

  return (
    <MyReadsContext.Provider
      value={{
        bookshelves,
        myReads,
        handleBookshelfUpdate,
        checkIfBookInShelf,
      }}
    >
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/search" element={<SearchReads />} />
        </Routes>
      </div>
    </MyReadsContext.Provider>
  );
}

export default App;
