import { Route, Routes } from "react-router-dom";
import { useState } from "react";

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

  const handleBookshelfUpdate = (updatedRead, newShelf) => {
    update(updatedRead, newShelf)
      .then(() => getAllReads())
      .catch(e => console.log("Encountered an error: ", e));
  };


  return (
    <MyReadsContext.Provider
      value={{
        bookshelves,
        myReads,
        getAllReads,
        handleBookshelfUpdate,
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
