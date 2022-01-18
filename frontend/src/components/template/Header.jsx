import './Header.css'
import React from 'react'

export default props => 
    <header className="header d-none d-sm-flex flex-column"> {/*Responsividade*/}
        <h1 className="mt-3"> {/*margin-top: 3px*/}
            <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h1>
        <p className='lead text-muted'>{props.subtitle}</p>
    </header>