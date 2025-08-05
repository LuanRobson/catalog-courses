import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    children: [
      {
        path: '',
        loadComponent: () => import('./components/course-list/course-list.component').then(m => m.CourseListComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('./components/course-form/course-form.component').then(m => m.CourseFormComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./components/course-detail/course-detail.component').then(m => m.CourseDetailComponent)
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./components/course-form/course-form.component').then(m => m.CourseFormComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/courses'
  }
];
