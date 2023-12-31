import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateMemoryComponent } from './memory/create-memory/create-memory.component';
import { MemoryComponent } from './memory/memory.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './login/new-user/new-user.component';
import { ExistingUserComponent } from './login/existing-user/existing-user.component';
import { AuthGuard } from './guards/auth.guard';
import { TagComponent } from './tags/tag/tag.component';

const routes: Routes = [
  { path: 'home', component: MemoryComponent, canActivate: [AuthGuard]},
  { path: 'tags', component: TagComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent , 
    children: [
      {
        path: '',
        component: ExistingUserComponent
      },
      {
        path: 'signup', 
        component: NewUserComponent,
      }
]},
 
  // Additional routes if needed
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
