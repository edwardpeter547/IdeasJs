import axios from 'axios';

class IdeasApi {
    constructor(){
        if (process.env.MODE === 'development')
            this._endpoint = 'http://localhost:5000/api/ideas';
        else
            this._endpoint = '/api/ideas';
    }

    getEndpoint(){
        return this._endpoint;
    }

    getIdeas(){
        return axios.get(this._endpoint)
    }

    createIdea(data){
        return axios.post(this._endpoint, data);
    }

    updateIdea(id, data){
        return axios.put(`${this._endpoint}/${id}`, data);
    }

    removeIdea(id){
        return axios.delete(`${this._endpoint}/${id}`);
    }
}


export default new IdeasApi();