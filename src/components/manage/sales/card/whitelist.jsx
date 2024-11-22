import { useState } from "react";
import styles from "./card.module.css"
import { addWhite, removeWhite } from "../../../launchpad/helper";
import { useDispatch } from "react-redux";
import { useTonConnectUI } from "@tonconnect/ui-react";
import PropTypes from "prop-types";
import { getWlAddresses } from "../../../../hooks/useSaleContract";
import { Address } from '@ton/core';

const Whitelist = ({ data, setShowWl }) => {
    const [addresses, setAddresses] = useState("")
    const dispatch = useDispatch()
    const [tonConnectUI] = useTonConnectUI();


    const handleSubmit = async (add) => {
        const lines = addresses.split('\n');
        if (lines.length > 30) {
            window.alert("Inputs more than 30, you added " + lines.length + " addresses")
            return
        }

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].length < 10) {
                window.alert("Please check one of the addresses inputed")
                return
            }
        }
        if (lines.length < 30) {
            for (let j = 0; j < 30; j++) {
                lines.push("UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ");
                if (lines.length == 30) {
                    break;
                }
            }
        }

        if (add) {
            await addWhite(dispatch, tonConnectUI, data.saleAddress, lines)
        } else {
            await removeWhite(dispatch, tonConnectUI, data.saleAddress, lines)

        }

    }

    const getList = async () => {
        const list = await getWlAddresses(data.saleAddress)
        const addresses = {}
        list._map.forEach((state, address) => {
            const addy = Address.parse(address.replace("a:", "")).toString()
            if (addy != "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c") {
                addresses[addy] = state
            }
        });
        const jsonString = JSON.stringify(addresses);

        // Create a Blob from the JSON string
        const blob = new Blob([jsonString], { type: "application/json" });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Open a new tab with the Blob URL
        window.open(url, "_blank");
    }

    return (
        <div className={styles.whitelist}>
            <h3>Manage Your Sale Whitelist</h3>
            <p>Enter One Address per line.</p>
            <span>Maximum of 30 addresses at a time</span>
            <textarea cols="30" onChange={(e) => setAddresses(e.target.value)} required rows="30" value={addresses} placeholder="UQCCvFOpKe6jIVq9s2Qrtrf7tD8lqs5KSH_jbBYHfBdfKUkys"></textarea>

            <div>
                <button onClick={() => handleSubmit(true)}>Add Addresses</button>
                <button onClick={getList}>View Addresses</button>
                <button onClick={() => handleSubmit(false)}>Remove Addresses</button>
            </div>
            <button onClick={()=>setShowWl(false)}>Close</button>
        </div>
    );
}

export default Whitelist;
Whitelist.propTypes = {
    data: PropTypes.object,
    setShowWl: PropTypes.func
};