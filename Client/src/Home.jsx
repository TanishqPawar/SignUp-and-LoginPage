import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h2>Home Page</h2>
      <Link to="/login" >
            <button> Sign out </button>
          </Link>
    </>
  );
};

export default Home