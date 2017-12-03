import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { FormPage } from '../form/form';
import { DetailPage } from '../detail/detail';

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
        this.zitate.sort(function(a, b) {
            return parseFloat(a.datum) - parseFloat(b.datum);
        });
        console.log(this.zitate);
        for(var i = 0;i<this.zitate.length;i++) {
          // let today: Date;
          var today = new Date(parseInt(items[i].datum));

          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!

          var yyyy = today.getFullYear();
          if(dd<10){
              var d = '0'+dd.toString();
          }else{
            var d = dd.toString();
          }
          if(mm<10){
              var m ='0'+mm;
          }else{
            var m = mm.toString();
          }
          this.zitate[i].datum = d+'.'+m+'.'+yyyy;
          console.log(this.zitate[i].datum);
        }
    });

  }

  addZitat(){
    this.navCtrl.push(FormPage);
  }

  showDetail(id){
    console.log("something")
    this.navCtrl.push(DetailPage, { "id": id });
  }

}
