/* mqtt stuff */
/* sketchy way to include mqtt libraries without needing to manually compile
 * them ourselves
 */

/* i don't really know how to javascript, i just copy paste stuff from
 * stackoverflow */
function MQTTManagerConstructor() {
  this.mqtt = require('precompiled-mqtt');

  this.connect = function() {
    this.client = this.mqtt.connect('mqtt://funwithrobots1.andrew.cmu.edu', {
      // this.client = 
      username: 'hci',
      password: 'human computer interaction',
      port: 1884
    });
  };

  this.test = (new_state) => {
    if (this.client) {
      let payload = JSON.stringify({go: new_state});
      console.log(payload);
      this.client.publish('vehicle', payload, error => {
        if (error) {
          console.log("pub error", error);
        }
      });
      console.log('it worked');
    } else{
      console.log('rip ded');
    }
  };

  return this;
}

/* the api that we export */
var MQTTManager = MQTTManager || (new MQTTManagerConstructor());
export default MQTTManager;
