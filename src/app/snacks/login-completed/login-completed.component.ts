import { Component } from '@angular/core';

@Component({
  selector: 'app-login-completed',
  templateUrl: './login-completed.component.html',
  styleUrls: ['./login-completed.component.scss']
})
export class LoginCompletedComponent {
  loadedUser:any = JSON.parse(localStorage.getItem('userData')||'{}');
}
