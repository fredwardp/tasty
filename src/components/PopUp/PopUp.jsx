import { Link } from "react-router-dom";
import "./PopUp.css";
import { useContext } from "react";
import { CloseContext, SendDataContext } from "../../context/context";

const PopUp = (props) => {
  const { close, setClose } = useContext(CloseContext);

  return (
    <div className="popup_link_container">
      {props.data ? (
        props.data.meals.map((item, index) => (
          <div className="popup_link_wrapper" key={index}>
            <Link
              onClick={() => setClose((close) => !close)}
              to={`${
                item.strCategory
                  ? "/searchsite/categories"
                  : "/searchsite/areas"
              }/${item[Object.keys(item)[0]]}`}
              key={index}
              className="popup_link"
            >
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
