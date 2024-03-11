import Nav from "../../components/Nav/Nav";
import "./SearchSite_Results.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SearchSite_Results = () => {
    const [searchValue, setSearchValue] = useState("");
    const [myData, setMyData] = useState();
    const { search } = useParams();
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
                {myData ? (
                    <p>
                        <ul>
                            {myData.meals.map((meal, index) => (
                                <div key={index} className="tile">
                                    <img src={meal.strMealThumb} alt={`image of ${meal.strMeal}`} />
                                    <div className="innerTile">
                                        <h3>{meal.strMeal}</h3>
                                        <div>
                                            <div className="searchSiteDot"></div>
                                            <p>{searchValue}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </p>
                ) : (
                    <h2 style={{ color: "red" }}>No Data found. Try again</h2>
                )}
            </div>

            <Nav />
        </>
    );
};

export default SearchSite_Results;
