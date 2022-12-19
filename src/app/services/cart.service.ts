import { Injectable } from '@angular/core';
import axios from 'axios';

//Services
import { LoadingService } from './loading.service';

//primeng
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  loadedUser = JSON.parse(localStorage.getItem('userData')||'{}');
  constructor(private loadingService: LoadingService,private messageService: MessageService) { }



  async removeCartItem(product:any){

    let remove = await axios.post('https://michelinNodeRest.vinoitalia.gr/products/removeCartItem',{
      trdr: this.loadedUser.id,
      mtrl: product.mtrl
    })
    this.loadingService.sendStartLoading(false);
      console.log(remove.data);
      return remove.data.products


  }

  async clearAll(){
    let remove = await axios.post('https://michelinNodeRest.vinoitalia.gr/products/clearCart',{
      trdr: this.loadedUser.id
    })
    this.loadingService.sendStartLoading(false);
      console.log(remove.data);
      return remove.data.products
  }

  async order(products : any){

    console.log(products);
// http://localhost:3001/michelin/placeOrder
//https://michelinNodeRest.vinoitalia.gr/michelin/placeOrder
    let order = await axios.post('https://michelinNodeRest.vinoitalia.gr/michelin/placeOrder',{
     products : products,
     trdr : "5785"
    })
    this.loadingService.sendStartLoading(false);
    this.messageService.add({severity:'success', summary:'The order has been succesfully placed.'});
    console.log(order.data)
    // return order.data.response.DocumentID;
    let prods = await this.clearAll(); 
    return prods;

  }
}
