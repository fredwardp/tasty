import Nav from "../../components/Nav/Nav";
import "./SearchSite_Results.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchSite_Results = () => {
    const [searchValue, setSearchValue] = useState("");
    const [myData, setMyData] = useState();

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then((response) => response.json())
            .then((data) => setMyData(data))
            .catch((error) => console.log("An error has occured", error));
    }, [searchValue]);

    console.log("My Data", myData);
    return (
        <>
            {/* ! ???? ! Abfragen ob array == 0/null dann Fehlermeldung auf Screen ausgeben */}
            {myData <= 0 ? <p>No Data</p> : <p>Data</p>}
            <div className="searchResultsContainer">
                <SearchBar setSearchValue={setSearchValue} />
                {myData ? (
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
                                        <Link to={`"/details/${meal.idMeal}`}>🍆</Link>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <h2 style={{ color: "red" }}>Data loading...</h2>
                )}
            </div>

            <Nav />
        </>
    );
};

export default SearchSite_Results;
