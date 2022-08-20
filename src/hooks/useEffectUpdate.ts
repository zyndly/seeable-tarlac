import React, {useEffect, useRef}  from 'react';


const useEffectUpdate = (callback:any)  => {
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // toggle flag after first render/mounting
            return;
        }
        callback(); // performing action after state has updated
    }, [callback]);
}

export default useEffectUpdate; 