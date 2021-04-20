import GlobalContext from '../GlobalContext';
import { React, useContext } from 'react';

function Nav(props) {

    const { setPage } = useContext(GlobalContext);

    const name = props.name;
    const action = props.action;
    const classname = 'link_nav ' + props.action;
    let navigation = <li onClick={() => setPage(action.toLowerCase())} className={classname}>{name}</li>
    // let thisBox = <div onClick={() => setPage(action.toLowerCase())} className={classname}><p>{name}</p></div>;
    return navigation;
}

export default Nav;