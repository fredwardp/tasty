import { useEffect, useState } from "react";
import IngredientsLight from "../../assets/icons/detail_icons/IngrediantsLight";
import IngredientsDark from "../../assets/icons/detail_icons/IngredientsDark";
import InstructionsLight from "../../assets/icons/detail_icons/InstructionsLight";
import InstructionsDark from "../../assets/icons/detail_icons/InstructionsDark";
import "./Details.css";
import { Link, useParams } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
const Details = () => {
  // --- useState
  const [ingredients, setIngredients] = useState(true);
  const [oneRecipe, setOneRecipe] = useState(null);

  // --- id auslesen
  const { id } = useParams();
  // console.log({ id });

  // --- fetch
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Number(id)}`)
      .then((res) => res.json())
      .then((fetchData) => {
        let meal = fetchData.meals[0];
        // --- copy ingredients into array of objects
        meal.ingredients = [];
        for (let i = 1; i <= 20; i++) {
          // --- we assume that an empty string marks the end
          if (meal[`strIngredient${i}`].trim() === "") break;
          let ingredient = meal[`strIngredient${i}`];
          let measure = meal[`strMeasure${i}`];
          let object = { ingredient: ingredient, measure: measure };
          meal.ingredients.push(object);
        }
        setOneRecipe(meal);
      })
      .catch((err) => console.error("Fehler auf Detailseite", err));
  }, []);
  console.log(oneRecipe);

  // --- Toggle Ingrediants/Instructions
  const buttonToggle = () => {
    setIngredients((taco) => !taco);
  };
  // --- youtube-link
  const videoLink = () => {
    window.location.href = `${oneRecipe.strYoutube}`;
  };
  return (
    <>
      {!oneRecipe ? (
        "<p>Laden</p>"
      ) : (
        <div className="detail-wrapper">
          <img src={oneRecipe.strMealThumb} alt="oneRecipe.strMeal" />
          <div className="detail">
            <h1>{oneRecipe.strMeal}</h1>
            <h2>{oneRecipe.strCategory}</h2>
            <h2>{oneRecipe.strArea}</h2>

            {/* --- buttons */}
            <div className="buttons">
              {ingredients ? (
                <>
                  <div>
                    <IngredientsDark />
                  </div>
                </>
              ) : (
                <>
                  <div onClick={buttonToggle}>
                    <IngredientsLight />
                  </div>
                </>
              )}
              {ingredients ? (
                <>
                  <div onClick={buttonToggle}>
                    <InstructionsLight />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <InstructionsDark />
                  </div>
                </>
              )}
            </div>
            {/* --- content */}
            {ingredients ? (
              <div className="detail-ingredients">
                <h3>Ingredients</h3>
                {oneRecipe.ingredients.map((oneItem, index) => (
                  <p key={index}>
                    {oneItem.measure} {"  "}
                    {oneItem.ingredient}
                  </p>
                ))}
              </div>
            ) : (
              <div className="detail-instructions">
                <h3>Instructions</h3>
                <div className="detail-instructions-content">
                  {oneRecipe.strInstructions
                    .split("\r\n")
                    .map((taco, index) => (
                      <p key={index} className="detail-instructions-tag">
                        {taco}
                      </p>
                    ))}
                </div>
                <div onClick={videoLink}>
                  <svg
                    width="327"
                    height="54"
                    viewBox="0 0 327 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="327" height="54" rx="16" fill="#70B9BE" />
                    <path
                      d="M144.032 33L139.2 21.8H142L146.224 31.72H144.576L148.864 21.8H151.44L146.592 33H144.032ZM152.34 33V24.392H154.836V33H152.34ZM153.588 23.192C153.129 23.192 152.756 23.0587 152.468 22.792C152.18 22.5253 152.036 22.1947 152.036 21.8C152.036 21.4053 152.18 21.0747 152.468 20.808C152.756 20.5413 153.129 20.408 153.588 20.408C154.046 20.408 154.42 20.536 154.708 20.792C154.996 21.0373 155.14 21.3573 155.14 21.752C155.14 22.168 154.996 22.5147 154.708 22.792C154.43 23.0587 154.057 23.192 153.588 23.192ZM160.848 33.128C160.037 33.128 159.307 32.9467 158.656 32.584C158.005 32.2107 157.488 31.6933 157.104 31.032C156.731 30.3707 156.544 29.592 156.544 28.696C156.544 27.7893 156.731 27.0053 157.104 26.344C157.488 25.6827 158.005 25.1707 158.656 24.808C159.307 24.4453 160.037 24.264 160.848 24.264C161.573 24.264 162.208 24.424 162.752 24.744C163.296 25.064 163.717 25.5493 164.016 26.2C164.315 26.8507 164.464 27.6827 164.464 28.696C164.464 29.6987 164.32 30.5307 164.032 31.192C163.744 31.8427 163.328 32.328 162.784 32.648C162.251 32.968 161.605 33.128 160.848 33.128ZM161.28 31.08C161.685 31.08 162.053 30.984 162.384 30.792C162.715 30.6 162.976 30.328 163.168 29.976C163.371 29.6133 163.472 29.1867 163.472 28.696C163.472 28.1947 163.371 27.768 163.168 27.416C162.976 27.064 162.715 26.792 162.384 26.6C162.053 26.408 161.685 26.312 161.28 26.312C160.864 26.312 160.491 26.408 160.16 26.6C159.829 26.792 159.563 27.064 159.36 27.416C159.168 27.768 159.072 28.1947 159.072 28.696C159.072 29.1867 159.168 29.6133 159.36 29.976C159.563 30.328 159.829 30.6 160.16 30.792C160.491 30.984 160.864 31.08 161.28 31.08ZM163.536 33V31.24L163.584 28.68L163.424 26.136V21.128H165.92V33H163.536ZM172.502 33.128C171.521 33.128 170.657 32.936 169.91 32.552C169.174 32.168 168.603 31.6453 168.198 30.984C167.793 30.312 167.59 29.5493 167.59 28.696C167.59 27.832 167.787 27.0693 168.182 26.408C168.587 25.736 169.137 25.2133 169.83 24.84C170.523 24.456 171.307 24.264 172.182 24.264C173.025 24.264 173.782 24.4453 174.454 24.808C175.137 25.16 175.675 25.672 176.07 26.344C176.465 27.0053 176.662 27.8 176.662 28.728C176.662 28.824 176.657 28.936 176.646 29.064C176.635 29.1813 176.625 29.2933 176.614 29.4H169.622V27.944H175.302L174.342 28.376C174.342 27.928 174.251 27.5387 174.07 27.208C173.889 26.8773 173.638 26.6213 173.318 26.44C172.998 26.248 172.625 26.152 172.198 26.152C171.771 26.152 171.393 26.248 171.062 26.44C170.742 26.6213 170.491 26.8827 170.31 27.224C170.129 27.5547 170.038 27.9493 170.038 28.408V28.792C170.038 29.2613 170.139 29.6773 170.342 30.04C170.555 30.392 170.849 30.664 171.222 30.856C171.606 31.0373 172.054 31.128 172.566 31.128C173.025 31.128 173.425 31.0587 173.766 30.92C174.118 30.7813 174.438 30.5733 174.726 30.296L176.054 31.736C175.659 32.184 175.163 32.5307 174.566 32.776C173.969 33.0107 173.281 33.128 172.502 33.128ZM182.42 33.128C181.503 33.128 180.687 32.936 179.972 32.552C179.268 32.168 178.708 31.6453 178.292 30.984C177.887 30.312 177.684 29.5493 177.684 28.696C177.684 27.832 177.887 27.0693 178.292 26.408C178.708 25.736 179.268 25.2133 179.972 24.84C180.687 24.456 181.503 24.264 182.42 24.264C183.327 24.264 184.137 24.456 184.852 24.84C185.567 25.2133 186.127 25.7307 186.532 26.392C186.937 27.0533 187.14 27.8213 187.14 28.696C187.14 29.5493 186.937 30.312 186.532 30.984C186.127 31.6453 185.567 32.168 184.852 32.552C184.137 32.936 183.327 33.128 182.42 33.128ZM182.42 31.08C182.836 31.08 183.209 30.984 183.54 30.792C183.871 30.6 184.132 30.328 184.324 29.976C184.516 29.6133 184.612 29.1867 184.612 28.696C184.612 28.1947 184.516 27.768 184.324 27.416C184.132 27.064 183.871 26.792 183.54 26.6C183.209 26.408 182.836 26.312 182.42 26.312C182.004 26.312 181.631 26.408 181.3 26.6C180.969 26.792 180.703 27.064 180.5 27.416C180.308 27.768 180.212 28.1947 180.212 28.696C180.212 29.1867 180.308 29.6133 180.5 29.976C180.703 30.328 180.969 30.6 181.3 30.792C181.631 30.984 182.004 31.08 182.42 31.08Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="detail-navbar">
        <Nav />
      </div>
    </>
  );
};

export default Details;
