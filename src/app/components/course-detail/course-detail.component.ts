import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule, DatePipe, Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil, switchMap, map } from "rxjs";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

import { CourseService } from "../../services/course.service";
import { Course } from "../../models/course.model";

@Component({
  selector: "app-course-detail",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    MatSnackBarModule,
    DatePipe,
  ],
  templateUrl: "./course-detail.component.html",
  styleUrls: ["./course-detail.component.scss"],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  course$;
  relatedCourses$;

  private destroy$ = new Subject<void>();

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,
  ) {
    this.course$ = this.route.params.pipe(
      switchMap((params) => this.courseService.getCourseById(+params["id"])),
    );

    this.relatedCourses$ = this.course$.pipe(
      switchMap((course) => {
        if (course) {
          return this.courseService
            .getCourses()
            .pipe(
              map((courses) =>
                courses
                  .filter(
                    (c) => c.category === course.category && c.id !== course.id,
                  )
                  .slice(0, 3),
              ),
            );
        }
        return [];
      }),
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  editCourse(course: Course): void {
    this.router.navigate(["/courses", course.id, "edit"]);
  }

  deleteCourse(course: Course): void {
    if (confirm(`Tem certeza que deseja excluir o curso "${course.name}"?`)) {
      this.courseService.deleteCourse(course.id).subscribe(() => {
        this.snackBar.open("Curso excluído com sucesso!", "Fechar", {
          duration: 3000,
          panelClass: ["success-snackbar"],
        });
        this.router.navigate(["/courses"]);
      });
    }
  }

  duplicateCourse(course: Course): void {
    const duplicatedCourse = {
      ...course,
      id: 0,
      name: `${course.name} (Cópia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.courseService.createCourse(duplicatedCourse).subscribe((newCourse) => {
      this.snackBar
        .open("Curso duplicado com sucesso!", "Ver Curso", {
          duration: 5000,
          panelClass: ["success-snackbar"],
        })
        .onAction()
        .subscribe(() => {
          this.router.navigate(["/courses", newCourse.id]);
        });
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
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url).then(() => {
        this.snackBar.open(
          "Link copiado para a área de transferência!",
          "Fechar",
          {
            duration: 3000,
            panelClass: ["success-snackbar"],
          },
        );
      });
    }
  }

  viewCourse(course: Course): void {
    this.router.navigate(["/courses", course.id]);
  }

  goBack(): void {
    this.location.back();
  }

  refreshPage(): void {
    window.location.reload();
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

  getDifficultyDescription(workload: number): string {
    if (workload <= 30) return "Ideal para iniciantes no assunto";
    if (workload <= 60) return "Requer conhecimento básico prévio";
    return "Destinado a estudantes avançados";
  }

  getEstimatedWeeks(workload: number): number {
    return Math.ceil(workload / 5);
  }
}
