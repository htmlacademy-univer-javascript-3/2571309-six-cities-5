import { createMemoryHistory, MemoryHistory } from 'history';
import { render, screen} from '@testing-library/react';
import { withHistory } from '../../shared/providers';
import AppRouter from '..';
import { withStore } from '../../shared/providers/with-store';
import { makeFakeStore } from '../../shared/mocks';
import { routesEnum } from '../../shared/config';
import { Cities } from '../../shared/api';
import LoginPage from '../login-page';
import { AuthEnum } from '../../entities/user';
import FavoritesPage from '../favorites-page';
import { SortingOptionsEnum } from '../../features/sorting-panel';
import MainPage from '../main-page';
import NotFoundPage from '../not-found-page';
import OfferPage from '../offer-page';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render MainPage when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<AppRouter />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(routesEnum.MAIN);

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('location_item')).toHaveLength(Object.values(Cities).length);
  });

  it('should render LoginPage when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<LoginPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({ user: {
      authorizationStatus: AuthEnum.NO_AUTHENTICATED,
      user: null
    },}));
    mockHistory.push(routesEnum.LOGIN);

    render(withStoreComponent);

    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
    expect(screen.getByTestId('location_item-link')).toBeInTheDocument();
  });

  it('should render MainPage when authenticated user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<MainPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(routesEnum.LOGIN);

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('location_item')).toHaveLength(Object.values(Cities).length);
  });

  it('should render FavoritesPage when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<FavoritesPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(routesEnum.FAVORITES);

    render(withStoreComponent);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render FavoritesPage when user navigate to "/favorites" with empty list', () => {
    const withHistoryComponent = withHistory(<FavoritesPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({offer:{favorites:[],city: Cities.Paris,
      offers: [],
      nearOffers: [],
      sort: SortingOptionsEnum.Popular,
      isLoading: false,
      offerOnPage:null}}));
    mockHistory.push(routesEnum.FAVORITES);

    render(withStoreComponent);

    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render NotFoundPage when user navigate to "/notFound"', () => {
    const withHistoryComponent = withHistory(<NotFoundPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(routesEnum.NOT_FOUND);

    render(withStoreComponent);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });

  it('should render NotFoundPage when user navigate to non-existent path', () => {
    const withHistoryComponent = withHistory(<NotFoundPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('123321');

    render(withStoreComponent);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });

  it('should render OfferPage when user navigate to "/offer/a20a52b2-efc2-4b0f-9396-4bdfbe5e9543"', () => {
    const withHistoryComponent = withHistory(<OfferPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('/offer/a20a52b2-efc2-4b0f-9396-4bdfbe5e9543');

    render(withStoreComponent);

    expect(screen.getByText(/Wood and stone place/i)).toBeInTheDocument();
    expect(screen.getByText(/A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam./i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
