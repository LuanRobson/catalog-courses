import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil, switchMap, of } from "rxjs";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTooltipModule } from "@angular/material/tooltip";

import { CourseService } from "../../services/course.service";
import { Course, CourseForm } from "../../models/course.model";

@Component({
  selector: "app-course-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit, OnDestroy {
  @ViewChild("form") formElement: any;

  courseForm: FormGroup;
  isEditMode = false;
  courseId?: number;
  isLoading = false;
  currentStep = 1;
  step1Valid = false;
  step2Valid = false;

  categories = [
    "Frontend",
    "Backend",
    "Full Stack",
    "Mobile",
    "Data Science",
    "DevOps",
    "Cloud Computing",
    "Cybersecurity",
    "Artificial Intelligence",
    "Blockchain",
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,
  ) {
    this.courseForm = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      category: ["", Validators.required],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      workload: [
        "",
        [Validators.required, Validators.min(1), Validators.max(1000)],
      ],
      hasPrerequisites: [false],
      isCertified: [true],
      isActive: [true],
    });
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          const id = params["id"];
          if (id && id !== "new") {
            this.isEditMode = true;
            this.courseId = +id;
            return this.courseService.getCourseById(+id);
          } else {
            this.isEditMode = false;
            return of(undefined);
          }
        }),
      )
      .subscribe((course) => {
        if (course) {
          this.courseForm.patchValue({
            name: course.name,
            category: course.category,
            description: course.description,
            workload: course.workload,
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.isLoading = true;
      const formData: CourseForm = this.courseForm.value;

      const operation = this.isEditMode
        ? this.courseService.updateCourse(this.courseId!, formData)
        : this.courseService.createCourse(formData);

      operation.pipe(takeUntil(this.destroy$)).subscribe({
        next: (course) => {
          this.isLoading = false;
          const message = this.isEditMode
            ? "Curso atualizado com sucesso!"
            : "Curso criado com sucesso!";

          this.snackBar.open(message, "Fechar", {
            duration: 3000,
            horizontalPosition: "center",
            verticalPosition: "top",
          });

          this.router.navigate(["/courses", course.id]);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open(
            "Erro ao salvar curso. Tente novamente.",
            "Fechar",
            {
              duration: 5000,
              horizontalPosition: "center",
              verticalPosition: "top",
            },
          );
          console.error("Erro ao salvar curso:", error);
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    if (this.courseForm.dirty) {
      if (
        confirm(
          "Tem certeza que deseja cancelar? Todas as alterações serão perdidas.",
        )
      ) {
        this.goBack();
      }
    } else {
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }

  // Step navigation methods
  nextStep(): void {
    if (this.canProceedToNextStep()) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  canProceedToNextStep(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.step1Valid;
      case 2:
        return this.step2Valid;
      default:
        return false;
    }
  }

  validateStep1(): void {
    const nameValid = this.courseForm.get("name")?.valid || false;
    const categoryValid = this.courseForm.get("category")?.valid || false;
    const workloadValid = this.courseForm.get("workload")?.valid || false;
    this.step1Valid = nameValid && categoryValid && workloadValid;
  }

  validateStep2(): void {
    const descriptionValid = this.courseForm.get("description")?.valid || false;
    this.step2Valid = descriptionValid;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.courseForm.controls).forEach((key) => {
      const control = this.courseForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.courseForm.get(fieldName);

    if (field?.hasError("required")) {
      return "Este campo é obrigatório";
    }

    if (field?.hasError("minlength")) {
      const requiredLength = field.errors?.["minlength"].requiredLength;
      return `Mínimo de ${requiredLength} caracteres`;
    }

    if (field?.hasError("maxlength")) {
      const requiredLength = field.errors?.["maxlength"].requiredLength;
      return `Máximo de ${requiredLength} caracteres`;
    }

    if (field?.hasError("min")) {
      return "Valor mínimo é 1";
    }

    if (field?.hasError("max")) {
      return "Valor máximo é 1000";
    }

    return "";
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.courseForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  // Helper methods
  getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      Frontend: "web",
      Backend: "dns",
      "Full Stack": "fullscreen",
      Mobile: "phone_android",
      "Data Science": "analytics",
      DevOps: "cloud",
      "Cloud Computing": "cloud_queue",
      Cybersecurity: "security",
      "Artificial Intelligence": "psychology",
      Blockchain: "link",
    };
    return iconMap[category] || "book";
  }

  getDifficulty(workload: number): string {
    if (!workload) return "";
    if (workload <= 30) return "Básico";
    if (workload <= 60) return "Intermediário";
    return "Avançado";
  }

  getDifficultyDescription(workload: number): string {
    if (!workload) return "";
    if (workload <= 30) return "Ideal para iniciantes no assunto";
    if (workload <= 60) return "Requer conhecimento básico prévio";
    return "Destinado a estudantes avançados";
  }

  getDescriptionLength(): number {
    return this.courseForm.get("description")?.value?.length || 0;
  }

  hasAdditionalFeatures(): boolean {
    const form = this.courseForm.value;
    return form.hasPrerequisites || form.isCertified || form.isActive;
  }
}
