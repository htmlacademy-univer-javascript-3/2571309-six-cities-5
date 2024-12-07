import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { changeAuthStatus, checkAuth, login, logout, redirectToRoute, setUser } from '../action';
import { AuthData, AuthEnum } from '../types';
import { userReducer } from '../user';
import { $api } from '../../../../shared/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../../../../shared/lib/types';
import { AppThunkDispatch, extractActionsTypes } from '../../../../shared/lib';
import { API_ROUTES as USER_API_ROUTES } from '../config';
import { API_ROUTES as OFFER_API_ROUTES } from '../../../offer/model/config';
import { fetchFavorites, fetchOffers, setFavorites, setOffers, setOffersDataLoadingStatus } from '../../../offer/model/action';
import * as tokenService from '../../../../shared/api/typicode/token';

describe('User slice', ()=>{
  it('should return initial state with empty action',()=>{
    const expectedRes = {
      authorizationStatus: AuthEnum.UNKNOWN,
      user: null
    };
    const action = {type:''};
    const calculatedRes = userReducer(expectedRes, action);
    expect(calculatedRes).toEqual(expectedRes);
  });

  it('should return default initial state with empty action and undefined state',()=>{
    const expectedRes = {
      authorizationStatus: AuthEnum.UNKNOWN,
      user: null
    };
    const action = {type:''};
    const calculatedRes = userReducer(undefined, action);
    expect(calculatedRes).toEqual(expectedRes);
  });
  it('should return state with setted authStatus as AUTHENTICATED',()=>{
    const expectedRes = {
      authorizationStatus: AuthEnum.AUTHENTICATED,
      user: null
    };
    const calculatedRes = userReducer(undefined, changeAuthStatus(AuthEnum.AUTHENTICATED));
    expect(calculatedRes).toEqual(expectedRes);
  });
  it('should return state with setted authStatus as AUTHENTICATED and filled user',()=>{
    const expectedRes = {
      authorizationStatus: AuthEnum.AUTHENTICATED,
      user: {
        name: 'Oliver Conner',
        avatarUrl: 'https://url-to-image/image.png',
        isPro: false
      }
    };
    const calculatedRes = userReducer(undefined, setUser({
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    }));
    expect(calculatedRes).toEqual(expectedRes);
  });
  it('should return state with setted authStatus as NO AUTHENTICATED and empty field user',()=>{
    const expectedRes = {
      authorizationStatus: AuthEnum.NO_AUTHENTICATED,
      user: null
    };
    const calculatedRes = userReducer(undefined, setUser(null));
    expect(calculatedRes).toEqual(expectedRes);
  });
});

describe('User async actions', ()=>{
  const mockAxiosAdapter = new MockAdapter($api);
  const middleware = [thunk.withExtraArgument($api)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  beforeEach(() => {
    store = mockStoreCreator({ user: { authorizationStatus: AuthEnum.UNKNOWN, user: null}});
  });

  describe('checkAuth', ()=>{
    it(`should dispatch "checkAuth.pending",
       "setUser", "fetchFavorites.pending", "setFavorites",
        "fetchFavorites.pending", "checkAuth.fulfilled" with thunk "checkAuth"`, async ()=>{
      mockAxiosAdapter.onGet(USER_API_ROUTES.LOGIN).reply(200);
      mockAxiosAdapter.onGet(OFFER_API_ROUTES.GET_FAVORITES).reply(200);
      await store.dispatch(checkAuth());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        checkAuth.pending.type,
        setUser.type,
        fetchFavorites.pending.type,
        setFavorites.type,
        fetchFavorites.fulfilled.type,
        checkAuth.fulfilled.type,
      ]);
    });
    it(`should dispatch "checkAuth.pending",
      "setUser", "fetchFavorites.pending", "setUser",
      "redirectToRoute", "checkAuth.fulfilled" with thunk "checkAuth"`, async ()=>{
      mockAxiosAdapter.onGet(USER_API_ROUTES.LOGIN).reply(401);
      await store.dispatch(checkAuth());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        checkAuth.pending.type,
        setUser.type,
        redirectToRoute.type,
        checkAuth.fulfilled.type,
      ]);
    });
  });

  describe('login', ()=>{
    it('should dispatch some actions with thunk "login"', async ()=>{
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(USER_API_ROUTES.LOGIN, {email: 'test', password: 'test'}).reply(200,fakeServerReplay);
      mockAxiosAdapter.onGet(OFFER_API_ROUTES.GET_OFFERS).reply(200);
      mockAxiosAdapter.onGet(OFFER_API_ROUTES.GET_FAVORITES).reply(200);
      await store.dispatch(login({email: 'test', password: 'test'}));
      const actions = extractActionsTypes(store.getActions());
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
    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(USER_API_ROUTES.LOGIN).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenService, 'saveToken');
      await store.dispatch(login(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logout', ()=>{
    it('should dispatch some actions with thunk "logout"', async ()=>{
      mockAxiosAdapter.onDelete(USER_API_ROUTES.LOGOUT).reply(204);
      await store.dispatch(logout());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        logout.pending.type,
        setUser.type,
        fetchOffers.pending.type,
        setOffersDataLoadingStatus.type,
        setOffersDataLoadingStatus.type,
        setOffers.type,
        fetchOffers.fulfilled.type,
        logout.fulfilled.type,
      ]);
    });
    it('should one call "dropToken" with "logout"', async () => {
      mockAxiosAdapter.onDelete(USER_API_ROUTES.LOGOUT).reply(204);
      const mockDropToken = vi.spyOn(tokenService, 'dropToken');

      await store.dispatch(logout());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });


});
