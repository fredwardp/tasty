import "./SplashScreen.css";
import { SplashContext } from "../../context/context";
import { useContext, useEffect } from "react";

const SplashScreen = () => {
    const { splash, setSplash } = useContext(SplashContext);

    useEffect(() => {
        setTimeout(() => {
            setSplash(true);
        }, 3000);
    }, []);
    return (
        <div className="containerSplash">
            {/* broken link gefixt */}
            <img src="\img\splash\logo-tasty 1.png" alt="#" />
            <div className="loader"></div>
        </div>
    );
};

export default SplashScreen;
