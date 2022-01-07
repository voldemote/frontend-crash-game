import {useEffect, useState} from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import Link from 'components/Link';
import styles from './styles.module.scss';
import {
  NEW_SLOTS_GAMES,
  SLOTS_GAMES,
  EXTERNAL_GAMES,
  EVOPLAY_GAMES
} from '../../constants/Games';
import GameCards from '../../components/GameCards';
import { Grid } from '@material-ui/core';
import classNames from "classnames";
import {prepareEvoplayGames} from "../../helper/Games"

const SearchSection = ({ setGames,
  alpacaGames,
setAlpacaGame,
externalGames,
setExternalGames,
externalGamesEvoplay,
setExternalGamesEvoplay
 }) => {
  const gamesTitleList = [
    'Alpaca Games',
    'Casino',
    'Slot',
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

    setAlpacaGame(searchedAlpacaGame);
    setExternalGames(searchedExternalGames);
    setExternalGamesEvoplay(searchedExternalGamesEvoplay);

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

  const renderLinkByProvider = (game, index) => {
    if(game.GameProvider === 'evoplay') {
      const cfg = game._cfg;
      const name = cfg.absolute_name.substring(cfg.absolute_name.lastIndexOf("\\") + 1)
      return <Link
        to={`/evoplay-game/${cfg.name}/${cfg.game_sub_type}/${game.gameKey}`}
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
      </Link>
    }

    return <Link
      to={`/external-game/${game.TechnicalName}/${game.TechnicalCategory}`}
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
    </Link>
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
          )}
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
        selectGame === 'external' ? prepareEvoplayGames(EVOPLAY_GAMES) : [];

        if(gameCategory) {
          externalGamesDisplaySmartsoft = externalGamesDisplaySmartsoft.filter(game => {
            return game.GameCategory.indexOf(gameCategory) > -1;
          })

          externalGamesDisplayEvoplay = externalGamesDisplayEvoplay.filter(game => {
            return game.GameCategory.indexOf(gameCategory) > -1;
          })
        }

      setAlpacaGame(alpacaGamesDisplay);
      setExternalGames(externalGamesDisplaySmartsoft);
      setExternalGamesEvoplay(externalGamesDisplayEvoplay);
      return;
    }

    setAlpacaGame(showUpcoming ? NEW_SLOTS_GAMES : SLOTS_GAMES);
    setExternalGames(EXTERNAL_GAMES);
    setExternalGamesEvoplay(prepareEvoplayGames(EVOPLAY_GAMES));
  };

  return (
    <BaseContainerWithNavbar withPaddingTop={true} carousel>
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
          setExternalGames={setExternalGames}
        />

        {alpacaGames.length && (
          <GameCards games={alpacaGames} category="Alpaca Games" />
        )}


        <DisplaySection smartsoftGames={externalGames} evoplayGames={externalGamesEvoplay} />
      </div>
    </BaseContainerWithNavbar>
  );
};

export default Games;
