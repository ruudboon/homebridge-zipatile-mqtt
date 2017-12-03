var Service, Characteristic;
var mqtt = require('mqtt');

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-zipatile-mqtt", "zipatile-mqtt", AmbientLightLevel);
}

function AmbientLightLevel(log, config) {



  this.log = log;
  this.name = config["name"];
  this.url = config['url'];
  this.topic = 'zipato/zipatile/' + config['serial'] + '/allEvents';
  this.client_Id 		= 'homebridg_zipatile_mqtt' + Math.random().toString(16).substr(2, 8);
  this.options = {
    keepalive: 10,
    clientId: this.client_Id,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    serialnumber: config["serial"] || this.client_Id,
    max_temperature: config["maxTemperature"] || 100,
    min_temperature: config["minTemperature"] || -50,
    username: config["username"],
    password: config["password"],
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false
    },
    rejectUnauthorized: false
  };


  this.service = new Service.LightSensor(this.name);
  this.client  = mqtt.connect(this.url, this.options);


  var that = this;
  this.client.subscribe(this.topic);

  this.client.on('message', function (topic, payload) {
    // message is Buffer
    data = JSON.parse(payload.toString());
    if (data === null) {return null}
    switch (data.function){
      case 'LIGHT':
        that.light = parseFloat(data.value);
        that.service
          .setCharacteristic(Characteristic.CurrentAmbientLightLevel, that.light);
        break;
    }
    console.log("json", data);



  });

  this.client.on('connect', function(){
    console.log('MQTT connected');
  });



  this.service
    .getCharacteristic(Characteristic.CurrentAmbientLightLevel)
    .on('get', this.getState.bind(this));

  // this.service
  //   .getCharacteristic(Characteristic.CurrentTemperature)
  //   .setProps({minValue: this.options["min_temperature"]});
  //
  // this.service
  //   .getCharacteristic(Characteristic.CurrentTemperature)
  //   .setProps({maxValue: this.options["max_temperature"]});

}

AmbientLightLevel.prototype.getState = function(callback) {
  callback(null, this.light);
}

AmbientLightLevel.prototype.getServices = function() {
  return [this.service];
}