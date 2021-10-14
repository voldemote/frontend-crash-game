import { useState, useEffect } from 'react';
import TradeItem from './TradeItem';
import * as ApiUrls from '../../constants/Api';

const AllTrades = ({ betId }) => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    async function getData() {
      const url = `${ApiUrls.BACKEND_URL}api/event/bet/${betId}/open-bets`;
      const { openBets } = await fetch(url).then(d => d.json());
      setTrades(openBets);
    }
    getData();
  }, []);

  return (
    <>
      {trades.map((trade, idx) => (
        <TradeItem key={idx} trade={trade} />
      ))}
    </>
  );
};

export default AllTrades;
