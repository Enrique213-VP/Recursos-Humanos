import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmpleadosComponent } from './components/create-empleados/create-empleados.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { SobreMiComponent } from './components/sobre-mi/sobre-mi.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'list-empleados', component: ListEmpleadosComponent },
  {path: 'create-empleados', component: CreateEmpleadosComponent},
  {path: 'editEmpleado/:id', component: CreateEmpleadosComponent},
  {path: 'sobreMi', component: SobreMiComponent},
  {path: '**', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
