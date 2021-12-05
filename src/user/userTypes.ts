export interface UserTypes {
    id: string;
    image: string;
    name: string;
    placeCount: string;
}

export interface UserItems {
    items: { id: string; image: string; name: string; places: string }[];
}
