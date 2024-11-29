import { render, screen } from '@testing-library/react';
import Spinner from '../ui';

describe('Component: Spinner', () => {
  it('should render correct', () => {

    render(<Spinner />);
    const spinnerContainer = screen.getByTestId('spinner');
    expect(spinnerContainer).toBeInTheDocument();
  });
});
