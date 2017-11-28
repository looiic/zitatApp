import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';
import { HomePage } from '../home/home';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  private name: string;
  private datum: string;
  private zitat: string;
  private beschreibung: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {

  }

  addZitat(){
    this.data.addZitat(this.name, this.datum, this.zitat, this.beschreibung);
    this.name = this.datum = this.zitat = '';
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

}
