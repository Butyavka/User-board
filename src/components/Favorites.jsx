import React, {useContext, useState} from 'react';
import Card from "./Card";
import trash from "../assets/icons/trash.png"
import {Context} from "../context";

const Favorites = () => {
    const {highlightFavorites} = useContext(Context)
    const [favoritesList, setFavoritesList] = useState([])

    const deleteFavoriteItem = (id) => {
        favoritesList.splice(Number(id), 1);
        setFavoritesList([...favoritesList]);
    }

    const onDropHandler = (e) => {
        if (e.dataTransfer.getData("user")) {
            let dropItem = JSON.parse(e.dataTransfer.getData("user"));
            let i = 0;
            while (i < favoritesList.length) {
                if (favoritesList[i].id === dropItem.id) return
                i++
            };
            setFavoritesList([...favoritesList, dropItem]);
        }
    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    return (
        <div
            className="favorite"
        >
            <div className="favorite__heading">
                Избранное
            </div>
            <div
                className={highlightFavorites ? "favorite__list favorite__list--highlight" : "favorite__list"}
                onDrop={(e) => onDropHandler(e)}
                onDragOver={(e) => dragOver(e)}
            >
                {favoritesList.map((user, index) => (
                    <Card
                        key={user.email}
                        user={user}
                        parent="favorite"
                    >
                        <button className="delete" onClick={() => deleteFavoriteItem(index)}>
                            <img src={trash} alt="trash"/>
                        </button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Favorites;