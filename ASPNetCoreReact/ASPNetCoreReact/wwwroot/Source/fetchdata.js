﻿
import * as React from 'react';

import 'es6-promise';

import 'isomorphic-fetch';

export default class FetchData extends React.Component {

    constructor() {

        super();

        this.state = { forecasts: [], loading: true };

        this.refreshData();

        //fetch('api/SampleData/WeatherForecasts')
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ forecasts: data, loading: false });
        //    });
    }

    render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.forecasts);

        return <div>
            <button className='btn btn-primary padalicious' onClick={() => { this.refreshData() }}>Refresh</button>
            {contents}
        </div>;
    }

    refreshData() {

        console.log("refreshData()");

           fetch('api/SampleData/WeatherForecasts')
            .then(response => response.json())
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });

        //fetch('api/SampleData/WeatherForecasts')
        //    .then(response => { 
            
        //        //console.log("refreshData() first then");
                
        //        //console.log(response);
                
        //        response.json(); 
        //    })
        //    .then(data => {

        //        //console.log("refreshData() second then");
                
        //        //console.log(data);

        //        this.setState({ forecasts: data, loading: false });
        //    });
    }

    static renderForecastsTable(forecasts) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.dateFormatted}>
                        <td>{forecast.dateFormatted}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}