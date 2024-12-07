
import { render, screen } from '@testing-library/react';
import { EmptyCityBlock } from '../ui';
import { Cities } from '../../../../shared/api';

describe('Component: EmptyCityBlock', () => {
  it('should render correct', () => {
    const expectedText = /Paris/i;
    render(<EmptyCityBlock city={Cities.Paris}/>);
    const emptyCityBlockContainer = screen.getByText(expectedText);
    expect(emptyCityBlockContainer).toBeInTheDocument();
  });
});
