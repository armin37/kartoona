import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerMenu: any = [];

  constructor( public apiService: ApiService) { }

  ngOnInit(): void {
    this.initfooterMenuPageMenu();
  }

  initfooterMenuPageMenu = async () => {
    this.footerMenu=[];
    const res = await this.apiService.sendRequest('GET', 'basic/FooterPageMenu');
    if (res && res.status == 200) {
      this.footerMenu = res.body;
    }
  }

}
