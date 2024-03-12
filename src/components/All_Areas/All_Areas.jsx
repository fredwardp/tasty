import { Link } from "react-router-dom";
import "./All_Areas.css";
import { useContext } from "react";
import { CloseContext, SendDataContext } from "../../context/context";

const All_Areas = (props) => {
  const { setClose } = useContext(CloseContext);
  const { setSendData } = useContext(SendDataContext);

  const areasOnClick = () => {
    setSendData((sendData) => !sendData);
    setClose((close) => !close);
  };

  return (
    <section className="home_areas_section">
      {props.data ? (
        <>
          <div className="home_h2_wrapper">
            <h2> {props.data.meals[0].strArea ? "Areas" : "Categories"}</h2>
            <p onClick={areasOnClick}>See All</p>
          </div>

          <div className="home_areas_wrapper">
            <Link
              to={
                props.data.meals[0].strArea
                  ? `/searchsite/areas/${props.data.meals[0].strArea}`
                  : `/searchsite/categories/${props.data.meals[0].strCategory}`
              }
              className="areas_link"
            >
              {props.data.meals[0].strArea ? "American" : "Beef"}
            </Link>
            <Link
              to={
                props.data.meals[0].strArea
                  ? `/searchsite/areas/${props.data.meals[1].strArea}`
                  : `/searchsite/categories/${props.data.meals[2].strCategory}`
              }
              className="areas_link"
            >
              {props.data.meals[0].strArea ? "Britisch" : "Chicken"}
            </Link>
            <Link
              to={
                props.data.meals[0].strArea
                  ? `/searchsite/areas/${props.data.meals[5].strArea}`
                  : `/searchsite/categories/${props.data.meals[9].strCategory}`
              }
              className="areas_link"
            >
              {props.data.meals[0].strArea ? "Dutch" : "Seafood"}
            </Link>
          </div>
        </>
      ) : (
        <p>Loading Now...</p>
      )}
    </section>
  );
};

export default All_Areas;
