import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})

export class DetailPage {

  private isenabled: boolean = false;
  private id: string;

  private zitate: any;

  private name: string;
  private datum: string;
  private zitat: string;
  private beschreibung: string;
  private datumDate: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {
    this.id = this.navParams.get('id')
    this.data.getSingleZitat(this.id).subscribe(items => {
        this.zitate = items;
        this.name           = this.zitate.name;
        //this.datum          = this.zitate.datum;
        this.zitat          = this.zitate.zitat;
        this.beschreibung   = this.zitate.beschreibung;

        var today = new Date(parseInt(this.zitate.datum));

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
        this.datum = yyyy+'-'+m+'-'+d;
    });
  }

  changeZitat(){
    this.isenabled = true;
  }

  cancel(){
    this.isenabled = false;
  }

  saveZitat(){
    this.datumDate = new Date(this.datum + "T00:00:00");
    this.data.changeZitat(this.id, this.name, this.datumDate.getTime().toString(), this.zitat, this.beschreibung);
    this.navCtrl.pop();
  }

  deleteZitat(){
    this.data.deleteZitat(this.id);
    this.navCtrl.pop();
  }


}
