import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContactDeleteComponent } from '../contact-delete/contact-delete.component';

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css']
})

export class ContactHomeComponent implements OnInit{
  contactos: any = [];
  constructor(private contactsService: ContactsService, private router: Router, public dialog: MatDialog){}
  
  ngOnInit(): void {
    this.contactsService.getContacts().subscribe(data =>{
      this.contactos = data;
    })
  }

  openDetailForm(row: any){
    this.router.navigate(['/contact', row.id])
  }

  editContactDetail(contact: any){
    this.router.navigate(['/contact/edit', contact]);
  }

  openDeleteDialog(contactId: number): void{
    this.dialog.open(ContactDeleteComponent, {data: {contactId: contactId}});
  }

  displayedColumns: string[] = ['id', 'name', 'apellido_1', 'apellido_2','email','telefono','actions'];
  

}
