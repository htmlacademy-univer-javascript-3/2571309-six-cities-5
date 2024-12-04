import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib';
import { IChangeFavoriteStatusBtnProps } from './types';
import { changeFavoriteStatus } from '../../../entities/offer/model/action';
import { authSelector } from '../../../entities/user/model/selectors';
import { AuthEnum } from '../../../entities/user';
import { redirectToRoute } from '../../../entities/user/model/action';
import { routesEnum } from '../../../shared/config';

function MemoFavoriteStatusBtn({offer}:IChangeFavoriteStatusBtnProps) {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(authSelector);
  const btnClickHandler = () => {
    if(authStatus === AuthEnum.NO_AUTHENTICATED) {
      return dispatch(redirectToRoute(routesEnum.LOGIN));
    }
    dispatch(changeFavoriteStatus({offerId: offer.id, status: +!offer.isFavorite}));
  };
  return(
    <button
      className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
      type="button"
      onClick={btnClickHandler}
    >
      <svg
        className="place-card__bookmark-icon"
        width={18}
        height={19}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{offer.isFavorite ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

export const FavoriteStatusBtn = memo(MemoFavoriteStatusBtn);
