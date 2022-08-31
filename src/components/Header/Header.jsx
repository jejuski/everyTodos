import React from "react";
import { Link } from "react-router-dom";
import List from "../list/List";
import "./style.css";
function Header() {
  return (
    <div className="head">
      <Link to={"/"} element={<List />} style={{ color: "black", textDecoration: "none" }}>
        To do List
      </Link>
    </div>
  );
}

export default Header;
