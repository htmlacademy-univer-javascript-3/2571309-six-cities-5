import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import browserHistory from '../../../pages/config';
import { redirectToRoute } from '../../../entities/user/model/action';
import { RoutesEnum } from '../../../shared/config';
import { RootState } from '../../../shared/lib/types';
import { redirect } from '../middlewares';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<RootState, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(RoutesEnum.LOGIN);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(RoutesEnum.LOGIN);
  });

  it('should not redirect to "/" with empty action', () => {
    const emptyAction = { type: '', payload: RoutesEnum.MAIN };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(RoutesEnum.MAIN);
  });
});
