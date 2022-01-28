import React, {useState} from 'react';
import view from "../assets/icons/view.png"
import hidden from "../assets/icons/hidden.png"

const UserCard = ({user, children}) => {
    const [detailShow, setDetailShow] = useState(false)
    return (
        <div className="user-card">
            <div
                className="user-card__header"
                onClick={() => setDetailShow(!detailShow)}
            >
                {user.name}
                <img src={detailShow ? hidden : view}/>
            </div>
            {detailShow ?
                <div className="user-card__body">
                    <div className="user-card__photo">
                        <img src={user.photo}/>
                    </div>
                    <div className="user-card__text">
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

export default UserCard;