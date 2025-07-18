import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomVideoPlayer from './CustomVideoPlayer';

describe('CustomVideoPlayer', () => {
  test('renders video player', () => {
    render(<CustomVideoPlayer />);
    const videoElement = screen.getByRole('video');
    expect(videoElement).toBeInTheDocument();
  });

  test('pauses video on tab switch', () => {
    render(<CustomVideoPlayer />);
    const videoElement = screen.getByRole('video') as HTMLVideoElement;
    fireEvent.play(videoElement);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(videoElement.paused).toBe(true);
  });

  // Add more tests for engagement checks, face detection, etc.
}); 