import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../../services/chat.model';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css'
})
export class AiChatComponent {
  messages = signal<Message[]>([
    { text: "Hi! I'm your AI tutor. How can I help you with this lesson?", sender: 'ai', timestamp: new Date() }
  ]);
  userInput = signal('');

  sendMessage() {
    const text = this.userInput().trim();
    if (!text) return;

    // Add user message
    this.messages.update(msgs => [...msgs, {
      text,
      sender: 'user',
      timestamp: new Date()
    }]);
    this.userInput.set('');

    // Mock AI response
    setTimeout(() => {
      this.messages.update(msgs => [...msgs, {
        text: `That's a great question about "${text}"! In Angular, this is handled by... (this is a mock response)`,
        sender: 'ai',
        timestamp: new Date()
      }]);
    }, 1000);
  }
}
