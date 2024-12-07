import { LocationList } from '../../widgets/location-list';
import { CitiesBlock } from '../../widgets/cities-block';

export default function MainPage () {
  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationList/>
        </div>
        <CitiesBlock/>
      </main>
    </div>
  );
}
