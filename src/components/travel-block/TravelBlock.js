import React from 'react';
import { Card, CardContent, Typography, makeStyles } from '@mui/material';



const TravelBlock = ({ location, scenery, roadCondition, difficulty, roadType }) => {


    return (
        <Card >
            <CardContent>
                <Typography variant="h6" component="h2">
                    Location: {location}
                </Typography>
                <Typography variant="body1" component="p">
                    Scenery: {scenery}
                </Typography>
                <Typography variant="body1" component="p">
                    Road Condition: {roadCondition}
                </Typography>
                <Typography variant="body1" component="p">
                    Difficulty: {difficulty}
                </Typography>
                <Typography variant="body1" component="p">
                    Road Type: {roadType}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TravelBlock;
