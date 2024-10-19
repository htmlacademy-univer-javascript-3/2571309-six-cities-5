import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../pages';
import { offersMockData} from '../shared/api';


export default function App () {
  return (
    <BrowserRouter>
      <AppRouter offersMockData={offersMockData}/>
    </BrowserRouter>
  );
}
