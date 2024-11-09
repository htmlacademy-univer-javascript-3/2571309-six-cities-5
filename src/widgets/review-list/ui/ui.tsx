import { ReviewCard } from '../../../entities/review';
import { ReviewType } from '../../../entities/review/model/types';

interface IReviewList {
    reviewsData: ReviewType[];
}
export default function ReviewList({reviewsData}: IReviewList) {
  return (
    <ul className="reviews__list">
      {reviewsData.map((review)=>(<ReviewCard key={review.id} {...review}/>))}
    </ul>
  );
}
