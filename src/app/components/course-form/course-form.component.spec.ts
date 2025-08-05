import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CourseFormComponent } from './course-form.component';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;
  let courseService: jasmine.SpyObj<CourseService>;
  let router: jasmine.SpyObj<Router>;

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
    const courseServiceSpy = jasmine.createSpyObj('CourseService', [
      'getCourseById',
      'createCourse',
      'updateCourse',
      'getCategories',
      'getCourses'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        CourseFormComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: CourseService, useValue: courseServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }),
            snapshot: {
              paramMap: {
                get: (key: string) => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    courseService = TestBed.inject(CourseService) as jasmine.SpyObj<CourseService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    beforeEach(() => {
      courseService.getCategories.and.returnValue(of(mockCategories));
      component.ngOnInit();
    });

    it('should be invalid when form is empty', () => {
      expect(component.courseForm.valid).toBe(false);
    });

    it('should be valid when all required fields are filled', () => {
      component.courseForm.patchValue({
        name: 'Test Course',
        category: 'Frontend',
        description: 'Test description',
        workload: 40
      });

      expect(component.courseForm.valid).toBe(true);
    });

    it('should require name field', () => {
      const nameControl = component.courseForm.get('name');
      expect(nameControl?.errors?.['required']).toBeTruthy();
    });

    it('should require category field', () => {
      const categoryControl = component.courseForm.get('category');
      expect(categoryControl?.errors?.['required']).toBeTruthy();
    });

    it('should require description field', () => {
      const descriptionControl = component.courseForm.get('description');
      expect(descriptionControl?.errors?.['required']).toBeTruthy();
    });

    it('should require workload field', () => {
      const workloadControl = component.courseForm.get('workload');
      expect(workloadControl?.errors?.['required']).toBeTruthy();
    });
  });

  describe('Utility Methods', () => {
    it('should get category icon', () => {
      expect(component.getCategoryIcon('Frontend')).toBe('web');
      expect(component.getCategoryIcon('Backend')).toBe('dns');
      expect(component.getCategoryIcon('Data Science')).toBe('analytics');
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
  });

  describe('Lifecycle', () => {
    it('should complete destroy subject on destroy', () => {
      spyOn(component['destroy$'], 'next');
      spyOn(component['destroy$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(component['destroy$'].next).toHaveBeenCalled();
      expect(component['destroy$'].complete).toHaveBeenCalled();
    });
  });
});