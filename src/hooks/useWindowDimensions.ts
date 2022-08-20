import * as React from 'react';

function getWindowDimensions() {

  if(typeof window !== 'undefined'){
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    return {
        windowWidth,
        windowHeight
    };
  }else{
    return {
        windowWidth: 1024,
        windowHeight: 1024
    };
  }


  
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}