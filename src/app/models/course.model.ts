export interface Course {
  id: number;
  name: string;
  category: string;
  description: string;
  workload: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CourseForm {
  name: string;
  category: string;
  description: string;
  workload: number;
} 