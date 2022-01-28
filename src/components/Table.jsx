import React, {useEffect, useState} from 'react';
import {Context} from "../context";
import Block from "./Block";
import Search from "./UI/Search";
import Loading from "./Loading";
import {getUsers} from "../api/getUsers";
import moment from "moment";
import Favorites from "./Favorites";

const Table = () => {

    const [loading, setLoading] = useState(false);
    const [blockCount, setBlockCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        setLoading(true);
        getUsers().then(res => {
            let result = res.data.results;
            result = result.map((user, index) => {
                return {
                    id: index,
                    name: `${user.name.first} ${user.name.last}`,
                    email: user.email,
                    registeredAge: user.registered.age,
                    registeredDate: moment(user.registered.date).format("MM.DD.YYYY"),
                    photo: user.picture.medium,
                };
            });
            let sortedList = result.sort(function(a, b) {
                if (a.registeredAge > b.registeredAge) return 1;
                if (a.registeredAge < b.registeredAge) return -1;
                return 0;
            });
            setFilteredUsers(sortedList);
            let maxAge = sortedList[sortedList.length - 1].registeredAge;
            setBlockCount(Math.round(maxAge / 10));
            setLoading(false);
        });
    }, []);

    const renderBlocks = () => {
        let i = 1;
        let componentsArray = [];
        while (i <= blockCount) {
            componentsArray.push(i);
            i++;
        }
        return componentsArray
    }

    return (
        <>
            {loading
                ?
                <Loading/>
                :
                <Context.Provider value={{
                    users: filteredUsers,
                    searchQuery,
                }}>
                    <div className="table">
                        <div className="table__column"
                        >
                            <Search setSearchQuery={(value) => setSearchQuery(value)}/>
                            {renderBlocks().map(num => (<Block key={num} ten={num*10}/>))}
                        </div>
                        <div className="table__column">
                            <Favorites />
                        </div>
                    </div>
                </Context.Provider>
            }
        </>
    );
};

export default Table;