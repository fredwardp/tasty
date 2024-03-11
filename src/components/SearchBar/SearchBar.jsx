import "./SearchBar.css";
import MagnifiyingGlass from "../../../public/img/search/MagnifiyingGlass.svg";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const SearchBar = ({ setSearchValue }) => {
    const [value, setValue] = useState("");
    const { search } = useParams();

    const searchForValue = () => {
        console.log(value);
        setSearchValue(value);
    };

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
                    <Link to={`/searchsite/results/${value} `}>
                        <img src={MagnifiyingGlass} alt="magnifiying glass" />
                    </Link>
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
