import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LessonService } from '../../services/lesson.service';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lesson-list.html',
  styleUrl: './lesson-list.css'
})
export class LessonListComponent {
  private lessonService = inject(LessonService);
  lessons = this.lessonService.getLessons();
}
