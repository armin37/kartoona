import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ApiService} from '../../../services/api.service';
import {Router} from '@angular/router';
import {GeneralService} from '../../../services/general.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchWord: string = '';
  headerMenu: any = [];
  searchResult;

  constructor(public userService: UserService,
              public apiService: ApiService,
              public router: Router,
              public generalService: GeneralService) {

  }

  ngOnInit(): void {
    this.initheaderPageMenu();
  }

  initheaderPageMenu = async () => {
    this.headerMenu = [];
    const res = await this.apiService.sendRequest('GET', 'basic/HeaderPageMenu');
    if (res && res.status == 200) {
      this.headerMenu = res.body;
    }
  };
  goToResult = (base, movie) => {
    this.router.navigateByUrl('/' + base + '/' + movie.slug);
    this.searchWord = '';
    this.searchResult = null;
  };

  fireSearch() {
    if (this.searchWord && this.searchWord.trim().length > 0) {
      this.search();
    } else {
      this.searchResult = null;
    }
  }

  search = async () => {
    if (this.searchWord && this.searchWord.trim().length > 0) {
      let res = await this.apiService.sendRequest('GET', 'movie/search/' + this.searchWord, null, null, false, true);
      this.searchResult = res.body;
      console.log(this.searchResult);
    } else {
      this.searchResult = null;
    }
  };

  clear() {
    this.searchWord = '';
    this.searchResult = null;
  }
}
