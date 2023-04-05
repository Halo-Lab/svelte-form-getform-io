import axios from "axios";

export async function sendToGetForm(fields: any, getformId: string) {
    await axios.post('https://getform.io/f/' + getformId, fields, { headers: { 'Accept': 'application/json' }});
}