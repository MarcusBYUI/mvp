import Header from "./blocks/header";
import Table from "./blocks/table";
import styles from "./list.module.css"

const List = () => {
    return (
        <div className={styles.list}>
            <Header />
            <Table />
        </div>
    );
}

export default List;
