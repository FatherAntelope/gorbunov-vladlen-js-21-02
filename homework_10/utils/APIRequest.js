class APIRequest {
    constructor(mainApiURL) {
        this._mainApiURL = mainApiURL;
    }

    get mainApiURL() {
        return this._mainApiURL;
    }

    async getDataResponsePost(apiPoint, body) {
        return await this._getResponseFromPostRequest(apiPoint, body)
            .then(response => response.json())
            .then(json => json.data)
            .catch(console.log);
    }

    async _getResponseFromPostRequest(apiPoint, body) {
        const method = "POST";
        const options = {
            method,
            body
        };
        const response = await fetch(this._mainApiURL + apiPoint, options);
        if(response.ok) {
            return response;
        } else {
            throw new Error(`Ошибка запроса: ${response.statusText}`);
        }
    }
}

export {APIRequest};