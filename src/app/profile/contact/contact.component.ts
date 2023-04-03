import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { ContactFormModel } from './contact-form-model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
  export class ContactComponent implements OnInit {
    isFormSuccessful = "null";
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
    ){

    }
  
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
                // var SuccesAlert = document.getElementById('success');
                // var FailureAlert = document.getElementById('failure');

                // if(document.getElementById('success')== null || document.getElementById('failure') == null)
                //   {location.reload();}

                // console.log(JSON.parse(JSON.stringify(response)).status);
                // console.log(SuccesAlert?.style.display);
                // if (JSON.parse(JSON.stringify(response)).status == 'success' && SuccesAlert) {
                //   SuccesAlert.style.display = 'block';
                // }
                // else if(FailureAlert){
                //   FailureAlert.style.display = 'block';
                // }
                
                if( this.isFormSuccessful=="success" || this.isFormSuccessful=="failed")
                  {location.reload();}
                
                if (JSON.parse(JSON.stringify(response)).status == 'success') {
                  this.isFormSuccessful="success"
                }
                else{
                  this.isFormSuccessful="failed"
                }
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
