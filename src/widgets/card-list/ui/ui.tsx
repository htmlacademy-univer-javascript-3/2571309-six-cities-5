import { CardOffer } from '../../../components';
import { OfferType } from '../../../shared/types';


interface IOffersListProps {
  offersMockData: OfferType[];
  onActiveOfferChangeCallback: (id: string) => void;
}

export default function OffersList({offersMockData, onActiveOfferChangeCallback}: IOffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offersMockData.map((el) => (<CardOffer block={'cities'} offer = {el} key={el.id} onMouseMoveCallback={onActiveOfferChangeCallback}/>))}
    </div>
  );
}
