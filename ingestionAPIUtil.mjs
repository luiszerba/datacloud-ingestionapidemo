
import SalesforceConnectAppUtilCredentials from './salesforceConnectAppUtilCredentials.mjs';
import axios from 'axios';

class IngestionAPIUtil{

    loginUrl = 'https://login.salesforce.com/services/oauth2/token';

    constructor(connectedAppCredentials){
        this._connectedAppCredentials = connectedAppCredentials;
    }

    get connectedAppCredentials(){
        return this._connectedAppCredentials;
    }

    async getAccessToken(){

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${this.loginUrl}?grant_type=password&client_id=${this.connectedAppCredentials.clientId}&client_secret=${this.connectedAppCredentials.clientSecret}&username=${this.connectedAppCredentials.username}&password=${this.connectedAppCredentials.password}`
        };

        try{
            console.log(JSON.stringify(config));
            const response = await axios.request(config);
            const token = response.data.access_token;
            return token;

            /*return new Promise((resolve,reject) => {
                axios.request(config)
                .then((response) => {
                   const token = response.data.access_token;
                   console.log('[access token]:'+token);
                   resolve(token);
                })
                .catch((error)=>{
                    console.log(error);
                    reject(error);
                });
            });*/
            
        } catch(error){
            console.log(error);
            throw error;
        }
    }

    async getCustomer360Token(){

        const token = await this.getAccessToken();
        const customer360URL = `${this.connectedAppCredentials.orgDomain}/services/a360/token`;

        let config = {
            method: 'post',
            headers: {
                'Content-Type': 'x-www-form-urlencoded'
            },
            url: `${customer360URL}?grant_type=urn:salesforce:grant-type:external:cdp&subject_token_type=urn:ietf:params:oauth:token-type:access_token&subject_token=${token}`
        };

        try{
            const response = await axios.request(config);
            const customer360Token = response.data.access_token;

            return customer360Token;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async sendData(accessToken,payload){
        
        const dataCloudEndpoint = this.connectedAppCredentials.dataCloudEndpoint;
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        try{
            const response = await axios.post(dataCloudEndpoint, payload, { headers });
            console.log(`sendData()>>>`+JSON.stringify(response.data));
            return JSON.stringify(response.data.accepted);

        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

export default IngestionAPIUtil;