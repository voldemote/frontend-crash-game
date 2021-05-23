import styles              from './styles.module.scss';
import ExampleProfilePicture from '../../data/images/doge.jpg';
import ChatBubble from 'components/chatBubble';

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
                <div className={styles.overlay}></div>
            </div>
            <form className={styles.messageInput}>
                <input id="message" type="text" name="message" placeholder="Comment..." />
                <button type="submit" onClick={() => console.log("sent")}>Send</button>
            </form>
        </div>
    );
};

export default Chat;
