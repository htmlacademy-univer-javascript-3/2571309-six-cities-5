import { SortingOptionsEnum } from '../../../features/sorting-panel';
import { OfferType } from '../../../shared/types';

export interface IInitialStateOffersState {
    city: string;
    offers: OfferType[];
    sort: SortingOptionsEnum;
}
