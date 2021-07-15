import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AddItemComponent } from './add-item/add-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { AuthGuard } from 'src/services/routegaurd-service';
import { AuthService } from 'src/services/authentication-service';
import { HomeComponent } from './home/home.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { EventsService } from 'angular4-events';
import { ItemsTableComponent } from './items-table/items-table.component';
import { FetchItemsService } from 'src/services/fetch-items-from-cart-service';
import { UserService } from 'src/services/user-service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from 'src/services/confirmation-dialog-service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AddItemComponent,
    UpdateItemComponent,
    ItemsListComponent,
    HomeComponent,
    ItemsTableComponent,
    ConfirmationDialogComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    FlashMessagesModule.forRoot(),
    CommonModule,
    NgbModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    EventsService,
    FetchItemsService, 
    UserService,
    ConfirmationDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
