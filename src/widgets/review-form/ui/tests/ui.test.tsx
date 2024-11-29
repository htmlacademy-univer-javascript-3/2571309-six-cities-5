import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from '../ui';
import { withStore } from '../../../../shared/providers/with-store';
import { makeFakeStore } from '../../../../shared/mocks';
const fun = vi.fn();
const fakeFunctions = {
  fakeOnSubmitClick: fun
};
describe('Component: ReviewForm', ()=>{
  it('should render component correctly', ()=>{

    const {withStoreComponent} = withStore(<ReviewForm onSubmitClick={fakeFunctions.fakeOnSubmitClick}/>, makeFakeStore());
    render(withStoreComponent);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('check input data and click submit', async()=>{
    const mockLongText = 'test111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111';

    const {withStoreComponent} = withStore(<ReviewForm onSubmitClick={fun}/>, makeFakeStore());
    vi.spyOn(fakeFunctions,'fakeOnSubmitClick');
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
    expect(fun).toBeCalledTimes(1);
    expect(screen.getByText(mockLongText)).toBeInTheDocument();
    expect(screen.getByTestId('5-stars')).toBeChecked();
  });

  it('check disabled btn submit', async()=>{
    const mockShortText = 'test';

    const {withStoreComponent} = withStore(<ReviewForm onSubmitClick={fun}/>, makeFakeStore());
    vi.spyOn(fakeFunctions,'fakeOnSubmitClick');
    render(withStoreComponent);

    await userEvent.type(
      screen.getByTestId('review-textarea'),
      mockShortText
    );

    await userEvent.click(
      screen.getByTestId('5-stars')
    );

    expect(screen.getByTestId('submit-btn')).toBeDisabled();
    expect(screen.getByText(mockShortText)).toBeInTheDocument();
    expect(screen.getByTestId('5-stars')).toBeChecked();
  });
});
