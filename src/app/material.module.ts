import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatCheckboxModule, 
  MatDatepickerModule,
  MatFormFieldModule, 
  MatIconModule, 
  MatInputModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule, 
    MatDatepickerModule,
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule, 
    MatDatepickerModule,
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class MaterialModule{}