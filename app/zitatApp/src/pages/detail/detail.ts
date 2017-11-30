import { Component, ElementRef, ViewChild } from '@angular/core';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {
    this.id = this.navParams.get('id')
    this.data.getSingleZitat(this.id).subscribe(items => {
        this.zitate = items;
        this.name           = this.zitate.name;
        this.datum          = this.zitate.datum;
        this.zitat          = this.zitate.zitat;
        this.beschreibung   = this.zitate.beschreibung;

    });
  }

  changeZitat(){
    this.isenabled = true;
  }

  cancel(){
    this.isenabled = false;
  }

  saveZitat(){
    this.data.changeZitat(this.id, this.name, this.datum, this.zitat, this.beschreibung);
    this.navCtrl.pop();
  }

  deleteZitat(){
    this.data.deleteZitat(this.id);
    this.navCtrl.pop();
  }

  @ViewChild('myInput1') myInput1: ElementRef;
  @ViewChild('myInput2') myInput2: ElementRef;

  resize() {
      this.myInput1.nativeElement.style.height = this.myInput1.nativeElement.scrollHeight + 'px';
      this.myInput2.nativeElement.style.height = this.myInput2.nativeElement.scrollHeight + 'px';
  }

}
