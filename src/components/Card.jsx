import React, {useCallback, useContext, useState} from 'react';
import view from "../assets/icons/view.png"
import hidden from "../assets/icons/hidden.png"
import Highlight from "./Highlight";
import {Context} from "../context";

const Card = ({user, children, parent, ...args}) => {
    const {searchQuery} = useContext(Context);
    const [detailShow, setDetailShow] = useState(false)

    const light = useCallback((str) => {
        return <Highlight key={str} str={str} filter={searchQuery} />
    }, [searchQuery]);

    return (
        <div className="card" {...args} >
            <div
                className="card__header"
                onClick={() => setDetailShow(!detailShow)}
            >
                <div>{parent === "favorite" ? user.name : light(user.name)}</div>
                <img src={detailShow ? hidden : view} alt="icon"/>
            </div>
            {detailShow ?
                <div className="card__body">
                    <div className="card__photo">
                        <img src={user.photo} alt={user.name}/>
                    </div>
                    <div className="card__text">
                        <div>
                            {user.name}, дата регистрации: {user.registeredDate}
                        </div>
                        <div>
                            {user.email}
                        </div>
                    </div>
                    {children}
                </div>
                :
                null
            }
        </div>
    );
};

export default Card;