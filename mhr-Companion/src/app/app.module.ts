import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Motion_ZoneComponent } from './motion_zones/motion_zones.component';
import { HitZoneComponent } from './hit-zone/hit-zone.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [	
    AppComponent,
    Motion_ZoneComponent,
    HitZoneComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
