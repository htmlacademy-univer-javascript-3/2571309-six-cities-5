import AppRouter from '../pages';
import browserHistory from '../pages/config';
import HistoryRouter from '../pages/routes/history-route';


export default function App () {
  return (
    <HistoryRouter history={browserHistory}>
      <AppRouter/>
    </HistoryRouter>
  );
}
