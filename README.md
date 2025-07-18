# Training Compliance Platform

A modern web-based training platform with advanced compliance features to ensure active user engagement and participation during video-based training sessions.

## Features

### Video Player Security
- **Anti Fast-Forward Protection**: Users cannot skip or fast-forward through content
- **Rewind Capability**: Users can review previous content as needed
- **Download Prevention**: Video content cannot be downloaded or saved locally
- **Right-Click Protection**: Disabled context menu to prevent "Save Video As"

### Engagement Monitoring
- **Face Detection**: Real-time monitoring of user presence using webcam
  - No facial recognition or image storage
  - Only detects presence/absence of a face
  - Auto-pauses after 3 seconds of no face detection
  - Automatically resumes when face is detected
- **Tab Focus Detection**: Automatically pauses when user switches tabs or minimizes window
- **Random Engagement Checks**: Periodic prompts requiring user interaction
  - Appears at random intervals (30-90 seconds)
  - Requires typing "continue" to proceed
  - Ensures active participation

### User Experience
- **Progress Tracking**: Tracks maximum watched position
- **Automatic Resume**: Returns to last watched position on reload
- **Visual Feedback**: Clear warning messages for face detection and engagement checks
- **Feedback System**: Built-in mechanism for user feedback

## Technical Requirements

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Modern web browser with webcam support
- Secure context (HTTPS or localhost) for webcam access

### Dependencies
- React 17+
- face-api.js for face detection
- Material-UI components
- TypeScript support

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd training-compliance-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up face detection models:
   - Create a `public/models` directory
   - Download the face-api.js tiny face detector model
   - Place the model files in the `public/models` directory

4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CustomVideoPlayer.tsx    # Main video player component
│   │   ├── CustomVideoPlayer.test.tsx # Component tests
│   │   └── Quiz.tsx                 # Quiz component
│   ├── public/
│   │   ├── models/                  # Face detection models
│   │   └── Cash4You.mp4            # Video content
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
```

## Component Details

### CustomVideoPlayer

The main video player component with the following features:

#### State Management
```typescript
const [faceDetected, setFaceDetected] = useState(true);
const [showFaceWarning, setShowFaceWarning] = useState(false);
const [isTabVisible, setIsTabVisible] = useState(true);
const [showEngagement, setShowEngagement] = useState(false);
```

#### Face Detection Configuration
- Input Size: 416x416
- Score Threshold: 0.2
- Frame Rate: 30 fps
- Grace Period: 3 seconds before pause

#### Event Handlers
- `handleTimeUpdate`: Prevents fast-forwarding
- `handleVisibilityChange`: Manages tab focus
- `handleContextMenu`: Prevents right-click
- `handleContinue`: Manages engagement checks

## Security Features

### Video Protection
- Disabled download button
- Prevented right-click save
- Controlled time updates to prevent programmatic skipping
- Disabled keyboard shortcuts for seeking

### Face Detection Privacy
- No images stored
- No facial recognition performed
- Only presence/absence detection
- Webcam feed not displayed or recorded

## Browser Support

### Minimum Requirements
- Chrome 83+
- Firefox 76+
- Safari 13+
- Edge 83+

### Required Browser Permissions
- Webcam access
- Local storage (for progress tracking)

## Development Guidelines

### Adding New Features
1. Maintain existing security measures
2. Follow TypeScript type safety
3. Add appropriate tests
4. Update documentation

### Testing
```bash
npm test
```

Includes tests for:
- Video player rendering
- Face detection initialization
- Engagement check functionality
- Tab visibility handling

## Troubleshooting

### Common Issues

1. Face Detection Not Working
   - Check webcam permissions
   - Ensure proper lighting
   - Verify model files are present

2. Video Controls Issues
   - Clear browser cache
   - Check for console errors
   - Verify video format support

3. Engagement Checks
   - Case-sensitive "continue" text
   - Check for active tab focus
   - Verify no keyboard shortcuts

## API Integration

### Progress Tracking
```typescript
await fetch('/api/progress', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    eventType: 'video_completed',
    timestamp: new Date().toISOString(),
    details: { watchedDuration: maxWatchedTime }
  })
});
```

### Feedback Submission
```typescript
await fetch('/api/progress', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    eventType: 'user_feedback',
    timestamp: new Date().toISOString(),
    details: { feedback: feedback.trim() }
  })
});
```

## Performance Considerations

- Face detection runs at 500ms intervals
- Webcam resolution optimized for detection (640x480)
- Event listeners properly cleaned up
- Resources released on component unmount

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update tests
5. Submit a pull request

## License

[Your License Here]

## Support

For support, please contact [Your Contact Information] 