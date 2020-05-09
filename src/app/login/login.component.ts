import {Component, OnInit, Input, Output, OnChanges, EventEmitter, OnDestroy} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {RequestService} from '../request.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'scale3d(.0, .0, .0)'}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  authorized = false;
  user: any;
  username: any;
  name: any;
  bonus: any;
  password: any;
  unsub$ = new Subject();
  constructor(private http: HttpClient, private requestService: RequestService, private route: Router) { }
  ngOnInit() {
    this.username = localStorage.getItem('userEmail');
    this.name = localStorage.getItem('userName');
    this.bonus = localStorage.getItem('bonus');
    localStorage.getItem('user') ? this.authorized = true : this.authorized = false;
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.authorized);
  }
  login() {
    this.requestService.Login(this.username, this.password, localStorage.getItem('address'))
      .pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
        this.user = data;
        console.log(data.user);
        if (data.success === true) {
          localStorage.setItem('user', this.username + ':' + this.password);
          localStorage.setItem('userName', data.user.username);
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem('phone', data.user.phone_number);
          localStorage.setItem('bonus', data.user.bonuses);
          this.authorized = true;
          // window.location.reload();
        }
    });
  }
  logout() {
    localStorage.clear();
    window.location.reload();
  }
  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
