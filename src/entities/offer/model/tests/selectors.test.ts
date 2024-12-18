import { SortingOptionsEnum } from '../../../../features/sorting-panel';
import { Cities } from '../../../../shared/api';
import { favoritesSelector, nearOffersSelector, offerOnPageSelector, offersSelector, selectCurrentSort } from '../selectors';
import { IInitialStateOffersState } from '../types';

describe('Offer selectors',()=>{
  const offerState: IInitialStateOffersState = {
    city: Cities.Paris,
    offers: [
      {
        'id': 'a20a52b2-efc2-4b0f-9396-4bdfbe5e9543',
        'title': 'Wood and stone place',
        'type': 'apartment',
        'price': 576,
        'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
        'city': {
          'name': Cities.Amsterdam,
          'location': {
            'latitude': 48.85661,
            'longitude': 2.351499,
            'zoom': 13
          }
        },
        'location': {
          'latitude': 48.868610000000004,
          'longitude': 2.342499,
          'zoom': 16
        },
        'isFavorite': false,
        'isPremium': false,
        'rating': 2.1,
        'description': 'TEst',
        'bedrooms': 1,
        'goods': [],
        maxAdults: 1,
        images: [''],
        host:{ 'name': 'Oliver Conner',
          'avatarUrl': 'https://url-to-image/image.png',
          'isPro': false
        }
      },
    ],
    nearOffers: [{
      'id': 'a20a52b2-efc2-4b0f-9396-4bdfbe5e9543',
      'title': 'Wood and stone place',
      'type': 'apartment',
      'price': 576,
      'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
      'city': {
        'name': Cities.Amsterdam,
        'location': {
          'latitude': 48.85661,
          'longitude': 2.351499,
          'zoom': 13
        }
      },
      'location': {
        'latitude': 48.868610000000004,
        'longitude': 2.342499,
        'zoom': 16
      },
      'isFavorite': false,
      'isPremium': false,
      'rating': 2.1,
      'description': 'TEst',
      'bedrooms': 1,
      'goods': [],
      maxAdults: 1,
      images: [''],
      host:{ 'name': 'Oliver Conner',
        'avatarUrl': 'https://url-to-image/image.png',
        'isPro': false
      }
    },
    ],
    sort: SortingOptionsEnum.Popular,
    isLoading: false,
    offerOnPage: {
      'id': 'a20a52b2-efc2-4b0f-9396-4bdfbe5e9543',
      'title': 'Wood and stone place',
      'type': 'apartment',
      'price': 576,
      'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
      'city': {
        'name': Cities.Amsterdam,
        'location': {
          'latitude': 48.85661,
          'longitude': 2.351499,
          'zoom': 13
        }
      },
      'location': {
        'latitude': 48.868610000000004,
        'longitude': 2.342499,
        'zoom': 16
      },
      'isFavorite': false,
      'isPremium': false,
      'rating': 2.1,
      'description': 'TEst',
      'bedrooms': 1,
      'goods': [],
      maxAdults: 1,
      images: [''],
      host:{ 'name': 'Oliver Conner',
        'avatarUrl': 'https://url-to-image/image.png',
        'isPro': false
      }
    },
    favorites: [
      {
        'id': 'a20a52b2-efc2-4b0f-9396-4bdfbe5e9543',
        'title': 'Wood and stone place',
        'type': 'apartment',
        'price': 576,
        'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
        'city': {
          'name': Cities.Amsterdam,
          'location': {
            'latitude': 48.85661,
            'longitude': 2.351499,
            'zoom': 13
          }
        },
        'location': {
          'latitude': 48.868610000000004,
          'longitude': 2.342499,
          'zoom': 16
        },
        'isFavorite': false,
        'isPremium': false,
        'rating': 2.1,
        'description': 'TEst',
        'bedrooms': 1,
        'goods': [],
        maxAdults: 1,
        images: [''],
        host:{ 'name': 'Oliver Conner',
          'avatarUrl': 'https://url-to-image/image.png',
          'isPro': false
        }
      },
    ],
  };
  it('should return sort from offerState',()=>{
    const expectedRes = offerState.sort;

    const calculateRes = selectCurrentSort({offer:offerState});

    expect(calculateRes).toBe(expectedRes);
  });
  it('should return offers from offerState',()=>{
    const expectedRes = offerState.offers;

    const calculateRes = offersSelector({offer:offerState});

    expect(calculateRes).toEqual(expectedRes);
  });
  it('should return offers from offerState',()=>{
    const expectedRes = offerState.offerOnPage;

    const calculateRes = offerOnPageSelector({offer:offerState});

    expect(calculateRes).toEqual(expectedRes);
  });
  it('should return near offers from offerState',()=>{
    const expectedRes = offerState.nearOffers;

    const calculateRes = nearOffersSelector({offer:offerState});

    expect(calculateRes).toEqual(expectedRes);
  });
  it('should return favorite offers from offerState',()=>{
    const expectedRes = [ ['Amsterdam', [{
      'id': 'a20a52b2-efc2-4b0f-9396-4bdfbe5e9543',
      'title': 'Wood and stone place',
      'type': 'apartment',
      'price': 576,
      'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
      'city': {
        'name': Cities.Amsterdam,
        'location': {
          'latitude': 48.85661,
          'longitude': 2.351499,
          'zoom': 13
        }
      },
      'location': {
        'latitude': 48.868610000000004,
        'longitude': 2.342499,
        'zoom': 16
      },
      'isFavorite': false,
      'isPremium': false,
      'rating': 2.1,
      'description': 'TEst',
      'bedrooms': 1,
      'goods': [],
      maxAdults: 1,
      images: [''],
      host:{ 'name': 'Oliver Conner',
        'avatarUrl': 'https://url-to-image/image.png',
        'isPro': false
      }
    } ] ] ];

    const calculateRes = favoritesSelector({offer:offerState});
    expect(calculateRes).toEqual(expectedRes);
  });
});
