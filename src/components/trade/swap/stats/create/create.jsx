import { useContext,  useState } from "react";
import { MyContext } from "../../../helpers/mycontext";
import Input from "./input";
import styles from "./create.module.css";
import { useDispatch } from "react-redux";

import { notificationActions } from "../../../store/notification/notification";
import apiRequest from "../../../helpers/connections";
import { CHEF, chefABI } from "../../../helpers/venomConnect";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import numberWithCommas from '../../../helpers/commaSeperator';
import { getImageUrl, numberToTwoDecimals } from "../../../helpers/utils";

const Create = () => {
    const { venomProvider, address } = useContext(MyContext);
    const navigate = useNavigate()

    const [lockRoot, setLockRoot] = useState("");
    const [logo, setLogo] = useState("");
    const [locks, setLocks] = useState([
       
    ]);
    const dispatch = useDispatch();
    const [recipient, setRecipient] = useState("")
    const [unlock, setUnlock] = useState("")
    const [amount, setAmount] = useState(0)


    const submitForm = async (e) => {

        e.preventDefault();
        dispatch(notificationActions.setNotify(true));

        if (!address) {
            dispatch(notificationActions.setMessage("Please connect wallet"));
            return

        }

        if (locks.length === 0) {
            dispatch(notificationActions.setMessage("You need to add atleast one lock"));
            return

        }

        //check if token is mintable
        const _body = {
            lockTokenRoot: lockRoot.trim(),
            owner: address,
            logo: logo.trim(),
            locks: locks
        };


        try {
            const instance = new venomProvider.Contract(chefABI, CHEF);
            await instance.methods
                .makePayment().send({
                    amount: String(1.1 * 10 ** 9),
                    bounce: true,
                    from: address,
                })
                .catch((e) => {
                    console.log(e);
                    if (e.code === 3) {
                        // rejected by a user
                        throw Error("User rejected transaction")

                    } else {
                        // The message has expired or some other
                        // perform any necessary error handling
                        throw Error(e.message)
                    }
                });
            await apiRequest("locker", _body, "POST", undefined);

            dispatch(notificationActions.setMessage("Lock was created successfully"))
            navigate("/manage/locker")
        } catch (error) {
            if (error?.info?.error?.status === 422) {
                dispatch(notificationActions.setMessage(error?.info?.error?.message));
              } else {
                dispatch(notificationActions.setMessage("Something went wrong"));
              }
        }
    };

    const handleClose = (index)=>{
        const arr = [...locks]
        arr.splice(index, 1)
        setLocks(arr)
    }

    const handleAddition = ()=>{
        dispatch(notificationActions.setNotify(true))

        if (!recipient) {
            dispatch(notificationActions.setMessage("Recipient is invalid"))
            return
        }

        if (!unlock) {
            dispatch(notificationActions.setMessage("Unlock date is invalid"))
            return
        }
        if (!amount) {
            dispatch(notificationActions.setMessage("Amount is invalid"))
            return
        }

        dispatch(notificationActions.setNotify(false))

        const newArr = [...locks]
        newArr.push(
            {
                "amount": amount,
                "unlock": unlock,
                "recipient": recipient
            }
        )

        setLocks(newArr)

        setAmount("")
        setUnlock(0)
        setRecipient("")


    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>Locker Creator | Impulse Finance</title>
                <meta name="description" content="Locker creator to help devs and users secure tokens for a long duration" />
                <meta property="og:title" content="Locker Creator | Impulse Finance" />
                <meta property="og:description" content="ICO creator to help devs and users secure tokens for a long duration" />
            </Helmet>
            <div className={styles.create}>
                <h2>Create Launch</h2>
                <div className={styles.border}>
                    <div className={styles.bg}>
                        <form onSubmit={submitForm}>
                            
                            <ul>
                                <li>Fee is 2% of locked amount only</li>
                            </ul>
                     
                            <h3>Lock Info</h3>
                            <div className={styles.div}>
                                <Input
                                    required={true}
                                    data={{
                                        value: lockRoot,
                                        setValue: setLockRoot,
                                        title: "Token Address / Lp address",
                                        description: "Contract address of your created token or Lp token",
                                    }}
                                />
                                <Input
                                    required={true}
                                    data={{
                                        upload: true,
                                        value: logo,
                                        setValue: setLogo,
                                        title: "Logo URL",
                                        description:
                                            "URL must end with png, jpg, jpeg or gif. Click here to upload",
                                    }}
                                />
                            </div>
                            
                            {locks.map((item, index)=>{
                                return <div key={index} className={styles.vest}>
                                <div>
                                    <p> <strong style={{ color: "#ffffff89", fontWeight: 500 }}>Amount: </strong> {numberWithCommas(numberToTwoDecimals(item.amount))} </p>
                                    <p> <strong style={{ color: "#ffffff89", fontWeight: 500 }}>Unlock: </strong> {new Date(item.unlock).getDate() + "/" + new Date(item.unlock).getMonth()+1 + "/" + new Date(item.unlock).getFullYear() + " " + new Date(item.unlock).getHours() + ":" + new Date(item.unlock).getMinutes()}</p>
                                    <img onClick={()=>handleClose(index)} src={getImageUrl("x.png")} alt="close" />
                                </div>
                                <div>
                                    <span style={{ color: "#ffffff89" }}>Recipient:</span>
                                    <span style={{ color: "#ffffff89", wordBreak: "break-all" }}>{item.recipient}</span>
                                </div>
                            </div>
                            })}

                            <div className={styles.adder}>
                            <Input
                                    num={true}
                                    data={{
                                        value: amount,
                                        setValue: setAmount,
                                        title: "Amount to lock",
                                        description: "The amount you would love to lock for this period",
                                    }}
                                />
                                <Input
                                    data={{
                                        date: true,
                                        value: unlock,
                                        setValue: setUnlock,
                                        title: "Lock period",
                                        description: "Lock duration of this amount",
                                    }}
                                />
                                <Input
                                    data={{
                                        value: recipient,
                                        setValue: setRecipient,
                                        title: "Recipient address",
                                        description: "This is the address of the user that would be able to withdraw these tokens",
                                    }}
                                />

                                <button type="button" onClick={handleAddition}>Add</button>
                            </div>

                            <div className={styles.border1}>
                                <div className={styles.bg1}>
                                    <button type="submit" className={styles.submit}>
                                        Create Lock
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
};

export default Create;
