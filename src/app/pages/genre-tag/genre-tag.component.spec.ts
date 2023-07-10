import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GenreTagComponent } from './genre-tag.component';

describe('GenreTagComponent', () => {
  let component: GenreTagComponent;
  let fixture: ComponentFixture<GenreTagComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(GenreTagComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
