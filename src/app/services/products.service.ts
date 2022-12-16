import { Injectable } from '@angular/core';
import axios from 'axios';
import { Subject } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  loadedUser = JSON.parse(localStorage.getItem('userData')||'{}');
  delivery_date_arr:any = [];
  available_dates:any = [];
  constructor(private loadingService: LoadingService) { }

  findProductsEvent = new Subject<any>();
  castFindProductsEvent = this.findProductsEvent.asObservable();

  sendFindProductsEvent(values: any){
    this.findProductsEvent.next(values);
  }

  async getProducts(){
    let request = await axios.post("https://michelinapi.vinoitalia.gr/products/getProducts.php",{method:"ALLPRODUCTS"})
    console.log(request.data.data)
    return request.data.data;
  }
  async findProduct(code:string,qty:number,name:string,id:number){
    let req;
    if(id ==2 ){
       req = await axios.post("https://michelinNodeRest.vinoitalia.gr/michelin/order",{
        name:name,
        qty:qty
    })
    console.log(req.data);
   
    return req.data.product
    }else{
      console.log(code,qty);
       req = await axios.post("https://michelinNodeRest.vinoitalia.gr/michelin/order",{
        cai:code,
        qty:qty
    })

    console.log(req.data)
    for(let i =0 ; i <req.data.product.response.delivery_dates.length;i++){
        this.delivery_date_arr[i] = req.data.product.response.delivery_dates[i].delivery_dates
        this.available_dates[i] =req.data.product.response.delivery_dates[i].quantity_value
    }
    return {
      name: req.data.product_name[0],
      available : req.data.product.response.availability[0].available,
      dates : this.delivery_date_arr,
      qtys_on_date : this.available_dates,
      product: req.data.product
    }

    }


  }
  async getProds(){
    let req = await axios.post("https://michelinapi.vinoitalia.gr/xmls/getAllSaved.php",{
      trdr:this.loadedUser.id
    })
    return req.data;
  }

  addToCart(product:any,qty:any){
    console.log(this.loadedUser);
    console.log(product);
    console.log(qty);
    axios.post('https://michelinNodeRest.vinoitalia.gr/products/addToCart',{
      mtrl : product.mtrl,
      trdr : this.loadedUser.id,
      qty :qty,
      availability :product.response.available,
      dates : product.response.delivery_dates.join(',')
    })
    .then(resData=>{
      this.loadingService.sendStartLoading(false);
      console.log(resData.data)
    })
  }

}
