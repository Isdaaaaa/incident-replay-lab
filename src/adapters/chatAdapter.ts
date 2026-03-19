import { Event, MockChatNote } from '../models/event'

export function normalizeChatNotes(notes: MockChatNote[]): Event[] {
  return notes.map((note) => ({
    id: note.id,
    timestamp: note.timestamp,
    service: note.service,
    kind: 'note',
    severity: 'info',
    message: `${note.author}: ${note.message}`,
    source: 'mock-chat',
    metadata: {
      author: note.author,
    },
  }))
}
