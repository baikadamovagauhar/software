import {Component, OnDestroy} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {RequestService} from '../request.service';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
<<<<<<< HEAD
export class RegistrationComponent implements OnDestroy {
  constructor(private requestService: RequestService,  private router: Router) { }
=======
export class RegistrationComponent implements OnInit, OnDestroy {

  constructor(private requestService: RequestService,  private route: Router) { }
>>>>>>> 1c5da895bba607e2ce40e5e8bbf6087011abd3b6
  username: any;
  email: any;
  password: any;
  phone: any;
  newUser: any;
  reserved = true;
  unsub$ = new Subject();
  myForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userEmail: new FormControl('', [
      Validators.required,
      // tslint:disable-next-line:max-line-length
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, )], ),
    userPass: new FormControl('', Validators.required),
    userPhone: new FormControl('', Validators.pattern('[0-9]{10}'))
  });

  register() {
    this.requestService.Registration(this.username, this.password, this.email, this.phone)
      .pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      this.newUser = data;
<<<<<<< HEAD
      if (this.newUser === true) {
        this.reserved = true;
        this.router.navigate(['/main']);
      } else if (this.newUser === 23000) {
        this.reserved = false;
      } else {
        console.log('Server Error 500');
      }
=======
      this.route.navigate(['/main']);
>>>>>>> 1c5da895bba607e2ce40e5e8bbf6087011abd3b6
    });
  }
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
