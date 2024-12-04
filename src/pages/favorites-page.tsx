import { useMemo } from 'react';
import { OfferType } from '../shared/types';
import { useAppSelector } from '../shared/lib';
import { CardOffer } from '../entities/offer';
import { offersSelector } from '../entities/offer/model/selectors';

type resolvedDataType = [string, OfferType[]]
export default function FavoritesPage() {
  const offers = useAppSelector(offersSelector);
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
  },[offers]);
  return (
    <div className="page">
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
