import { OfferType } from '../../../shared/types';
import { paramsByBlockName } from '../../../widgets/offer-section/ui/const';

export interface IChangeFavoriteStatusBtnProps {
    offer: OfferType;
    block?: keyof typeof paramsByBlockName;
}
