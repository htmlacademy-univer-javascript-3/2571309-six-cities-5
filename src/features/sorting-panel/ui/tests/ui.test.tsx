import { render, screen} from '@testing-library/react';
import { withHistory } from '../../../../shared/providers';
import { withStore } from '../../../../shared/providers/with-store';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../../../shared/lib';
import { SortingPanel } from '../ui';
import { makeFakeStore } from '../../../../shared/mocks';
import { SortingOptionsEnum } from '../const';
import { changeSort } from '../../../../entities/offer/model/action';
describe('Component: SortingPanel', ()=>{
  it('should render component correctly', ()=>{
    const withHistoryComponent = withHistory(<SortingPanel />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getAllByTestId('places__option')).toHaveLength(Object.values(SortingOptionsEnum).length);
    expect(screen.getAllByText(SortingOptionsEnum.Popular)).toHaveLength(2);
  });

  it('should render component correctly with opened sorting panel', async()=>{
    const withHistoryComponent = withHistory(<SortingPanel />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);
    await userEvent.click(
      screen.getByTestId('places__sorting-type')
    );

    expect(screen.getByTestId('places__options')).toHaveClass('places__options--opened');
  });

  it('should render component correctly', async ()=>{
    const withHistoryComponent = withHistory(<SortingPanel />);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);
    await userEvent.click(
      screen.getByTestId('places__sorting-type')
    );
    await userEvent.click(
      screen.getByText(SortingOptionsEnum.PriceHighToLow)
    );


    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      changeSort.type
    ]);
  });
});
