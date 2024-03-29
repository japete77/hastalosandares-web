import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/models/cart';
import { MenuItem } from 'src/models/menu-item';
import { Data } from 'src/services/data.service';

@Component({
  selector: 'app-taberna-malaga',
  templateUrl: './taberna-malaga.component.html',
  styleUrls: ['./taberna-malaga.component.scss']
})
export class TabernaMalagaComponent implements OnInit {

  title = 'Hasta Los Andares'
  mobile = '667415298'
  phone = '951624274'
  cart: Cart
  selectedCategory: string = 'IBÉRICOS'
  selectedSize: string = 'TABLA'
  loading = true

  constructor(private dataService: Data) { }

  ngOnInit(): void {
    this.loading = true
    this.dataService.load('taberna-malaga').then(result => {
      this.cart = result
      this.loading = false;
    });
  }

  getProducts(category: string, size: string) {
    if (!this.cart) return;

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
        price: this.getPriceBySize(item, size),
        categoria: item.categoria,
        size: size,
        description: item.descripcion,
        image: this.getImageBySize(item, size),
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

  getImageBySize(item: MenuItem, size: string) {
    return size == 'TAPA' ? item.foto_tapa : 
           size == 'TOSTADA' ? item.foto_tostada : 
           size == 'MEDIA TABLA' ? item.foto_media_tabla :
           item.foto_tabla
  }

  selectCategory(category: string) {
    this.selectedCategory = category
    if (this.selectedCategory == 'VINOS') this.selectedSize = 'TABLA'
    else if (this.selectedCategory == 'CERVEZAS' || 
        this.selectedCategory == 'REFRESCOS') this.selectedSize = 'MEDIA TABLA'
  }

  selectSize(size: string) {
    this.selectedSize = size
  }
}
