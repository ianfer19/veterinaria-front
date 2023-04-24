import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { Paciente } from 'src/app/interfaces/Paciente';
import { AuthService } from 'src/app/services/auth.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent  implements OnInit, OnDestroy {

  constructor (private router: Router,private route: ActivatedRoute,private fb: FormBuilder,private modalService: NgbModal ,private pacienteService: PacienteService, private authService: AuthService, private http: HttpClient){}

  [x: string]: any;
  dataPaciente: Array<Paciente>= [];
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

  opcionesBusqueda = [
    { valor: 'id', texto: 'ID' },
    { valor: 'nombre', texto: 'Nombre' },
    { valor: 'especie', texto: 'Especie' },
    { valor: 'raza', texto: 'Raza' },
    { valor: 'nacimiento', texto: 'Fecha de nacimiento' },
    { valor: 'idPer', texto: 'ID del propietario' },
    { valor: 'fechaRegistro', texto: 'Fecha de registro' }
  ];


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
      this['id'] = params['id'],
        this.myForm.get('id')?.setValue(params['id'])
    let arrayPacientes: Array<Paciente> = [];
    this.pacienteService.getAllPaciente()
    .subscribe(data => {this.dataPaciente = data.data;
      this.resultados=this.dataPaciente;
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
        this.dataPaciente = datos.data;
      });
}

onFileChange2(event: any) {
  this.file = event.target.files[0];
}

uploadFile() {
  const formData = new FormData();
  formData.append('file', this.file);
  this.http.post('http://localhost:8080/api/import/all', formData).subscribe(
    (response) => console.log(response),
    (error) => console.log(error)
  );
  this.refresh();
}

exportToExcel() {
  this.http.get('http://localhost:8080/api/export/all', { responseType: 'blob' })
    .subscribe(response => {
      const file = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(file, 'pacientes.xlsx');
    });
}

importDataFromExcel(event: any): void {
  const target: DataTransfer = <DataTransfer>(event.target);
  const reader: FileReader = new FileReader();
  reader.onload = (e: any) => {
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    this.enviarData = this.data.slice(1).map((row: any[]) => ({
      id: row[0],
      nombre: row[1],
      especie: row[2],
      raza: row[3],
      nacimiento: row[4],
      idPer: row[5],
      fechaRegistro: row[6],

    }));
    console.log(this.enviarData)
  };
  reader.readAsBinaryString(target.files[0]);
}

importDataToApi(): void {
  for (const item of this.enviarData) {
    if(item.id==undefined && item.nombre==undefined && item.especie==undefined){
          alert("Los datos están erroneos");
    }else if (item.id!=undefined){
      this.pacienteService.getPaciente(item.id).subscribe(
        (response) => {
          this.pacienteService.updatePaciente(item).subscribe();
        });
    }else{
      item.id=0;
      this.pacienteService.addPaciente(item).subscribe();
    }
    this.refresh();
  }

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
