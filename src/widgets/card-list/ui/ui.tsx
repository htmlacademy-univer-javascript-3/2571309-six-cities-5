import { CardOffer } from '../../../components';
import { paramsByBlockName } from '../../../components/card';
import { OfferType } from '../../../shared/types';


interface IOffersListProps {
  offersMockData: OfferType[];
  onActiveOfferChangeCallback?: (id: string) => void;
  block: keyof typeof paramsByBlockName;
}

export default function OffersList({offersMockData, onActiveOfferChangeCallback,block}: IOffersListProps) {
  return (
    <div className={`${block === 'near-places' ? `${block}__list` : `${block}__places-list`}  tabs__content`}>
      {offersMockData.map((el) => (<CardOffer block={block} offer = {el} key={el.id} onMouseMoveCallback={onActiveOfferChangeCallback}/>))}
    </div>
  );
}
