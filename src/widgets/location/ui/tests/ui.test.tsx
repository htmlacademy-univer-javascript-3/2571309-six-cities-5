import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../../shared/providers';
import { LocationItem } from '..';
import { Cities } from '../../../../shared/api';
import { withStore } from '../../../../shared/providers/with-store';
import { makeFakeStore } from '../../../../shared/mocks';
import userEvent from '@testing-library/user-event';
const fun = vi.fn();
const fakeFunctions = {
  onClickLocationHandler: fun,
};

describe('Component: LocationItem', ()=>{
  it('should render correctly', ()=>{
    const componentWithHistory = withHistory(<LocationItem cityName={Cities.Amsterdam} onClickLocationHandler={()=>{}}/>);
    const {withStoreComponent} = withStore(componentWithHistory, makeFakeStore());
    render(withStoreComponent);

    expect(screen.getByText(Cities.Amsterdam)).toBeInTheDocument();
  });

  it('should render correctly', async ()=>{
    const componentWithHistory = withHistory(<LocationItem cityName={Cities.Amsterdam} onClickLocationHandler={fun}/>);
    const {withStoreComponent} = withStore(componentWithHistory, makeFakeStore());
    vi.spyOn(fakeFunctions, 'onClickLocationHandler');
    render(withStoreComponent);

    await userEvent.click(screen.getByTestId('location_item'));
    expect(fun).toBeCalledTimes(1);
  });
});
