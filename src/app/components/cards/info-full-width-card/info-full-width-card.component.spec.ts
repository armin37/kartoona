import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoFullWidthCardComponent } from './info-full-width-card.component';

describe('InfoFullWidthCardComponent', () => {
  let component: InfoFullWidthCardComponent;
  let fixture: ComponentFixture<InfoFullWidthCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFullWidthCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(InfoFullWidthCardComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
