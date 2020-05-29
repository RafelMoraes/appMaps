import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Ilocal } from '../Intefaces/Ilocal';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;
  posicaoAtual: any;
  
  public listaLocais: Ilocal[]=[
    {
      lat: -22.524791, 
      lng: -48.566125,
      titulo:'Lanchonete Do Chefia'
    },
    {
      lat: -22.525158,  
      lng: -48.567480,
      titulo:'Ginásio Arlindo Fadoni'
    },
    {
      lat: -22.520817, 
      lng: -48.565527, 
      titulo:'Barbearia Imperido do corte'
    },
    {
      lat: -22.517929, 
      lng: -48.554781,
      titulo:'Ricardinho Eltricista'
    },
    {
      lat: -22.516156,  
      lng: -48.539435,
      titulo:'Prainha de Igaraçu'
    },
    
    {
      lat: -22.526850,  
      lng: -48.566584,
      titulo:'Minha posição'
    }
  ];

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

    for(let local of this.listaLocais){
      this.adicionarMarc(local);
    }

  }

  ionViewDidEnter(){
    this.showMap();
  }

  private adicionarMarc(Local: Ilocal) {
    const {lat, lng, titulo} = Local;

    const marcador = new google.maps.Marker({
      position: {lat, lng},
      map: this.map,
      title: titulo,
      icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
    });
    
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
}
