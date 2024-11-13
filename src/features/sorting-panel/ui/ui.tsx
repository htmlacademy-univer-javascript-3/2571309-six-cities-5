import { useState } from 'react';
import { changeSort } from '../../../entities/offer/model/action';
import { useAppDispatch, useAppSelector } from '../../../shared/lib';
import { SortingOptionsEnum } from './const';

export default function SortingPanel() {
  const dispatch = useAppDispatch();
  const {sort} = useAppSelector((state)=>state.offer);
  const [isExpanded,setIsExpanded] = useState<boolean>(false);
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {sort}
        <svg className="places__sorting-arrow" width={7} height={4} onClick={()=>setIsExpanded((prev)=>!prev)}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isExpanded ? 'places__options--opened' : ''}`}>
        {Object.values(SortingOptionsEnum).map((el)=>(
          <li
            key={el}
            className={`places__option ${el === sort ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={()=>dispatch(changeSort(el))}
          >
            {el}
          </li>
        ))}
      </ul>
    </form>
  );
}
