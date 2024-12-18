import { createMemoryHistory, MemoryHistory } from 'history';
import { render, screen} from '@testing-library/react';
import { withHistory } from '../../../../shared/providers';
import { withStore } from '../../../../shared/providers/with-store';
import RandomCityBtn from '../ui';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../../../shared/lib';
import { changeCity } from '../../../../entities/offer';
import { RoutesEnum } from '../../../../shared/config';

describe('Component: RandomCityBtn', ()=>{
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });
  it('should render component correctly', ()=>{
    const withHistoryComponent = withHistory(<RandomCityBtn />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent);

    render(withStoreComponent);

    expect(screen.getByTestId('location_item-link')).toBeInTheDocument();
  });
  it('should dispatch correct actions after btn click', async()=>{
    const withHistoryComponent = withHistory(<RandomCityBtn />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent);
    mockHistory.push(RoutesEnum.LOGIN);
    render(withStoreComponent);
    const btnFavorite = screen.getByTestId('location_item-link');
    await userEvent.click(
      btnFavorite
    );
    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      changeCity.type
    ]);
    expect(mockHistory.location.pathname).toBe(RoutesEnum.MAIN);
  });
});
