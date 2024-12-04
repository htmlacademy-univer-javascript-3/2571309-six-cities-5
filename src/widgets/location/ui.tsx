import { Link } from 'react-router-dom';
import { ILocationProps } from './types';
import { useAppSelector } from '../../shared/lib';
import { memo } from 'react';

function MemoLocationItem(props: ILocationProps) {
  const {city} = useAppSelector((state)=>state.offer);
  return (
    <li className="locations__item">
      <Link to={'#'} data-testid='location_item' className={`locations__item-link tabs__item 
          ${city === props.cityName ? 'tabs__item--active' : ''}`} onClick={props.onClickLocationHandler}
      >
        <span>{props.cityName}</span>
      </Link>
    </li>
  );
}
export const LocationItem = memo(MemoLocationItem);
