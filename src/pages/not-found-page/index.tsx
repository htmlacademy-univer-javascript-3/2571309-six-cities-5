import { Link } from 'react-router-dom';
import { RoutesEnum } from '../../shared/config';

const NotFoundPage = () => (
  <div>
    <h1>404 Not Found</h1>
    <Link to={RoutesEnum.MAIN}>Return to main page</Link>
  </div>
);

export default NotFoundPage;
