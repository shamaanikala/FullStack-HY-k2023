import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`,newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    console.log(`Yritetään poistaa yhteistieto ${id}`)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => {
        console.log(`remove response: ${response.data}`,{...response});
        return response
    })
}

export default { getAll, create, update, remove }