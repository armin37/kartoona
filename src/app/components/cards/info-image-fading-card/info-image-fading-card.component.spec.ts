import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoImageFadingCardComponent } from './info-image-fading-card.component';

describe('InfoImageFadingCardComponent', () => {
  let component: InfoImageFadingCardComponent;
  let fixture: ComponentFixture<InfoImageFadingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoImageFadingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoImageFadingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
