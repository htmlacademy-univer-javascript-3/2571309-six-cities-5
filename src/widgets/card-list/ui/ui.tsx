import { memo } from 'react';
import { CardOffer, paramsByBlockName } from '../../../entities/offer';
import { OfferType } from '../../../shared/types';


interface IOffersListProps {
  offersData: OfferType[];
  onActiveOfferChangeCallback?: (id: string) => void;
  block: keyof typeof paramsByBlockName;
}

function MemoOffersList({offersData, onActiveOfferChangeCallback,block}: IOffersListProps) {
  return (
    <div className={`${block === 'near-places' ? `${block}__list` : `${block}__places-list`}  tabs__content`}>
      {offersData.map((el) => (<CardOffer block={block} offer = {el} key={el.id} onMouseMoveCallback={onActiveOfferChangeCallback}/>))}
    </div>
  );
}
export const OffersList = memo(MemoOffersList);
