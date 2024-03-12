import Nav from "../../components/Nav/Nav";
import "./SearchSite_Results.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SearchValueContext } from "../../context/context";

const SearchSite_Results = () => {
    const [myData, setMyData] = useState();
    const { searchValue, setSearchValue } = useContext(SearchValueContext);

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then((response) => response.json())
            .then((data) => setMyData(data))
            .catch((error) => console.log("An error has occured", error));
    }, [searchValue]);

    console.log("My Data", myData);
    return (
        <>
            <div className="searchResultsContainer">
                <SearchBar setSearchValue={setSearchValue} />
                {myData && myData.meals && myData.meals.length > 0 ? (
                    <div>
                        <ul>
                            {myData.meals.map((meal, index) => (
                                <div key={index} className="searchSiteResultTile">
                                    <img src={meal.strMealThumb} className="searchSiteResultImage" alt={`image of ${meal.strMeal}`} />
                                    <div className="searchSiteResultInnerTile">
                                        <h3>{meal.strMeal}</h3>
                                        <div className="searchSiteResultsInnerDiv">
                                            <div className="searchSiteDot"></div>
                                            <p>{searchValue.toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div className="searchSiteResultLinkDiv">
                                        {/* Link to detail? Wert idMeal??? */}
                                        <Link to={`/details/${meal.idMeal}`}>
                                            <img src="../../../public/img/search-results/Arrow.svg" alt="left arrow" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <h2 style={{ color: "red" }}>No Data found. Try again.</h2>
                )}
            </div>

            <Nav />
        </>
    );
};

export default SearchSite_Results;
