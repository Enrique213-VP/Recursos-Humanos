import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  Loading = false;
  id: string | null;
  titulo = 'Agregar empleado'

  constructor(private fb: FormBuilder, private  _empleadoService: EmpleadosService,
    private router: Router, private toastr: ToastrService, private aRoute: ActivatedRoute) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      sueldo: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
   }

  ngOnInit(): void {
    this.esEditar()
  }

  agregarEditarEmpleado(){
    this.submitted = true;
    if(this.createEmpleado.invalid){
      return;
    }

    if(this.id === null){
      this.agregarEmpleado();
    }else{
      this.editarEmpleado(this.id)
    }

  }


  agregarEmpleado(){
    const empleados: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      dni: this.createEmpleado.value.dni,
      sueldo: this.createEmpleado.value.sueldo,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }


    this.Loading = true;
    this._empleadoService.agregarEmpleado(empleados).then(() =>{
      this.toastr.success('Bien, Se registro con exito', 'Usuario Registrado', {
        positionClass: 	'toast-top-left'
      })
      this.Loading = false;
      this.router.navigate(['/list-empleados'])
    }).catch(error =>{
      console.log(error)
      this.Loading = false;

    })


  }


  editarEmpleado(id: string){
    this.Loading = true;
    const empleados: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      dni: this.createEmpleado.value.dni,
      sueldo: this.createEmpleado.value.sueldo,
      fechaActualizacion: new Date()
    }
    this._empleadoService.actualizarEmpleado(id, empleados).then(() =>{
      this.Loading = false;
      this.toastr.info('El empleado fue modificado', 'Empleado modificado', {
        positionClass: 'toast-top-left'
      })
      this.router.navigate(['/list-empleados'])

    })
  }

  esEditar(){
    this.titulo = 'Editar empleado'
    if(this.id !== null){
      this.Loading = true;
      this._empleadoService.getEmpleados(this.id).subscribe(data => {
        this.Loading = false;
        console.log(data.payload.data()['nombre'])
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          dni: data.payload.data()['dni'],
          sueldo: data.payload.data()['sueldo']

        })
      })

    }
  }

}
