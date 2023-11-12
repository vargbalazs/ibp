import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './core/components/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { CustomNofityModule } from './shared/components/custom-notify/custom-notify.module';
import { NotificationService } from '@progress/kendo-angular-notification';
import { LayoutModule } from './core/components/layout/layout.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { FeaturesModule } from './features/features.module';
import { CustomDialogModule } from './shared/components/custom-dialog/custom-dialog.module';
import { DatabaseErrorInterceptor } from './core/interceptors/database-error.interceptor';
import { RefreshTokenInterceptor } from './core/interceptors/refresh-token.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomNofityModule,
    CustomDialogModule,
    LayoutModule,
    FeaturesModule,
  ],
  providers: [
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DatabaseErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
