export interface PlaceTypes {
    id: string;
    image: string;
    title: string;
    description: string;
    address: string;
    creatorId: string;
    coordinates: {};
}

export interface PlaceItems {
    items: {
        id: string;
        imageUrl: string;
        title: string;
        description: string;
        address: string;
        creator: string;
        location: {};
    }[];
}
