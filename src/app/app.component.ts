import { Component } from '@angular/core';
import { Data } from 'src/services/data.service';
import { Cart } from 'src/models/cart';
import { OrderMenu } from 'src/models/order-menu';
import { OrderMenuItem } from 'src/models/order-menu-item';
import { MenuItem } from 'src/models/menu-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hasta Los Andares'
  cart: Cart
  selectedCategory: string = 'IBÉRICOS'
  selectedSize: string = 'TAPA'
  order: OrderMenu = new OrderMenu()
  warning: string;
  validCP = [ '29001', '29002' ];

  constructor() {
    this.cart = Data.cart
    this.checkClientInfo()
  }

  getProducts(category: string, size: string) {
    var filtered = this.cart.menu.filter(f => f.categoria == category).sort()
    return filtered.map(item => {
      return {
        product: item.producto,
        price: this.getPriceBySize(item, this.selectedSize),
        size: this.selectedSize,
        description: item.descripcion,
        image: item.foto,
        allergens: item.alergenos
      }
    })
  }

  getPriceBySize(item: MenuItem, size: string) {
    return size == 'TAPA' ? item.tapa : 
           size == 'TOSTADA' ? item.tostada : 
           size == 'MEDIA TABLA' ? item.media_tabla :
           item.tabla
  }

  selectCategory(category: string) {
    this.selectedCategory = category
  }

  selectSize(size: string) {
    this.selectedSize = size
  }

  addOrderItem(item: OrderMenuItem) {
    if (!this.order.items) this.order.items = []

    var existingItem = this.order.items.find(f => f.product == item.product && f.size == item.size)
    
    if (existingItem) {
      existingItem.amount += 1;
    } else {
      this.order.items.push({
        allergens: item.allergens,
        amount: 1,
        description: item.description,
        image: item.image,
        price: item.price,
        product: item.product,
        size: item.size
      })  
    }

    this.checkClientInfo();
  }

  removeOrderItem(item: OrderMenuItem) {
    if (!this.order.items) this.order.items = []

    var existingItem = this.order.items.find(f => f.product == item.product && f.size == item.size)
    
    if (existingItem) {
      existingItem.amount -= 1;
      if (existingItem.amount == 0) {
        this.order.items = this.order.items.filter(item => item.amount > 0);
      }
    }

    this.checkClientInfo();
  }

  isProductInOrder(item: OrderMenuItem) {
    if (this.order && this.order.items)
    {
      var existingItem = this.order.items.find(f => f.product == item.product && f.size == item.size)
      if (existingItem) return true;
    }
    return false;
  }

  getItemsInOrder(item: OrderMenuItem) {
    var existingItem = this.order.items.find(f => f.product == item.product && f.size == item.size)
    if (existingItem) {
      return existingItem.amount;
    }
    return 0;
  }

  getTotal() {
    if (this.order && this.order.items) {
      return this.order.items.reduce((acc, val) => acc + val.price * val.amount, 0);
    }
  }

  getWhatsAppOrderLink() {
    return `https://wa.me/34600096922?text=Prueba`; 
  }

  isVisibleOrderButton() {
    return this.order && 
           this.order.items && 
           this.order.items.length > 0 &&
           this.order.name &&
           this.order.address &&
           this.order.cp &&
           this.warning == ""
  }

  checkClientInfo() {
    if (!this.order || !this.order.items || this.order.items.length == 0) this.warning = "";
    else if (!this.order.name || !this.order.address || !this.order.cp) {
          this.warning = "Rellene su datos para solicitar el pedido"
    } else if (!this.isValidCP()) {
      this.warning = "Lo siento, no servimos a domicilio en ese código postal";
    } else {
      this.warning = "";
    }
  }

  isValidCP() {
    if (this.order) {
      return this.validCP.findIndex(f => f == this.order.cp) >= 0
    }
    return false
  }
}
