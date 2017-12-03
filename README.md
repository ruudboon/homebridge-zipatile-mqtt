# homebridge-mqtt-temperature

under construction
--------------------
this version only contains LUX meter 
--------------------

Get all zipatile data via MQTT in Homebridge

Installation
--------------------
    sudo npm install -g homebridge-zipatile-mgtt


Sample HomeBridge Configuration
--------------------
    {
      "bridge": {
        "name": "HomeBridge",
        "username": "AB:DC:12:3A:22:CE",
        "port": 51826,
        "pin": "321-45-123"
      },

      "description": "",

      "accessories": [
        {
          "accessory": "zipatile-mgtt",
          "name": "Zipatile",
          "serial": "ZT5SERIALNUMBER",
          "url": "mqtt://localhost",
          "username": "username",
          "password": "password"
        }
      ],

      "platforms": []
    }


---------------------

`serial` set this to the serial number of your zipatile

`username` and `password` are optional if you don't use MQTT authentication.


#### Credits

[homebridge-netatmo](https://github.com/planetk/homebridge-netatmo)
[homebridge-mqtt-temperature](https://github.com/mcchots/homebridge-mqtt-temperature)