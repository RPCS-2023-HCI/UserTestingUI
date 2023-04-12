import {Row, Col, Container, Card} from 'react-bootstrap';
import {useState} from 'react';
import LineChart from './LineChart';
import GPSTrackingWithButton from './GPSTrackingWithButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

function SimulationAnalysisPage() {
    const [input, setInput] = useState('');
    const [simulationId, setSimulationId] = useState('');
    const [showGraphs, setShowGraphs] = useState(false);

    const handleSearch = () => {
        setSimulationId(input);
        setShowGraphs(true);
    }

    return (
        <Container>
            <Col>
                <Row style={{width: '80vw', display: 'flex'}}>
                    <TextField
                        id="outlined-read-only-input"
                        label="Simulation ID"
                        placeholder='Enter Simulation ID'
                        style={{width: '60vw'}}
                        variant="standard"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button 
                        style={{marginLeft: '3vw', width: '10vw', height: '3vh', marginTop: '3vh'}}
                        onClick={handleSearch}
                    >
                        <SearchIcon />
                        <text style={{marginLeft: '0.5vw', fontSize: '1vw'}}>Look up</text>
                    </Button>
                </Row>
                {showGraphs && (
                    <Container>
                        <Row style={{width: '80vw', display: 'flex', marginTop: '5vh'}}>
                            <Card style={{width: '35vw'}}>
                                <LineChart dataType={"Speed"} simulationId={simulationId} title={"Speed of the Car Run Over Time"}/>
                            </Card>
                            <Card style={{width: '35vw', marginLeft: '6vw'}}>
                                <LineChart dataType={"Accel"} simulationId={simulationId} title={"Acceleration of the Car Run Over Time"}/>
                            </Card>
                        </Row>
                        <Row style={{marginTop: '10vh', width: '35vw'}}>
                            <GPSTrackingWithButton/>
                        </Row>
                    </Container>
                )}
            </Col>
        </Container>
    );
}

export default SimulationAnalysisPage;
