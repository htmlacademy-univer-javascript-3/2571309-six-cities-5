import { memo, useState } from 'react';
import { changeSort } from '../../../entities/offer/model/action';
import { useAppDispatch, useAppSelector } from '../../../shared/lib';
import { SortingOptionsEnum } from './const';
import { selectCurrentSort } from '../../../entities/offer/model/selectors';

function MemoSortingPanel() {
  const dispatch = useAppDispatch();
  const sort = useAppSelector(selectCurrentSort);
  const [isExpanded,setIsExpanded] = useState<boolean>(false);
  const sortingItemClickHandler = (el: SortingOptionsEnum) => {
    setIsExpanded((prev)=>!prev);
    dispatch(changeSort(el));
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span data-testid='places__sorting-type' className="places__sorting-type" tabIndex={0} onClick={()=>setIsExpanded((prev)=>!prev)}>
        {sort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul data-testid='places__options' className={`places__options places__options--custom ${isExpanded ? 'places__options--opened' : ''}`}>
        {Object.values(SortingOptionsEnum).map((el)=>(
          <li
            key={el}
            className={`places__option ${el === sort ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={()=>sortingItemClickHandler(el)}
            data-testid='places__option'
          >
            {el}
          </li>
        ))}
      </ul>
    </form>
  );
}

export const SortingPanel = memo(MemoSortingPanel);
