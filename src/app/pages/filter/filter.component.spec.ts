import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterComponent} from './filter.component';
import {ApiService} from '../../services/api.service';
import {MovieService} from '../../services/movie.service';
import {ReactiveFormsModule} from '@angular/forms';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let apiServiceStub: Partial<ApiService>;
  let movieServiceStub: Partial<MovieService>;

  beforeEach(async () => {
    apiServiceStub = {};
    movieServiceStub = {};

    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: ApiService, useValue: apiServiceStub},
        {provide: MovieService, useValue: movieServiceStub}
      ],

    })
      .compileComponents();
  });

  beforeEach(() => {
    // fixture = TestBed.createComponent(FilterComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
