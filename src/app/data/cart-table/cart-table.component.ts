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
  products!: any[];

  displayedColumns: string[] = ['name', 'price', 'qty', 'qpd' ,'availability', 'order' ,'group', 'brand', 'rim', 'season', 'update date', "thessaloniki's stock", "athens' stock",  'remove'];
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
      this.products = resdata.data.products;

      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
