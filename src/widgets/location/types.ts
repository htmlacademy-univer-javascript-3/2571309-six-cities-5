import { Cities } from '../../shared/api';

export interface ILocationProps {
    cityName: Cities;
    onClickLocationHandler: ()=>void;
}
