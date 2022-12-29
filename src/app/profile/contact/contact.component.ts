import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { ProfileService } from '../profile.service';
import { SnotifyService } from 'ng-snotify';
import { environment } from '../../../environments/environment';
import { ContactFormModel } from './contact-form-model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import Validation from './utils/validation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
  export class ContactComponent implements OnInit {
 
    // model: any = {};
    //Model for the form
    contactModel = new ContactFormModel("","","","");
    contactform: FormGroup = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      subject: new FormControl(''),
      message: new FormControl('')
    });
    submitted = false;
  
    constructor(
      private http: HttpClient,
      private formBuilder: FormBuilder
    ){}
  
    ngOnInit() {
      this.contactform = this.formBuilder.group(
        {
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          subject: ['', Validators.required],
          message: ['', Validators.required],          
        }
      );
    }

    get f(): { [key: string]: AbstractControl } {
      return this.contactform.controls;
    }
    // When the form is submitted
    onSubmit(): void {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          this.http.post('https://formcarry.com/s/Vuy8gmC-p',
            { name: this.contactModel.name, subject: this.contactModel.subject, replyto: this.contactModel.email, message: this.contactModel.message },
            { 'headers': headers }).subscribe(
              response => {
                console.log(response);
              }
            );

      this.submitted = true;
  
      if (this.contactform.invalid) {
        return;

      }
      console.log(JSON.stringify(this.contactform.value, null, 2));
    }

    //When the form is reset
    onReset(): void {
      this.submitted = false;
      this.contactform.reset();
    }
}
