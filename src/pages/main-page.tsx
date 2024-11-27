import { OffersList } from '../widgets/card-list';
import { CityMap } from '../widgets/city-map';
import { useMemo, useState } from 'react';
import { LocationList } from '../widgets/location-list';
import { useAppSelector } from '../shared/lib';
import { SortingPanel } from '../features/sorting-panel';
import { Spinner } from '../shared/ui/spinner';

export default function MainPage () {
  const {city, offers, isLoading} = useAppSelector((state)=>state.offer);
  const offersFilteredData = useMemo(()=>offers.filter((el)=>el.city.name === city), [city, offers]);
  const [activeOffer, setActiveOffer] = useState<string>('');
  const onActiveOfferChangeCallback = (id: string) => {
    setActiveOffer(id);
  };
  if(isLoading) {
    return <Spinner/>;
  }
  return (
    <div className="page page--gray page--main">
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
              <SortingPanel/>
              <OffersList block='cities' offersData={offersFilteredData} onActiveOfferChangeCallback={onActiveOfferChangeCallback}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {offersFilteredData.length && <CityMap offersData={offersFilteredData} selectedOfferId={activeOffer}/>}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
