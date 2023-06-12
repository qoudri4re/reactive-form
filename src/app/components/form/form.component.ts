import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/fetch-countries.service';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { first } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  countries: any[] = []; // List of countries
  occupations = [
    { text: 'Frontend Developer', value: 'Frontend Developer' },
    { text: 'Backend Developer', value: 'Backend Developer' },
    { text: 'Designer', value: 'Designer' },
    { text: 'Devops Engineer', value: 'Devops Engineer' },
  ];

  constructor(
    private notificationService: NotificationService,
    private requestService: RequestService,
    private router: Router
  ) {}

  myForm!: FormGroup;

  onSubmit() {
    let error: boolean = false;
    if (this.myForm.get('email')?.invalid) {
      this.notificationService.errorNotification('Invalid email');
      error = true;
    }
    if (this.myForm.get('password')?.invalid) {
      this.notificationService.errorNotification(
        'Password should contain at least 8 characters,  with at least 1 uppercase and 1 special character.'
      );
      error = true;
    }
    if (!error) {
      if (this.myForm.value.success === 'true') {
        this.notificationService.successNotification(
          'Form submission successful'
        );

        this.router.navigate(['/success']); // Redirect to success route
      } else {
        this.notificationService.errorNotification('Form submission failed');
      }
    }
  }

  validateField(controlName: string) {
    const control = this.myForm.get(controlName);

    if (control && control.touched && control.invalid) {
      control.markAsDirty();

      if (controlName === 'email') {
        this.notificationService.errorNotification('Invalid email');
      }

      if (controlName === 'password') {
        this.notificationService.errorNotification('Invalid password');
      }
    }
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
      ]),
      country: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
      success: new FormControl(null, Validators.required),
    });

    const emailControl = this.myForm.get('email');
    if (emailControl) {
      emailControl.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe(() => {
          if (emailControl.touched && emailControl.invalid) {
            this.validateField('email');
          }
        });
    }

    const passwordControl = this.myForm.get('password');
    if (passwordControl) {
      passwordControl.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe(() => {
          if (passwordControl.touched && passwordControl.invalid) {
            this.validateField('password');
          }
        });
    }

    this.requestService.getCountries().subscribe((data) => {
      // this.countries = Object.values(data);
      for (let country in data) {
        let countryObj = {
          text: data[country],
          value: data[country],
        };

        this.countries.push(countryObj);
      }
    });
  }
}
