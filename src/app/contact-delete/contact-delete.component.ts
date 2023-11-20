import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.css']
})
export class ContactDeleteComponent implements OnInit {
  contactId: number;
  constructor(private contactService: ContactsService, public dialogRef: MatDialogRef<ContactDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {contactId: number}, private router: Router) {
      this.contactId = data.contactId;
     }

  ngOnInit() {
  }

  confirm(): void{
    this.contactService.deleteContact(this.contactId);
    this.dialogRef.close();
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/contacts'])
  }

}
