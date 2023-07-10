import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AboutUsComponent} from './about-us.component';
import {Component} from '@angular/core';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUsComponent],
      imports: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({selector: 'header-component', template: ''})
class HeaderStubComponent {
}

@Component({selector: 'footer-component', template: ''})
class FooterStubComponent {
}
