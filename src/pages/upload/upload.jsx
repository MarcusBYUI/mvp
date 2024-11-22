import { useState } from "react";
import styles from "./upload.module.css"
import CopyToClipboard from "react-copy-to-clipboard";
import { notificationActions } from "../../store/notification/notification";
import { useDispatch } from "react-redux";
import { getImageUrl } from "../../helpers/utils";
import apiRequest from "../../helpers/connections";
const Upload = () => {
    const [created, setCreated] = useState(false)
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(notificationActions.setNotify(true))
        const form = new FormData(e.target)
        try {
            const res = await apiRequest("upload", form, "POST", undefined)
            setCreated(res.link)
            dispatch(notificationActions.setMessage("Image Uploaded"));

        } catch (error) {
            if (error?.info?.error?.status === 422) {
                dispatch(notificationActions.setMessage(error?.info?.error?.message));
            } else {
                dispatch(notificationActions.setMessage("Something went wrong"));
            }
        }



    }
    return (
        <div className={styles.uploader}>
            <div className={styles.heroborder}>
                <div className={styles.herobg}>
                    <div className={styles.hero}>
                        <div>
                            <h1>Logo Uploader</h1>
                            <p>Use this page to get your logo url after completing your upload</p>
                        </div>
                        <></>
                    </div>
                </div>
            </div>

            {!created ? <form onSubmit={handleSubmit}>
                <input type="file" name="image" required />
                <button>Upload</button>
            </form> :
                <div>
                    <p className={styles.link}>{created} <CopyToClipboard
                        text={created}
                        onCopy={() => {
                            dispatch(notificationActions.setNotify(true));
                            dispatch(
                                notificationActions.setMessage(
                                    "Copied!!!"
                                )
                            );
                        }}
                    >
                        <img loading="lazy"
                            className={styles.copy}
                            src={getImageUrl("copy.png")}
                            alt="copy"
                        />
                    </CopyToClipboard></p>
                    <button onClick={() => setCreated(false)}>Go Back</button>
                </div>
            }
        </div>
    );
}

export default Upload;
