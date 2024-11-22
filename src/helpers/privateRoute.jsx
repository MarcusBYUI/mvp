import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  const {
    stakeIds
  } = useSelector((state) => state.connection);

  return stakeIds.length > 0 ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
