<script lang="ts">
import { Form, FormText, FormCheckbox, FormRadioGroup, FormSelect, FormFile } from '$lib';
import { filesRequired, checked } from '$lib/validators';
import type { FileField, TextField, CheckboxField, RadioGroupField, SelectField } from '$lib';
import { form, field } from 'svelte-forms';
import { required, email, max } from 'svelte-forms/validators';

const fieldName = field<TextField>('name', '', [required(), max(32)]);
const fieldEmail = field<TextField>('email', '', [required(), email()]);
const fieldMessage = field<TextField>('message', '', [required(), max(512)]);
const fieldTerms = field<CheckboxField>('terms', false, [checked()]);
const fieldSource = field<RadioGroupField>('source', '', [required()]);
const fieldCategory = field<SelectField>('category', '', [required()]);
const fieldImages = field<FileField>('images', undefined, [filesRequired()]);
const fieldOneImage = field<FileField>('oneImage', undefined, [filesRequired()]);

const formContact = form(
    fieldName, fieldEmail, fieldMessage, 
    fieldTerms, fieldSource, fieldCategory, 
    fieldOneImage, fieldImages
);
</script>

<style lang="scss">

@import '../styles/variables.scss';

:global(body) {
    background: $colorLighter;
}

:global(.formContact) {
    background: #fff;
}

</style>

<Form 
    getformId={import.meta.env.VITE_GETFORM_ID} 
    onFormSubmit={data => console.log(data)}
    form={formContact}
    globalClass="formContact"
>
    <FormText 
        title="Your Name" 
        type="text" 
        bind:field={$fieldName}
        errorText={{
            required: "Please enter your name",
            max: "The name is too long"
        }} 
    />
    <FormText 
        title="Email Address" 
        type="email" 
        bind:field={$fieldEmail}
        errorText={{
            required: "Please enter your email address",
            default: "Please enter a valid email address"
        }}
    />
    <FormText 
        title="Message" 
        type="message" 
        bind:field={$fieldMessage}
        errorText={{
            required: "Please enter a message",
            max: "The message is too long"
        }}
    />
    <FormCheckbox
        title="I agree to the Terms of Service"
        bind:field={$fieldTerms}
        errorText={{
            checked: "Please agree to the Terms of Service"
        }}
    />
    <FormRadioGroup
        title="How did you hear about us?"
        groupId="source"
        options={[
            { id: 'google', label: 'Google' },
            { id: 'facebook', label: 'Facebook' },
            { id: 'instagram', label: 'Instagram' },
            { id: 'other', label: 'Other' },
        ]}
        bind:field={$fieldSource}
        errorText={{
            required: "Please select an option"
        }}
    />
    <FormSelect
        title="Category"
        options={[
            { id: 'suggestions', label: 'Suggestions' },
            { id: 'bugs', label: 'Bugs' },
            { id: 'other', label: 'Other' },
            { id: 'suggestions1', label: 'Suggestions' },
            { id: 'bugs1', label: 'Bugs' },
            { id: 'other1', label: 'Other' },
            { id: 'suggestions2', label: 'Suggestions' },
            { id: 'bugs2', label: 'Bugs' },
            { id: 'other2', label: 'Other' },
        ]}
        bind:field={$fieldCategory}
        errorText={{
            required: "Please select a category"
        }}
    />
    <FormFile
        title="Images"
        accept="image/*"
        multiple
        description="Supported formates: JPEG, PNG, GIF, WEBP"
        bind:field={$fieldImages}
        errorText={{
            filesRequired: "Please upload at least one image"
        }}
    />
</Form>