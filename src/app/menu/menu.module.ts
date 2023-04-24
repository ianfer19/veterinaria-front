import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MaterialModule } from '../material/material.module';
import { BarraComponent } from './components/barra/barra.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    BarraComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    BarraComponent
  ]
})
export class MenuModule { }
