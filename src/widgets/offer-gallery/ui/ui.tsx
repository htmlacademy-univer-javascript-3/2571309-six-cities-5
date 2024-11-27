import { IOfferGallery } from './types';

export default function OfferGallery({images}: IOfferGallery) {
  return(
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {
          images.map((imageUrl)=>(
            <div className="offer__image-wrapper" key={imageUrl}>
              <img
                className="offer__image"
                src={imageUrl}
                alt="Photo studio"
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}
