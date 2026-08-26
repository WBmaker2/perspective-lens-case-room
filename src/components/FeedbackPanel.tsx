import { forwardRef } from 'react';
import type { EvidenceFeedback } from '../model/feedback';

export interface FeedbackPanelProps {
  feedback: EvidenceFeedback;
  live?: boolean;
}

export const FeedbackPanel = forwardRef<HTMLDivElement, FeedbackPanelProps>(function FeedbackPanel({ feedback, live = true }, ref) {
  const className = `feedback-panel feedback-panel--${feedback.status}`;
  return live ? (
    <div ref={ref} className={className} role="status" aria-live="polite" tabIndex={-1} data-feedback-sentence={feedback.sentenceNumber}>
      {feedback.message}
    </div>
  ) : (
    <div ref={ref} className={className} role="note" data-feedback-sentence={feedback.sentenceNumber}>
      {feedback.message}
    </div>
  );
});
