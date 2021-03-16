import React from 'react';
import Navbar from './Navbar/Navbar';
import './Main.css'
const Main = props => {
    return (
        <div className="main h-100">
            <Navbar user={props.user} setLogin={props.setLogin} snackBar={props.snackBar}/>
        </div>
    );
}

export default Main;