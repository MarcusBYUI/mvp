import { useEffect, useRef, useState } from "react";
import { getImageUrl, numberToTwoDecimals } from "../../../../helpers/utils";
import styles from "./tokens.module.css"
import { CiStar } from '../../../../../node_modules/react-icons/ci';
import { FaArrowRight } from '../../../../../node_modules/react-icons/fa6';
import usePreventPageScroll from '../../../../hooks/usePreventPageScroll';
import useOutsideAlerter from '../../../../hooks/useOutsideClick';
import { useDispatch, useSelector } from "react-redux";
import { searchToken } from "../../pools/helper";
import { useTonAddress } from "@tonconnect/ui-react";
import { swapActions } from "../../../../store/swap/swap";
import numberWithCommas from "../../../../helpers/commaSeperator";

const Tokens = ({ callback, animate, closePop }) => {
    const address = useTonAddress()
    const [favourite, setFavourite] = useState(false)
    const scrollableDivRef = usePreventPageScroll();
    const containerRef = useRef(null)
    const [filter, setFilter] = useState([])
    const [search, setSearch] = useState("")
    useOutsideAlerter(containerRef, containerRef, () => closePop())
    const { tokens } = useSelector((state) => state.swap);
    const dispatch = useDispatch()

    const { token, other, setToken } = callback

    useEffect(() => {
        let abortController;
        (async function () {
            abortController = new AbortController();
            if (search.length == 0) {
                setFilter(tokens)
            } else {
                //compare with name
                const nameFilter = tokens.filter((item) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                //compare with symbol
                const symbolFilter = tokens.filter((item) => item.symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                //compare with address
                const addressFilter = tokens.filter((item) => item.address.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                //compare with friendly
                const friendlyFilter = tokens.filter((item) => item.friendly.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

                //add all list and set filter
                const uniqueArray = [...nameFilter, ...symbolFilter, ...addressFilter, ...friendlyFilter].filter((item, index, self) =>
                    index === self.findIndex((t) => t.address === item.address)
                );

                if (uniqueArray.length == 0) {
                    //check online
                    try {
                        const res = await searchToken(search, address)
                        setFilter([res])
                        dispatch(swapActions.updateTokens(res))

                    } catch (error) {
                        setFilter([])
                    }

                } else {
                    setFilter(uniqueArray)
                }
            }

        })();
        return () => abortController.abort();
    }, [search, tokens, address, dispatch])

    return (
        <div className={`${styles.tokens} ${animate ? styles.show : ""}`}>
            <div ref={containerRef} className={styles.container}>
                <h3>Select Token</h3>
                <div className={styles.search}>
                    <img src={getImageUrl("search.png")} alt="search" />
                    <input type="text" placeholder="Search assets or address" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className={styles.menu}>
                    <span onClick={() => setFavourite(false)} className={!favourite ? styles.active : ""}>All assets</span>
                    <span onClick={() => setFavourite(true)} className={favourite ? styles.active : ""}>Favourites</span>
                </div>
                <div ref={scrollableDivRef} className={styles.items}>
                    {filter.length == 0 ? <p className={styles.notfound}>Asset not found</p> : filter.map((item, index) => {
                        return <div style={{ opacity: token.address == item.address || other.address == item.address ? 0.2 : 1 }} onClick={token.address == item.address || other.address == item.address ? () => { } : () => { setToken(item); closePop() }} key={index} className={styles.item}>
                            <img src={item.logo} alt={item.name} />
                            <div>
                                <div>
                                    <p>{item.symbol}</p>
                                    {item.verified ? <></> : <span>Community</span>}
                                </div>
                                <div>
                                    <span>{item.name}</span>
                                    <FaArrowRight />
                                </div>
                            </div>
                            <div>
                                <p>{numberWithCommas(Number(item.balance) / (10 ** item.decimals))}</p>
                                <span>${numberToTwoDecimals(item.amount)}</span>
                            </div>
                            <CiStar title="Add to favourites" />
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Tokens;
