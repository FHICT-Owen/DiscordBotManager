const axios = require(`axios`);
const ip = require(`ip`);
const cn = require(`../functions/console.js`);

module.exports = {
  registerWithEureka(appName, port) {
    cn.log(`Eureka`, `Registering ${appName} with Eureka`);

    const body = JSON.stringify({
      "instance": {
        "hostName": `localhost`,
        "instanceId": `${appName}-${port}`,
        "vipAddress": `${appName}`,
        "app": `${appName.toUpperCase()}`,
        "ipAddr": `${ip.address()}`,
        "status": `UP`,
        "port": {
          $: `${port}`,
          '@enabled': true
        },
        "dataCenterInfo": {
          '@class': `com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo`,
          "name": `MyOwn`
        }
      }
    });

    const config = {
      method: `post`,
      url: `http://localhost:8761/eureka/apps/${appName}`,
      headers: {
        'Content-Type': `application/json`
      },
      data: body
    };

    axios(config)
      .then(
        cn.success(`Eureka`, `Registered with Eureka.`),
        setInterval(() => {
          axios({
            method: `put`,
            headers: { 'content-type': `application/json` },
            url: `http://localhost:8761/eureka/apps/${appName}/${appName}-${port}`,
          })
            .then((msg) => {
              if(msg.status === 200) 
                cn.success(`Eureka`, `Successfully sent heartbeat to Eureka.`);                
            }).catch(() => {
              cn.error(`Eureka`, `Sending heartbeat to Eureka failed.`);
            });
        }, 50 * 1000))
      .catch((err) => {
        cn.error(`Eureka`, `Not registered with eureka due to: ${err}`);
      });    
  }
};
