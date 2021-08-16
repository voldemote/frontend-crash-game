import IconTheme    from '../Icon/IconTheme';
import Icon         from '../Icon';
import { NavLink }  from 'react-router-dom';
import style    from './styles.module.scss';
import classNames from 'classnames';

const NavbarFooterAction = ({route, text, iconType, className = null}) => {

    const renderNavbarLink = (route, text, iconType) => {
        return (
            <NavLink
                exact
                to={route}
                className={classNames(style.navbarItem, className)}
                activeClassName={style.navbarItemActive}
            >
                <div className={style.navbarLink}>
                    <Icon iconType={iconType} iconTheme={IconTheme.black} />
                    {text}
                </div>
            </NavLink>
        );
    }

    return (
        renderNavbarLink(route, text, iconType)
    );
}

export default NavbarFooterAction;