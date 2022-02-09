import {useEffect, useState} from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import Link from 'components/Link';
import styles from './styles.module.scss';
import {
  NEW_SLOTS_GAMES,
  SLOTS_GAMES,
  EXTERNAL_GAMES,
  EVOPLAY_GAMES,
  SOFTSWISS_GAMES
} from '../../constants/Games';
import GameCards from '../../components/GameCards';
import { Grid } from '@material-ui/core';
import classNames from "classnames";
import {prepareEvoplayGames, prepareSoftSwissGames} from "../../helper/Games"
import AuthenticationType from "../../components/Authentication/AuthenticationType";
import { PopupActions } from '../../store/actions/popup';
import PopupTheme from '../../components/Popup/PopupTheme';
import {useDispatch, useSelector} from "react-redux";
import { selectUser } from 'store/selectors/authentication';
import { useHistory } from 'react-router';
import { OnboardingActions } from 'store/actions/onboarding';

const SearchSection = ({ setGames,
  alpacaGames,
  setAlpacaGame,
  externalGames,
  setExternalGames,
  externalGamesEvoplay,
  setExternalGamesEvoplay,
  externalGamesSoftswiss,
  setExternalGamesSoftswiss
 }) => {
  const gamesTitleList = [
    'House Games',
    'Casino',
    'Slot',
    'Roulette',
    'Card Games',
    'Poker',
    'Blackjack',
    'Instant Win',
    'Keno',
    'All',
  ];
  const [search, setSearch] = useState('');

  const onChangeSearch = e => {
    const value = e.target.value;
    setSearch(value);


    const searchedAlpacaGame = alpacaGames.filter(game => {
      const match = game.title.toLowerCase().match(value.toLowerCase());
      return Array.isArray(match);
    });


    const searchedExternalGames = externalGames.filter(game => {
      const match = game.TechnicalName.toLowerCase().match(value.toLowerCase());
      return Array.isArray(match);
    });

    const searchedExternalGamesEvoplay = externalGamesEvoplay.filter(game => {
      const match = game.TechnicalName.toLowerCase().match(value.toLowerCase());
      return Array.isArray(match);
    });
    const searchedExternalGamesSoftswiss = externalGamesSoftswiss.filter(game => {
      const match = game.TechnicalName.toLowerCase().match(value.toLowerCase());
      return Array.isArray(match);
    });
    setAlpacaGame(searchedAlpacaGame);
    setExternalGames(searchedExternalGames);
    setExternalGamesEvoplay(searchedExternalGamesEvoplay);
    setExternalGamesSoftswiss(searchedExternalGamesSoftswiss);

    if(!value) {
      setGames();
    }
  };

  const selectGame = (gameCategory, searched) => {
    if (gameCategory === 'All') {
      setGames();
      return;
    } else if (gameCategory === gamesTitleList[0]) {
      if (searched) {
      } else {
        setGames('alpaca');
      }
    } else {
      setGames('external', gameCategory);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <Grid container spacing={1} >
        <Grid item lg={4} md={8} sm={8} xs={12}>
          <div className={styles.search}>
            <input
              type="text"
              value={search}
              placeholder="Search"
              onChange={onChangeSearch}
            />
          </div>
        </Grid>
        {gamesTitleList.map((game, index) => {
          return (
            <Grid item key={index + game}>
              <p className={styles.searchItem} onClick={e => selectGame(game)}>
                {game}
              </p>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const DisplaySection = (props) => {
  let history = useHistory();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const {smartsoftGames, evoplayGames, softswissGames} = props;

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

    if (game.GameProvider === 'softswiss') {
      const cfg = game._cfg;
      const name = cfg.absolute_name.substring(cfg.absolute_name.lastIndexOf("\\") + 1);
      const evoPlayUrl = `/evoplay-game/${cfg.name}/${cfg.game_sub_type}/${game.gameKey}`;
      return <div onClick={(e) => {
        handleGameClick(e, evoPlayUrl, game);
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
            <img src={game.GameThumb} alt={`${name}`} />
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

    if(smartsoftGames && evoplayGames && softswissGames) {
      setGames([...smartsoftGames, ...evoplayGames, ...softswissGames]);
    }

    return () => {
      setGames([])
    }
  }, [smartsoftGames, evoplayGames, softswissGames])

  let categories = games.reduce((gs, g) => { return gs.includes(g.GameCategory) ? gs :gs.concat(g.GameCategory) },[]);

  return (
    <div className={styles.gamesContainer}>
      {categories.map(category1 =>
        <>

            <div className={styles.gamesCategory}>
              {/* <img src={AlpacaIcon} alt={'Alpaca Icon'} /> */}
              <h2>{category1}</h2>
            </div>
          )
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

const Games = () => {
  const showUpcoming = process.env.REACT_APP_SHOW_UPCOMING_FEATURES || 'false';
  const [alpacaGames, setAlpacaGame] = useState(
    showUpcoming ? NEW_SLOTS_GAMES : SLOTS_GAMES
  );
  const [externalGames, setExternalGames] = useState(EXTERNAL_GAMES);

  const [externalGamesEvoplay, setExternalGamesEvoplay] = useState([...prepareEvoplayGames(EVOPLAY_GAMES)]);
  const [externalGamesSoftswiss, setExternalGamesSoftswiss] = useState([...prepareSoftSwissGames(SOFTSWISS_GAMES)]);

  const setGames = (selectGame, gameCategory) => {
    if (selectGame) {
      const alpacaGamesDisplay =
        selectGame === 'alpaca'
          ? showUpcoming
            ? NEW_SLOTS_GAMES
            : SLOTS_GAMES
          : [];
      let externalGamesDisplaySmartsoft =
        selectGame === 'external' ? EXTERNAL_GAMES : [];
      let externalGamesDisplayEvoplay =
        selectGame === 'external' ? prepareEvoplayGames(EVOPLAY_GAMES, gameCategory) : [];
      let externalGamesDisplaySoftswiss =
        selectGame === 'external' ? prepareSoftSwissGames(SOFTSWISS_GAMES, gameCategory) : [];
        if(gameCategory) {
          externalGamesDisplaySmartsoft = externalGamesDisplaySmartsoft.filter(game => {
            return game.GameCategory.indexOf(gameCategory) > -1;
          })

          externalGamesDisplayEvoplay = externalGamesDisplayEvoplay.filter(game => {
            return game.GameCategory.indexOf(gameCategory) > -1;
          })
          externalGamesDisplaySoftswiss = externalGamesDisplaySoftswiss.filter(game => {
            return game.GameCategory.indexOf(gameCategory) > -1;
          })
        }

      setAlpacaGame(alpacaGamesDisplay);
      setExternalGames(externalGamesDisplaySmartsoft);
      setExternalGamesEvoplay(externalGamesDisplayEvoplay);
      setExternalGamesSoftswiss(externalGamesDisplaySoftswiss);
      return;
    }

    setAlpacaGame(showUpcoming ? NEW_SLOTS_GAMES : SLOTS_GAMES);
    setExternalGames(EXTERNAL_GAMES);
    setExternalGamesEvoplay(prepareEvoplayGames(EVOPLAY_GAMES));
    setExternalGamesSoftswiss(prepareSoftSwissGames(SOFTSWISS_GAMES));
  };

  return (
    <BaseContainerWithNavbar withPaddingTop={true} carouselType='games'>
        {/* <CustomCarousel /> */}
      <div className={styles.container}>
        {/* <ElonGame /> */}
        {/*
          <GameCards
            games={CASINO_GAMES}
            category="Elon Game"
            showHowtoLink={true}
          />
        */}
        <SearchSection
          setGames={setGames}
          alpacaGames={showUpcoming ? NEW_SLOTS_GAMES : SLOTS_GAMES}
          setAlpacaGame={setAlpacaGame}
          externalGames={EXTERNAL_GAMES}
          externalGamesEvoplay={externalGamesEvoplay}
          setExternalGamesEvoplay={setExternalGamesEvoplay}
          externalGamesSoftswiss={externalGamesSoftswiss}
          setExternalGamesSoftswiss={setExternalGamesSoftswiss}
          setExternalGames={setExternalGames}
        />

        {alpacaGames.length && (
          <GameCards games={alpacaGames} category="House Games" />
        )}


        <DisplaySection smartsoftGames={externalGames} evoplayGames={externalGamesEvoplay} softswissGames={externalGamesSoftswiss} />
      </div>
    </BaseContainerWithNavbar>
  );
};

export default Games;
