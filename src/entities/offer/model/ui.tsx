import { Link } from 'react-router-dom';
import { ICardOfferProps } from './types';
import { NUMBER_TO_MULTIPLY, paramsByBlockName } from './const';
import { memo } from 'react';
import { FavoriteStatusBtn } from '../../../features/favorite-status-btn';

function MemoCardOffer ({block, offer, onMouseMoveCallback, isNeedChangeFavoriteStatusForward = false}: ICardOfferProps): JSX.Element {
  return (
    <article data-testid='card-offer-item' className={`${block}__card place-card`} onMouseEnter={()=>{
      onMouseMoveCallback?.(offer.id);
    }}
    onMouseLeave={()=>{
      onMouseMoveCallback?.('');
    }}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            {...paramsByBlockName[block]}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${block}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <FavoriteStatusBtn block='place-card__bookmark' offer={offer} isChangeOnlyInList={isNeedChangeFavoriteStatusForward}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(offer.rating) * NUMBER_TO_MULTIPLY}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`../offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
export const CardOffer = memo(MemoCardOffer);
