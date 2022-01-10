import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { OnboardingActions } from 'store/actions/onboarding';
import { selectUser } from 'store/selectors/authentication';
import styles from '../styles.module.scss';

const DisplaySection = (props) => {
//   let history = useHistory();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const {smartsoftGames, evoplayGames} = props;

  const [games, setGames] = useState([]);
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

  const handleGameClick = (e, gameUrl, gameCfg) => {
    if(!user.isLoggedIn) {
      dispatch(OnboardingActions.start());
    } else {
      // history.push(gameUrl)
      // dispatch(
      //   PopupActions.show({
      //     popupType: PopupTheme.selectGameMode,
      //     options: {
      //       maxWidth: true,
      //       data: {
      //         gameUrl,
      //         gameCfg,
      //         user
      //       }
      //     },
      //   })
      // );
    }

  }

  const renderLinkByProvider = (game, index) => {
    if(game.GameProvider === 'evoplay') {
      const cfg = game._cfg;
      const name = cfg.absolute_name.substring(cfg.absolute_name.lastIndexOf("\\") + 1);
      const evoPlayUrl = `/evoplay-game/${cfg.name}/${cfg.game_sub_type}/${game.gameKey}`;
      return <div onClick={(e) => {
        handleGameClick(e,evoPlayUrl, game);
      }}>
        <Link
        to={user.isLoggedIn ? evoPlayUrl : undefined}
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
          <p className={styles.title}>{cfg.name}</p>
        </div>
      </Link></div>
    }


    const smartSoftUrl = `/external-game/${game.TechnicalName}/${game.TechnicalCategory}`;

    return <div onClick={(e) => {
      handleGameClick(e, smartSoftUrl, game);
    }}><Link
      to={user.isLoggedIn ? smartSoftUrl : undefined}
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
        <img src={game.picture ? game.picture : `https://www.smartsoftgaming.com/Content/Images/GameIcons/${game.TechnicalName}.png`} alt={`${game.TechnicalName}`}/>
        <p className={styles.title}>{game.TechnicalName}</p>
      </div>
    </Link></div>
  }

  useEffect(() => {

    if(smartsoftGames && evoplayGames) {
      setGames([...smartsoftGames, ...evoplayGames]);
    }

    return () => {
      setGames([])
    }
  }, [smartsoftGames, evoplayGames])

  let categories = games.reduce((gs, g) => { return gs.includes(g.GameCategory) ? gs :gs.concat(g.GameCategory) },[]);

  return (
    <div className={styles.gamesContainer}>
      {categories.map(category1 =>
        <>

            <div className={styles.gamesCategory}>
              {/* <img src={AlpacaIcon} alt={'Alpaca Icon'} /> */}
              <h2>{category1}</h2>
            </div>
          
          <div className={classNames(styles.games)}>
            {games.filter(g => g.GameCategory===category1).map((game, index) => {

             return <div
                className={styles.wrapper}
                key={`gamecard-${index}-`}
              >
               {renderLinkByProvider(game, index)}
              </div>

            }
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DisplaySection;