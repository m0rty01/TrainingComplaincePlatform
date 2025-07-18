import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const CustomVideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);
  const lastTimeRef = useRef(0);
  const [showEngagement, setShowEngagement] = useState(false);
  const [userInput, setUserInput] = useState('');
  const nextCheckRef = useRef(Math.random() * 30 + 30);
  const [faceDetected, setFaceDetected] = useState(true);
  const [showFaceWarning, setShowFaceWarning] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const consecutiveNoFaceRef = useRef(0);
  const CONSECUTIVE_NO_FACE_THRESHOLD = 6;
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Load face detection models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        console.log('Face detection model loaded');
        setIsModelLoaded(true);
        startWebcam();
      } catch (error) {
        console.error('Error loading face detection models:', error);
        setFaceDetected(true);
      }
    };
    loadModels();
  }, []);

  // Handle tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      setIsTabVisible(isVisible);
      
      if (!isVisible && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640,
          height: 480,
          facingMode: 'user',
          frameRate: { ideal: 30 }
        } 
      });
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
        webcamRef.current.onloadedmetadata = () => {
          console.log('Webcam ready');
          setIsWebcamReady(true);
          if (webcamRef.current) {
            webcamRef.current.play();
          }
        };
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
      setFaceDetected(true);
    }
  };

  // Face detection loop
  useEffect(() => {
    if (!isModelLoaded || !isWebcamReady) return;

    const detectFace = async () => {
      if (!webcamRef.current || webcamRef.current.readyState !== webcamRef.current.HAVE_ENOUGH_DATA) {
        return;
      }

      try {
        const detection = await faceapi.detectSingleFace(
          webcamRef.current,
          new faceapi.TinyFaceDetectorOptions({ 
            inputSize: 416,
            scoreThreshold: 0.2
          })
        );

        const faceIsPresent = !!detection;

        if (!faceIsPresent) {
          consecutiveNoFaceRef.current++;
          if (consecutiveNoFaceRef.current >= CONSECUTIVE_NO_FACE_THRESHOLD) {
            setFaceDetected(false);
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
              setShowFaceWarning(true);
            }
          }
        } else {
          consecutiveNoFaceRef.current = 0;
          setFaceDetected(true);
          setShowFaceWarning(false);
          // Only auto-resume if tab is visible
          if (isTabVisible && videoRef.current && videoRef.current.paused && !showEngagement) {
            videoRef.current.play();
          }
        }
      } catch (error) {
        console.error('Face detection error:', error);
        setFaceDetected(true);
        setShowFaceWarning(false);
      }
    };

    const interval = setInterval(detectFace, 500);
    return () => {
      clearInterval(interval);
      if (webcamRef.current && webcamRef.current.srcObject) {
        const stream = webcamRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isModelLoaded, isWebcamReady, showEngagement, isTabVisible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      if (currentTime < lastTimeRef.current || Math.abs(currentTime - lastTimeRef.current) <= 1) {
        lastTimeRef.current = currentTime;
      } else {
        video.currentTime = lastTimeRef.current;
      }

      if (currentTime >= nextCheckRef.current && !showEngagement) {
        video.pause();
        setShowEngagement(true);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [showEngagement]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleContinue = () => {
    if (userInput.toLowerCase() === 'continue') {
      setShowEngagement(false);
      setUserInput('');
      nextCheckRef.current = lastTimeRef.current + Math.random() * 30 + 30;
      // Only play if tab is visible
      if (videoRef.current && isTabVisible) {
        videoRef.current.play();
      }
    }
  };

  return (
    <div>
      <video
        ref={webcamRef}
        style={{ display: 'none' }}
        autoPlay
        playsInline
        muted
      />
      
      <video
        ref={videoRef}
        src="/Cash4You.mp4"
        controls
        controlsList="nodownload"
        onContextMenu={handleContextMenu}
        width="100%"
      />

      {showFaceWarning && isTabVisible && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Video Paused: No Face Detected
          </div>
          <div>
            Please return to view and ensure your face is visible to continue watching.
            The video will automatically resume when you return.
          </div>
        </div>
      )}

      {showEngagement && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          <p>Please type "continue" to proceed:</p>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            style={{
              padding: '8px',
              marginRight: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <button
            onClick={handleContinue}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomVideoPlayer; 