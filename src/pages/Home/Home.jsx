import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import "./Home.css";
import { Link } from "react-router-dom";
import PopUp from "../../components/PopUp/PopUp";
const Home = () => {
  const [random, setRandom] = useState();
  const [fullCategories, setFullCategories] = useState();
  const [areas, setAreas] = useState();
  const [categories, setCategories] = useState();
  const [sendData, setSendData] = useState(false);
  const [close, setClose] = useState(false);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((randomMeal) => setRandom(randomMeal))
      .catch((error) => console.log("keine Daten vorhanden", error));
  }, []);
  // console.log(random.meals[0]);

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

  const areasOnClick = () => {
    setSendData((sendData) => !sendData);
    setClose((close) => !close);
  };

  const categoriesOnClick = () => {
    setClose((close) => !close);
  };

  const closeFunc = () => {
    if (sendData == true) {
      setSendData((sendData) => !sendData);
    }
    setClose((close) => !close);
  };

  // console.log(sendData);

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
        <h1>Meal of the Day</h1>
        {random ? (
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
        ) : (
          <p>Loading..</p>
        )}
        <section className="home_areas_section">
          <div className="home_h2_wrapper">
            <h2>Areas</h2>
            <p onClick={areasOnClick}>See All</p>
          </div>

          <div className="home_areas_wrapper">
            <Link className="areas_link">American</Link>
            <Link className="areas_link">British</Link>
            <Link className="areas_link">Dutch</Link>
          </div>
        </section>
        <section className="home_categories_section">
          <div className="home_h2_wrapper">
            <h2>Categories</h2>
            <p onClick={categoriesOnClick}>See All</p>
          </div>
          <div className="categories_slider">
            {fullCategories ? (
              fullCategories.categories.map((item, index) => (
                <Link>
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
      </header>

      <Nav />
    </div>
  );
};

export default Home;
