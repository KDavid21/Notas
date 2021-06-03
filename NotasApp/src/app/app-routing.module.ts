import { NotasComponent } from './pages/notas/notas.component';
import { NotaComponent } from './pages/nota/nota.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'nota', component: NotaComponent },
  { path: 'notas', component: NotasComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'notas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
