import * as React  from 'react';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useEffectUpdate = (callback:any)  => {
    const isFirstRender = React.useRef(true);
    React.useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // toggle flag after first render/mounting
            return;
        }
        callback(); // performing action after state has updated
    }, [callback]);
}

export default useEffectUpdate; 