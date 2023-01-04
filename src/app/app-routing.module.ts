import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCurrentComponent } from './components/form-current/form-current.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'form/:id', component: FormCurrentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
