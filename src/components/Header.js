import React from "react";
import Navigation from "./Navigation";
import LoginNavigation from "./LoginNavigation";

const Header = ({ history, handleSubmit }) => {
  return (
    <div className="header-flex">
      <Navigation />
      <LoginNavigation className="login-nav"/>
    </div>
  );
};

export default Header;
