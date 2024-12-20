import { OfferType } from '../../../shared/types';
import { paramsByBlockName } from '../../../widgets/offer-section/ui/const';

export interface IChangeFavoriteStatusBtnProps {
    offer: OfferType;
    isChangeOnlyInList?: boolean;
    block?: keyof typeof paramsByBlockName;
}
