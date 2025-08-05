import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet, RouterModule } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <header class="modern-header">
      <div class="header-background">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
        <div class="header-content">
          <div class="brand-section">
            <div class="logo-container">
              <mat-icon class="logo-icon">school</mat-icon>
              <div class="brand-text">
                <h1>Plataforma Meus Cursors</h1>
                <span class="tagline">Plataforma de Cursos</span>
              </div>
            </div>
          </div>

          <nav class="nav-section">
            <button
              mat-stroked-button
              routerLink="/courses"
              class="nav-button courses-btn"
            >
              <mat-icon>library_books</mat-icon>
              <span>Meus Cursos</span>
            </button>
            <button
              mat-raised-button
              routerLink="/courses/new"
              class="nav-button new-course-btn"
            >
              <mat-icon>add_circle</mat-icon>
              <span>Criar Curso</span>
            </button>
          </nav>
        </div>
      </div>
    </header>

    <main class="app-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .modern-header {
        position: sticky;
        top: 0;
        z-index: 1000;
        height: 80px;
      }

      .header-background {
        height: 100%;
        background: linear-gradient(
          135deg,
          #6366f1 0%,
          #8b5cf6 25%,
          #a855f7 50%,
          #ec4899 75%,
          #f59e0b 100%
        );
        position: relative;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
      }

      .floating-shapes {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .shape {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        animation: float 6s ease-in-out infinite;
      }

      .shape-1 {
        width: 60px;
        height: 60px;
        top: -30px;
        left: 10%;
        animation-delay: 0s;
      }

      .shape-2 {
        width: 40px;
        height: 40px;
        top: -20px;
        right: 20%;
        animation-delay: 2s;
      }

      .shape-3 {
        width: 80px;
        height: 80px;
        top: -40px;
        right: 5%;
        animation-delay: 4s;
      }

      @keyframes float {
        0%,
        100% {
          transform: translateY(0px) rotate(0deg);
        }
        50% {
          transform: translateY(20px) rotate(180deg);
        }
      }

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        padding: 0 24px;
        position: relative;
        z-index: 2;
      }

      .brand-section {
        display: flex;
        align-items: center;
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: 16px;
        color: white;
      }

      .logo-icon {
        font-size: 36px;
        width: 36px;
        height: 36px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
      }

      .brand-text h1 {
        margin: 0;
        font-size: 1.75rem;
        font-weight: 700;
        letter-spacing: -0.5px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .tagline {
        font-size: 0.85rem;
        opacity: 0.9;
        font-weight: 500;
        display: block;
        margin-top: -2px;
      }

      .nav-section {
        display: flex;
        gap: 16px;
        align-items: center;
      }

      .nav-button {
        height: 44px;
        border-radius: 22px;
        padding: 0 20px;
        font-weight: 600;
        text-transform: none;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .nav-button::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        transition: left 0.5s;
      }

      .nav-button:hover::before {
        left: 100%;
      }

      .courses-btn {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
      }

      .courses-btn:hover {
        background: rgba(255, 255, 255, 0.25);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
      }

      .new-course-btn {
        background: rgba(255, 255, 255, 0.95) !important;
        color: #6366f1 !important;
        border: none;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      .new-course-btn:hover {
        background: white !important;
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      .nav-button mat-icon {
        margin-right: 8px;
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .app-content {
        min-height: calc(100vh - 80px);
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        padding: 24px;
      }

      /* Mobile Responsive */
      @media (max-width: 768px) {
        .header-content {
          padding: 0 16px;
        }

        .logo-icon {
          font-size: 28px;
          width: 28px;
          height: 28px;
        }

        .brand-text h1 {
          font-size: 1.5rem;
        }

        .tagline {
          font-size: 0.75rem;
        }

        .nav-section {
          gap: 12px;
        }

        .nav-button {
          height: 40px;
          padding: 0 16px;
          font-size: 0.9rem;
        }

        .nav-button span {
          display: none;
        }

        .nav-button mat-icon {
          margin-right: 0;
        }

        .app-content {
          padding: 16px;
        }
      }

      @media (max-width: 480px) {
        .modern-header {
          height: 70px;
        }

        .logo-icon {
          font-size: 24px;
          width: 24px;
          height: 24px;
        }

        .brand-text h1 {
          font-size: 1.25rem;
        }

        .nav-button {
          height: 36px;
          padding: 0 12px;
          border-radius: 18px;
        }

        .nav-button mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }

        .shape {
          display: none;
        }

        .app-content {
          min-height: calc(100vh - 70px);
          padding: 12px;
        }
      }
    `,
  ],
})
export class LayoutComponent { }
