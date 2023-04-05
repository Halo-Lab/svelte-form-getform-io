# Svelte Simple Form Package

## Requirements
- Svelte project ready to go
- [Getform API key](https://getform.io/)

## Installation

```bash
npm install @halo-lab/svelte-form-getform-io
```

## Usage

```svelte
<script>
  import { Form } from "@halo-lab/svelte-form-getform-io";
</script>

<Form 
    getformId="your-getform-id"
    onFormSubmit={(data) => console.log(data.name, data.email, data.message)}
/>
```

## Documentation

### `Form`

The base form component

| Prop | Type | Description |
| --- | --- | --- |
| `getformId` | `string` | Getform API key |
| `onFormSubmit` | `(data: FormSubmitData) => void = ()` | Callback function to handle form submit |

### `FormSubmitData`

Data type for the `onFormSubmit` callback

```typescript
{
    name: string;
    email: string;
    message: string;
}
```

## Word from the author

Have fun ✌️

<a href="https://www.halo-lab.com/?utm_source=github">
  <img
    src="https://dgestran.sirv.com/Images/supported-by-halolab.png"
    alt="Supported by Halo lab"
    height="60"
  >
</a>

<img src="https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png" height=5>