import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory } from '../../../../shared/providers';
import { withStore } from '../../../../shared/providers/with-store';
import LoginForm from '../ui';
import { extractActionsTypes } from '../../../../shared/lib';
import { ApiRoutes as UserApiRoutes } from '../../../../entities/user/model/config';
import { ApiRoutes as OfferApiRoutes } from '../../../../entities/offer/model/config';
import { login, redirectToRoute, setUser } from '../../../../entities/user/model/action';
import { fetchFavorites, fetchOffers, setFavorites, setOffers, setOffersDataLoadingStatus } from '../../../../entities/offer/model/action';
describe('Component: LoginForm', ()=>{
  it('should rendered correctly', ()=>{
    const passwordLabel = 'Password';
    const emailLabel = 'E-mail';
    const btnText = 'Sign in';

    const {withStoreComponent} = withStore(<LoginForm/>,{});
    const componentWithProviders = withHistory(withStoreComponent);

    render(componentWithProviders);

    expect(screen.getByText(emailLabel)).toBeInTheDocument();
    expect(screen.getByText(btnText)).toBeInTheDocument();
    expect(screen.getByText(passwordLabel)).toBeInTheDocument();
  });

  it('should rendered correctly with filled input values', async ()=>{
    const passwordTestId = 'password_input';
    const emailTestId = 'email_input';
    const expectedEmailValue = 'test';
    const expectedPassword = 'test123';

    const {withStoreComponent} = withStore(<LoginForm/>,{});
    const componentWithProviders = withHistory(withStoreComponent);

    render(componentWithProviders);

    await userEvent.type(
      screen.getByTestId(emailTestId),
      expectedEmailValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordTestId),
      expectedPassword,
    );

    expect(screen.getByDisplayValue(expectedEmailValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPassword)).toBeInTheDocument();
  });
  it('should not dispatch actions with uncorrect data', async ()=>{
    const passwordTestId = 'password_input';
    const emailTestId = 'email_input';
    const btnTestId = 'login-btn';
    const expectedEmailValue = 'test';
    const expectedPassword = 'test123';

    const {withStoreComponent, mockStore} = withStore(<LoginForm/>,{});
    const componentWithProviders = withHistory(withStoreComponent);

    render(componentWithProviders);

    await userEvent.type(
      screen.getByTestId(emailTestId),
      expectedEmailValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordTestId),
      expectedPassword,
    );

    await userEvent.click(
      screen.getByTestId(btnTestId)
    );
    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([]);
  });

  it('should dispatch actions with correct data', async ()=>{
    const passwordTestId = 'password_input';
    const emailTestId = 'email_input';
    const btnTestId = 'login-btn';
    const expectedEmailValue = 'maximalka111@yandex.tu';
    const expectedPassword = 'test123';
    const fakeServerReplay = { token: 'secret' };

    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(<LoginForm/>,{});
    mockAxiosAdapter.onPost(UserApiRoutes.LOGIN, {email: expectedEmailValue, password: expectedPassword}).reply(200,fakeServerReplay);
    mockAxiosAdapter.onGet(OfferApiRoutes.GET_OFFERS).reply(200);
    mockAxiosAdapter.onGet(OfferApiRoutes.GET_FAVORITES).reply(200);
    const componentWithProviders = withHistory(withStoreComponent);

    render(componentWithProviders);

    await userEvent.type(
      screen.getByTestId(emailTestId),
      expectedEmailValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordTestId),
      expectedPassword,
    );

    await userEvent.click(
      screen.getByTestId(btnTestId)
    );
    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      login.pending.type,
      redirectToRoute.type,
      setUser.type,
      fetchFavorites.pending.type,
      setFavorites.type,
      fetchFavorites.fulfilled.type,
      fetchOffers.pending.type,
      setOffersDataLoadingStatus.type,
      setOffersDataLoadingStatus.type,
      setOffers.type,
      fetchOffers.fulfilled.type,
      login.fulfilled.type,
    ]);
  });
});
