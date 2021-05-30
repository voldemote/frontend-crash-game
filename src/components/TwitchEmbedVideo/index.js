import React                 from 'react';
import classNames            from 'classnames';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import styles                from './styles.module.scss';
import _                     from 'lodash';

const TwitchEmbedVideo = ({ className, video, channel, autoPlay = true, muted = false, ...props }) => {
    const getStreamChannel = () => {
        let streamChannel = channel;

        if (!streamChannel) {
            streamChannel = video.split('/').pop();
        }

        return streamChannel;
    };

    return (
        <ReactTwitchEmbedVideo
            targetClass={classNames(
                styles.twitchStream,
                className,
            )}
            width={'100%'}
            height={'100%'}
            video={video}
            channel={getStreamChannel()}
            theme={'dark'}
            autoplay={autoPlay}
            muted={muted}
            allowfullscreen={true}
            layout={'video'}
            controls={false}
            {...props}
        />
    );
};

export default TwitchEmbedVideo;