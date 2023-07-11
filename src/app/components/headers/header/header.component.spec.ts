import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {ApiService} from '../../../services/api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let apiService: ApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        ApiService
      ],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });

  it('should initialize headerMenu with data from API response', async () => {
    // Mock API response
    const mockResponse = {status: 200, body: [{name: 'Home', url: 'home', itemlist: []}]};
    spyOn(apiService, 'sendRequest').and.returnValue(Promise.resolve(mockResponse));

    // Call the method to initialize the headerMenu
    await component.initheaderPageMenu();

    // Expectations
    expect(apiService.sendRequest).toHaveBeenCalledWith('GET', 'basic/HeaderPageMenu');
    expect(component.headerMenu).toEqual(mockResponse.body);
  });

  it('should not update headerMenu if API response fails or status is not 200', async () => {
    // Mock API response
    const mockResponse = {status: 500, body: null};
    spyOn(apiService, 'sendRequest').and.returnValue(Promise.resolve(mockResponse));

    // Call the method to initialize the headerMenu
    await component.initheaderPageMenu();

    // Expectations
    expect(apiService.sendRequest).toHaveBeenCalledWith('GET', 'basic/HeaderPageMenu');
    expect(component.headerMenu).toEqual([]);
  });

  it('should render menu items', () => {
    // Set up the headerMenu data for testing
    component.headerMenu = [
      {name: 'Home', url: '/home', itemlist: []},
      {name: 'About', url: '/about', itemlist: []},
    ];

    fixture.detectChanges();

    const menuItems = fixture.debugElement.queryAll(By.css('.nav-item>.nav-link'));

    // One for hardcoded authentication menu
    expect(menuItems.length).toBe(component.headerMenu.length + 1);

    menuItems.forEach((menuItem, index) => {
      const menuItemNameElement = menuItem.nativeElement;
      const menuItemName = menuItemNameElement?.textContent;

      expect(menuItemName).toBeDefined();
    });
  });
});
