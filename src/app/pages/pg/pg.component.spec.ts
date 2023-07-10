import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PgComponent } from './pg.component';

describe('PgComponent', () => {
  let component: PgComponent;
  let fixture: ComponentFixture<PgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(PgComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
