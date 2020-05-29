import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;
  posicaoAtual: any;
  posicaoB: any;

  @ViewChild('map', {read: ElementRef, static:false}) mapRef: ElementRef;

  constructor(private geolocation: Geolocation) { }

  
  public async showMap() {
     // posição fixa const location = new google.maps.LatLng(-22.526850, -48.566584);

     await this.buscaPosicao();

    const options = {
      center: this.posicaoAtual,
      zoom:  15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options)

    const marcador = new google.maps.Marker({
      position: this.posicaoAtual,
      map: this.map,
      title: "Minha localização",
      icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
      animation: google.maps.Animation.DROP
    });

  }

  ionViewDidEnter(){
    this.showMap();
    this.marcB();
  }

  public async buscaPosicao(){
   await this.geolocation.getCurrentPosition().then((posicaoGPS) => {
      this.posicaoAtual = {
        lat: posicaoGPS.coords.latitude,
        lng: posicaoGPS.coords.longitude
      }

     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

  /**
   * posicaoB
   */
  public async marcB() {
    const posicaoB = new google.maps.LatLng(-22.525034, -48.567559);
    await this.buscaPosicaoB();

    const marcador = new google.maps.Marker({
      position: this.posicaoB,
      map: this.map,
      title: "Localização B",
      icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
      animation: google.maps.Animation.DROP
    });
  }

  public async buscaPosicaoB(){
    await this.geolocation.getCurrentPosition().then((posicaoB) => {
       this.posicaoB = {
         lat: posicaoB.coords.latitude,
         lng: posicaoB.coords.longitude
       }
 
      }).catch((error) => {
        console.log('Error getting location', error);
      });

}
}
