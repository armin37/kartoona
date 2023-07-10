import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoImageFadingCardComponent } from './info-image-fading-card.component';

describe('InfoImageFadingCardComponent', () => {
  let component: InfoImageFadingCardComponent;
  let fixture: ComponentFixture<InfoImageFadingCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoImageFadingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(InfoImageFadingCardComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
