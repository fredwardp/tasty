import SearchBar from "../../components/SearchBar/SearchBar";
// import Background from "../../../public/img/splash/splash-naked.jpg";
import Hero from "../../../public/img/onboard/hero.svg";
import Home from "../Home/Home";

import "./Onboarding.css";
import { Link } from "react-router-dom";
const Onboarding = () => {
  return (
    <>
      <div className="onboardingContainer">
        <div className="imageContainer">
          <img src={Hero} alt="Hero image circle of food" className="hero" />
        </div>
        <div className="inner">
          <h2>All recipe you needed</h2>
          <p>5000+ healthy recipes made by people for healthy life</p>

          <Link to="/home" className="getStarted">
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
