export enum WeatherForecastType {
	Hourly,
	Daily
}

export interface ForecastPointEntity {
	lat: number;
	lon: number;
	name: string;
}

export interface WeatherEntity {
	lat: number;
	lon: number;
	name: string;
	weatherData: string[];
}

export interface WeatherForecastGeoEntity {
    name: string;
    local_names: any;
    lat: number;
    lon: number;
    country: string;
    state: string | undefined;
}

export interface WeatherForecastEntity {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: string;
	current: WeatherForecastHourlyEntity[];
	daily: WeatherForecastDailyEntity[];
	hourly: WeatherForecastHourlyEntity[];
}

export interface WeatherForecastTimePointEntity {
	dt: number;
}

export interface WeatherForecastHourlyEntity extends WeatherForecastTimePointEntity  {
	temp: number;
}

export interface WeatherForecastDailyEntity extends WeatherForecastTimePointEntity {
	temp: WeatherForecastDailyTempEntity;
}

export interface WeatherForecastDailyTempEntity {
	morn: number;
	day: number;
	eve: number;
	night: number;
	min: number;
	max: number;
}
