import classNames          from 'classnames';
import darkModeLogo        from '../../data/images/logo-darkmode.svg';
import Link                from '../../components/Link';
import Routes              from '../../constants/Routes';
import styles              from './styles.module.scss';
import { useState }        from 'react';

const ChatBubble = ({ name, image, message, date }) => {

    return (
        <div className={styles.chatBubble}>
            <img src={image} alt={name} />
            <div>
                <span>
                    <small>{name}</small>
                    <small>{date}</small>
                </span>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ChatBubble;
