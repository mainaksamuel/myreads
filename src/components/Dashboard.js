import { Link } from "react-router-dom";
import { useContext } from "react";

import Bookshelf from "./Bookshelf";
import MyReadsContext from "../MyReadsContext";

const Dashboard = () => {

  const { myReads } = useContext(MyReadsContext);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {
            Object.keys(myReads).map((shelf) => {
              return (
                <Bookshelf
                  key={shelf}
                  currentShelf={shelf}
                  books={myReads[shelf]}
                />
              )
            })
          }
        </div>
      </div>
      <div className="open-search">
        <Link to={'/search'}>
          Add a book
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
