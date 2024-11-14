import { Link } from 'react-router-dom';
import { ILocationProps } from './types';
import { useAppSelector } from '../../shared/lib';
import { memo } from 'react';

function LocationItem(props: ILocationProps) {
  const {city} = useAppSelector((state)=>state.offer);
  return (
    <li className="locations__item">
      <Link to={'#'} className={`locations__item-link tabs__item 
          ${city === props.cityName ? 'tabs__item--active' : ''}`} onClick={props.onClickLocationHandler}
      >
        <span>{props.cityName}</span>
      </Link>
    </li>
  );
}
export default memo(LocationItem);
