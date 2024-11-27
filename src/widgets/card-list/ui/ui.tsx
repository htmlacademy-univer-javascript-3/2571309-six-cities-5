import { CardOffer, paramsByBlockName } from '../../../entities/offer';
import { OfferType } from '../../../shared/types';


interface IOffersListProps {
  offersData: OfferType[];
  onActiveOfferChangeCallback?: (id: string) => void;
  block: keyof typeof paramsByBlockName;
}

export default function OffersList({offersData, onActiveOfferChangeCallback,block}: IOffersListProps) {
  return (
    <div className={`${block === 'near-places' ? `${block}__list` : `${block}__places-list`}  tabs__content`}>
      {offersData.map((el) => (<CardOffer block={block} offer = {el} key={el.id} onMouseMoveCallback={onActiveOfferChangeCallback}/>))}
    </div>
  );
}
