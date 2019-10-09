import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule, 
  MatDatepickerModule,
  MatFormFieldModule, 
  MatIconModule, 
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule, 
    MatDatepickerModule,
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule, 
    MatDatepickerModule,
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
  ]
})
export class MaterialModule{}