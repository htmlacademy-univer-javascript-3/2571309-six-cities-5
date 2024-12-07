
import {Fragment, useEffect, useState} from 'react';
import { ReviewType } from '../../../entities/review/model/types';
import { IReviewFormProps } from './types';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, ratingData } from './const';
import { useAppSelector } from '../../../shared/lib';
import { isErrorReviewsSelector, isLoadingReviewsSelector } from '../../../entities/review/model/selectors';
import { toast } from 'react-toastify';


const initialState: Pick<ReviewType, 'comment' | 'rating'> = {
  comment: '',
  rating: 0
};

export default function ReviewForm({onSubmitClick}: IReviewFormProps) {
  const [reviewState, setReviewState] = useState<Pick<ReviewType, 'comment' | 'rating'>>(initialState);
  const isLoading = useAppSelector(isLoadingReviewsSelector);
  const isError = useAppSelector(isErrorReviewsSelector);
  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(()=>{
    if(!isLoading && isError) {
      toast.warn('ERROR');
    }
    if(!isLoading && !isError) {
      setReviewState(initialState);
    }
  },[isLoading, isError]);
  useEffect(()=>{
    if((reviewState.comment.length < MIN_COMMENT_LENGTH || reviewState.comment.length > MAX_COMMENT_LENGTH || reviewState.rating === 0) && isValid) {
      setIsValid(false);
    } else if (reviewState.comment.length >= MIN_COMMENT_LENGTH && reviewState.comment.length <= MAX_COMMENT_LENGTH && reviewState.rating !== 0 && !isValid) {
      setIsValid(true);
    }
  },[reviewState, isValid]);
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
                data-testid={`${el.value}-stars`}
                id={`${el.value}-stars`}
                type="radio"
                disabled={isLoading}
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
        data-testid='review-textarea'
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewState.comment}
        disabled={isLoading}
        onChange={(e)=>{
          setReviewState((prev)=>({...prev, comment: e.target.value}));
        }}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
      To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with
      at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          data-testid='submit-btn'
          disabled={!isValid || isLoading}
          onClick={(e)=>{
            e.preventDefault();
            onSubmitClick(reviewState);
          }}
        >
      Submit
        </button>
      </div>
    </form>
  );
}
