import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';

//Material
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

//Services
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'avalability', 'order', 'group', 'brand', 'rim', 'season', 'update date', "thessaloniki's stock", "athens' stock", 'quantity', 'add to cart'];
  dataSource!: MatTableDataSource<any>;
  products!: any[];
  available: any = [];
  qty!: number;
  searchProd: any;
  quantity: any;
  error: boolean = false; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productsService: ProductsService,private loadingService: LoadingService,private fb: FormBuilder) {}
      
  ngOnInit(): void {


    this.productsService.findProductsEvent.subscribe(async resData => {
      console.log(resData);
      this.searchProd = resData;
      this.quantity = resData.quantity;
      
     
      if (resData.name != null && resData.name != '') {
        // console.log('hello 1');
        this.products = await this.productsService.findProduct(
          resData.code,
          resData.quantity,
          resData.name,
          2
        );
        this.loadingService.sendStartLoading(false);
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } 
      else {
        // console.log('hello 2');
        this.available.push( await this.productsService.findProduct(
            resData.code,
            resData.quantity,
            resData.name,
            1
        ));
        this.loadingService.sendStartLoading(false);
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource([this.available[0].product]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      
    })
  }

  async selectProd(cai: string) {
    this.loadingService.sendStartLoading(true);

    console.log(this.quantity);

    // this.available.push(
    //   await this.productsService.findProduct(
    //     cai,
    //     this.quantity,
    //     '',
    //     1
    //   )
    // );    
    let temp = await this.productsService.findProduct(
      cai,
      this.quantity,
      '',
      1
    ) 
  
    

    this.removeFromProd(cai,temp);
  }

  removeFromProd(cai:string,temp: any){
    for(let i = 0 ; i < this.products.length;i++){
      if(cai == this.products[i].cai){
        this.loadingService.sendStartLoading(false);
        this.products[i] = temp.product;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        break;
      }
    }
  }

  handleNewQty(e: any,qty_id: any){
    let qty_input: any = document.getElementById(qty_id);
    qty_input.children[0].children[0].children[0].children[1].children[0].value = +e.target.value;
  }

  addToCart(product:any,qty_id: any){

    //get qty
    let qty_input: any = document.getElementById(qty_id);
    let qty_value = +qty_input.children[0].children[0].children[0].children[1].children[0].value;
    
    if(qty_value == 0){
      this.error = true;
    }
    else{
      this.error = false;
      console.log(product);
      console.log(qty_value);
      
      this.loadingService.sendStartLoading(true);
      
      this.productsService.addToCart(product,qty_value);
    }


  }


}