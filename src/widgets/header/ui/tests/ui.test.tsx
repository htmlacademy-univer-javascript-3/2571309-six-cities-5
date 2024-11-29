import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../../shared/providers';
import { withStore } from '../../../../shared/providers/with-store';
import { Header } from '../ui';
import { Cities } from '../../../../shared/api';
import { SortingOptionsEnum } from '../../../../features/sorting-panel';
import { AuthEnum } from '../../../../entities/user';

describe('Component: Header', ()=>{
  const initialState = {
    offer:{
      favorites:[], city: Cities.Amsterdam,isLoading: false,
      offers:[], nearOffers:[], offerOnPage:null, sort: SortingOptionsEnum.Popular
    },
    user: {
      authorizationStatus: AuthEnum.AUTHENTICATED,
      user: {
        name: 'Oliver Conner',
        avatarUrl: 'https://url-to-image/image.png',
        isPro: false,
        email: 'test'
      }
    }

  };
  it('should rendered correctly with authStatus auth', ()=>{
    const altText = '6 cities logo';
    const btnText = 'Log Out';
    const emailUser = 'test';

    const {withStoreComponent} = withStore(<Header isAuthentificated/>, initialState);
    const componentWithProviders = withHistory(withStoreComponent);

    render(componentWithProviders);

    expect(screen.getByAltText(altText)).toBeInTheDocument();
    expect(screen.getByText(btnText)).toBeInTheDocument();
    expect(screen.getByText(emailUser)).toBeInTheDocument();
  });

  it('should rendered correctly with authStatus no auth', ()=>{
    const altText = '6 cities logo';
    const btnText = 'Sign in';
    const testIdLink = 'link_to_favorites';

    const {withStoreComponent} = withStore(<Header isAuthentificated={false}/>, {...initialState, user:{user: null, authorizationStatus: AuthEnum.NO_AUTHENTICATED}});
    const componentWithProviders = withHistory(withStoreComponent);

    render(componentWithProviders);

    expect(screen.getByAltText(altText)).toBeInTheDocument();
    expect(screen.getByText(btnText)).toBeInTheDocument();
    expect(screen.queryByTestId(testIdLink)).toBeNull();
  });
});
