import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input'; 
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { WeatherForecastStoreModule } from './stores/weather-forecast/weather-forecast-store.module';

export const metaReducers: MetaReducer<any>[] = [];
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WeatherForecastStoreModule,
    StoreModule.forRoot({}, {
        metaReducers,
    }),
    EffectsModule.forRoot([]), 
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		BrowserAnimationsModule,
		MatInputModule,
		MatTableModule,
		MatButtonModule,
		MatFormFieldModule,
		MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
