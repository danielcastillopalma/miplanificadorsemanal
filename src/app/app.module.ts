import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComlunesComponent } from './components/comlunes/comlunes.component';
import { CommartesComponent } from './components/commartes/commartes.component';
import { CommiercolesComponent } from './components/commiercoles/commiercoles.component';
import { ComjuevesComponent } from './components/comjueves/comjueves.component';
import { ComviernesComponent } from './components/comviernes/comviernes.component';
import { ComsabadoComponent } from './components/comsabado/comsabado.component';
import { ComdomingoComponent } from './components/comdomingo/comdomingo.component';
import { HttpClientModule } from '@angular/common/http';
import { defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader'
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
jeepSqlite(window)
@NgModule({
  declarations: [AppComponent,ComlunesComponent,CommartesComponent,CommiercolesComponent,ComjuevesComponent,ComviernesComponent,ComsabadoComponent,ComdomingoComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
