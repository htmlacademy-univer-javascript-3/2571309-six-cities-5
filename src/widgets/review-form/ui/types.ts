import { ReviewType } from '../../../entities/review/model/types';

export interface IReviewFormProps {
    onSubmitClick: (props:Pick<ReviewType, 'comment' | 'rating'>) => void;
}
