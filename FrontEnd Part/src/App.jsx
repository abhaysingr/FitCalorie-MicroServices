import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router";
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import LandingPage from "./LandingPage";

const ActivitiesPage = () => {
  const handleActivitiesAdded = () => {
    window.location.reload();
  };

  return (
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <ActivityForm onActivitiesAdded={handleActivitiesAdded} />
      <ActivityList />
    </Box>
  );
};

const AuthenticatedApp = ({ onLogout }) => {
  return (
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="secondary" onClick={onLogout}>
          Logout
        </Button>
      </Box>
      <Routes>
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:id" element={<ActivityDetail />} />
        <Route path="/" element={<Navigate to="/activities" replace />} />
      </Routes>
    </Box>
  );
};

function App() {
  const { token, tokenData, logOut } = useContext(AuthContext);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token && tokenData) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    } else {
      setAuthReady(false);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
        <LandingPage />
      ) : (
        <AuthenticatedApp onLogout={logOut} />
      )}
    </Router>
  );
}

export default App;