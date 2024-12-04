import { UserType } from '../../user';

export type ReviewType = {
    id: string;
    date: string;
    user: UserType;
    comment: string;
    rating: number;
}

export interface IInitialStateReviewsState {
    reviews: ReviewType[];
    isLoading: boolean;
    isError: boolean;
}

export type AddReviewData = {
    offerId: string;
    comment: string;
    rating: number;
}
