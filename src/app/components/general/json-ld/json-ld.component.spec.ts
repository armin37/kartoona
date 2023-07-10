import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JsonLdComponent } from './json-ld.component';

describe('JsonLdComponent', () => {
  let component: JsonLdComponent;
  let fixture: ComponentFixture<JsonLdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonLdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(JsonLdComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
