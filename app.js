import express from 'express';

import SalesforceConnectAppUtilCredentials from './salesforceConnectAppUtilCredentials.mjs';
import IngestionAPIUtil from './ingestionAPIUtil.mjs';
import DataFactory from './dataFactory.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const defaultValue = 30;

// Form page route
app.get('/', (req, res) => {

    res.render('form', { defaultValue });
});

// Authentication route
app.post('/sendPayload', async (req, res) => {
  try {
    const { clientID, clientSecret, username, password, orgDomain, dataCloudEndpoint, quantidadeMensagens } = req.body;
    
    const salesforceConnectAppUtilCredentials = 
        new SalesforceConnectAppUtilCredentials(username,password,clientID,clientSecret,orgDomain,dataCloudEndpoint);
    const ingestionAPIUtil = new IngestionAPIUtil(salesforceConnectAppUtilCredentials);

    const payload = new DataFactory().generateRandomData(quantidadeMensagens);
    console.log(`[payload]:${payload}`);

    //const token = await ingestionAPIUtil.getAccessToken();
    const token = await ingestionAPIUtil.getCustomer360Token();
    const respostaSolicitacao = await ingestionAPIUtil.sendData(token, payload);
    if(respostaSolicitacao){
        res.render('successfull');
    }else{
        res.send('Ocorreu um erro');
    }

  } catch (error) {
    console.error('Error authenticating:', error.message);
    res.send(`<h1>Error authenticating: ${error.message}</h1>`);
  }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  //console.log(`Server running on http://localhost:${port}`);
});
