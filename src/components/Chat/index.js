import styles              from './styles.module.scss';
import ExampleProfilePicture from '../../data/images/doge.jpg';
import ChatBubble from 'components/chatBubble';
import Icon      from '../Icon';
import IconTheme from '../Icon/IconTheme';
import IconType          from '../../components/Icon/IconType';

const Chat = () => {

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chat}>
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem"} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
                <ChatBubble name={"test"} image={ExampleProfilePicture} message={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum "} date={"just now"} />
            </div>
            <form className={styles.messageInput}>
                <input id="message" type="text" name="message" placeholder="Comment..." />
                <button type="submit" onClick={() => console.log("sent")}>
                    <Icon
                        iconType={IconType.chat}
                        iconTheme={IconTheme.primary}
                    />
                </button>
            </form>
        </div>
    );
};

export default Chat;
