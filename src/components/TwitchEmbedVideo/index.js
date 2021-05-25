import React                 from 'react';
import classNames            from 'classnames';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import styles                from './styles.module.scss';

const TwitchEmbedVideo = ({ className, video, channel, muted, allowFullscreen, autoPlay  }) => {
    return (
        <ReactTwitchEmbedVideo
            targetClass={classNames(
                styles.twitchStream,
                className,
            )}
            width={'100%'}
            height={'100%'}
            video={video}
            channel={channel}
            theme={'dark'}
            autoplay={autoPlay}
            muted={muted}
            allowfullscreen={allowFullscreen}
            layout={'video'}
            controls={false}
        />
    );
};

export default TwitchEmbedVideo;