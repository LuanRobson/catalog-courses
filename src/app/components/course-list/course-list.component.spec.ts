import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CourseListComponent } from './course-list.component';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let courseService: jasmine.SpyObj<CourseService>;

  const mockCourse: Course = {
    id: 1,
    name: 'Angular para Iniciantes',
    category: 'Frontend',
    description: 'Aprenda os fundamentos do Angular',
    workload: 40,
    createdAt: new Date('2024-01-15T10:00:00.000Z'),
    updatedAt: new Date('2024-01-15T10:00:00.000Z')
  };

  const mockCategories = ['Frontend', 'Backend', 'Data Science'];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CourseService', [
      'getCourses',
      'getCategories',
      'deleteCourse',
      'createCourse'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CourseListComponent,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: CourseService, useValue: spy }
      ]
    }).compileComponents();

    courseService = TestBed.inject(CourseService) as jasmine.SpyObj<CourseService>;
    courseService.getCourses.and.returnValue(of([mockCourse]));
    courseService.getCategories.and.returnValue(of(mockCategories));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.viewMode).toBe('grid');
    expect(component.searchControl.value).toBe('');
    expect(component.categoryFilter.value).toBe('');
  });

  it('should load courses and categories on init', () => {
    expect(courseService.getCourses).toHaveBeenCalled();
    expect(courseService.getCategories).toHaveBeenCalled();
  });

  describe('Utility Methods', () => {
    it('should get category icon', () => {
      expect(component.getCategoryIcon('Frontend')).toBe('web');
      expect(component.getCategoryIcon('Backend')).toBe('dns');
      expect(component.getCategoryIcon('Unknown')).toBe('book');
    });

    it('should get difficulty level', () => {
      expect(component.getDifficulty(20)).toBe('Básico');
      expect(component.getDifficulty(50)).toBe('Intermediário');
      expect(component.getDifficulty(80)).toBe('Avançado');
    });

    it('should get difficulty description', () => {
      expect(component.getDifficultyDescription(20)).toBe('Ideal para iniciantes no assunto');
      expect(component.getDifficultyDescription(50)).toBe('Requer conhecimento básico prévio');
      expect(component.getDifficultyDescription(80)).toBe('Destinado a estudantes avançados');
    });

    it('should track by course id', () => {
      expect(component.trackByCourseId(0, mockCourse)).toBe(mockCourse.id);
    });
  });

  describe('Lifecycle', () => {
    it('should set authentication on init', () => {
      spyOn(localStorage, 'setItem');
      
      component.ngOnInit();
      
      expect(localStorage.setItem).toHaveBeenCalledWith('isAuthenticated', 'true');
    });

    it('should complete destroy subject on destroy', () => {
      spyOn(component['destroy$'], 'next');
      spyOn(component['destroy$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(component['destroy$'].next).toHaveBeenCalled();
      expect(component['destroy$'].complete).toHaveBeenCalled();
    });
  });
}); 