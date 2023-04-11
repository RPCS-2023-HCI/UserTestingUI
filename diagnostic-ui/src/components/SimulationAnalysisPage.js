import {Row, Col, Container, Card} from 'react-bootstrap';
import LineChart from './LineChart';
import GPSMap from './GPSMap';
import GPSTrackingWithButton from './GPSTrackingWithButton';

function SimulationAnalysisPage() {
  return (
    <Container>
        <Col>
            <Row style={{width: '100vw', display: 'flex'}}>
                <Card style={{width: '50vw', backgroundColor: '#f8f9fa'}}>
                    <LineChart dataType={"Speed"} simulationId={"ExampleGraphTest"}/>
                </Card>
                <Card style={{width: '50vw', backgroundColor: '#f8f9fa'}}>
                    <LineChart dataType={"Accel"} simulationId={"ExampleGraphTest"}/>
                </Card>
            </Row>
            <Row>
                {/* <GPSMap simID={"sim1"}/> */}
                <GPSTrackingWithButton/>
            </Row>
        </Col>
    </Container>
  );
}

export default SimulationAnalysisPage;