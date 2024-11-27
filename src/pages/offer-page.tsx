import { useParams } from 'react-router-dom';
import { ReviewList } from '../widgets/review-list';
import { CityMap } from '../widgets/city-map';
import { OffersList } from '../widgets/card-list';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../shared/lib';
import { OfferSection } from '../widgets/offer-section';
import { fetchOfferById, setOfferOnPage } from '../entities/offer/model/action';
import { Spinner } from '../shared/ui/spinner';
import { OfferGallery } from '../widgets/offer-gallery';
import { AddReviewForm } from '../features/addReview';
import { AuthEnum } from '../entities/user';

export default function OfferPage() {
  const { id: idOffer } = useParams();
  const {offerOnPage,nearOffers} = useAppSelector((state)=>state.offer);
  const {reviews} = useAppSelector((state)=>state.review);
  const {authorizationStatus} = useAppSelector((state)=>state.user);
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
          <OfferGallery images={offerOnPage.images.slice(0,6)}/>
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
            <CityMap offersData={[...nearOffers,offerOnPage]} selectedOfferId={idOffer}/>
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
