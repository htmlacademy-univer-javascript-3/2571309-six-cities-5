import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib';
import { IChangeFavoriteStatusBtnProps } from './types';
import { changeFavoriteStatus } from '../../../entities/offer/model/action';
import { authSelector } from '../../../entities/user/model/selectors';
import { AuthEnum } from '../../../entities/user';
import { redirectToRoute } from '../../../entities/user/model/action';
import { RoutesEnum } from '../../../shared/config';
import { paramsByBlockName } from '../../../widgets/offer-section/ui/const';

function MemoFavoriteStatusBtn({offer, block = 'offer__bookmark'}:IChangeFavoriteStatusBtnProps) {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(authSelector);
  const handleBtnClick = () => {
    if(authStatus === AuthEnum.NO_AUTHENTICATED) {
      return dispatch(redirectToRoute(RoutesEnum.LOGIN));
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
