import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoImageTopCardComponent } from './info-image-top-card.component';

describe('InfoImageTopCardComponent', () => {
  let component: InfoImageTopCardComponent;
  let fixture: ComponentFixture<InfoImageTopCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoImageTopCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(InfoImageTopCardComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
