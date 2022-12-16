import { Component, OnInit, ViewChild } from '@angular/core';

//Material
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import axios from 'axios';


@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'avalability', 'order', 'group', 'brand', 'rim', 'season', 'update date', "thessaloniki's stock", "athens' stock", 'quantity', 'add to cart'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  loadedUser = JSON.parse(localStorage.getItem('userData')||'{}');
  
  constructor() {}

  ngOnInit(): void {
    axios.post('https://michelinNodeRest.vinoitalia.gr/products/fetchCart',{
      trdr : this.loadedUser.id
    })
    .then(resdata=>{
      console.log(resdata.data)
    })
  }
}
