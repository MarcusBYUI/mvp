import { useTonAddress } from '@tonconnect/ui-react';
import Swap from '../../components/trade/swap/swap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { tokenList } from '../../components/trade/pools/helper';
import { swapActions } from '../../store/swap/swap';

const Trade = () => {
  //get token list here and refresh
  const address = useTonAddress()
  const dispatch = useDispatch()

  useEffect(() => {
    let interval;
    (async function () {
      interval = setInterval(async () => {
        const res = await tokenList(address)
        dispatch(swapActions.setTokens(res))
      }, 9000);


    })();
    return () => clearInterval(interval);
  }, [address, dispatch]);
  return (
    <>
      <Swap />
    </>
  );
}

export default Trade;
