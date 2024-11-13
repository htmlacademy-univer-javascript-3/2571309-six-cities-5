import { useMemo } from 'react';
import { OfferType } from '../shared/types';
import { Link } from 'react-router-dom';
import { CardOffer } from '../components';
import { routesEnum } from './types';
import { useAppSelector } from '../shared/lib';

type resolvedDataType = [string, OfferType[]]
export default function FavoritesPage() {
  const {offers} = useAppSelector((state)=>state.offer);
  const resolvedData: resolvedDataType[] = useMemo(()=>{
    const map = new Map<string, OfferType[]>();
    offers.forEach((el)=>{
      if(map.has(el.city.name) && map.get(el.city.name)) {
        map.set(el.city.name,[...map.get(el.city.name) as OfferType[], el]);
      } else {
        map.set(el.city.name,[el]);
      }
    });
    return Array.from(map);
  },[]);
  return (
    <div className="page">
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
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {resolvedData.map((el)=> (
                <li className="favorites__locations-items" key={el[0]}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{el[0]}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {el[1].map((elem) =>(<CardOffer block='favorites' offer={elem} key={elem.id}/>))}

                  </div>
                </li>)
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>

  );
}
