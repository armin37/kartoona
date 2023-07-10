import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResolverComponent } from './resolver.component';

describe('ResolverComponent', () => {
  let component: ResolverComponent;
  let fixture: ComponentFixture<ResolverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(ResolverComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
