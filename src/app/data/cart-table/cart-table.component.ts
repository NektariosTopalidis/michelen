import { Component, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';

//Material
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

//PrimeNg
import {ConfirmationService} from 'primeng/api';
import { LoadingService } from 'src/app/services/loading.service';
import { CartService } from 'src/app/services/cart.service';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit {
  products: any = [];

  displayedColumns: string[] = ['name', 'price', 'qty', 'qpd' ,'availability', 'order' ,'group', 'brand', 'rim', 'season',  "thessaloniki's stock", "athens' stock",  'remove'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  loadedUser = JSON.parse(localStorage.getItem('userData')||'{}');

  constructor(private confirmationService: ConfirmationService,private loadingService: LoadingService,private cartService: CartService) {}

  ngOnInit(): void {
    axios.post('https://michelinNodeRest.vinoitalia.gr/products/fetchCart',{
      trdr : this.loadedUser.id
    })
    .then(resdata=>{
      console.log(resdata.data)
      this.products = resdata.data.products;

      this.updateTable();
    })
  }

  remove(product: any){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove the product with cai ' + product.cai + ' from the cart?',
      accept:async () => {
        this.loadingService.sendStartLoading(true);
        this.products = await this.cartService.removeCartItem(product);
        
        this.updateTable();
      },
      reject: () => {
        // console.log('rejected');
        
      }
  });
  }

  async placeOrder(){
    this.loadingService.sendStartLoading(true);
    this.products = await this.cartService.order(this.products);

    this.updateTable();

    console.log(this.products);
    
  }

  updateTable(){
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}


