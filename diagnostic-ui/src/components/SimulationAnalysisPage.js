import {Row, Col, Container, Card} from 'react-bootstrap';
import LineChart from './LineChart';
import GPSMap from './GPSMap';
import GPSTrackingWithButton from './GPSTrackingWithButton';

function SimulationAnalysisPage() {
  return (
    <Container>
        <Col>
            <Row style={{width: '80vw', display: 'flex'}}>
                <h4 style={{marginLeft: '9vw'}}>Speed of the Car Run Over Time</h4>
                <h4 style={{marginLeft: '24vw'}}>Acceleration of the Car Run Over Time</h4>
            </Row>
            <Row style={{width: '80vw', display: 'flex'}}>
                <Card style={{width: '35vw'}}>
                    <LineChart dataType={"Speed"} simulationId={"ExampleGraphTest"}/>
                </Card>
                <Card style={{width: '35vw', marginLeft: '6vw'}}>
                    <LineChart dataType={"Accel"} simulationId={"ExampleGraphTest"}/>
                </Card>
            </Row>
            <Row style={{marginTop: '10vh', width: '80vw'}}>
                <h4 style={{marginLeft: '10vw'}}>GPS Tracking Trace of the Car</h4>
                <GPSTrackingWithButton/>
            </Row>
        </Col>
    </Container>
  );
}

export default SimulationAnalysisPage;