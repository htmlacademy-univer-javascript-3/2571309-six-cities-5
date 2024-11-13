import { Link } from 'react-router-dom';
import { OffersList } from '../widgets/card-list';
import { CityMap } from '../widgets/city-map';
import { useMemo, useState } from 'react';
import { LocationList } from '../widgets/location-list';
import { useAppSelector } from '../shared/lib';
import { routesEnum } from './types';

export default function MainPage () {
  const {city, offers} = useAppSelector((state)=>state.offer);
  const offersFilteredData = useMemo(()=>offers.filter((el)=>el.city.name === city), [city,offers]);
  const [activeOffer, setActiveOffer] = useState<string>('');
  const onActiveOfferChangeCallback = (id: string) => {
    setActiveOffer(id);
  };
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link"
                to={'..'}
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={routesEnum.FAVORITES}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                    Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationList/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersFilteredData.length} places to stay in {city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <OffersList block='cities' offersMockData={offersFilteredData} onActiveOfferChangeCallback={onActiveOfferChangeCallback}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {offersFilteredData.length && <CityMap offersMockData={offersFilteredData} selectedOfferId={activeOffer}/>}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
