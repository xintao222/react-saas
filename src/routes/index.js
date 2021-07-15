import React, { useState, useEffect, useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
const Routes = (props) => {

    const [routeList, setRouteList] = useState([]);

    useEffect(() => {
        setRouteList(props.routeList);
    }, [props.routeList]);

    return (
        <Switch>
            {routeList.map((route) => {
                return (
                    <Route
                        component={route.component}
                        key={route.path}
                        path={route.path}
                    />
                );
            })}
        </Switch>
    );
};
export default Routes;
