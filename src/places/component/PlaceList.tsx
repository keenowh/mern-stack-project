import React from "react";
import Card from "../../shared/components/UIElements/Card";

import "./PlaceList.css";
import { PlaceItems } from "../PlacesTypes";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElement/Button";
const PlaceList: React.FC<PlaceItems> = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="center place-list">
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <Button>Share Place</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="place-list">
            {props.items.map((place) => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.imageUrl}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                />
            ))}
        </ul>
    );
};

export default PlaceList;
