import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { FormPage } from '../form/form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private zitate: any[]=[];

  constructor(public navCtrl: NavController, public menu: MenuController, public data: DataProvider) {
    this.menu.swipeEnable(false);


  }

  ionViewWillEnter(){
    this.data.getZitate().subscribe(items => {
        this.zitate = items;
        console.log(this.zitate);
    });
  }

  addZitat(){
    console.log("tadaa");
    this.navCtrl.push(FormPage);
  }

}
