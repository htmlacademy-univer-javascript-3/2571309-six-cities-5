import { useCallback, useMemo, useState } from 'react';
import { useAppSelector } from '../../../shared/lib';
import { SortingOptionsEnum, SortingPanel } from '../../../features/sorting-panel';
import { OffersList } from '../../card-list';
import { CityMap } from '../../city-map';
import { currentCitySelector, offersSelector, selectCurrentSort } from '../../../entities/offer/model/selectors';
import { EmptyCityBlock } from '../../empty-city-block';

export default function CitiesBlock () {
  const offers = useAppSelector(offersSelector);
  const city = useAppSelector(currentCitySelector);
  const currentSort = useAppSelector(selectCurrentSort);
  const offersFilteredData = useMemo(()=>offers.filter((el)=>el.city.name === city).sort((a,b)=>{
    switch (currentSort) {
      case SortingOptionsEnum.Popular:
        return 0;
      case SortingOptionsEnum.PriceHighToLow:
        return b.price - a.price;
      case SortingOptionsEnum.PriceLowToHigh:
        return a.price - b.price;
      case SortingOptionsEnum.TopRatedFirst:
        return b.rating - a.rating;
      default:
        return 0;
    }
  }), [city, offers,currentSort]);
  const [activeOffer, setActiveOffer] = useState<string>('');
  const handleOfferItemMouseMove = useCallback((id: string) => {
    setActiveOffer(id);
  },[]);
  return (
    <div className="cities">
      {
        !offersFilteredData.length ?
          <EmptyCityBlock city={city}/>
          :
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersFilteredData.length} places to stay in {city}</b>
              <SortingPanel/>
              <OffersList block='cities' offersData={offersFilteredData} onActiveOfferChangeCallback={handleOfferItemMouseMove}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {offersFilteredData.length &&
            <CityMap key={city} offersData={offersFilteredData} selectedOfferId={activeOffer}
              city={offersFilteredData[0].city}
            />}
              </section>
            </div>
          </div>
      }
    </div>
  );
}
