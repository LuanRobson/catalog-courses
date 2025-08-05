import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CourseDetailComponent } from './course-detail.component';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

describe('CourseDetailComponent', () => {
  let component: CourseDetailComponent;
  let fixture: ComponentFixture<CourseDetailComponent>;
  let courseService: jasmine.SpyObj<CourseService>;
  let router: jasmine.SpyObj<Router>;

  const mockCourse: Course = {
    id: 1,
    name: 'Angular para Iniciantes',
    category: 'Frontend',
    description: 'Aprenda os fundamentos do Angular e crie aplicações web modernas. Este curso aborda desde os conceitos básicos até a criação de componentes reutilizáveis e integração com APIs.',
    workload: 40,
    createdAt: new Date('2024-01-15T10:00:00.000Z'),
    updatedAt: new Date('2024-01-15T10:00:00.000Z')
  };

  beforeEach(async () => {
    const courseServiceSpy = jasmine.createSpyObj('CourseService', ['getCourseById', 'deleteCourse', 'createCourse']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        CourseDetailComponent,
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
    fixture = TestBed.createComponent(CourseDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should create course observable on init', () => {
      expect(component.course$).toBeTruthy();
    });

    it('should create related courses observable on init', () => {
      expect(component.relatedCourses$).toBeTruthy();
    });
  });

  describe('Navigation', () => {
    it('should navigate to edit course', () => {
      component.editCourse(mockCourse);
      
      expect(router.navigate).toHaveBeenCalledWith(['/courses', mockCourse.id, 'edit']);
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