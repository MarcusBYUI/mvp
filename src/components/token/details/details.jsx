import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./details.module.css"
import { IoIosArrowBack } from "react-icons/io";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { burnToken, getContractInfo, getToken, manageWhitelist, mintToken, transferToken, updateCollector, updateInfo, updateTax } from "../helper";
import { TailSpin } from "react-loader-spinner";
import numberWithCommas from '../../../helpers/commaSeperator';
import { Address } from '@ton/core';
import { TONADDRESS } from "../../trade/config";
import { useDispatch, useSelector } from "react-redux";


const Details = () => {
    const { message } = useSelector(
        (state) => state.notification
    );
    const dispatch = useDispatch()
    const params = useParams();
    const [tonConnectUI] = useTonConnectUI();
    const navigate = useNavigate()
    const address = useTonAddress()
    const [contract, setContract] = useState(params.contract ? params.contract : "")
    const [toMint, setToMint] = useState()
    const [toBurn, setToBurn] = useState()
    const [tax, setTax] = useState()
    const [collector, setCollector] = useState("")
    const [whitelist, setWhitelist] = useState("")
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({
        name: "",
        symbol: "",
        decimals: "",
        image: "",
        description: ""
    })

    const [transfer, setTransfer] = useState({
        receiver: "",
        amount: "",
    })


    useEffect(() => {
        //check content of pool child for user
        if (address.length == 0) return;
        if (contract.length == 0) return;
        let abortController;
        (async function () {
            abortController = new AbortController();
            setLoading(true)
            try {
                const tokenInfo = await getToken(contract)
                //get contract info
                try {
                    const cInfo = await getContractInfo(contract)
                    const addresses = []
                    cInfo.whitelist._map.forEach((state, address) => {
                        const addy = Address.parse(address.replace("a:", "")).toString()
                        if (state) {
                            addresses.push(addy)
                        }
                    });

                    tokenInfo.contractInfo = {
                        collector: cInfo.collector.toString(),
                        tax: Number(cInfo.tax),
                        mint: cInfo.mint,
                        whitelist: addresses,
                    }
                } catch (error) {
                    tokenInfo.contractInfo = {
                        collector: TONADDRESS,
                        tax: 0,
                        mint: true,
                        whitelist: [],
                    }
                }

                setData(tokenInfo)
                setInfo({
                    name: tokenInfo.metadata.name,
                    symbol: tokenInfo.metadata.symbol,
                    decimals: tokenInfo.metadata.decimals,
                    image: tokenInfo.metadata.image,
                    description: tokenInfo.metadata.description
                })
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }

        })();
        return () => abortController.abort();
    }, [address, contract, message]);
    return (
        <div className={styles.details}>
            <div>
                <div>
                    <h3>Token Creator</h3>
                    <p>Edit a deflationary token on TON</p>
                </div>
                <div>
                    <div onClick={() => navigate("/token")} className={styles.create}>
                        <span>Create Token</span>
                        <IoIosArrowBack />
                    </div>
                </div>
            </div>

            {address.length > 0 ? <div className={styles.input}>
                <input type="text" value={contract} onChange={(e) => setContract(e.target.value)} placeholder="Paste Jetton Address" />
                <span>Provide the address of the deflationary token you have admin rights</span>
            </div> : <div className={styles.input}><p>Connect Wallet to Continue</p></div>}
            {loading && <TailSpin
                height="20"
                width="20"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{ justifyContent: "center" }}
                wrapperClass=""
                visible={true}
            />}
            {data && !loading ? <div className={styles.container}>
                <div>
                    <form>
                        <div>
                            <input type="text" onChange={(e) => setInfo((prev) => { return { ...prev, name: e.target.value } })} value={info.name} placeholder="Jetton Name" />
                            <span>Your project unabbreviated name with spaces (usually 1-3 words). example Baby Shark Token</span>
                        </div>
                        <div>
                            <input type="text" onChange={(e) => setInfo((prev) => { return { ...prev, symbol: e.target.value } })} value={info.symbol} placeholder="Jetton Symbol" />
                            <span>Currency symbol appearing in balance (usually 3-5 uppercase chars). example BST</span>
                        </div>
                        <div>
                            <input type="number" onChange={(e) => setInfo((prev) => { return { ...prev, decimals: e.target.value } })} value={info.decimals} placeholder="Jetton Decimals" />
                            <span>The decimal precision of your token (9 is TON default). example 9</span>
                        </div>
                        <div>
                            <input type="text" onChange={(e) => setInfo((prev) => { return { ...prev, image: e.target.value } })} value={info.image} placeholder="Jetton Image" />
                            <span>Image URL link for jetteon. upload here:</span>
                        </div>
                        <div>
                            <input type="text" onChange={(e) => setInfo((prev) => { return { ...prev, description: e.target.value } })} value={info.description} placeholder="Jetton Description" />
                            <span>Optional sentence explaining about your project. example Baby shark du du du du du</span>
                        </div>
                        <button onClick={() => updateInfo(tonConnectUI, info, contract, dispatch)} type="button">Update Info</button>
                    </form>

                    <div className={styles.controller}>
                        <div className={styles.format}>
                            <div>
                                <input type="text" value={transfer.receiver} onChange={(e) => setTransfer((prev) => { return { ...prev, receiver: e.target.value } })} placeholder="Receiver" />
                                <input type="number" value={transfer.amount} onChange={(e) => setTransfer((prev) => { return { ...prev, amount: e.target.value } })} placeholder="Amount" onWheel={(e) => e.target.blur()} />
                                <span>Transfer tokens to another user</span>
                            </div>
                            <button onClick={() => transferToken(tonConnectUI, transfer.receiver, address, contract, transfer.amount * (10 ** data.metadata.decimals), dispatch)} className={toMint > 0 ? styles.active : ""}>Transfer</button>
                        </div>
                        <div className={styles.format}>
                            <div>
                                <input type="number" value={toMint} onChange={(e) => setToMint(Number(e.target.value))} placeholder="Mint Tokens" onWheel={(e) => e.target.blur()} />
                                <span>Amount of new tokens to mint to your wallet</span>
                            </div>
                            <button onClick={() => mintToken(tonConnectUI, contract, address, toMint * (10 ** data.metadata.decimals), dispatch)} className={toMint > 0 ? styles.active : ""}>Mint</button>
                        </div>
                        <div className={styles.format}>
                            <div>
                                <input type="number" value={toBurn} onChange={(e) => setToBurn(Number(e.target.value))} placeholder="Burn Tokens" onWheel={(e) => e.target.blur()} />
                                <span>Amount of tokens to burn from your wallet</span>
                            </div>
                            <button onClick={() => burnToken(tonConnectUI, contract, address, toBurn * (10 ** data.metadata.decimals), dispatch)} className={toBurn > 0 ? styles.active : ""}>Burn</button>
                        </div>
                        <div className={styles.format}>
                            <div>
                                <input type="number" value={tax} onChange={(e) => setTax(Number(e.target.value))} placeholder="Token Tax" onWheel={(e) => e.target.blur()} />
                                <span>New token tax. You can set to maximum of 15</span>
                            </div>
                            <button onClick={() => updateTax(tonConnectUI, contract, tax, dispatch)} className={tax > 0 ? styles.active : ""}>Apply</button>
                        </div>
                        <div className={styles.format}>
                            <div>
                                <input type="text" value={collector} onChange={(e) => setCollector(e.target.value)} placeholder="Tax Collector Address" />
                                <span>Address to send all token taxes to</span>
                            </div>
                            <button onClick={() => updateCollector(tonConnectUI, contract, collector, dispatch)} className={collector.length > 0 ? styles.active : ""}>Apply</button>
                        </div>
                        <div className={styles.format}>
                            <div>
                                <input type="text" value={whitelist} onChange={(e) => setWhitelist(e.target.value)} placeholder="Add or Remove Whitelist Address" />
                                <span>Add or remove an address from/to the whitelist address</span>
                            </div>
                            <div className={styles.divider}>
                                <button onClick={() => manageWhitelist(tonConnectUI, contract, true, whitelist, dispatch)}>+</button>
                                <button onClick={() => manageWhitelist(tonConnectUI, contract, false, whitelist, dispatch)}>-</button>
                            </div>
                        </div>

                        <div className={styles.offmint}>
                            <button>Turn Off Mint</button>
                            <span>This takes away your ability to mint new tokens but you can still control other functionalities</span>
                        </div>

                        <div className={styles.renounce}>
                            <button>Renounce Ownership</button>
                            <span>This sends all control of this token contract to the zero wallet</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={styles.header}>
                        <img src={data.metadata.image} alt={data.metadata.name} />
                        <div>
                            <h3>{data.metadata.name}</h3>
                            <span>{data.metadata.description}</span>
                        </div>
                    </div>

                    <div className={styles.dets}>
                        <span>Name:</span>
                        <p>{data.metadata.name}</p>
                    </div>
                    <div className={styles.dets}>
                        <span>Symbol:</span>
                        <p>{data.metadata.symbol}</p>
                    </div>
                    <div className={styles.dets}>
                        <span>Total Supply:</span>
                        <p>{numberWithCommas(data.total_supply / (10 ** data.metadata.decimals))}</p>
                    </div>
                    <div className={styles.dets}>
                        <span>Owner:</span>
                        <p>{Address.parse(data.admin.address).toString()}</p>
                    </div>
                    <div className={styles.dets}>
                        <span>Tax Collector:</span>
                        <p>{Address.parse(data.contractInfo.collector).toString()}</p>
                    </div>
                    <div className={styles.dets}>
                        <span>Tax:</span>
                        <p>{data.contractInfo.tax}%</p>
                    </div>
                    <div className={styles.dets}>
                        <span>Mintable:</span>
                        <p>{data.contractInfo.mint ? "True" : "False"}</p>
                    </div>
                    <div className={styles.dets}>
                        <span>Contract Renounced:</span>
                        <p>{data.admin.address == TONADDRESS ? "True" : "False"}</p>
                    </div>
                    <div className={styles.dets}>
                        <span className={styles.wl}>Whitelist:</span>
                        <div>
                            {data.contractInfo.whitelist.length > 0 ? data.contractInfo.whitelist.map((item, index) => {
                                return <span key={index}>{item}</span>
                            }) : <span>You have not whitlisted any address</span>}
                        </div>
                    </div>
                </div>
            </div> : <></>}


        </div>
    );
}

export default Details;
