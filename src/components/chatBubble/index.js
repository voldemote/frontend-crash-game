import styles              from './styles.module.scss';

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
