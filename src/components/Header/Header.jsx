import { NavLink } from 'react-router-dom';
import css from './Header.module.css';
import PropTypes from 'prop-types';

const Header = ({ menuItems }) => {
  return (
    <div className={css.header}>
      <ul className={css.headerList}>
        {menuItems.map(({ id, link, text }) => {
          return (
            <li className={css.headerMenuItem} key={id}>
              <NavLink to={link}>
                <h4 className={css.headerNavItem}>{text}</h4>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Header;
Header.propTypes = {
  menuItems: PropTypes.array,
};
