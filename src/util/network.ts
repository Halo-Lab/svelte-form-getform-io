import axios from "axios";
import { MultiFileArray } from "./classes";

export async function sendToGetForm(fields: any, getformId: string) {

    const formData = new FormData();
    let fileCounter = 0;
    for (const key in fields) {
        if (fields[key] instanceof MultiFileArray) {
            fields[key].files.forEach((file: File) => {
                formData.append('file' + fileCounter, file);
                fileCounter++;
            });
        } else {
            formData.append(key, fields[key]);
        }
    }

    await axios.post('https://getform.io/f/' + getformId, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        },
    });

}