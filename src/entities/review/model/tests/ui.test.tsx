import { render, screen } from '@testing-library/react';
import ReviewCard from '../ui';
describe('Component: ReviewCard', ()=>{
  it('should render component correctly', ()=>{
    const fakeReviewData = {
      'id': 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
      'date': '2019-05-08T14:13:56.569Z',
      'user': {
        'name': 'Oliver Conner',
        'avatarUrl': 'https://url-to-image/image.png',
        'isPro': false
      },
      'comment': '1',
      'rating': 4
    };
    render(<ReviewCard {...fakeReviewData}/>);
    expect(screen.getByText(fakeReviewData.user.name)).toBeInTheDocument();
  });
});
