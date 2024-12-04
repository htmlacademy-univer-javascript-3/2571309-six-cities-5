import { useCallback, useMemo, useState } from 'react';
import { useAppSelector } from '../../../shared/lib';
import { SortingPanel } from '../../../features/sorting-panel';
import { OffersList } from '../../card-list';
import { CityMap } from '../../city-map';
import { currentCitySelector, offersSelector } from '../../../entities/offer/model/selectors';

export default function CitiesBlock () {
  const offers = useAppSelector(offersSelector);
  const city = useAppSelector(currentCitySelector);
  const offersFilteredData = useMemo(()=>offers.filter((el)=>el.city.name === city), [city, offers]);
  const [activeOffer, setActiveOffer] = useState<string>('');
  const onActiveOfferChangeCallback = useCallback((id: string) => {
    setActiveOffer(id);
  },[]);
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offersFilteredData.length} places to stay in {city}</b>
          <SortingPanel/>
          <OffersList block='cities' offersData={offersFilteredData} onActiveOfferChangeCallback={onActiveOfferChangeCallback}/>
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
    </div>
  );
}
