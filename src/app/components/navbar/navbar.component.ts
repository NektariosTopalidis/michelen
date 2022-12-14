import { Component, OnInit } from '@angular/core';

//Serivces
import { AuthService } from 'src/app/services/auth.service';

//vaadin
//---> Tabs
import '@vaadin/tabs';
//---> Icons
import '@vaadin/icon';
import '@vaadin/icons';
//---> Button
import '@vaadin/button';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  loadedUser:any = JSON.parse(localStorage.getItem('userData')||'{}');

  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    console.log(this.loadedUser);
    

  }

  logout(){
    this.authService.logout();
  }

}
