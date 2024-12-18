import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { addReview, fetchReviews, setIsLoadingReview, setReviewsOnPage } from '../action';
import { reviewsReducer } from '../reviews';
import { $api } from '../../../../shared/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../../../../shared/lib/types';
import { AppThunkDispatch, extractActionsTypes } from '../../../../shared/lib';
import { ApiRoutes } from '../config';

describe('Review slice', ()=>{
  it('should return initial state with empty action',()=>{
    const expectedRes = {
      reviews: [],
      isLoading: false,
      isError: false
    };
    const action = {type:''};
    const calculatedRes = reviewsReducer(expectedRes, action);
    expect(calculatedRes).toEqual(expectedRes);
  });

  it('should return default initial state with empty action and undefined state',()=>{
    const expectedRes = {
      reviews: [],
      isLoading: false,
      isError: false
    };
    const action = {type:''};
    const calculatedRes = reviewsReducer(undefined, action);
    expect(calculatedRes).toEqual(expectedRes);
  });

  it('should return state with filled reviews state',()=>{
    const expectedRes = {
      reviews: [ {
        'id': 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
        'date': '2019-05-08T14:13:56.569Z',
        'user': {
          'name': 'Oliver Conner',
          'avatarUrl': 'https://url-to-image/image.png',
          'isPro': false
        },
        'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        'rating': 4
      }
      ],
      isLoading: false,
      isError: false
    };
    const calculatedRes = reviewsReducer(undefined, setReviewsOnPage([ {
      'id': 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
      'date': '2019-05-08T14:13:56.569Z',
      'user': {
        'name': 'Oliver Conner',
        'avatarUrl': 'https://url-to-image/image.png',
        'isPro': false
      },
      'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      'rating': 4
    }
    ]));
    expect(calculatedRes).toEqual(expectedRes);
  });

  it('should return state with filled reviews state',()=>{
    const expectedRes = {
      reviews: [],
      isLoading: true,
      isError: false
    };
    const calculatedRes = reviewsReducer(undefined, setIsLoadingReview(true));
    expect(calculatedRes).toEqual(expectedRes);
  });
  it('should return state while pending action add review',()=>{
    const expectedRes = {
      reviews: [],
      isLoading: true,
      isError: false
    };
    const calculatedRes = reviewsReducer(undefined, addReview.pending);
    expect(calculatedRes).toEqual(expectedRes);
  });
  it('should return state after action add review was rejected',()=>{
    const expectedRes = {
      reviews: [],
      isLoading: false,
      isError: true
    };
    const calculatedRes = reviewsReducer(undefined, addReview.rejected);
    expect(calculatedRes).toEqual(expectedRes);
  });
  it('should return state after action add review was fulfilled',()=>{
    const expectedRes = {
      reviews: [],
      isLoading: false,
      isError: false
    };
    const calculatedRes = reviewsReducer(undefined, addReview.fulfilled);
    expect(calculatedRes).toEqual(expectedRes);
  });
});

describe('Review async actions', ()=>{
  const mockAxiosAdapter = new MockAdapter($api);
  const middleware = [thunk.withExtraArgument($api)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  beforeEach(() => {
    store = mockStoreCreator({ review: { isError: false, isLoading: false, reviews: [] }});
  });

  describe('fetchReviews', ()=>{
    it(`should dispatch "fetchReviews.pending",
       "setReviewsOnPage" and "fetchReviews.fulfilled" with thunk "fetchReviews"`, async ()=>{
      mockAxiosAdapter.onGet(`${ApiRoutes.GET_REVIEWS}/123321`).reply(200);
      await store.dispatch(fetchReviews('123321'));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchReviews.pending.type,
        setReviewsOnPage.type,
        fetchReviews.fulfilled.type,
      ]);
    });
  });

  describe('addReview', ()=>{
    it(`should dispatch "addReview.pending", "setIsLoadingReview", "fetchReviews.pending",
      "setReviewsOnPage", "fetchReviews.fulfilled" and 
      "addReview.fulfilled" with thunk "addReview"`, async ()=>{
      mockAxiosAdapter.onPost(`${ApiRoutes.GET_REVIEWS}/123321`,{comment:'', rating:5}).reply(201);
      await store.dispatch(addReview({comment:'',offerId:'123321',rating:5}));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        addReview.pending.type,
        setIsLoadingReview.type,
        fetchReviews.pending.type,
        setReviewsOnPage.type,
        fetchReviews.fulfilled.type,
        setIsLoadingReview.type,
        addReview.fulfilled.type,
      ]);
    });
  });
}
);

