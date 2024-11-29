import { SortingOptionsEnum } from '../../../features/sorting-panel';
import { Cities } from '../../../shared/api';
import { OfferType } from '../../../shared/types';
import { paramsByBlockName } from './const';

export interface IInitialStateOffersState {
    city: Cities;
    offers: OfferType[];
    nearOffers: OfferType[];
    sort: SortingOptionsEnum;
    isLoading: boolean;
    offerOnPage: OfferType|null;
    favorites: OfferType[];
}

export interface ICardOfferProps {
    offer: OfferType;
    onMouseMoveCallback?: (id: string) => void;
    block: keyof typeof paramsByBlockName;
}

export enum FavoriteStatusEnum {
    FAVOTITE,
    NOT_FAVORITE
}

export type ChangeFavoriteStatus = {
    offerId: string;
    status: FavoriteStatusEnum;
}

