const VideoSection = () => {
  // Vimeo video ID extracted from the URL
  const videoId = "1141618638";
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1&quality=1080p`}
        title="Video"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        style={{ 
          width: '100vw',
          height: '56.25vw', // 16:9 aspect ratio
          minHeight: '100vh',
          minWidth: '177.77vh', // 16:9 aspect ratio
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
