import React from "react";
import "../style/TopBar.scss";

const TopBar = (props: any): JSX.Element => {
    return (
        <>
            <header>
                <div className="header-content">
                    <div className="header-logo"></div> Users app
                </div>
            </header>
        </>
    );
};

export default TopBar;
