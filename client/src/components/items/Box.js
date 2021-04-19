import { React, useContext } from 'react';
import GlobalContext from '../GlobalContext';


function Box(props) {
    // const [state, dispatch] = useGlobalState();
    const { page, setPage } = useContext(GlobalContext);

    const name = props.name;
    const classname = 'box ' + props.just;
    let thisBox = <div onClick={() => setPage(name.toLowerCase())} className={classname}><p>{name}</p></div>;
    return thisBox;
}

export default Box;