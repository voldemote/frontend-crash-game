import styles from './styles.module.scss';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import HeaderWithHeadline from 'components/HeaderWithHeadline';

const LiveEvents = () => {
    return (
        <BaseContainerWithNavbar
            withPaddingTop={true}
        >
            <HeaderWithHeadline headline='Live Events' />
        </BaseContainerWithNavbar>
    );
}

export default LiveEvents;