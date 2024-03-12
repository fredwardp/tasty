import './SearchSite_Areas.css';
import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import SearchBar from '../../components/SearchBar/SearchBar';
import ArrowLeft from '/public/img/search/ArrowLeft';
import All_Areas from '../../components/All_Areas/All_Areas';
import { SendDataContext } from '../../context/context';
import { CloseContext } from '../../context/context';
import PopUp from '../../components/PopUp/PopUp';

const SearchSite_Areas = () => {
  const [areaList, setAreaList] = useState();
  const [areaData, setAreaData] = useState();
  const { close, setClose } = useContext(CloseContext);
  const { sendData, setSendData } = useContext(SendDataContext);
  const { area } = useParams();

  const closeFunc = () => {
    if (sendData == true) {
      setSendData((sendData) => !sendData);
    }
    setClose((close) => !close);
  };

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
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      .then((response) => response.json())
      .then((fetchedData) => setAreaData(fetchedData))
      .catch((error) =>
        console.error(
          'Fehler auf der "SearchSite_Areas" Seite - AreaData',
          error
        )
      );
  }, [area]);

  return (
    <>
      <section className={`popup_section ${close ? '' : 'close'}`}>
        <article className='popup_content'>
          <div onClick={closeFunc} className='close_div'>
            <div className='close_line'></div>
            <div className='close_line'></div>
          </div>
          <h2>All Areas</h2>
          <PopUp data={areaList} />
        </article>
      </section>
      <div className='areas'>
        <div className='search-nav-wrapper'>
          <div className='search-nav'>
            <Link to='/'>
              <ArrowLeft />
            </Link>
            <h1>Search</h1>
          </div>
        </div>
        <SearchBar />
        <div className='area-filter'>
          <All_Areas data={areaList} />
        </div>
        <div className='meal-filter'>
          {areaData ? (
            areaData.meals.map((item, index) => (
              <Link to={`/details/${item.idMeal}`} key={index}>
                <article>
                  <img src={item.strMealThumb} alt='' />
                  <p>{item.strMeal}</p>
                </article>
              </Link>
            ))
          ) : (
            <p>Keine Daten vorhanden</p>
          )}
        </div>
      </div>
      <Nav />
    </>
  );
};

export default SearchSite_Areas;
