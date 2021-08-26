import Chat from 'components/Chat';
import styles from './RosiGameChat.module.scss';

// const messages = [
//     { id: 1, type: 'chatMessage', user: { name: 'ivan1989', profilePicture: null }, userId: 1, date: '', message: 'ivan crashed at 3.40x' },
//     { id: 2, type: 'chatMessage', user: { name: 'Dexter', profilePicture: null }, userId: 2, date: '', message: 'Dexter crashed at 7.90x' },
//     { id: 3, type: 'chatMessage', user: { name: 'Nekorandomime', profilePicture: null }, userId: 3, date: '', message: 'Nekorandomime crashed at 7.90x' }
// ];

const RosiGameChat = () => {
  return (
    <div className={styles.container}>
      <Chat className={styles.chat} />
    </div>
  );
};

export default RosiGameChat;
