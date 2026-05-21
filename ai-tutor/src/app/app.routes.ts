import { Routes } from '@angular/router';
import { LessonListComponent } from './lessons/lesson-list/lesson-list';
import { LessonDetailComponent } from './lessons/lesson-detail/lesson-detail';

export const routes: Routes = [
  { path: 'lessons', component: LessonListComponent },
  { path: 'lessons/:id', component: LessonDetailComponent },
  { path: '', redirectTo: 'lessons', pathMatch: 'full' }
];
