import { Component, OnInit } from '@angular/core';

export interface Contact {
  id: number;
  name: string;
  apellido_1: string;
  apellido_2: string; 
  email: string;
  telefono: string;
}

const ELEMENT_DATA: Contact[] = [
  {id: 1, name: 'Ivan', apellido_1: 'gonzalez', apellido_2: 'Castro', email: '981121212', telefono:'aaa@aaa.com'},
  {id: 2, name: 'Juan', apellido_1: 'gonzalez', apellido_2: 'Castro', email: '981121212', telefono:'aaa@aaa.com'},
  {id: 3, name: 'Pedro', apellido_1: 'gonzalez', apellido_2: 'Castro', email: '981121212', telefono:'aaa@aaa.com'},
  {id: 4, name: 'Ana', apellido_1: 'gonzalez', apellido_2: 'Castro', email: '981121212', telefono:'aaa@aaa.com'},
  {id: 5, name: 'Ismael', apellido_1: 'gonzalez', apellido_2: 'Castro', email: '981121212', telefono:'aaa@aaa.com'},
  {id: 6, name: 'Jose', apellido_1: 'gonzalez', apellido_2: 'Castro', email: '981121212', telefono:'aaa@aaa.com'},
  {id: 7, name: 'Raquel', apellido_1: 'gonzalez', apellido_2: 'Castro', email: '981121212', telefono:'aaa@aaa.com'},
  {id: 8, name: 'Vanesa', apellido_1: 'gonzalez', apellido_2: 'Castro', email: '981121212', telefono:'aaa@aaa.com'},
  {id: 9, name: 'Oscar', apellido_1: 'gonzalez', apellido_2: 'Castro', email: '981121212', telefono:'aaa@aaa.com'},
  {id: 10, name: 'Carlos', apellido_1: 'gonzalez', apellido_2: 'Castro', email: '981121212', telefono:'aaa@aaa.com'}
];

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css'],
})
export class ContactHomeComponent {

  displayedColumns: string[] = ['id', 'name', 'apellido_1', 'apellido_2','email','telefono'];
  contactos = ELEMENT_DATA;

}
