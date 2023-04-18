import {Row, Col, Container, Card} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import LineChart from './LineChart';
import GPSTrackingWithButton from './GPSTrackingWithButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';

const SERVER = 'https://fwo91hdzog.execute-api.us-east-1.amazonaws.com/test/dynamodbmanager';

function SimulationAnalysisPage() {
    const [input, setInput] = useState('');
    const [simulationId, setSimulationId] = useState('');
    const [showGraphs, setShowGraphs] = useState(false);
    const [response, setResponse] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [allSimIds, setAllSimIds] = useState([]);

    useEffect(() => {
        if (simulationId !== '') {
            fetchData();
        }
    }, [simulationId]);

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

    const handleSearch = () => {
        setNotFound(false);
        setShowGraphs(false);
        setSimulationId(input);
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
                                onChange={(e) => setInput(e.target.value)}
                            />
                        )}
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
                        <Row style={{width: '80vw', display: 'flex', marginTop: '5vh'}}>
                            <Card style={{width: '35vw'}}>
                                <LineChart dataType={"Speed"} data={response} title={"Speed of the Car Run Over Time"}/>
                            </Card>
                            <Card style={{width: '35vw', marginLeft: '6vw'}}>
                                <LineChart dataType={"Accel"} data={response} title={"Acceleration of the Car Run Over Time"}/>
                            </Card>
                        </Row>
                        <Row style={{marginTop: '10vh', width: '35vw'}}>
                            <GPSTrackingWithButton data={response} />
                        </Row>
                    </Container>
                )}
            </Col>
        </Container>
    );
}

export default SimulationAnalysisPage;
