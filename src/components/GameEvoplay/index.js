import styles from './styles.module.scss';
import classNames from 'classnames';
import Link from 'components/Link';
import { PopupActions } from 'store/actions/popup';
import { connect } from 'react-redux';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

const GameEvoplay = ({ category, showHowtoLink, showPopup }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
      getEvoplaygames()
        .then(({data}) => {
          setGames(data?.games)
        })
        .catch(error => {
          console.log("error", error)
        });
    return () => {
      setGames([])
    }
  }, [])
/*
  const getGameItemSizeClass = () => {
    switch (games.length) {
      case 3:
        return styles.gameItemMd;
      case 4:
        return styles.gameItemSm;
      default:
        return styles.gameItemLg;
    }
  };
  const categories = games.reduce((gs, g) => { return gs.includes(g.GameCategory) ? gs :gs.concat(g.GameCategory) },[])
*/
  return (
    <div className={styles.gamesContainer}>
      <div className={styles.gamesCategory}>
        {/* <img src={AlpacaIcon} alt={'Alpaca Icon'} /> */}
        <h2>Evoplay</h2>
      </div>
      <div className={styles.games}>
        {Object.values(games).map((game, index) => {
          const name = game.absolute_name.substring(game.absolute_name.lastIndexOf("\\") + 1)
          return(
            <div
              className={styles.wrapper}
              key={`gamecard-${index}-`}
            >
              <Link
                to={`/evoplay-game/${game.name}/${game.game_sub_type}/${Object.keys(games)[index]}`}
                className={classNames(
                  styles.game,
                  styles.gameLink
                )}
              >
                <div
                  key={index}
                  className={classNames(
                    styles.gameItem,
                    getGameItemSizeClass()
                  )}
                >
                  <img src={`/images/evoplay/${name}_360x360.jpg`} alt={`${name}`}/>
                  <p className={styles.title}>{game.name}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(GameEvoplay);
