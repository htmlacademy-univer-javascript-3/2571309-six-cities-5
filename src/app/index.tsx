import AppRouter from '../pages';
import HistoryRouter from '../pages/history-route';
import browserHistory from '../pages/config';


export default function App () {
  return (
    <HistoryRouter history={browserHistory}>
      <AppRouter/>
    </HistoryRouter>
  );
}
