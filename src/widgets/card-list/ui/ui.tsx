import {useState} from 'react';
import { CardOffer } from '../../../components';
import { OfferType } from '../../../shared/interface';


interface IOffersListProps {
  offersMockData: OfferType[];
}

export default function OffersList({offersMockData}: IOffersListProps) {
  const [activeOffer, setActiveOffer] = useState<string>('');
  const onActiveOfferChangeCallback = (id: string) => {
    setActiveOffer(id);
  };
  return (
    <div className="cities__places-list places__list tabs__content">
      {offersMockData.map((el) => (<CardOffer block={'cities'} offer = {el} key={el.id} onMouseMoveCallback={onActiveOfferChangeCallback}/>))}
    </div>
  );
}
