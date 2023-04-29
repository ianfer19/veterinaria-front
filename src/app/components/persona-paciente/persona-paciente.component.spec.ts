import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaPacienteComponent } from './persona-paciente.component';

describe('PersonaPacienteComponent', () => {
  let component: PersonaPacienteComponent;
  let fixture: ComponentFixture<PersonaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
