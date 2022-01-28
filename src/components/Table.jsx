import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../context";
import UsersBlock from "../UsersBlock/UsersBlock";
import Search from "../Search/Search";

const UsersList = () => {
    const users = useContext(Context);
    const [sortedUsers, setSortedUsers] = useState([])
    const [blockCount, setBlockCount] = useState(0)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        let sortedList = users.sort(function(a, b) {
            if (a.registeredAge > b.registeredAge) return 1;
            if (a.registeredAge < b.registeredAge) return -1;
            return 0;
        })
        setSortedUsers(sortedList)
        let maxAge = sortedList[users.length - 1].registeredAge
        setBlockCount(Math.round(maxAge / 10))
    }, [])

    const renderBlocks = () => {
        let i = 0;
        let componentsArray = []
        while (i < blockCount) {
            componentsArray.push(Number(i)+1)
            i++
        }
        return componentsArray
    }
    console.log(searchQuery)
    return (
        <div className="table">
            <div className="table__column">
                <Search setSearchQuery={(value) => setSearchQuery(value)}/>
                {renderBlocks().map(num => (<UsersBlock key={num} ten={num*10}/>))}
            </div>
            <div className="table__column">
                Избранное
            </div>
        </div>
    );
};

export default UsersList;