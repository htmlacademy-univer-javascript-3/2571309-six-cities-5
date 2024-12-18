import { isErrorReviewsSelector, isLoadingReviewsSelector, reviewsSelector } from '../selectors';

describe('Review selectors',()=>{
  const reviewState = {
    isError: true,
    isLoading: true,
    reviews:[ {
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
    ]};
  it('should return reviews from reviewState',()=>{
    const expectedRes = reviewState.reviews;

    const calculateRes = reviewsSelector({review:reviewState});

    expect(calculateRes).toEqual(expectedRes);
  });
  it('should return isLoading from reviewState',()=>{
    const expectedRes = reviewState.isLoading;

    const calculateRes = isLoadingReviewsSelector({review:reviewState});

    expect(calculateRes).toEqual(expectedRes);
  });
  it('should return isError from reviewState',()=>{
    const expectedRes = reviewState.isError;

    const calculateRes = isErrorReviewsSelector({review:reviewState});

    expect(calculateRes).toEqual(expectedRes);
  });
});
