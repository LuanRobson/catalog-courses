import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000';

  const mockCourse: Course = {
    id: 1,
    name: 'Angular para Iniciantes',
    category: 'Frontend',
    description: 'Aprenda os fundamentos do Angular',
    workload: 40,
    createdAt: new Date('2024-01-15T10:00:00.000Z'),
    updatedAt: new Date('2024-01-15T10:00:00.000Z')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCourses', () => {
    it('should return an Observable<Course[]>', () => {
      service.getCourses().subscribe(courses => {
        expect(courses).toBeTruthy();
      });

      const req = httpMock.expectOne(`${baseUrl}/courses`);
      expect(req.request.method).toBe('GET');
      req.flush([mockCourse]);
    });
  });
}); 