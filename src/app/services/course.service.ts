import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Course, CourseForm } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.http.get<Course[]>(this.apiUrl)
      .pipe(
        catchError(() => {
          return of(this.getMockCourses());
        })
      )
      .subscribe(courses => {
        this.coursesSubject.next(courses);
      });
  }

  getCourses(): Observable<Course[]> {
    return this.courses$;
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this.courses$.pipe(
      map(courses => courses.find(course => course.id === id))
    );
  }

  getCategories(): Observable<string[]> {
    return this.courses$.pipe(
      map(courses => [...new Set(courses.map(course => course.category))])
    );
  }

  createCourse(courseForm: CourseForm): Observable<Course> {
    const newCourse: Course = {
      id: Date.now(),
      ...courseForm,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return this.http.post<Course>(this.apiUrl, newCourse).pipe(
      tap(course => {
        const currentCourses = this.coursesSubject.value;
        this.coursesSubject.next([...currentCourses, course]);
      }),
      catchError(() => {
        // Fallback para mock
        const currentCourses = this.coursesSubject.value;
        this.coursesSubject.next([...currentCourses, newCourse]);
        return of(newCourse);
      })
    );
  }

  updateCourse(id: number, courseForm: CourseForm): Observable<Course> {
    const updatedCourse: Course = {
      id,
      ...courseForm,
      updatedAt: new Date()
    };

    return this.http.put<Course>(`${this.apiUrl}/${id}`, updatedCourse).pipe(
      tap(course => {
        const currentCourses = this.coursesSubject.value;
        const updatedCourses = currentCourses.map(c => c.id === id ? course : c);
        this.coursesSubject.next(updatedCourses);
      }),
      catchError(() => {
        // Fallback para mock
        const currentCourses = this.coursesSubject.value;
        const updatedCourses = currentCourses.map(c => c.id === id ? updatedCourse : c);
        this.coursesSubject.next(updatedCourses);
        return of(updatedCourse);
      })
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentCourses = this.coursesSubject.value;
        const filteredCourses = currentCourses.filter(course => course.id !== id);
        this.coursesSubject.next(filteredCourses);
      }),
      catchError(() => {
        const currentCourses = this.coursesSubject.value;
        const filteredCourses = currentCourses.filter(course => course.id !== id);
        this.coursesSubject.next(filteredCourses);
        return of(void 0);
      })
    );
  }

  private getMockCourses(): Course[] {
    return [
      {
        id: 1,
        name: 'Angular para Iniciantes',
        category: 'Frontend',
        description: 'Aprenda os fundamentos do Angular e crie aplicações web modernas.',
        workload: 40,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: 2,
        name: 'React Avançado',
        category: 'Frontend',
        description: 'Técnicas avançadas de React, hooks personalizados e otimização de performance.',
        workload: 60,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: 3,
        name: 'Node.js e Express',
        category: 'Backend',
        description: 'Desenvolvimento de APIs RESTful com Node.js e Express.',
        workload: 50,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01')
      },
      {
        id: 4,
        name: 'Python para Data Science',
        category: 'Data Science',
        description: 'Análise de dados e machine learning com Python.',
        workload: 80,
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-10')
      },
      {
        id: 5,
        name: 'DevOps com Docker',
        category: 'DevOps',
        description: 'Containerização e orquestração com Docker e Kubernetes.',
        workload: 45,
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15')
      }
    ];
  }
} 