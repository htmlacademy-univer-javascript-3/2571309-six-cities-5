import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../../../shared/providers/with-store';
import { makeFakeStore } from '../../../../shared/mocks';
import { AddReviewForm } from '..';
import { ApiRoutes } from '../../../../entities/review/model/config';
import { addReview, fetchReviews, setIsLoadingReview, setReviewsOnPage } from '../../../../entities/review/model/action';
import { extractActionsTypes } from '../../../../shared/lib';
describe('Component: AddReview', ()=>{
  it('should dispatch correct actions', async ()=>{
    const fakeOfferId = '123321';
    const mockLongText = 'test111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111';
    const {withStoreComponent, mockStore,mockAxiosAdapter} = withStore(<AddReviewForm offerId={fakeOfferId}/>, makeFakeStore());
    mockAxiosAdapter.onPost(`${ApiRoutes.GET_REVIEWS}/${fakeOfferId}`).reply(201);
    mockAxiosAdapter.onGet(`${ApiRoutes.GET_REVIEWS}/${fakeOfferId}`).reply(201);
    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId('review-textarea'),
      mockLongText
    );

    await userEvent.click(
      screen.getByTestId('5-stars')
    );

    await userEvent.click(
      screen.getByTestId('submit-btn')
    );
    const actions = extractActionsTypes(mockStore.getActions());
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
