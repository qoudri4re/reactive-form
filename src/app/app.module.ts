import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSemanticModule } from 'ngx-semantic';
import { FormComponent } from './components/form/form.component';
import { SuccessComponent } from './components/success/success.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

const appRoutes: Routes = [
  { path: '', component: FormComponent },
  { path: 'success', component: SuccessComponent },
];

@NgModule({
  declarations: [AppComponent, FormComponent, SuccessComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxSemanticModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
