import { PropsWithChildren } from 'react';
import { OfferType } from '../../../shared/types';

export interface IOfferSectionProps extends PropsWithChildren {
    offer: OfferType;
}
