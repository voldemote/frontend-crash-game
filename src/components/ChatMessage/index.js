import _ from 'lodash';
import styles from './styles.module.scss';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
import classNames from 'classnames';
import { useRef, useEffect, useState } from 'react';

const ChatMessage = ({
  user,
  message,
  dateString,
  className,
  observer,
  parentRef,
  lastMessage,
}) => {
  const profilePicture = getProfilePictureUrl(_.get(user, 'profilePicture'));
  const userName = _.get(user, 'username', 'Unknown');
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const { current } = domRef;
    const intObserver = new IntersectionObserver(_ => {
      setVisible(observer(parentRef, domRef, true));
    });

    intObserver.observe(current);

    return () => {
      if (current) {
        intObserver.unobserve(current);
        intObserver.disconnect(current);
      }
    };
  }, []);

  return (
    <div
      className={classNames(
        styles.chatMessage,
        className,
        lastMessage ? styles.newMessage : null,
        isVisible ? styles.isVisible : null
      )}
      ref={domRef}
    >
      <img src={profilePicture} alt={userName} />
      <div>
        <span>
          <small>{userName}</small>
          <small>{dateString}</small>
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
