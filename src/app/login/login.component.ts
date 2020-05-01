import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {RequestService} from '../request.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

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
export class LoginComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  authorized = false;
  user: any;
  username: any;
  password: any;
  unsub$ = new Subject();
  constructor(private http: HttpClient, private requestService: RequestService) { }
  ngOnInit() {
    localStorage.getItem('user') ? this.authorized = true : this.authorized = false;
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.authorized);
  }
  login() {
    this.requestService.Login(this.username, this.password, localStorage.getItem('address'))
      .pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
        this.user = data;
        localStorage.setItem('user', this.username + ':' + this.password);
    });
  }
  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
