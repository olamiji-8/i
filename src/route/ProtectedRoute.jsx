import { Navigate } from "react-router-dom";
import { Local_storage } from "../utils/LocalStorageConfig";

function ProtectedRoute({ children }) {

    if (Local_storage().get("_utk") === '') {
        return <Navigate to="/login" replace />;
      }
      return children;
  }

export default ProtectedRoute;