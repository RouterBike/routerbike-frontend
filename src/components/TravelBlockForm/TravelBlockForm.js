import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const TravelBlockForm = () => {
    const [userId, setUserId] = useState(undefined);
    const [location, setLocation] = useState(undefined);
    const [scenery, setScenery] = useState(undefined);
    const [roadCondition, setRoadCondition] = useState(undefined);
    const [roadType, setRoadType] = useState(undefined);
    const [difficulty, setDifficulty] = useState(undefined);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Call an API method to create the travel block
            const response = await axios.post('http://localhost:8080/api/travelBlocks', {
                userId,
                location,
                scenery,
                roadCondition,
                roadType,
                difficulty
            });

            // Handle the response if needed
            console.log(response.data);

            // Reset the form after successful submission
            setUserId(undefined);
            setLocation(undefined);
            setScenery(undefined);
            setRoadCondition(undefined);
            setRoadType(undefined);
            setDifficulty(undefined);

        } catch (error) {
            // Handle any error that occurred during the request
            console.error(error);
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ margin: '15px' }}>
                Create Travel Block
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Travel Block</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            value={userId}
                            onChange={(event) => setUserId(event.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Location"
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                            required
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel>Scenery</InputLabel>
                            <Select value={scenery} onChange={(event) => setScenery(event.target.value)} required>
                                <MenuItem value="Mountain">Mountain</MenuItem>
                                <MenuItem value="Beach">Beach</MenuItem>
                                <MenuItem value="Forest">Forest</MenuItem>
                                {/* Add more options as needed */}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Road Condition</InputLabel>
                            <Select value={roadCondition} onChange={(event) => setRoadCondition(event.target.value)} required>
                                <MenuItem value="Good">Good</MenuItem>
                                <MenuItem value="Fair">Fair</MenuItem>
                                <MenuItem value="Poor">Poor</MenuItem>
                                {/* Add more options as needed */}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Road Type</InputLabel>
                            <Select value={roadType} onChange={(event) => setRoadType(event.target.value)} required>
                                <MenuItem value="Highway">Highway</MenuItem>
                                <MenuItem value="CountryRoad">Country Road</MenuItem>
                                <MenuItem value="OffRoad">Off-Road</MenuItem>
                                {/* Add more options as needed */}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Difficulty</InputLabel>
                            <Select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} required>
                                <MenuItem value="Easy">Easy</MenuItem>
                                <MenuItem value="Moderate">Moderate</MenuItem>
                                <MenuItem value="Difficult">Difficult</MenuItem>
                                {/* Add more options as needed */}
                            </Select>
                        </FormControl>
                        {/* <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button> */}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={(e) => {
                        handleSubmit(e);
                        handleClose();
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TravelBlockForm;








