import { Link } from 'react-router-dom';
import { OfferType } from '../../shared/interface';

const paramsByBlockName = {
  cities: {
    width:260,
    height:200
  },
  favorites: {
    width:150,
    height:110
  },
};

interface ICardOfferProps {
    offer: OfferType;
    onMouseMoveCallback?: (id: string) => void;
    block: keyof typeof paramsByBlockName;
}


export default function CardOffer ({block, offer, onMouseMoveCallback}: ICardOfferProps): JSX.Element {
  return (
    <article className={`${block}__card place-card`} onMouseEnter={()=>{
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
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            {...paramsByBlockName[block]}
            alt="Place image"
          />
        </a>
      </div>
      <div className={`${block}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
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
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }} />
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
