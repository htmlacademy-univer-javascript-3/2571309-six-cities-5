import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib';
import { IChangeFavoriteStatusBtnProps } from './types';
import { changeFavoriteStatus, changeStatusOfFavorite } from '../../../entities/offer/model/action';
import { authSelector } from '../../../entities/user/model/selectors';
import { AuthEnum } from '../../../entities/user';
import { redirectToRoute } from '../../../entities/user/model/action';
import { RoutesEnum } from '../../../shared/config';
import { paramsByBlockName } from '../../../widgets/offer-section/ui/const';
import { nearOffersSelector } from '../../../entities/offer/model/selectors';

function MemoFavoriteStatusBtn({offer, block = 'offer__bookmark', isChangeOnlyInList = false}:IChangeFavoriteStatusBtnProps) {
  const dispatch = useAppDispatch();
  const nearOffers = useAppSelector(nearOffersSelector);
  const authStatus = useAppSelector(authSelector);
  const handleBtnClick = () => {
    if(authStatus === AuthEnum.NO_AUTHENTICATED) {
      return dispatch(redirectToRoute(RoutesEnum.LOGIN));
    }
    if(isChangeOnlyInList && nearOffers) {
      const curNearOffer = nearOffers.find((el)=>el.id === offer.id);
      if(curNearOffer) {
        dispatch(changeStatusOfFavorite(curNearOffer));
      }
    }
    dispatch(changeFavoriteStatus({offerId: offer.id, status: +!offer.isFavorite}));
  };
  return(
    <button
      className={`button ${block}-button ${offer.isFavorite ? `${block}-button--active` : ''}`}
      type="button"
      onClick={handleBtnClick}
      data-testid='bth-favorite-offer'
    >
      <svg
        className={`${block}-icon`}
        {...paramsByBlockName[block]}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{offer.isFavorite ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

export const FavoriteStatusBtn = memo(MemoFavoriteStatusBtn);
