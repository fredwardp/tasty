import "./SearchBar.css";
import MagnifiyingGlass from "../../../public/img/search/MagnifiyingGlass.svg";
import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { SearchValueContext } from "../../context/context";

const SearchBar = () => {
    const [value, setValue] = useState("");
    const { search } = useParams();
    const { searchValue, setSearchValue } = useContext(SearchValueContext);

    const searchForValue = () => {
        setSearchValue(value);
    };

    const pressEnter = (event) => {
        if (event.key === "Enter") {
            searchForValue();
        }
    };

    return (
        <div className="searchBar-container">
            <div className="searchBar-input-div">
                <div className="searchBarLinkDiv">
                    <Link to={`/searchsite/results/${value}`}>
                        <button onClick={searchForValue} className="searchBarButton">
                            <img src={MagnifiyingGlass} alt="magnifying glass" />
                        </button>
                    </Link>
                </div>
                <input type="text" spellCheck="false" placeholder="Search" className="searchBar-input" value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={pressEnter} />
            </div>
        </div>
    );
};

export default SearchBar;
