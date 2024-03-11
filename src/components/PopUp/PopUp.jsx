import { Link } from "react-router-dom";
import "./PopUp.css";
const PopUp = (props) => {
  console.log(props.data);

  return (
    <div className="popup_link_container">
      {props.data ? (
        props.data.meals.map((item, index) => (
          <div className="popup_link_wrapper" key={index}>
            <Link key={index} className="popup_link">
              {item[Object.keys(item)[0]]}
            </Link>
          </div>
        ))
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
};

export default PopUp;
