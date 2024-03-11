import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SplashContext } from "./context/context";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Onboarding from "./pages/Onboarding/Onboarding";
import SearchSite_Areas from "./pages/SearchSite_Areas/SearchSite_Areas";
import SearchSite_Categories from "./pages/SearchSite_Categories/SearchSite_Categories";
import SearchSite_Results from "./pages/SearchSite_Results/SearchSite_Results";
import Details from "./pages/Details/Details";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
SplashContext;

function App() {
    const [splash, setSplash] = useState(false);

    return (
        <SplashContext.Provider value={{ splash, setSplash }}>
            {/* Ternary um SplashScreen für einige Sekunden anzuzeigen */}
            {splash ? (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/onboarding" element={<Onboarding />} />
                        <Route path="/searchsite/areas" element={<SearchSite_Areas />} />
                        <Route path="/searchsite/categories" element={<SearchSite_Categories />} />
                        <Route path="/searchsite/results" element={<SearchSite_Results />} />
                        <Route path="/details:id" element={<Details />} />
                    </Routes>
                </BrowserRouter>
            ) : (
                <SplashScreen />
            )}
        </SplashContext.Provider>
    );
}

export default App;
