import { useContext, useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import "./Home.css";
import { SendDataContext } from "../../context/context";
import { CloseContext } from "../../context/context";
import { Link } from "react-router-dom";
import PopUp from "../../components/PopUp/PopUp";
import All_Areas from "../../components/All_Areas/All_Areas";
import SearchBar from "../../components/SearchBar/SearchBar";
// import { SearchValueContext } from "../../context/context";

const Home = () => {
  const [random, setRandom] = useState();
  const [fullCategories, setFullCategories] = useState();
  const [areas, setAreas] = useState();
  const { close, setClose } = useContext(CloseContext);
  const { sendData, setSendData } = useContext(SendDataContext);
  const [categories, setCategories] = useState();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((randomMeal) => setRandom(randomMeal))
      .catch((error) => console.log("keine Daten vorhanden", error));
  }, []);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((fullCategories) => setFullCategories(fullCategories))
      .catch((error) => console.log("keine Categorie Daten vorhanden", error));
  }, []);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((response) => response.json())
      .then((allAreas) => setAreas(allAreas))
      .catch((error) => console.log("keine Area Daten vorhanden", error));
  }, []);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((response) => response.json())
      .then((allCategories) => setCategories(allCategories))
      .catch((error) => console.log("keine Area Daten vorhanden", error));
  }, []);

  const categoriesOnClick = () => {
    setClose((close) => !close);
  };

  const closeFunc = () => {
    if (sendData == true) {
      setSendData((sendData) => !sendData);
    }
    setClose((close) => !close);
  };

  return (
    <div className="home_all_wrapper">
      <section className={`popup_section ${close ? "" : "close"}`}>
        <article className="popup_content">
          <div onClick={closeFunc} className="close_div">
            <div className="close_line"></div>
            <div className="close_line"></div>
          </div>
          <h2>{sendData ? "All Areas" : "All Categories"}</h2>
          <PopUp data={sendData ? areas : categories} />
        </article>
      </section>
      <header className="home_header">
        <div className="home_search_wrapper">
          <SearchBar />
        </div>
        <h1>Meal of the Day</h1>
        {random ? (
          <Link to={`/details/${random.meals[0].idMeal}`} className="mod_link">
            <div className="meal_of_day">
              <h2>{random.meals[0].strMeal}</h2>
              <div className="mod_lower_wrapper">
                <div>
                  <div className="home_round_grey"></div>
                  {random.meals[0].strCategory}
                </div>
                <p>{random.meals[0].strArea}</p>
              </div>
            </div>
          </Link>
        ) : (
          <p>Loading..</p>
        )}
        <All_Areas data={areas} />
        <div className="home_h2_wrapper">
          <h2>Categories</h2>
          <p onClick={categoriesOnClick}>See All</p>
        </div>
      </header>
      <section className="home_categories_section">
        <div className="categories_slider">
          {fullCategories ? (
            fullCategories.categories.map((item, index) => (
              <Link
                key={index}
                to={`/searchsite/categories/${item.strCategory}`}
              >
                <article key={index}>
                  <img src={item.strCategoryThumb} alt="" />
                  <h3>{item.strCategory}</h3>
                </article>
              </Link>
            ))
          ) : (
            <p>Keine Daten vorhanden</p>
          )}
        </div>
      </section>

      <Nav />
    </div>
  );
};

export default Home;
