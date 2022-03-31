import { Action } from '@ngrx/store';
import { ForecastPointEntity, WeatherEntity, WeatherForecastType } from '../../models/weather-forecast.models';

export enum ActionTypes {
    LoadWeatherForecast = '[WeatherForecast/API] Load WeatherForecast',
    SetWeatherForecastType = '[WeatherForecast/API] Set weather forecast type',
    LoadGeoPointSuccess = '[WeatherForecast/API] Load geo point Success',
    LoadWeatherForecastSuccess = '[WeatherForecast/API] Load WeatherForecast Success',
    LoadWeatherForecastFailure = '[WeatherForecast/API] Load WeatherForecast Failure'
}

export class LoadWeatherForecast implements Action {
    readonly type = ActionTypes.LoadWeatherForecast;
    constructor(public searchString: string) { }
}

export class SetWeatherForecastType implements Action {
    readonly type = ActionTypes.SetWeatherForecastType;
    constructor(public weatherType: WeatherForecastType) { }
}

export class LoadGeoPointSuccess implements Action {
    readonly type = ActionTypes.LoadGeoPointSuccess;
    constructor(public point: ForecastPointEntity) { }
}

export class LoadWeatherForecastSuccess implements Action {
    readonly type = ActionTypes.LoadWeatherForecastSuccess;
    constructor(public weatherForecast: WeatherEntity) { }
}

export class LoadWeatherForecastFailure implements Action {
    readonly type = ActionTypes.LoadWeatherForecastFailure;
    constructor(public error: string) { }
}

export type WeatherForecastsActions =
	LoadWeatherForecast |
    SetWeatherForecastType |
	LoadGeoPointSuccess |
	LoadWeatherForecastSuccess |
	LoadWeatherForecastFailure;
