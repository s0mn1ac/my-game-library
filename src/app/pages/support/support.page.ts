import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage {

  public paypalUrl = 'https://paypal.me/juanmigonzalezdev?country.x=ES&locale.x=es_ES';

  constructor() { }

  public onClickOpenUrl(url: string): void {
    window.open(url, '_blank');
  }

}
