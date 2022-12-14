import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

//Services
import { AuthService } from './services/auth.service';

//Material
import {MatSnackBar} from '@angular/material/snack-bar';

//Components
import { LoginCompletedComponent } from 'src/app/snacks/login-completed/login-completed.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Περιφερειακή';
  loggedIn: boolean = true;
  constructor(private authService:AuthService,private route:ActivatedRoute,private _snackBar: MatSnackBar){}
  
  ngOnInit(){
    this.authService.autoLogin();
    if (localStorage.getItem('username') == 'Admin') {
      this.authService.setAdmin(true);
    }
    this.route.data.subscribe((data: Data) => {
      console.log(data);
    });
    this.authService.loggedIn.subscribe((res) => {


      this.loggedIn = res;

    });


    this.authService.showSnack.subscribe(resData => {
      console.log("YEAH");
      
      this._snackBar.openFromComponent(LoginCompletedComponent, {
        duration: 3000,
      });
  })
  }
}
