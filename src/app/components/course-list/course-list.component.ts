import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { Subject, takeUntil, combineLatest, Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDividerModule } from "@angular/material/divider";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { CourseService } from "../../services/course.service";
import { Course } from "../../models/course.model";

@Component({
  selector: "app-course-list",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatCheckboxModule,
    DatePipe,
  ],
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.scss"],
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses$;
  categories$;

  searchControl = new FormControl("");
  categoryFilter = new FormControl("");

  filteredCourses$: Observable<Course[]>;
  totalWorkload$: Observable<number>;
  viewMode: "grid" | "list" = "grid";

  private destroy$ = new Subject<void>();

  constructor(
    private courseService: CourseService,
    private router: Router,
  ) {
    this.courses$ = this.courseService.getCourses();
    this.categories$ = this.courseService.getCategories();

    this.filteredCourses$ = combineLatest([
      this.courses$,
      this.searchControl.valueChanges.pipe(startWith("")),
      this.categoryFilter.valueChanges.pipe(startWith("")),
    ]).pipe(
      map(([courses, searchTerm, selectedCategory]) => {
        let filtered = courses;

        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter(
            (course) =>
              course.name.toLowerCase().includes(term) ||
              course.description.toLowerCase().includes(term),
          );
        }

        if (selectedCategory) {
          filtered = filtered.filter(
            (course) => course.category === selectedCategory,
          );
        }

        return filtered;
      }),
    );

    this.totalWorkload$ = this.filteredCourses$.pipe(
      map(courses => courses.reduce((sum, course) => sum + course.workload, 0))
    );
  }

  ngOnInit(): void {
    localStorage.setItem("isAuthenticated", "true");
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  viewCourse(course: Course): void {
    this.router.navigate(["/courses", course.id]);
  }

  editCourse(course: Course): void {
    this.router.navigate(["/courses", course.id, "edit"]);
  }

  deleteCourse(course: Course): void {
    if (confirm(`Tem certeza que deseja excluir o curso "${course.name}"?`)) {
      this.courseService.deleteCourse(course.id).subscribe();
    }
  }

  addNewCourse(): void {
    this.router.navigate(["/courses/new"]);
  }

  clearFilters(): void {
    this.searchControl.setValue("");
    this.categoryFilter.setValue("");
  }

  applyFilters(): void {
  }

  changeViewMode(event: any): void {
    this.viewMode = event.value;
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }



  getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      Frontend: "web",
      Backend: "dns",
      "Data Science": "analytics",
      DevOps: "cloud",
      "Artificial Intelligence": "psychology",
      Mobile: "phone_android",
      Design: "palette",
      Security: "security",
    };
    return iconMap[category] || "book";
  }

  getDifficulty(workload: number): string {
    if (workload <= 30) return "Básico";
    if (workload <= 60) return "Intermediário";
    return "Avançado";
  }

  duplicateCourse(course: Course): void {
    const duplicatedCourse = {
      ...course,
      id: 0,
      name: `${course.name} (Cópia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.courseService.createCourse(duplicatedCourse).subscribe(() => {
    });
  }

  shareCourse(course: Course): void {
    const url = `${window.location.origin}/courses/${course.id}`;

    if (navigator.share) {
      navigator.share({
        title: course.name,
        text: course.description,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
    }
  }

  getDifficultyDescription(workload: number): string {
    if (workload <= 30) return "Ideal para iniciantes no assunto";
    if (workload <= 60) return "Requer conhecimento básico prévio";
    return "Destinado a estudantes avançados";
  }
}
