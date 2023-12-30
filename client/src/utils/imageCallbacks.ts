import React from "react";
import icon from "../assets/electronics.png";

export const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = icon;
};

export const getImg = (img: string) => {
    return import.meta.env.VITE_REACT_APP_API_URL + img
}