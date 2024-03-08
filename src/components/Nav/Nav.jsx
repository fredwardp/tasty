import { Link, NavLink } from "react-router-dom";
import "./Nav.css";
import HomeIcon from "../../assets/icons/home_icons/HomeIcon";
import SearchIcon from "../../assets/icons/home_icons/SearchIcon";
import HeartIcon from "../../assets/icons/home_icons/HeartIcon";
import ProfilIcon from "../../assets/icons/home_icons/ProfilIcon";

const Nav = () => {
  // const [colorChange, ]
  return (
    <nav>
      <NavLink to="/">
        <HomeIcon />
      </NavLink>
      <NavLink to="/searchsite/results">
        <SearchIcon />
      </NavLink>
      <NavLink to="/favorites">
        <HeartIcon />
      </NavLink>
      <NavLink to="/profil">
        <ProfilIcon />
      </NavLink>
    </nav>
  );
};

export default Nav;
