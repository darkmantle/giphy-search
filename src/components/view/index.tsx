import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IGif } from "@giphy/js-types";
import './index.css';
import config from "../../config";

const View = () => {
    const { id }: any = useParams();

    const [gif, setGif] = useState<IGif>();

    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.giphyBaseUrl}/${id}?api_key=${config.giphyApiKey}`);
            const json = await res.json();
            setGif(json.data);
        })();
    }, [id]);

    return (
        <div className="view-content">
            {gif ?
                <div className="gif-details">
                    <img src={gif?.images.original.url} alt={gif?.title} />
                    <div className="gif-meta">
                        <h2>{gif.title}</h2>
                        <div className="created-by">Created by <span>{gif.username}</span></div>
                        <div className="date">{(new Date(gif.import_datetime)).toLocaleDateString("en-GB")}</div>
                        <a href={gif.url}>Open in Giphy</a>
                    </div>
                </div>
                : <div className="loader"></div>}
        </div>
    )
}

export default View;