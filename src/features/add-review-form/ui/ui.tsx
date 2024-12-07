import { addReview } from '../../../entities/review/model/action';
import { ReviewType } from '../../../entities/review/model/types';
import { useAppDispatch } from '../../../shared/lib';
import { ReviewForm } from '../../../widgets/review-form';
import { IAddReview } from './types';

export default function AddReview({offerId}: IAddReview) {
  const dispatch = useAppDispatch();
  const handleReviewFormSubmit = ({comment,rating}: Pick<ReviewType, 'comment' | 'rating'>) =>{
    dispatch(addReview({comment, rating,offerId}));
  };
  return (
    <ReviewForm onSubmitClick={handleReviewFormSubmit}/>
  );
}
