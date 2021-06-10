import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/home';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import View from './components/view';

const Header = () => {

    const location = useLocation();
    const history = useHistory();

    return (
        <div className="main-header">
            <h1>Giphy Viewer v1</h1>
            {location.pathname !== "/" ? <div className="back" onClick={() => history.goBack()}>Go back</div> : ''}
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/view/:id">
                    <View />
                </Route>

                <Route path="/">
                    <App />
                </Route>
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
