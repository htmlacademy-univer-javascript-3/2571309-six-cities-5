import { changeCity } from '../../../entities/offer';
import { Cities } from '../../../shared/api';
import { useAppDispatch } from '../../../shared/lib';
import { LocationItem } from '../../location';

export default function LocationList() {
  const dispatch = useAppDispatch();
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.values(Cities).map((city)=>
          <LocationItem cityName={city} key={city} onClickLocationHandler={()=>dispatch(changeCity(city))}/>
        )}
      </ul>
    </section>
  );
}
