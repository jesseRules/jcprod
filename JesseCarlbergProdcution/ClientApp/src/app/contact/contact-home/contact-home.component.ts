import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { LoggingService } from 'src/app/services/logging.service';
import { ContactService } from '../services/contact.service';
import { ContactRequest } from '../services/models/ContactRequest';

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css']
})
export class ContactHomeComponent implements OnInit, OnDestroy {
  public sendingInfo: boolean = false;
  public recentContact: ContactRequest | undefined;
  public loading: boolean = false;
  public busy: boolean = false;
  private contactSubscription: Subscription | undefined;
  constructor(
    private contactService: ContactService,
    private loggingService: LoggingService
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.contactSubscription?.unsubscribe();
  }

  public contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl(''),
  });

  getErrorMessage() {
    if (this.contactForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.contactForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  errorResponse(error: any) {
    this.loading = false;

    if (error) {

      this.loggingService.logException(error);
    } else {

    }
  }

  sendInfo() {
    this.sendingInfo = true;
    let contact: ContactRequest = new ContactRequest();
    if (this.contactForm) {
      contact.email = this.contactForm.get('email')?.value ?? '';
      contact.name = this.contactForm.get('name')?.value ?? '';
      contact.message = this.contactForm.get('message')?.value ?? '';
      contact.timeStamp = Date().toLocaleString();
    }
    this.contactSubscription = this.contactService.createContact(contact)
      .pipe(finalize(() => (this.busy = false)))
      .subscribe({
        next: this.processResponse.bind(this),
        error: this.errorResponse.bind(this)
      });
  }

  processResponse(data: any) {
    this.recentContact = data;
    this.sendingInfo = false;
    this.contactForm.reset();

  }


}