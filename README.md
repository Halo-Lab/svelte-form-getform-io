# @halo-lab/svelte-form-getform-io

This is a Svelte form component library, intended to be used with [Getform](https://getform.io/) and [svelte-forms](https://chainlist.github.io/svelte-forms). It provides a number of components (such as inputs, checkboxes, etc.) that intergrate with svelte-forms fields, a wrapper Form component that integrates with Getform, as well as helpful custom validators for svelte-forms.

## Requirements
- Svelte project ready to go
- [Getform API key](https://getform.io/)

## Installation

```bash
npm install svelte-forms @halo-lab/svelte-form-getform-io
```

## Usage

### Setting up svelte-forms

To create your form, you would first need to create all your svelte-forms fields. Our package provides 5 basic types of fields:
- `TextField` - a regular text input or a textarea
- `CheckboxField` - a checkbox
- `RadioGroupField` - a radio button group
- `SelectField` - a selection box with a search bar
- `FileField` - a file input

Here is how to initialize all of these types in svelete-forms:

```svelte
<script>
  import type { TextField, CheckboxField, RadioGroupField, SelectField, FileField } from "@halo-lab/svelte-form-getform-io";
  import { form, field } from 'svelte-forms';

  const fieldName = field<TextField>('name', ''); // accepts a string as the initial value
  const fieldTerms = field<CheckboxField>('terms', false); // accepts a boolean as the initial value
  const fieldRadio = field<RadioGroupField>('radio', ''); // accepts a string (id of the selected option or empty) as the initial value
  const fieldCategory = field<SelectField>('category', ''); // accepts a string (id of the selected option or empty) as the initial value
  const fieldImages = field<FileField>('images', undefined); // accepts undefined as the initial value

  const myForm = form(
    fieldName, fieldTerms, fieldRadio, fieldCategory, fieldImages
  );
</script>
```

Notice that all of the fields are put into a single `form` function. This is a requirement of svelte-forms.


### Setting up the form

After you have created your fields, you can now create a form. To do this, you would need to import the `Form` component from our package and pass it your Getform API key and optionally the `onFormSubmit` callback function.

Inside the `Form` component, you can now pass all of your fields as props to the corresponding components. All of the components accept a `title` prop, which is the label of the field, a `field` prop, which binds the field to the component, as well as other props, which are specific to the component.

```svelte
<script>
  // add this to your imports
  import { Form, FormText, FormCheckbox, FormRadioGroup, FormSelect, FormFile } from "@halo-lab/svelte-form-getform-io";
</script>

<Form 
  getformId="your-getform-id"
  onFormSubmit={(data) => console.log(data.name, data.terms, data.category)}
>
  <FormText 
    title="Your Name" 
    type="text" 
    bind:field={$fieldName}
  />
  <FormCheckbox
    title="I agree to the Terms of Service"
    bind:field={$fieldTerms}
  />
  <FormRadioGroup
    title="Radio"
    groupId="radio"
    options={[
        { id: 'first', label: 'First' },
        { id: 'second', label: 'Second' },
        { id: 'third', label: 'Third' }
    ]}
    bind:field={$fieldRadio}
  />
  <FormSelect
    title="Category"
    options={[
        { id: 'suggestions', label: 'Suggestions' },
        { id: 'bugs', label: 'Bugs' },
        { id: 'other', label: 'Other' },
    ]}
    bind:field={$fieldCategory}
  />
  <FormFile
    title="Images"
    accept="image/*"
    multiple
    description="Supported formates: JPEG, PNG, GIF, WEBP"
    bind:field={$fieldImages}
  />
</Form>
```

### Validation

Usually, you would want to validate your form before submitting it. To do this, svelte-forms package provides a number of validators. Validators are functions that can be provided to the field as an array. Here's an example:

```typescript
const fieldName = field<TextField>('name', '', [required(), max(32)]); // must not be empty and must not be shorter than 32 characters
```

Our package also provides a number of custom validators, which are:
- `checked` - for validating checkboxes
- `fileRequired` - for validating file inputs

```typescript
// add this to your imports
import { checked, fileRequired } from "@halo-lab/svelte-form-getform-io/validators";

const fieldTerms = field<CheckboxField>('terms', false, [checked()]); // must be checked
const fieldImages = field<FileField>('images', undefined, [fileRequired()]); // must have at least one file attached
```

Additionally, you can create your own custom validators. More information on this can be found on the [official svelte-forms docs](https://chainlist.github.io/svelte-forms/#custom-validator).


### Custom Error Messages

By default, when a UI component fails validation, it will display a generic error message. You can override the error message for each validator individually by passing it an object to the `errorText` prop of the component. Here's an example:

```svelte
<FormText 
  title="Your Name" 
  type="text" 
  bind:field={$fieldName}
  errorText={{
    required: 'This field is required', // this message will be displayed if the field is empty
    max: 'This field must not be longer than 32 characters' // this message will be displayed if the name is too long
    default: 'This field is invalid' // fallback message
  }}
/>
```

## Documentation

### Components

- `Form`

  The base form component. It acts as a holder for all of the other components, such as inputs and checkboxes.

  | Prop | Type | Description |
  | --- | --- | --- |
  | `getformId` | `string` | Getform API key |
  | `onFormSubmit` | `(data: FormSubmitData) => void = ()` | Callback function to handle form submit |

- `FormText`

  A text input component. You can use this components for simple inputs, emails or long messages.

  | Prop | Type | Description |
  | --- | --- | --- |
  | `title` | `string` | Input title |
  | `type` | `'text' | 'email' | 'message' = 'text'` | Input type. Defaults to `text` |
  | `field` | `Field<TextField>` | svelte-forms field to bind the input to |
  | `errorText` | `{ [key: string]: string } = {}` | Custom error messages for validators |

- `FormCheckbox`

  A checkbox component.

  | Prop | Type | Description |
  | --- | --- | --- |
  | `title` | `string` | Checkbox label |
  | `field` | `Field<CheckboxField>` | svelte-forms field to bind the checkbox to |
  | `errorText` | `{ [key: string]: string } = {}` | Custom error messages for validators |

- `FormRadioGroup`

  A radio group components. You can use this component to let the user choose an option out of a few.

  | Prop | Type | Description |
  | --- | --- | --- |
  | `title` | `string` | Radio group title |
  | `groupId` | `string` | Radio group ID. This should be unique for every component |
  | `options` | `RadioGroupOption[] = []` | Radio group options. An option is an object that contains `id` and `label` fields. Option ids must be unique relative to the component |
  | `field` | `Field<RadioGroupField>` | svelte-forms field to bind the radio group to |
  | `errorText` | `{ [key: string]: string } = {}` | Custom error messages for validators |

- `FormSelect`

  A selection box with a search bar. You can use this component to let the user choose an option out of a large list.

  | Prop | Type | Description |
  | --- | --- | --- |
  | `title` | `string` | Select title |
  | `options` | `SelectOption[] = []` | Select options. An option is an object that contains `id` and `label` fields. Option ids must be unique relative to the component |
  | `defaultText` | `string = 'Select an option'` | Text to display when no option is selected |
  | `field` | `Field<SelectField>` | svelte-forms field to bind the select to |
  | `errorText` | `{ [key: string]: string } = {}` | Custom error messages for validators |

- `FormFile`

  A file input component with a dropzone and a list of selected files. It can be customized to accept multiple files and files of a specific type.

  | Prop | Type | Description |
  | --- | --- | --- |
  | `title` | `string` | File input title |
  | `description` | `string` | Text to display inside the dropzone. We recommend using this prop to specify the accepted file formats |
  | `accept` | `string = '*'` | File formats to accept. Defaults to all formats |
  | `multiple` | `boolean = false` | Whether to accept multiple files |
  | `field` | `Field<FileField>` | svelte-forms field to bind the file input to |
  | `errorText` | `{ [key: string]: string } = {}` | Custom error messages for validators |


### Field types

- `TextField`
  Data type for text inputs. It is a string.

- `CheckboxField`
  Data type for checkboxes. It is a boolean.

- `RadioGroupField`
  Data type for radio groups. It is a string.

- `SelectField`
  Data type for select boxes. It is a string.

- `FileField`
  Data type for file inputs. It can be undefined or an instance of an internal file list class.


### Validators

These types should be imported from `@halo-lab/svelte-form-getform-io/validators`.

- `checked`
  This validator returns an error if the checkbox is not checked (another words, if the value is not `true`).

- `fileRequired`
  This validator returns an error if the file list is empty.


### Other types

- `FormSubmitData`

  Data type for the `onFormSubmit` callback

  ```typescript
  {
      name: string;
      email: string;
      message: string;
  }
  ```

- `RadioGroupOption`

  Data type for radio group options

  ```typescript
  {
      id: string;
      label: string;
  }
  ```

- `SelectOption`

  Data type for select options

  ```typescript
  {
      id: string;
      label: string;
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