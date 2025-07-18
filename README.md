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

## Running the Application

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration:
   ```
   REACT_APP_API_URL=http://localhost:3001
   REACT_APP_FACE_DETECTION_MODEL_PATH=/models
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Configure the following in `.env`:
   ```
   PORT=3001
   DATABASE_URL=postgresql://user:password@localhost:5432/training_db
   JWT_SECRET=your_jwt_secret
   ```

4. Run database migrations:
   ```bash
   npm run migrate
   ```

5. Start the backend server:
   ```bash
   # Development mode with hot reload
   npm run dev

   # Production mode
   npm run build
   npm start
   ```
   The API will be available at `http://localhost:3001`

### Database Setup

1. Install PostgreSQL:
   ```bash
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install postgresql postgresql-contrib

   # macOS with Homebrew
   brew install postgresql
   ```

2. Start PostgreSQL service:
   ```bash
   # Ubuntu/Debian
   sudo service postgresql start

   # macOS
   brew services start postgresql
   ```

3. Create database and user:
   ```bash
   sudo -u postgres psql

   # In PostgreSQL prompt
   CREATE DATABASE training_db;
   CREATE USER your_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE training_db TO your_user;
   ```

4. Initialize database schema:
   ```bash
   cd backend
   npm run migrate
   ```

### Running the Complete Stack

1. Start the database:
   ```bash
   # Ubuntu/Debian
   sudo service postgresql start

   # macOS
   brew services start postgresql
   ```

2. Start the backend (in a new terminal):
   ```bash
   cd backend
   npm run dev
   ```

3. Start the frontend (in a new terminal):
   ```bash
   cd frontend
   npm start
   ```

### Docker Support

You can also run the entire stack using Docker:

1. Build and start containers:
   ```bash
   docker-compose up --build
   ```

2. Stop containers:
   ```bash
   docker-compose down
   ```

Docker Compose will set up:
- Frontend container (port 3000)
- Backend container (port 3001)
- PostgreSQL container (port 5432)

### Development URLs

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001`
- Database: `postgresql://localhost:5432`

### Health Checks

Verify the stack is running:

```bash
# Backend health check
curl http://localhost:3001/health

# Database connection check
cd backend && npm run db:check

# Frontend build check
cd frontend && npm run build
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