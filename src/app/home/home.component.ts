import { Component } from '@angular/core';
import { Data } from 'src/services/data.service';
import { Cart } from 'src/models/cart';
import { OrderMenu } from 'src/models/order-menu';
import { OrderMenuItem } from 'src/models/order-menu-item';
import { MenuItem } from 'src/models/menu-item';
import { $ } from 'protractor';
import { Facility } from 'src/models/facility';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  visibleMenu = false;

  facilities: Facility[] = [
    {
      name: 'Tienda Ciudad Real',
      image: 'ci-ciudadreal.jpg',
      googlemap: 'https://goo.gl/maps/GHSi1JtZcSqSvRXm8',
      whatsapp: '34609040258',
      phone: '926923469 ',
      onlineshop: null,
      tripadvisor: null,
      show: false
    },
    {
      name: 'Tienda Málaga',
      image: 'ci-malaga.jpg',
      googlemap: 'https://goo.gl/maps/URWDS2U3xvsqW7iK7',
      whatsapp: '34667415298',
      phone: '951624274',
      onlineshop: null, 
      tripadvisor: null,
      show: false
    },
    {
      name: 'Taberna Barcelona',
      image: 'ha-barcelona.jpg',
      googlemap: 'https://g.page/hastalosandaresbarcelona',
      whatsapp: '34673358322',
      phone: '936015517',
      onlineshop: null, 
      tripadvisor: 'https://www.tripadvisor.es/Restaurant_Review-g187497-d17412589-Reviews-Hasta_los_Andares_Barcelona-Barcelona_Catalonia.html',
      show: false
    },
    {
      name: 'Taberna Ciudad Real',
      image: 'ha-ciudadreal.jpg',
      googlemap: 'https://goo.gl/maps/sfstRrtCK6qivBkX9',
      whatsapp: '34609040258',
      phone: '609040258',
      onlineshop: null, 
      tripadvisor: null,
      show: false
    },
    {
      name: 'Taberna Madrid',
      image: 'ha-madrid.jpg',
      googlemap: 'https://g.page/hastalosandaresmadrid',
      whatsapp: '34617026708',
      phone: '617026708',
      onlineshop: null, 
      tripadvisor: 'https://www.tripadvisor.es/Restaurant_Review-g187514-d14126742-Reviews-Hasta_Los_Andares-Madrid.html',
      show: false
    },
    {
      name: 'Taberna Málaga',
      image: 'ha-malaga.jpg',
      googlemap: 'https://g.page/hastalosandaresmalaga',
      whatsapp: '34601028742',
      phone: '951387832',
      onlineshop: null, 
      tripadvisor: 'https://www.tripadvisor.es/Restaurant_Review-g187438-d19375318-Reviews-Hasta_los_andares-Malaga_Costa_del_Sol_Province_of_Malaga_Andalucia.html',
      show: false
    },
  ]

  constructor() {
  }

  clickMenu() {
    this.visibleMenu = !this.visibleMenu;
  }

  mouseClick(index: number) {
    this.facilities.forEach((item, i) => { if (index != i) item.show = false })
    this.facilities[index].show = !this.facilities[index].show; 
  }
}
