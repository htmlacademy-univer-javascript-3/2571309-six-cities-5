import { SortingOptionsEnum } from '../../../features/sorting-panel';
import { OfferType } from '../../../shared/types';
import { paramsByBlockName } from './const';

export interface IInitialStateOffersState {
    city: string;
    offers: OfferType[];
    sort: SortingOptionsEnum;
    isLoading: boolean;
}

export interface ICardOfferProps {
    offer: OfferType;
    onMouseMoveCallback?: (id: string) => void;
    block: keyof typeof paramsByBlockName;
}
