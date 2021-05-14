import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//Modules
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Components
import { AppComponent } from './app.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { CreateEmpleadosComponent } from './components/create-empleados/create-empleados.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SobreMiComponent } from './components/sobre-mi/sobre-mi.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    ListEmpleadosComponent,
    CreateEmpleadosComponent,
    NavbarComponent,
    InicioComponent,
    SobreMiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
