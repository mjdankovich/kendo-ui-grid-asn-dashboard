import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';

import { AppComponent } from './app.component';
import { DestinyComponent } from './destiny/destiny.component';
import { DestinyService } from './destiny/destiny.service';
import { EditService } from './edit.service';

@NgModule({
  imports: [ 
    BrowserModule, 
    BrowserAnimationsModule, 
    GridModule,
    HttpClientModule ],
  declarations: [ AppComponent, DestinyComponent ],
  bootstrap: [ AppComponent ],
  providers: [DestinyService, EditService]
})

export class AppModule { }
