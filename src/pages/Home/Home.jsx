import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import "./Home.css";
const Home = () => {
  const [random, setRandom] = useState();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((randomMeal) => setRandom(randomMeal))
      .catch((error) => console.log("keine Daten vorhanden", error));
  }, []);
  // console.log(random.meals[0]);

  return (
    <div>
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
        <section className="home_area_section"></section>
      </header>
      <Nav />
    </div>
  );
};

export default Home;
