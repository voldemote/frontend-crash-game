import React from 'react';

const TrovoVideo = props => {
  const {
    channel,
    video,
    embeddingDomains,
    targetId,
    autoPlay,
    muted,
    className,
    title,
  } = props;

  const urlObj = new URL(video);

  if (autoPlay) {
    urlObj.searchParams.set('autoplay', 1);
  }

  urlObj.searchParams.set('hidefollow', 1);
  urlObj.searchParams.set('hidesub', 1);

  return (
    <iframe
      title={title}
      className={className}
      allow={`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture`}
      allowFullScreen={true}
      frameBorder={0}
      height="100%"
      src={urlObj.toString()}
      width="100%"
    />
  );
};

export default TrovoVideo;
