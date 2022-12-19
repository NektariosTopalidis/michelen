import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';

//Services
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  serchProd: FormGroup | any;
  isLoadingOne: boolean = false;
  constructor(private productsService: ProductsService, private fb: FormBuilder,private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.sendStartLoading(false);
    this.serchProd = this.fb.group({
      code: null,
      quantity: [50],
      name: null,
    });
  }

  handleFillCai(e: any){
    if(e.target.value){
      this.serchProd.controls['name'].disable();
    }
    else{
      this.serchProd.controls['name'].enable();
    }
  }

  handleFillName(e: any){
    if(e.target.value){
      this.serchProd.controls['code'].disable();
    }
    else{
      this.serchProd.controls['code'].enable();
    }
  }

  findProducts(){
    // console.log(this.serchProd.value);
    this.loadingService.sendStartLoading(true);
    this.productsService.sendFindProductsEvent(this.serchProd.value);
  }


}
