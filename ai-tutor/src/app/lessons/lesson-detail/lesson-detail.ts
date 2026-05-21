import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../services/lesson.model';
import { AiChatComponent } from '../ai-chat/ai-chat';

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, AiChatComponent],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.css'
})
export class LessonDetailComponent {
  id = input.required<string>();
  private lessonService = inject(LessonService);
  
  lesson: Lesson | undefined;

  ngOnInit() {
    this.lesson = this.lessonService.getLessonById(this.id());
  }

  toggleComplete() {
    if (this.lesson) {
      this.lessonService.toggleCompletion(this.lesson.id);
      this.lesson = this.lessonService.getLessonById(this.id());
    }
  }
}
