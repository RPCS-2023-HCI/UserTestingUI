import {Row, Col, Container} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import GPSTrackingWithButton from './GPSTrackingWithButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import VisualizationCard from './VisualizationCard';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';


const SERVER = 'https://fwo91hdzog.execute-api.us-east-1.amazonaws.com/test/dynamodbmanager';

function SimulationAnalysisPage() {
    const [input, setInput] = useState('');
    const [simulationId, setSimulationId] = useState('');
    const [showGraphs, setShowGraphs] = useState(false);
    const [response, setResponse] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [allSimIds, setAllSimIds] = useState([]);
    const [compareResponse, setCompareResponse] = useState(null);
    const [compareId, setCompareId] = useState('');

    useEffect(() => {
        if (simulationId !== '') {
            fetchData();
        }
    }, [simulationId]);

    useEffect(() => {
        if (compareId !== '') {
            fetchCompareData();
        }
    }, [compareId]);

    useEffect(() => {
        if (response !== null) {
            if (response["Object"]["Item"] === undefined) {
                setNotFound(true);
            }
        }
    }, [response]);

    useEffect(() => {
        fetchAllSimIds();
    }, [allSimIds]);

    function fetchAllSimIds(){
        const data = {
            "operation": "search_ids"
        }
    
        fetch(SERVER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setAllSimIds(data?.IDs || []);
        })
        .catch((error) => {
            // console.error('Error:', error);
        });
    }    

    function fetchData(){
        const payload = {
            "Key": {
                "id": simulationId
            },
        }
        const data = {
            "operation": "read",
            "payload": payload
        }
    
        fetch(SERVER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setResponse(data);
            if (data["Object"]["Item"] === undefined) {
                setNotFound(true);
                setShowGraphs(false);
            } else {
                setShowGraphs(true);
            }
        })
        .catch((error) => {
            // console.error('Error:', error);
        });
    }    

    function fetchCompareData(){
        const payload = {
            "Key": {
                "id": compareId
            },
        }
        const data = {
            "operation": "read",
            "payload": payload
        }
    
        fetch(SERVER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            setCompareResponse(data);
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } 

    const handleSearch = () => {
        setNotFound(false);
        setShowGraphs(false);
        setSimulationId(input);
    }

    const handleCompareSearch = () => {
        setCompareId(input);
    }

    return (
        <Container>
            <Col>
                <Row style={{width: '80vw', display: 'flex'}}>
                    <Autocomplete
                        disableClearable
                        options={allSimIds}
                        renderInput={(params) => (
                            <TextField
                                variant="standard"
                                {...params}
                                label="Simulation ID"
                                placeholder='Enter Simulation ID'
                                style={{width: '60vw'}}
                                InputProps={{
                                ...params.InputProps,
                                type: 'search',
                                }}
                            />
                        )}
                        onChange={(e, value) => setInput(value)}
                    />
                    <Button 
                        style={{marginLeft: '3vw', width: '10vw', height: '3vh', marginTop: '3vh'}}
                        onClick={handleSearch}
                    >
                        <SearchIcon />
                        <text style={{marginLeft: '0.5vw', fontSize: '1vw'}}>Look up</text>
                    </Button>
                </Row>
                {notFound && (
                    <Row style={{marginTop: '1vh', width: '60vw'}}>
                        <Alert severity="error">Simulation not found, try different simulation Id!</Alert>
                    </Row>
                )}
                {!notFound && showGraphs && (
                    <Container>
                        <Card style={{width: '76vw', marginTop: '5vh', height: '50vh', borderRadius: '10px'}}>
                            <Row style={{width: '85vw', display: 'flex', marginTop: '2.5vh'}}>
                                <Typography variant="button" style={{marginLeft: '1.5vw', fontSize: '1.2vw', color: '#1870d5'}}>
                                    {"Current Test: " + simulationId}
                                </Typography>
                            </Row>
                            <VisualizationCard data={response} notFound={notFound}/>
                        </Card>

                        
                        <Card style={{width: '76vw', marginTop: '5vh', height: '50vh', borderRadius: '10px'}}>
                            <Row style={{width: '85vw', display: 'flex', marginTop: '2.5vh'}}>
                                <Typography variant="button" style={{marginLeft: '1.5vw', fontSize: '1.2vw', color: '#1870d5'}}>
                                    Compare To Test: 
                                </Typography>
                                <Autocomplete
                                    disablePortal
                                    options={allSimIds}
                                    sx={{ width: 300, marginLeft: '1vw' }}
                                    style={{ marginTop: '-2vh' }}
                                    renderInput={(params) => <TextField {...params} label="Simulation ID" variant="standard"/>}
                                    onChange={(e, value) => setCompareId(value)}
                                />
                            </Row>
                            {compareResponse !== null && (
                                <VisualizationCard data={compareResponse} notFound={notFound}/>
                            )}
                        </Card>

                        <Card style={{width: '76vw', marginTop: '5vh', height: '90vh', borderRadius: '10px'}}>
                            <Row style={{marginTop: '10vh', width: '35vw'}}>
                                <GPSTrackingWithButton data={response} />
                            </Row>
                        </Card>
                    </Container>
                )}
            </Col>
        </Container>
    );
}

export default SimulationAnalysisPage;
