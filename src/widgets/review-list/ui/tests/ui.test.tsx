import { render, screen } from '@testing-library/react';
import { withStore } from '../../../../shared/providers/with-store';
import ReviewList from '../ui';
import { MAX_REVIEWS_COUNT } from '../../../../entities/review/model/const';
import { ReviewType } from '../../../../entities/review/model/types';
describe('Component: ReviewList', ()=>{
  it('should render component correctly', ()=>{
    const testArray = Array<ReviewType>(11).fill({
      'id': 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62d',
      'date': '2019-05-08T14:13:56.569Z',
      'user': {
        'name': 'Oliver Conner',
        'avatarUrl': 'https://url-to-image/image.png',
        'isPro': false
      },
      'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      'rating': 4
    }
    ).map<ReviewType>((el, index)=>({
      ...el,
      id: el.id + index
    }));
    const {withStoreComponent} = withStore(<ReviewList reviewsData={testArray}/>);
    render(withStoreComponent);

    expect(screen.getByTestId('reviews__list').childElementCount).toBeLessThanOrEqual(MAX_REVIEWS_COUNT);
  });
});
