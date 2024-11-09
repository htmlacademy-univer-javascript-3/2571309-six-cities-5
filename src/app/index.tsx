import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../pages';
import { OFFERS_MOCK_DATA} from '../shared/api';


export default function App () {
  return (
    <BrowserRouter>
      <AppRouter offersMockData={OFFERS_MOCK_DATA}/>
    </BrowserRouter>
  );
}
