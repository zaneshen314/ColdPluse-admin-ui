import React, {createContext, useEffect, useReducer, useState} from 'react';
import {Typography} from '@mui/material';
import {getCharityEvents} from '../../api/charityEvent';
import participationReducer from '../../context/participationReducer';
import ScheduleComponent from "./ScheduleComponent";

const Schedule = () => {

    return (
        <div>
            <ScheduleComponent/>
        </div>
    );
};

export default Schedule;