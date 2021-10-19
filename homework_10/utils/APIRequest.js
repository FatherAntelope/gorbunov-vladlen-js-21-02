class APIRequest {
    constructor(baseApiURL) {
        this._baseApiURL = baseApiURL;
    }

    get baseApiURL() {
        return this._baseApiURL;
    }

    async getDataResponsePost(apiURL, body) {
        return await this._getResponseFromPostRequest(apiURL, body)
            .then(response => response.json())
            .then(json => json.data)
            .catch(console.log);
    }

    async _getResponseFromPostRequest(apiURL, body) {
        const method = "POST";
        const options = {
            method,
            body
        };
        const response = await fetch(this._baseApiURL + apiURL, options);
        if(response.ok) {
            return response;
        } else {
            throw new Error(`Ошибка запроса: ${response.statusText}`);
        }
    }
}

export {APIRequest};