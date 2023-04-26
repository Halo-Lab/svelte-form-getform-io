import { MultiFileArray } from "../util/classes";

export function checked () {
    return (value: boolean) => ({ valid: value === true, name: 'checked' })
}

export function filesRequired () {
    return (value: MultiFileArray) => ({ valid: 
        value instanceof MultiFileArray && 
        value.getFileCount() > 0, 
    name: 'filesRequired' })
}