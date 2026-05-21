import { Injectable, signal } from '@angular/core';
import { Lesson } from './lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessons = signal<Lesson[]>([
    {
      id: '1',
      title: 'Introduction to Angular',
      description: 'Learn the basics of Angular components and architecture.',
      content: 'Angular is a platform for building mobile and desktop web applications...',
      completed: false
    },
    {
      id: '2',
      title: 'Signals and State Management',
      description: 'Understand how to use Angular Signals for reactive state.',
      content: 'Signals are a new way to manage state in Angular that provides fine-grained reactivity...',
      completed: false
    },
    {
      id: '3',
      title: 'Components and Templates',
      description: 'Master the art of creating reusable UI components.',
      content: 'Components are the building blocks of Angular applications...',
      completed: false
    }
  ]);

  getLessons() {
    return this.lessons.asReadonly();
  }

  getLessonById(id: string) {
    return this.lessons().find(l => l.id === id);
  }

  toggleCompletion(id: string) {
    this.lessons.update(lessons => 
      lessons.map(l => l.id === id ? { ...l, completed: !l.completed } : l)
    );
  }
}
