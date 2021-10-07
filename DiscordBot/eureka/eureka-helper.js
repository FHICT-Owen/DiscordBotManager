const axios = require('axios');
const ip = require('ip');

module.exports = {
  registerWithEureka: (appName, port) => {
    console.log(`Registering ${appName} with Eureka`);
    axios({
      method: 'post',
      headers: { 'content-type': 'application/json' },
      baseURL: 'http://localhost:8761/eureka',
      url: `/apps/${appName}`,
      body: JSON.stringify({
        instance: {
          hostName: 'localhost',
          instanceId: `${appName}-${port}`,
          vipAddress: `${appName}`,
          app: `${appName.toUpperCase()}`,
          ipAddr: ip.address(),
          status: 'UP',
          port: {
            $: port,
            '@enabled': true
          },
          dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn'
          }
        }
      })
    },
    (error) => {
      if (!error) {
        console.log('Registered with Eureka');
        setInterval(() =>{
          axios({
            method: 'put',
            headers: { 'content-type': 'application/json' }['content-type'],
            baseURL: 'http://localhost:8761/eureka',
            url: `/apps/${appName}/${appName}-${port}`,
          }, (error => {
            if (error) {
              console.log('Sending heartbeat to Eureka failed.');
            } else {
              console.log('Successfully sent heartbeat to Eureka.');
            }
          }));
        }, 50 * 1000);
      } else {
        console.log(`Not registered with eureka due to: ${error}`);
      }
    }
    );
  }
};
