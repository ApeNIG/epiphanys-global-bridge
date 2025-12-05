const VideoSection = () => {
  // Google Drive file ID extracted from the URL
  const fileId = "1-8xw57SF3Zm3Hu3Juj3EKohxOR_hHsAq";
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://drive.google.com/file/d/${fileId}/preview`}
        title="Video"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        style={{ 
          width: '100vw',
          height: '56.25vw',
          minHeight: '100vh',
          minWidth: '177.77vh',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
};

export default VideoSection;
