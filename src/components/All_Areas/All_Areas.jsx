import { Link } from "react-router-dom";
import "./All_Areas.css";
import { useContext } from "react";
import { CloseContext, SendDataContext } from "../../context/context";

const All_Areas = (props) => {
  const { setClose } = useContext(CloseContext);
  const { sendData, setSendData } = useContext(SendDataContext);

  const areasOnClick = () => {
    setSendData((sendData) => !sendData);
    setClose((close) => !close);
    console.log(sendData);
  };
  return (
    <section className="home_areas_section">
      <div className="home_h2_wrapper">
        <h2>Areas</h2>
        <p onClick={areasOnClick}>See All</p>
      </div>

      <div className="home_areas_wrapper">
        <Link to={`/${props.data}`} className="areas_link">
          American
        </Link>
        <Link className="areas_link">British</Link>
        <Link className="areas_link">Dutch</Link>
      </div>
    </section>
  );
};

export default All_Areas;
