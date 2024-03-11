import './SearchSite_Areas.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import SearchBar from '../../components/SearchBar/SearchBar';
import ArrowLeft from '/public/img/search/ArrowLeft';

const SearchSite_Areas = () => {
  const [areaList, setAreaList] = useState();
  const [areaData, setAreaData] = useState();
  // const [filteredData, setFilteredData] = useState();
  const { strArea } = useParams();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json())
      .then((fetchedData) => setAreaList(fetchedData))
      .catch((error) =>
        console.error(
          'Fehler auf der "SearchSite_Areas" Seite - AreaList',
          error
        )
      );
  }, []);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese`)
      .then((response) => response.json())
      .then((fetchedData) => setAreaData(fetchedData))
      .catch((error) =>
        console.error(
          'Fehler auf der "SearchSite_Areas" Seite - AreaData',
          error
        )
      );
  }, []);

  // TODO ===> Wenn nicht gebraucht - LÖSCHEN!
  // useEffect(() => {
  //   const filter = areaData.filter(
  //     (item) => String(item.meals[0].strArea) === String(strArea)
  //   );
  //   setFilteredData(filter);
  //   console.log(filteredData);
  // }, [areaData]);
  // * ========================================

  return (
    <div className='areas'>
      <div className='search-nav'>
        <Link to='/'>
          <ArrowLeft />
        </Link>
        <h1>Search</h1>
      </div>
      <SearchBar />
      <div className='area-filter'>
        <button>Platzhalter</button>
      </div>
      <div className='meal-filter'>
        {areaData ? (
          areaData.meals.map((item, index) => (
            <Link to={`/details/${areaData.meals[0].idMeal}`} key={index}>
              <article>
                <img src={item.strMealThumb} alt='' />
                <h3>{item.strMeal}</h3>
              </article>
            </Link>
          ))
        ) : (
          <p>Keine Daten vorhanden</p>
        )}
      </div>
      <Nav />
    </div>
  );
};

export default SearchSite_Areas;
