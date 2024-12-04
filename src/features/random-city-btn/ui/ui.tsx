import { Link } from 'react-router-dom';
import { routesEnum } from '../../../shared/config';
import { useMemo } from 'react';
import { Cities } from '../../../shared/api';
import { useAppDispatch } from '../../../shared/lib';
import { changeCity } from '../../../entities/offer';

const citiesArray = Object.values(Cities);
export default function RandomCityBtn() {
  const randomCityId = useMemo(()=>Math.floor(Math.random() * citiesArray.length),[]);
  const dispatch = useAppDispatch();
  const onBtnClick = () => {
    dispatch(changeCity(citiesArray[randomCityId]));
  };
  return(
    <Link className="locations__item-link" to={routesEnum.MAIN} onClick={onBtnClick}>
      <span>{citiesArray[randomCityId]}</span>
    </Link>
  );
}
