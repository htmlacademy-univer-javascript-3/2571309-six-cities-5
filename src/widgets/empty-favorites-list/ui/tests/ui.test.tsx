import { render, screen } from '@testing-library/react';
import {default as EmptyFavoritesList} from '../ui';

describe('Component: EmptyFavoritesList', () => {
  it('should render correct', () => {
    const expectedText = /Save properties to narrow down search or plan your future trips/i;
    render(<EmptyFavoritesList />);
    const componentContainer = screen.getByText(expectedText);
    expect(componentContainer).toBeInTheDocument();
  });
});
