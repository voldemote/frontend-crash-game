import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import { useState } from 'react';
import Textarea from '../Textarea';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import InputBox from 'components/InputBox';
import InputBoxTheme from 'components/InputBox/InputBoxTheme';

const ReportEventPopup = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleMessage = event => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    //TODO: Handle send
  };

  return (
    <div className={styles.reportEvent}>
      <img src={LogoSplash} className={styles.logo} />
      <div className={styles.title}>Got a problem?</div>
      <div className={styles.subtitle}>Let us know how can we help you</div>

      <div className={styles.content}>
        <InputBox
          className={styles.emailInput}
          type={'text'}
          value={email}
          setValue={setEmail}
          placeholder="Email"
          theme={InputBoxTheme.modalInput}
        />
        <Textarea
          value={message}
          onChange={handleMessage}
          placeholder="Message"
        />
      </div>

      <Button
        className={styles.sendButton}
        onClick={handleSend}
        highlightType={HighlightType.highlightModalButton}
        disabled={false}
        disabledWithOverlay={false}
        withoutBackground={true}
      >
        <span className={'buttonText'}>Send</span>
      </Button>
    </div>
  );
};

export default ReportEventPopup;
