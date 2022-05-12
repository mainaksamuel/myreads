import "./App.css";

import SearchReads from "../SearchReads";
import Dashboard from "../Dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  const Bookshelves = {
    "currentlyReading": "Currently Reading",
    "wantToRead": "Want to Read",
    "read": "Read",
  }

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Dashboard bookshelves={Bookshelves} />} />
        <Route path="/search" element={<SearchReads />} />
      </Routes>

    </div>
  );
}

export default App;
