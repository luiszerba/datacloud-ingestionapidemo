class SalesforceConnectAppUtilCredentials {

    constructor(username, password, clientId, clientSecret, orgDomain, dataCloudEndpoint) {

        this._username = username;
        this._password = password;
        this._clientId = clientId;
        this._clientSecret = clientSecret
        this._orgDomain = orgDomain;
        this._dataCloudEndpoint = dataCloudEndpoint;
    }

    toString() {
        console.log('clientId: ' + this._clientId);
        console.log('clientSecret: ' + this._clientSecret);
        console.log('username: ' + this._username);
        console.log('password: ' + this._password);
        console.log('orgDomain: ' + this._orgDomain);
        console.log('dataCloudEndpoint: ' + this._dataCloudEndpoint);
    }

    // Getter and setter for username
    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    // Getter and setter for password
    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    // Getter and setter for clientId
    get clientId() {
        return this._clientId;
    }

    set clientId(value) {
        this._clientId = value;
    }

    // Getter and setter for clientSecret
    get clientSecret() {
        return this._clientSecret;
    }

    set clientSecret(value) {
        this._clientSecret = value;
    }

    // Getter and setter for orgDomain
    get orgDomain() {
        return this._orgDomain;
    }

    set orgDomain(value) {
        this._orgDomain = value;
    }

    // Getter and setter for dataCloudEndpoint
    get dataCloudEndpoint() {
        return this._dataCloudEndpoint;
    }

    set dataCloudEndpoint(value) {
        this._dataCloudEndpoint = value;
    }

}

export default SalesforceConnectAppUtilCredentials;