import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

//Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { LoginCompletedComponent } from './snacks/login-completed/login-completed.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsTableComponent } from './data/products-table/products-table.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CartTableComponent } from './data/cart-table/cart-table.component';

//Material
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { UpdateProductsComponent } from './components/dashboard/update-products/update-products.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

//PrimeNg
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

//ng-zorro
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzMenuModule } from 'ng-zorro-antd/menu';


//FontAwsome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LoginCompletedComponent,
    ProductsComponent,
    DashboardComponent,
    CartComponent,
    UpdateProductsComponent,
    ProductsTableComponent,
    SpinnerComponent,
    CartTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    ToastModule,
    RippleModule,
    ConfirmDialogModule,
    FontAwesomeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    MessageService,
    PrimeNGConfig,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
