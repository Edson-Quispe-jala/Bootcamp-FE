import { TestBed } from '@angular/core/testing';
import { LessonService } from './lesson.service';

describe('LessonService', () => {
  let service: LessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial lessons', () => {
    const lessons = service.getLessons();
    expect(lessons().length).toBeGreaterThan(0);
  });

  it('should get lesson by id', () => {
    const lesson = service.getLessonById('1');
    expect(lesson).toBeTruthy();
    expect(lesson?.title).toBe('Introduction to Angular');
  });

  it('should toggle completion', () => {
    const lessonId = '1';
    const initialStatus = service.getLessonById(lessonId)?.completed;
    service.toggleCompletion(lessonId);
    expect(service.getLessonById(lessonId)?.completed).toBe(!initialStatus);
  });
});
