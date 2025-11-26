import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LayoutNavigator from "./components/LayoutNavigator";
import "./global.css"
import setI18nConfig from "./i18n";


export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setI18nConfig().then(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return null; // or a splash/loading screen here
  }

  return (
    <NavigationContainer>
      <LayoutNavigator />
    </NavigationContainer>
  );
}
