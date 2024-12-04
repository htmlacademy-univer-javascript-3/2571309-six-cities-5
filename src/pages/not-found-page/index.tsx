import { Link } from 'react-router-dom';
import { routesEnum } from '../../shared/config';

const NotFoundPage = () => (
  <div>
    <h1>404 Not Found</h1>
    <Link to={routesEnum.MAIN}>Return to main page</Link>
  </div>
);

export default NotFoundPage;
