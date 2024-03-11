import "./SearchBar.css";
import MagnifiyingGlass from "../../../public/img/search/MagnifiyingGlass.svg";
import { useState } from "react";

const SearchBar = () => {
    const [value, setValue] = useState("");

    // ! ##### Hier wird die Suchfunktion implementiert ###########
    const searchForValue = () => {
        console.log(value);
        // Hier den Code für die Search pages rein
    };

    // ! ##########################################################
    const pressEnter = (event) => {
        if (event.key === "Enter") {
            searchForValue();
        }
    };

    return (
        <div className="searchBar-container">
            {/* In searchBar-container werden button(lupe) und input miteinander verwoben um die gewünschte Darstellung zu erreichen */}
            <div className="searchBar-input-div">
                <button onClick={searchForValue}>
                    <img src={MagnifiyingGlass} alt="magnifiying glass" />
                </button>
                <input
                    type="text"
                    spellCheck="false"
                    placeholder="Search"
                    className="searchBar-input"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={pressEnter} // onkeydown/handledown sorgt dafür, dass handlesearch bei betätigen der enter taste ausgelöst werden.
                />
            </div>
        </div>
    );
};

export default SearchBar;
