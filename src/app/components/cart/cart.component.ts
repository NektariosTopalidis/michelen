import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { LoadingService } from 'src/app/services/loading.service';

//primeng
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  

  constructor(private loadingService: LoadingService,private messageService: MessageService,private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {

  }


}
