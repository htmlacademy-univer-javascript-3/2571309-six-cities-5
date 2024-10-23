
import {Fragment, useEffect, useState} from 'react';
import { ReviewType } from '../../../shared/api';


const initialState: ReviewType = {
  comment: '',
  rating: 0
};
const ratingData = [
  {
    value:5,
    title: 'perfect'},
  {
    value:4,
    title: 'good'},
  {
    value:3,
    title: 'not bad'},
  {
    value:2,
    title: 'badly'},
  {
    value:1,
    title: 'terribly'}];

export default function CommentForm() {
  const [reviewState, setReviewState] = useState<ReviewType>(initialState);
  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(()=>{
    if((reviewState.comment.length < 50 || reviewState.comment.length > 300 || reviewState.rating === 0) && isValid) {
      setIsValid(false);
    } else if (reviewState.comment.length >= 50 && reviewState.comment.length <= 300 && reviewState.rating !== 0 && !isValid) {
      setIsValid(true);
    }
  },[reviewState]);
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
    Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {
          ratingData.map((el)=>(
            <Fragment key={el.value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={reviewState.rating}
                id={`${el.value}-stars`}
                type="radio"
                checked={el.value === reviewState.rating}
                onChange={()=>{
                  setReviewState((prev)=>({...prev, rating: el.value}));
                }}
              />
              <label
                htmlFor={`${el.value}-stars`}
                className="reviews__rating-label form__rating-label"
                title={el.title}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </Fragment>

          ))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewState.comment}
        onChange={(e)=>{
          setReviewState((prev)=>({...prev, comment: e.target.value}));
        }}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
      To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with
      at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
          onClick={(e)=>{
            e.preventDefault();
            setReviewState(initialState);
          }}
        >
      Submit
        </button>
      </div>
    </form>
  );
}
