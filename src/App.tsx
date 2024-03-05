import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

//allow use of RN webview postMessage else it will be null
declare const window: any;
function App() {
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      //send only on mobile screens
      if (screenWidth <= 576) {
        //prevent crash
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            message: { width: screenWidth, height: screenHeight },
          })
        );
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    //clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MainLayout title="Home">
      <Suspense fallback={<>Loading....</>}>
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

export default App
