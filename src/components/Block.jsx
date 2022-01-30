import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../context";
import Card from "./Card";

const Block = ({ten}) => {
    const {users, searchQuery, setHighlightFavorites} = useContext(Context);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const start = ten - 9;
    const finish = ten;
    const [isActive, setIsActive] = useState(false);

    const filterUsers = (user) => {
        return start <= Number(user.registeredAge)
            && Number(user.registeredAge) <= finish
            && user.name.toLowerCase().includes(searchQuery.toLowerCase());
    };

    const dragStartHandler = (e, user) => {
        e.dataTransfer.setData("user", JSON.stringify(user));
        setHighlightFavorites(true)

    }
    const dragOverHandler = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        setFilteredUsers(users.filter(user => filterUsers(user)));
    }, [searchQuery]);

    return (
        <div className="accordion">
            <button
                className={filteredUsers.length < 1
                    ?
                    "accordion__header accordion__header--disabled"
                    :
                    "accordion__header"}
                onClick={() => {
                    setIsActive(!isActive);
                }}
            >
                <span>{start} - {finish}</span>
            </button>
            {isActive && filteredUsers.length > 0?
                <ul className="accordion__content">
                    {filteredUsers.map((user, index) => (
                        <Card
                            key={user.email + user.id}
                            user={user}
                            draggable={true}
                            onDragEnd={() => setHighlightFavorites(false)}
                            onDragStart={(e) => dragStartHandler(e, user)}
                            onDragOver={(e) => dragOverHandler(e)}
                        />
                    ))}
                </ul>
                :
                null
            }
        </div>
    );
};

export default Block;