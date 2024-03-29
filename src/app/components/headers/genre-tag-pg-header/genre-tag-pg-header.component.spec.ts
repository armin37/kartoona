import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GenreTagPgHeaderComponent } from './genre-tag-pg-header.component';

describe('GenreTagPgHeaderComponent', () => {
  let component: GenreTagPgHeaderComponent;
  let fixture: ComponentFixture<GenreTagPgHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreTagPgHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreTagPgHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
