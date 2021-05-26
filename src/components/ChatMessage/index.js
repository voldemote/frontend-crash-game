import styles from './styles.module.scss';

const ChatMessage = ({ name, image, message, date }) => {
    return (
        <div className={styles.chatMessage}>
            <img
                src={image}
                alt={name}
            />
            <div>
                <span>
                    <small>
                        {name}
                    </small>
                    <small>
                        {date}
                    </small>
                </span>
                <p>
                    {message}
                </p>
            </div>
        </div>
    );
};

export default ChatMessage;
