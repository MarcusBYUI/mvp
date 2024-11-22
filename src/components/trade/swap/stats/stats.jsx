import { Navigate, Route, Routes } from "react-router-dom";
import List from './list/list';
import Single from './single/single';

const Stats = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/:contract" element={<Single />} />
                <Route path={"*"} element={<Navigate replace to="/analytics" />} />
            </Routes>
        </>
    );
}

export default Stats;
