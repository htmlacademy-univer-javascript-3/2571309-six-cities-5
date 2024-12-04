import { render, screen } from '@testing-library/react';
import { withHistory } from '../../shared/providers';
import NotFoundPage from './index';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const expectedText = '404 Not Found';
    const expectedLinkText = 'Return to main page';
    const preparedComponent = withHistory(<NotFoundPage/>);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
