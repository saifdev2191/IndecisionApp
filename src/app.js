import React from 'react';
import ReactDOM from 'react-dom';
import Indecisonapp from './components/Indecisonapp';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Test from './components/test';
import {BrowserRouter, Route} from 'react-router-dom';

const Routes = (
    <BrowserRouter>
        <div>
            <Route    path="/" exact={true} component= {Indecisonapp} />
            <Route    path="/test"  component= {Test} />

        </div>

    </BrowserRouter>

)

ReactDOM.render(Routes, document.getElementById('app'))



