import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryStatus, setLibraryStatus, themeToggler, theme }) => {
  return (
    <nav>
      <h1>
        EfeLay <span style={{ fontWeight: 400 }}>Music player</span>
      </h1>
      <div className="togglers">
        <div className="library_toggle">
          <button onClick={() => setLibraryStatus(!libraryStatus)}>
            Library
            <FontAwesomeIcon icon={faMusic} />
          </button>
        </div>
        <div className="mode_toggle">
          <button onClick={() => themeToggler()}>
            <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
