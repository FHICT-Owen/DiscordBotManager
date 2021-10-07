const axios = require(`axios`);
const ip = require(`ip`);
const cn = require(`../functions/console.js`);

module.exports = {
  registerWithEureka: (appName, port) => {
    cn.log(`Eureka`, `Registering ${appName} with Eureka`);
    axios({
      method: `post`,
      headers: { 'content-type': `application/json` },
      url: `http://localhost:8761/eureka/apps/${appName}`,
      body: JSON.stringify({
        instance: {
          hostName: `localhost`,
          instanceId: `${appName}-${port}`,
          vipAddress: `${appName}`,
          app: `${appName.toUpperCase()}`,
          ipAddr: ip.address(),
          status: `UP`,
          port: {
            $: port,
            '@enabled': true
          },
          dataCenterInfo: {
            '@class': `com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo`,
            name: `MyOwn`
          }
        }
      })
    },
    (error) => {
      if (!error) {
        cn.log(`Eureka`,`Registered with Eureka`);
        setInterval(() =>{
          axios({
            method: `put`,
            headers: { 'content-type': `application/json` }[`content-type`],
            url: `http://localhost:8761/eureka/apps/${appName}/${appName}-${port}`,
          }, (error => {
            if (error) 
              console.log(`Sending heartbeat to Eureka failed.`);
            else 
              console.log(`Successfully sent heartbeat to Eureka.`);
            
          }));
        }, 50 * 1000);
      } else 
        cn.error(`Eureka`, `Not registered with eureka due to: ${error}`);
      
    }
    );
  }
};
