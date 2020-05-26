import { Component } from '@angular/core';
import { Data } from 'src/services/data.service';
import { Cart } from 'src/models/cart';
import { OrderMenu } from 'src/models/order-menu';
import { OrderMenuItem } from 'src/models/order-menu-item';
import { MenuItem } from 'src/models/menu-item';

@Component({
  selector: 'app-ha-malaga',
  templateUrl: './ha-malaga.component.html',
  styleUrls: ['./ha-malaga.component.scss']
})
export class HaMalagaComponent {
  title = 'Hasta Los Andares'
  mobile = '667415298'
  phone = '951624274'
  cart: Cart
  selectedCategory: string = 'IBÉRICOS'
  selectedSize: string = 'TABLA'
  order: OrderMenu = new OrderMenu()
  warning: string;
  validCP = [ '29007', '29016', '29002', '29005', '29008', '29003', '29009', '29012', '29015' ];

  gastos_envio = 5
  limite_gastos = 50

  constructor() {
    this.cart = Data.cart
    this.checkClientInfo()
  }

  getProducts(category: string, size: string) {
    var filtered : Array<MenuItem>;
    if (size == 'TAPA') 
      filtered = this.cart.menu.filter(f => f.categoria == category && f.tapa > 0).sort()
    else if (size == 'TOSTADA') 
      filtered = this.cart.menu.filter(f => f.categoria == category && f.tostada > 0).sort()
    else if (size == 'MEDIA TABLA') 
      filtered = this.cart.menu.filter(f => f.categoria == category && f.media_tabla > 0).sort()
    else if (size == 'TABLA') 
      filtered = this.cart.menu.filter(f => f.categoria == category && f.tabla > 0).sort()

    return filtered.map(item => {
      return {
        product: item.producto,
        price: this.getPriceBySize(item, this.selectedSize),
        categoria: item.categoria,
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
    if (this.selectedCategory == 'VINOS') this.selectedSize = 'TABLA'
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
        categoria: item.categoria,
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

  getOrderItems() {
    var result = '';
    for (var i = 0; i < this.order.items.length; i++) {
      result += `${this.order.items[i].product} (${this.order.items[i].categoria == 'VINOS' ? 'BOTELLA' : this.order.items[i].size}) x${this.order.items[i].amount} ... ${this.order.items[i].price * this.order.items[i].amount} €
`
    }
    return result;
  }

  getWhatsAppOrderLink() {
    var order = `PEDIDO:
${this.getOrderItems()}
GASTOS DE ENVÍO: ${this.getTotal() < this.limite_gastos ? this.gastos_envio : 0} €

TOTAL: ${this.getTotal() < this.limite_gastos ? this.getTotal() + this.gastos_envio : this.getTotal()} €

ENVIAR A:
${this.order.name}
${this.order.address}
${this.order.cp}
`
    return `https://wa.me/34${this.mobile}?text=${encodeURIComponent(order)}`; 
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
