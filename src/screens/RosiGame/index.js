import styles from './styles.module.scss';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import HeaderWithHeadline from 'components/HeaderWithHeadline';

const RosiGame = () => {
    return (
        <BaseContainerWithNavbar
            withPaddingTop={true}
        >
            <HeaderWithHeadline headline='Rosi Game' />
        </BaseContainerWithNavbar>
    );
}

export default RosiGame;