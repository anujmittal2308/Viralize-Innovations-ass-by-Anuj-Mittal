import React from "react";
import "./App.css";

const Header = ({ title }) => {
  return (
    <header>
      <div class="jumbotron py-3 my-3 mx-3 mt-4 bg-dark text-light text-center">
        <div class="container">
          <h2 class="display-6">{title}</h2>
          <p class="lead my-1 mt-3">New Sort & Filter functions available!</p>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  title: "Default Title",
};

export default Header;
