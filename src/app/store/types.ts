import { IInitialStateOffersState } from '../../entities/offer/model/types';
import { IInitialStateReviewsState } from '../../entities/review/model/types';
import { IInitialStateUserState } from '../../entities/user/model/types';

export type ReducerType = {
        offer: IInitialStateOffersState;
        user: IInitialStateUserState;
        review: IInitialStateReviewsState;
    }
