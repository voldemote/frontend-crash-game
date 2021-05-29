import React                 from 'react';
import classNames            from 'classnames';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import styles                from './styles.module.scss';

const TwitchEmbedVideo = ({ className, video, channel, autoPlay = true }) => {
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
            muted={false}
            allowfullscreen={true}
            layout={'video'}
            controls={false}
        />
    );
};

export default TwitchEmbedVideo;