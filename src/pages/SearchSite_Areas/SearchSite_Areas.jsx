import './SearchSite_Areas.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SearchSite_Areas = () => {
  const [areaList, setAreaList] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const { strArea } = useParams();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json())
      .then((fetchedData) => {
        setAreaList(fetchedData), console.log(areaList);
      })
      .catch((error) =>
        console.error(
          'Fehler auf der "SearchSite_Areas" Seite - AreaList',
          error
        )
      );

    // fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`)
    //   .then((response) => response.json())
    //   .then((fetchedData) => {
    //     setAreaData(fetchedData), console.log(areaData);
    //   })
    //   .catch((error) =>
    //     console.error(
    //       'Fehler auf der "SearchSite_Areas" Seite - AreaData',
    //       error
    //     )
    //   );
  }, []);

  // useEffect(() => {
  //   const filter = areaData.filter(
  //     (item) => String(item.meals[0].strArea) === String(strArea)
  //   );
  //   setFilteredData(filter);
  //   console.log(filteredData);
  // }, [areaData]);

  return (
    <div className='areas'>
      <div className='search-nav'>
        <Link to='/'></Link>
        <h1>Search</h1>
      </div>
      <input type='text' />
      <div className='area-filter'>
        <button>see all</button>
      </div>
    </div>
  );
};

export default SearchSite_Areas;
