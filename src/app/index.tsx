import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../pages';


export default function App () {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
}
