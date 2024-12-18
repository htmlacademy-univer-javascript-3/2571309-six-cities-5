import { render, screen } from '@testing-library/react';
import { LocationList } from '../ui';
import { withHistory } from '../../../../shared/providers';
import { withStore } from '../../../../shared/providers/with-store';
import { makeFakeStore } from '../../../../shared/mocks';
import { Cities } from '../../../../shared/api';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../../../shared/lib';
import { changeCity } from '../../../../entities/offer';
describe('Component: LocationList', ()=>{
  it('should render component correctly', ()=>{
    const componentWithHistory = withHistory(<LocationList />);
    const {withStoreComponent} = withStore(componentWithHistory, makeFakeStore());
    render(withStoreComponent);

    expect(screen.getAllByTestId('location_item')).toHaveLength(Object.values(Cities).length);
    expect(screen.getByText(Cities.Paris).parentElement).toHaveClass('tabs__item--active');
  });

  it('should dispatch changeCity after click btn', async ()=>{
    const componentWithHistory = withHistory(<LocationList />);
    const {withStoreComponent, mockStore} = withStore(componentWithHistory, makeFakeStore());
    render(withStoreComponent);
    const btnLocation = screen.getByText(Cities.Amsterdam).parentElement;
    await userEvent.click(
      btnLocation!
    );
    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      changeCity.type
    ]);
  });
});
