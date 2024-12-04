import { ReviewCard } from '../../../entities/review';
import { MAX_REVIEWS_COUNT } from '../../../entities/review/model/const';
import { ReviewType } from '../../../entities/review/model/types';

interface IReviewList {
    reviewsData: ReviewType[];
}
export default function ReviewList({reviewsData}: IReviewList) {
  return (
    <ul className="reviews__list">
      {reviewsData.slice(0,MAX_REVIEWS_COUNT).map((review)=>(<ReviewCard key={review.id} {...review}/>))}
    </ul>
  );
}
