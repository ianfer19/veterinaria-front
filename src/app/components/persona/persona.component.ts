import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Persona } from 'src/app/interfaces/Persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent {
  constructor (private router: Router,private route: ActivatedRoute,private fb: FormBuilder,private modalService: NgbModal ,private personaService: PersonaService, private http: HttpClient){}

  [x: string]: any;
  dataPersona: Array<Persona>= [];
  myForm!: FormGroup;
  filterPost = '';
  dtTrigger = new Subject<any>();
  data: any;
  file!: File;
  enviarData: any;
  searchTerm!: string;
  resultados: any;
  campoSeleccionado="";
  valorBusqueda="";
  opcionSeleccionada = 'id';
  termino = '';
  textoBusqueda!: string;

  ngOnInit(){
    this.myForm = this.fb.group({
      id: [''],
      identificacion: [''],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      tipoId: [],
      direccion: [],
      ciudad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      telefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]]
    });

    this.route.queryParams.subscribe(params => {
      this['id'] = params['id'],
        this.myForm.get('id')?.setValue(params['id'])
    let arrayPacientes: Array<Persona> = [];
    this.personaService.getAllPersona()
    .subscribe(data => {this.dataPersona = data.data;
      this.resultados=this.dataPersona;
      });
    });
    this.buscar();
    this.textoBusqueda = "";
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

open(content: any) {
  this.modalService.open(content);
  this.myForm.reset();
}

openEdit(content: any) {
  this.modalService.open(content);
}

onEdit() {
  this.router.navigate(['/asignacion-de-colaboradores']);
}

guardar(form: FormGroup) {
  console.log(form.value);
  if (form.value.id && form.value.id !== 0) {
    this.actualizar(form);
    return;
  }
  this.personaService.addPersona(form.value)
    .subscribe(data => {
      this.myForm.patchValue({
        identificacion: '',
        nombre: '',
        especie: '',
        raza: '',
        nacimiento: '',
        tipoId: '',
        fechaRegistro: ''
      })
      alert("Se guardó con exito!!!");
      this.refresh();
    }
    )
    this.refresh();
}

editar(datos: { id: any; identificacion:any; tipoId: any; nombre: any; ciudad: any; direccion: any; telefono: any;}) {
  this.myForm.setValue({
    id: datos.id,
    identificacion: datos.identificacion,
    nombre: datos.nombre,
    tipoId: datos.tipoId,
    ciudad: datos.ciudad,
    direccion: datos.direccion,
    telefono: datos.telefono
  })
}


actualizar(form: FormGroup) {
    this.personaService.updatePersona(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!!")
        this.refresh();
      });

}

refresh() {
    let arrayPersona: Array<Persona> = [];
    this.personaService.getAllPersona()
      .subscribe(datos => {
        this.resultados = datos.data;
      });
}


buscar() {
  if (this.opcionSeleccionada === 'id') {
    this.resultados= this.dataPersona.filter(item=> item.identificacion.toString().toLowerCase().includes(this.textoBusqueda.toLowerCase()));
  } else if (this.opcionSeleccionada === 'nombre') {
    this.resultados= this.dataPersona.filter(item=> item.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()));
  } else if (this.opcionSeleccionada === 'especie') {
    this.resultados= this.dataPersona.filter(item=> item.ciudad.toLowerCase().includes(this.textoBusqueda.toLowerCase()));
  } else if (this.opcionSeleccionada === 'raza') {
    this.resultados= this.dataPersona.filter(item=> item.direccion.toLowerCase().includes(this.textoBusqueda.toLowerCase()));
  } else if (this.opcionSeleccionada === 'nacimiento') {
    this.resultados= this.dataPersona.filter(item=> item.telefono.toString().toLowerCase().includes(this.textoBusqueda.toLowerCase()));
  } else if (this.opcionSeleccionada === 'idPer') {
    this.resultados= this.dataPersona.filter(item=> item.tipoId.toString().toLowerCase().includes(this.textoBusqueda.toLowerCase()));
  }
}

cambiarBusqueda() {
  this.buscar();
}

mostrar(datos: { identificacion: any;}) {
  this.router.navigate(["personas-pacientes"], { queryParams: { identificacion: datos.identificacion} });
}

}
