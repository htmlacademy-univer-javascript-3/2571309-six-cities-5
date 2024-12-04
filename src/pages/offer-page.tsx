import { useParams } from 'react-router-dom';
import { ReviewList } from '../widgets/review-list';
import { CityMap } from '../widgets/city-map';
import { OffersList } from '../widgets/card-list';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../shared/lib';
import { OfferSection } from '../widgets/offer-section';
import { fetchOfferById, setOfferOnPage } from '../entities/offer/model/action';
import { Spinner } from '../shared/ui/spinner';
import { OfferGallery } from '../widgets/offer-gallery';
import { AddReviewForm } from '../features/add-review-form';
import { AuthEnum } from '../entities/user';
import { OfferType } from '../shared/types';
import { nearOffersSelector, offerOnPageSelector } from '../entities/offer/model/selectors';
import { authSelector } from '../entities/user/model/selectors';
import { reviewsSelector } from '../entities/review/model/selectors';
import { MAX_IMAGES_COUNT, MAX_NEAR_OFFERS_COUNT } from '../entities/offer/model/const';

export default function OfferPage() {
  const { id: idOffer } = useParams();
  const nearOffers = useAppSelector(nearOffersSelector);
  const offerOnPage = useAppSelector(offerOnPageSelector);
  const offersForMap: OfferType[] = useMemo(()=>nearOffers.slice(0,MAX_NEAR_OFFERS_COUNT).concat(offerOnPage || []),[nearOffers, offerOnPage]);
  const reviews = useAppSelector(reviewsSelector);
  const authorizationStatus = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  useEffect(()=>()=>{
    dispatch(setOfferOnPage(null));
  },[dispatch]);
  useEffect(()=>{
    dispatch(fetchOfferById(idOffer ?? ''));
  },[idOffer,dispatch]);
  if(!offerOnPage) {
    return <Spinner/>;
  }
  return (
    <div className="page">
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={offerOnPage.images.slice(0,MAX_IMAGES_COUNT)}/>
          <OfferSection offer={offerOnPage}>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
              Reviews · <span className="reviews__amount">{reviews.length}</span>
              </h2>
              <ReviewList reviewsData={reviews}/>
              {authorizationStatus === AuthEnum.AUTHENTICATED ? (<AddReviewForm offerId={idOffer!}/>) : null}
            </section>
          </OfferSection>
          <section className="offer__map map">
            <CityMap offersData={offersForMap} selectedOfferId={idOffer} city={offerOnPage.city}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
          Other places in the neighbourhood
            </h2>
            <OffersList block='near-places' offersData={nearOffers}/>
          </section>
        </div>
      </main>
    </div>
  );
}
