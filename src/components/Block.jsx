import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../context";
import UserCard from "../UserCard";

const UsersBlock = ({ten}) => {
    const [users, setUsers] = useState(useContext(Context));
    const start = ten - 9;
    const finish = ten;
    const [isActive, setIsActive] = useState(false)

    const filterUsers = () => {
        let filteredUsers = users.filter((user) => start <= Number(user.registeredAge) && Number(user.registeredAge) <= finish)
        setUsers(filteredUsers)
    }

    useEffect(() => {
        filterUsers()
    }, [])

    return (
        <div className="accordion">
            <button
                className={users.length < 1 ? "accordion__header accordion__header--disabled" : "accordion__header"}
                onClick={() => setIsActive(!isActive)}
            >
                <span>{start} - {finish}</span>
            </button>
            {isActive ?
                <div className="accordion__content">
                    {users.map((user, index) => (
                        <UserCard key={index} user={user} />
                    ))}
                </div>
                :
                null
            }
        </div>
    );
};

export default UsersBlock;