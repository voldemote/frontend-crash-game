import styles from './styles.module.scss';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import HeaderWithHeadline from 'components/HeaderWithHeadline';

const Events = () => {
    return (
        <BaseContainerWithNavbar
            withPaddingTop={true}
        >
            <HeaderWithHeadline headline='Events' />
        </BaseContainerWithNavbar>
    );
}

export default Events;