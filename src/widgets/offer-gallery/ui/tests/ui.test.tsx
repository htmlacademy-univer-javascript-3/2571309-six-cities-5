import { render, screen } from '@testing-library/react';
import OfferGallery from '../ui';
describe('Component: OfferGallery', ()=>{
  it('should render component correctly', ()=>{
    const mockImages = ['https://url-to-image/image1.png','https://url-to-image/image.png','https://url-to-image/image2.png'];
    render(<OfferGallery images={mockImages}/>);

    expect(screen.getAllByAltText('Photo studio')).toHaveLength(3);
  });
});
