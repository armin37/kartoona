import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFullWidthCardComponent } from './info-full-width-card.component';

describe('InfoFullWidthCardComponent', () => {
  let component: InfoFullWidthCardComponent;
  let fixture: ComponentFixture<InfoFullWidthCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFullWidthCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFullWidthCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
