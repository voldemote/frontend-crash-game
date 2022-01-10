import { Grid } from "@material-ui/core";
import { useState } from "react";
import styles from '../styles.module.scss';

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
        <Grid item lg={2} md={8} sm={8} xs={12}>
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

export default SearchSection;