export function unchecked () {
    return (value: boolean) => ({ valid: value === true, name: 'unchecked' })
}