import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.css']
})
export class ContactNewComponent implements OnInit {

  name: string;
  apellido_1: string;
  apellido_2: string;
  email: string;
  telefono: string;

  constructor(private router: Router, private contactsService: ContactsService) { }

  ngOnInit() {
  }

  newContact(){
    const contact = {
      name: this.name,
      apellido_1: this.apellido_1,
      apellido_2: this.apellido_2,
      email: this.email,
      telefono: this.telefono
    }
    this.contactsService.newContact(contact);
    this.navigateToHome();
  }

  cancelInsert(){
    this.navigateToHome();
  }

  navigateToHome(){
    this.router.navigate(['/contacts']);
  }

}
