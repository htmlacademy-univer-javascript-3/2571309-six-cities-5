import { memo, useCallback } from 'react';
import { changeCity } from '../../../entities/offer';
import { Cities } from '../../../shared/api';
import { useAppDispatch } from '../../../shared/lib';
import { LocationItem } from '../../location';

const MemoLocationList = () => {
  const dispatch = useAppDispatch();
  const handleLocationItemClick = useCallback((city: Cities)=>{
    dispatch(changeCity(city));
  },[dispatch]);
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.values(Cities).map((city)=>
          <LocationItem cityName={city} key={city} onClickLocationHandler={() => handleLocationItemClick(city)}/>
        )}
      </ul>
    </section>
  );
};
export const LocationList = memo(MemoLocationList);
