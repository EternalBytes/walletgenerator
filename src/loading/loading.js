import React from "react";
import './loading.css';
import loading from './loading.svg';

export default function Loading({ isLoading }){
    return (
        isLoading ?
        (<div className="loader-container">
            <img className="loader-container--loader" src={loading} alt="loading" />
        </div>)
        : null
    )
}