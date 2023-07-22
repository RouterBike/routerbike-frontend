import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Button, Dialog, ListItemText, ListItem, List, Divider, AppBar, Toolbar, Slide, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import theme from '../../styles/theme';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TravelBlockList = () => {
    const [travelBlocks, setTravelBlocks] = useState([]);
    const [openDialogId, setOpenDialogId] = useState(null); // Store the ID of the clicked travel block dialog
    const [selectedScenery, setSelectedScenery] = useState('');
    const [filters, setFilters] = useState({ scenery: '', roadCondition: '', roadType: '', difficulty: '' }); // filters queries

    const handleClickOpen = (travelId) => {
        setOpenDialogId(travelId);
    };

    const handleClose = () => {
        setOpenDialogId(null);
    };

    const handleSceneryChange = (event) => {
        setSelectedScenery(event.target.value);
    };

    const handleEdit = async (event, travelId) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/travelBlocks/${travelId}`, {
                scenery: selectedScenery
            })

            // Handle the response if needed
            console.log(response.data);
        }
        catch (error) {
            // Handle any error that occurred during the request
            console.error(error);
        }

    }

    // Deletes travel blocks
    const handleDelete = async (event, travelId) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8080/api/travelBlocks/${travelId}`)

            // Handle the response if needed
            console.log(response.data);
        }
        catch (error) {
            // Handle any error that occurred during the request
            console.error(error);
        }

    }
    // Gets travels blocks and filters them with queries
    useEffect(() => {

        const fetchTravelBlocks = async () => {
            function addQuery(s, rc, rt, d) {
                let scenery = '';
                let roadCondition = '';
                let roadType = '';
                let difficulty = '';
                let clearQueryArray = [];
                let finalQuery = '';
                if (s !== '') scenery = "scenery=" + filters.scenery;
                if (rc !== '') roadCondition = "roadCondition=" + filters.roadCondition;
                if (rt !== '') roadType = "roadType=" + filters.roadType;
                if (d !== '') difficulty = "difficulty=" + filters.difficulty;
                let queryArray = [scenery, roadCondition, roadType, difficulty]
                queryArray.forEach((item) => {
                    if (item !== '') clearQueryArray.push(item);
                })
                for (let i = 0; i < clearQueryArray.length; i++) {
                    if (i === 0) finalQuery = "?" + clearQueryArray[i];
                    else finalQuery += "&" + clearQueryArray[i];
                }
                //console.log(finalQuery)
                return finalQuery;

            }
            try {
                const query = addQuery(filters.scenery, filters.roadCondition, filters.roadType, filters.difficulty);
                const response = await axios.get(`http://localhost:8080/api/travelBlocks${query}`);
                setTravelBlocks(response.data);
            } catch (error) {
                console.error('Error fetching travel blocks:', error);
            }
            console.log(filters)
        };

        fetchTravelBlocks();


        const interval = setInterval(fetchTravelBlocks, 1000); // Fetch every 1 second

        return () => {
            clearInterval(interval);
        };
    }, [filters]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel >Scenery</InputLabel>
                <Select
                    name='scenery'
                    value={filters.scenery}
                    onChange={handleFilterChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Beach'}>Beach</MenuItem>
                    <MenuItem value={'Mountain'}>Mountain</MenuItem>
                    <MenuItem value={'Forest'}>Forest</MenuItem>
                </Select>
                <FormHelperText>Filter Scenery</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel >Road Condition</InputLabel>
                <Select
                    name='roadCondition'
                    value={filters.roadCondition}
                    onChange={handleFilterChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Good'}>Good</MenuItem>
                    <MenuItem value={'Fair'}>Fair</MenuItem>
                    <MenuItem value={'Poor'}>Poor</MenuItem>
                </Select>
                <FormHelperText>Filter Road Condition</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel >Road Type</InputLabel>
                <Select
                    name='roadType'
                    value={filters.roadType}
                    onChange={handleFilterChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Highway'}>Highway</MenuItem>
                    <MenuItem value={'CountryRoad'}>CountryRoad</MenuItem>
                    <MenuItem value={'OffRoad'}>OffRoad</MenuItem>
                </Select>
                <FormHelperText>Filter Road Type</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel >Difficulty</InputLabel>
                <Select
                    name='difficulty'
                    value={filters.difficulty}
                    onChange={handleFilterChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Easy'}>Easy</MenuItem>
                    <MenuItem value={'Moderate'}>Moderate</MenuItem>
                    <MenuItem value={'Difficult'}>Difficult</MenuItem>
                </Select>
                <FormHelperText>Filter Difficulty</FormHelperText>
            </FormControl>
            {/* <Button variant="outlined" onClick={handleFilterChange}>
                FILTER
            </Button> */}
            <Grid container spacing={2}>
                {travelBlocks.map((travelBlock) => (
                    <Grid item xs={12} sm={6} md={4} key={travelBlock.id}>
                        <Dialog
                            fullScreen
                            open={openDialogId === travelBlock.id} // Check if the current dialog ID matches the opened dialog ID
                            onClose={handleClose}
                            TransitionComponent={Transition}
                        >
                            <AppBar sx={{ position: 'relative' }}>
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={handleClose}
                                        aria-label="close"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                        Travel Block
                                    </Typography>
                                    <Button autoFocus color="inherit" onClick={handleClose}>
                                        save
                                    </Button>
                                </Toolbar>
                            </AppBar>
                            <List>
                                <ListItem>
                                    <ListItemText primary={`Motorbike: ${travelBlock.userId}`} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary={`Location: ${travelBlock.location}`} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary={`Scenery: ${travelBlock.scenery}`} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary={`Road Condition: ${travelBlock.roadCondition}`} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary={`Road Type: ${travelBlock.roadType}`} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary={`Difficulty: ${travelBlock.difficulty}`} />
                                    <IconButton
                                        aria-label="edit"
                                        onClick={(e) => {
                                            e.stopPropagation();

                                        }}
                                        style={{ position: 'absolute', top: 0, right: 0 }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </ListItem>
                                <Divider />
                                {/* <ListItemText primary="Scenery" secondary={
                                    <Select value={selectedScenery} onChange={handleSceneryChange}>
                                        <MenuItem value="Beach">Beach</MenuItem>
                                        <MenuItem value="Mountain">Mountain</MenuItem>
                                        <MenuItem value="Forest">Forest</MenuItem>
                                    </Select>
                                } /> */}
                            </List>
                        </Dialog>
                        <Card onClick={() => handleClickOpen(travelBlock.id)} style={{ cursor: 'pointer', position: 'relative' }}>
                            <IconButton
                                color='secondary'
                                aria-label="delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(e, travelBlock.id);
                                }}
                                style={{ position: 'absolute', top: 0, right: 0 }}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {travelBlock.location}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Motorbike: {travelBlock.userId}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Scenery: {travelBlock.scenery}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Road Condition: {travelBlock.roadCondition}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Road Type: {travelBlock.roadType}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Difficulty: {travelBlock.difficulty}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default TravelBlockList;







