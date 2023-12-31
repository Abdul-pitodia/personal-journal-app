import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemoryDetailsComponent } from './memory/memory-details/memory-details.component';
import { MemoryItemComponent } from './memory/memory-item/memory-item.component';
import { EnvironmentService } from './services/environment.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BackendService } from './services/backend.service';
import { CreateMemoryComponent } from './memory/create-memory/create-memory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from './services/shared.service';
import { MemoryComponent } from './memory/memory.component';
import { LoginComponent } from './login/login.component';
import { ExistingUserComponent } from './login/existing-user/existing-user.component';
import { NewUserComponent } from './login/new-user/new-user.component';
import { TokenInterceptor } from './token-interceptor.interceptor';
import { AuthService } from './services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { ErrorComponent } from './errors/error/error.component';
import { AuthGuard } from './guards/auth.guard';
import { TagComponent } from './tags/tag/tag.component';

export function initializeApp(envService: EnvironmentService) {
  return () => envService.initializeEnv();
}

@NgModule({
  declarations: [
    AppComponent,
    MemoryDetailsComponent,
    MemoryItemComponent,
    CreateMemoryComponent,
    MemoryComponent,
    LoginComponent,
    ExistingUserComponent,
    NewUserComponent,
    ErrorComponent,
    TagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [    BackendService,
    SharedService,
    EnvironmentService,
    AuthService,
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [EnvironmentService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
