import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {


  empleados: any[] = [];

  //dependency injection
  constructor(private _empleadoService: EmpleadosService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(){
    this._empleadoService.getEmpleado().subscribe(data => {
      this.empleados = [];
      data.forEach((element: any) => {
       this.empleados.push({
         id: element.payload.doc.id,
         ...element.payload.doc.data()
       })
      });
      console.log(this.empleados);

    });
  }

  eliminarEmpleado(id: string){
    this._empleadoService.eliminarEmpleado(id).then(() => {
      console.log('Empleado eliminado')
      this.toastr.error('Eliminado con exito', 'Eliminacion completada', {
        positionClass: 'toast-top-left'
      })
    }).catch(error =>{
      console.log(error)
    })
  }
}
