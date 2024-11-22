import { Navigate, Route, Routes } from "react-router-dom";
import Create from "../../components/token/create/create"
import Details from "../../components/token/details/details";

const Token = () => {
    return (
        <Routes>
          <Route path="" element={<Create />} />
          <Route path="/edit" element={<Details />} />
          <Route path="/edit/:contract" element={<Details />} />
          <Route path={"*"} element={<Navigate replace to="/token" />} />
        </Routes>
    );
}

export default Token;
