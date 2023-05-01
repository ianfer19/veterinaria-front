import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Persona } from 'src/app/interfaces/Persona';
import { PacienteService } from 'src/app/services/paciente.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-persona-paciente',
  templateUrl: './persona-paciente.component.html',
  styleUrls: ['./persona-paciente.component.scss']
})
export class PersonaPacienteComponent {
    constructor (private router: Router,private route: ActivatedRoute,private fb: FormBuilder,private modalService: NgbModal ,private personaService: PersonaService, private http: HttpClient,private pacienteService: PacienteService){}

    [x: string]: any;
    dataPersona: any;
    dataPaciente: Array<Paciente>= [];
    myForm!: FormGroup;
    filterPost = '';
    dtTrigger = new Subject<any>();
    data: any;
    enviarData: any;
    searchTerm!: string;
    resultados: any;
    campoSeleccionado="";
    valorBusqueda="";
    opcionSeleccionada = 'id';
    termino = '';
    textoBusqueda!: string;
    tipo:any;
    ngOnInit(){
      this.myForm = this.fb.group({
        id: [''],
        nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        idPer: [],
        raza: [],
        nacimiento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
        fechaRegistro: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
        especie: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      });

      this.route.queryParams.subscribe(params => {
        const id = params['identificacion']
          this.myForm.get('id')?.setValue(params['id'])
          console.log(id)
      let arrayPacientes: Array<Paciente> = [];
      this.pacienteService.getPacientePersona(id)
      .subscribe(data => {this.dataPaciente = data.data;
        this.resultados=this.dataPaciente;
        });
        let Persona=
        this.personaService.getPersona(id)
        .subscribe(data => {this.dataPersona = data.data;
          console.log(this.dataPersona)
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
    this.router.navigate(['/pacientes']);
  }

  guardar(form: FormGroup) {
    console.log(form.value);
    if (form.value.id && form.value.id !== 0) {
      this.actualizar(form);
      return;
    }
    this.pacienteService.addPaciente(form.value)
      .subscribe(data => {
        this.myForm.patchValue({
          nombre: '',
          especie: '',
          raza: '',
          nacimiento: '',
          idPer: '',
          fechaRegistro: ''
        })
        alert("Se guardó con exito!!!");
        this.refresh();

      }
      )
  }

  editar(datos: { id: any; nombre: any; especie: any; raza: any; nacimiento: any; idPer: any; fechaRegistro: any;}) {
    this.myForm.setValue({
      id: datos.id,
      nombre: datos.nombre,
      especie: datos.especie,
      raza: datos.raza,
      nacimiento: new Date(datos.nacimiento).toISOString().substring(0, 10),
      idPer: datos.idPer,
      fechaRegistro: new Date(datos.fechaRegistro).toISOString().substring(0, 10),
    })

  }

  actualizar(form: FormGroup) {
      this.pacienteService.updatePaciente(form.value)
        .subscribe(data => {
          alert("Se actualizó con exito!!!")
          this.refresh();
        });

  }

  refresh() {
      let arraySprint: Array<Paciente> = [];
      this.pacienteService.getAllPaciente()
        .subscribe(datos => {
          this.resultados = datos.data;
        });
  }

  buscar() {
    if (this.opcionSeleccionada === 'id') {
      this.resultados= this.dataPaciente.filter(item=> item.id.toString().toLowerCase().includes(this.textoBusqueda.toLowerCase()));
    } else if (this.opcionSeleccionada === 'nombre') {
      this.resultados= this.dataPaciente.filter(item=> item.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()));
    } else if (this.opcionSeleccionada === 'especie') {
      this.resultados= this.dataPaciente.filter(item=> item.especie.toLowerCase().includes(this.textoBusqueda.toLowerCase()));
    } else if (this.opcionSeleccionada === 'raza') {
      this.resultados= this.dataPaciente.filter(item=> item.raza.toLowerCase().includes(this.textoBusqueda.toLowerCase()));
    } else if (this.opcionSeleccionada === 'nacimiento') {
      this.resultados= this.dataPaciente.filter(item=> item.nacimiento.toLowerCase().includes(this.textoBusqueda.toLowerCase()));
    } else if (this.opcionSeleccionada === 'idPer') {
      this.resultados= this.dataPaciente.filter(item=> item.idPer.toString().toLowerCase().includes(this.textoBusqueda.toLowerCase()));
    } else if (this.opcionSeleccionada === 'fechaRegistro') {
      this.resultados= this.dataPaciente.filter(item=> item.fechaRegistro.toLowerCase().includes(this.textoBusqueda.toLowerCase()));
    }
  }

  cambiarBusqueda() {
    this.buscar();
  }
}
