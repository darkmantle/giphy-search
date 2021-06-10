import React, { ChangeEvent, useState } from 'react';
import './index.css';
import { IGif } from "@giphy/js-types";
import { useHistory } from 'react-router';
import config from '../../config';
import { map } from "lodash";

function App() {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [tags, setTags] = useState<string[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [gifs, setGifs] = useState<IGif[]>([]);

    const history = useHistory();

    const fetchGifs = async () => {
        setLoading(true);
        const res = await fetch(`${config.giphyBaseUrl}/search?api_key=${config.giphyApiKey}&q=${searchTerm}`);
        const json = await res.json();
        setGifs(json.data);
        setLoading(false);
    };

    const onGifClick = (gif: IGif) => {
        history.push(`/view/${gif.id}`)
    }

    const onTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setSearchTerm(text);

        const res = await fetch(`${config.giphyBaseUrl}/search/tags?api_key=${config.giphyApiKey}&q=${text}`);
        const json = await res.json();

        setTags(map(json.data, 'name'));
    }

    const doSearch = (tag: string) => {
        setSearchTerm(tag);
        setTags([]);
        fetchGifs();
    }

    const Tags = () => {

        return (
            <div className="autocomplete-items">
                {tags?.map(tag => (
                    <div onClick={() => doSearch(tag)}>{tag}</div>
                ))}
            </div>
        )
    }

    return (
        <div className="main-content">
            <div className="search-area">
                <div className="autocomplete">
                    <input type="text" placeholder="Search here..." value={searchTerm} onChange={onTextChange} />
                    <Tags />
                </div>
                <button type="submit" onClick={() => fetchGifs()}>Search</button>
            </div>
            <div className="results-area">
                {loading ?
                    <div className="loader"></div>
                    :
                    <div className="flex-grid">
                        {gifs.map(gif => (
                            <div className="col" key={gif.id}>
                                <img src={gif.images.original.url} onClick={() => onGifClick(gif)} alt={gif.title} />
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
