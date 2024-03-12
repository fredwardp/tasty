import './SearchSite_Categories';
import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import SearchBar from '../../components/SearchBar/SearchBar';
import ArrowLeft from '/public/img/search/ArrowLeft';
import All_Areas from '../../components/All_Areas/All_Areas';
import { SendDataContext } from '../../context/context';
import { CloseContext } from '../../context/context';
import PopUp from '../../components/PopUp/PopUp';

const SearchSite_Categories = () => {
  const [categoryList, setCategoryList] = useState();
  const [categoryData, setCategoryData] = useState();
  const { close, setClose } = useContext(CloseContext);
  const { sendData, setSendData } = useContext(SendDataContext);
  const { categ } = useParams();

  const closeFunc = () => {
    if (sendData == true) {
      setSendData((sendData) => !sendData);
    }
    setClose((close) => !close);
  };

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((fetchedData) => setCategoryList(fetchedData))
      .catch((error) =>
        console.error(
          'Fehler auf der "SearchSite_Categories" Seite - categoryList',
          error
        )
      );
  }, []);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`)
      .then((response) => response.json())
      .then((fetchedData) => setCategoryData(fetchedData))
      .catch((error) =>
        console.error(
          'Fehler auf der "SearchSite_Categories" Seite - categoryData',
          error
        )
      );
  }, []);

  return (
    <>
      <section className={`popup_section ${close ? '' : 'close'}`}>
        <article className='popup_content'>
          <div onClick={closeFunc} className='close_div'>
            <div className='close_line'></div>
            <div className='close_line'></div>
          </div>
          <h2>All Categories</h2>
          <PopUp data={categoryList} />
        </article>
      </section>
      <div className='categories'>
        <div className='search-nav-wrapper'>
          <div className='search-nav'>
            <Link to='/'>
              <ArrowLeft />
            </Link>
            <h1>Search</h1>
          </div>
        </div>
        <SearchBar />
        <div className='categories-filter'>
          <All_Areas data={categoryList} />
        </div>
        <div className='meal-filter'>
          {categoryData ? (
            (console.log(categoryData),
            categoryData.meals.map((item, index) => (
              <Link to={`/details/${item.idMeal}`} key={index}>
                <article>
                  <img src={item.strMealThumb} alt='' />
                  <p>{item.strMeal}</p>
                </article>
              </Link>
            )))
          ) : (
            <p>Keine Daten vorhanden</p>
          )}
        </div>
      </div>
      <Nav />
    </>
  );
};

export default SearchSite_Categories;
