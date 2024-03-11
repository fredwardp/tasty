import { AreasContext } from "../../context/context";
import { useContext, useEffect } from "react";

const FetchAreas = () => {
  const { setAreas } = useContext(AreasContext);
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((response) => response.json())
      .then((allAreas) => setAreas(allAreas))
      .catch((error) => console.log("keine Area Daten vorhanden", error));
  }, []);
};

export default FetchAreas;
