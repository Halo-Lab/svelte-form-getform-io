<script lang="ts">
import { Form, FormField, FormCheckbox, FormRadioGroup, FormSelect, FormFile, checked, MultiFileArray, filesRequired } from '$lib';
import { form, field } from 'svelte-forms';
import { required, email, max } from 'svelte-forms/validators';

const fieldName = field('name', '', [required(), max(32)]);
const fieldEmail = field('email', '', [required(), email()]);
const fieldMessage = field('message', '', [required(), max(512)]);
const fieldTerms = field('terms', false, [checked()]);
const fieldThe = field('the', '', [required()]);
const fieldCategory = field('category', '', [required()]);
const fieldImages = field('images', new MultiFileArray());
const fieldOneImage = field('oneImage', new MultiFileArray(), [filesRequired()]);

const formContact = form(
    fieldName, fieldEmail, fieldMessage, 
    fieldTerms, fieldThe, fieldCategory, 
    fieldOneImage, fieldImages
);
</script>

<style lang="scss">

@import '../styles/variables.scss';

:global(body) {
    background: $colorLighter;
}

</style>

<Form 
    getformId={import.meta.env.VITE_GETFORM_ID} 
    onFormSubmit={data => console.log(data)}
    form={formContact}
>
    <FormField 
        title="Your Name" 
        type="text" 
        bind:value={$fieldName.value} 
        errors={$fieldName.errors} 
        errorText={{
            required: "Please enter your name",
            max: "The name is too long"
        }} 
    />
    <FormField 
        title="Email Address" 
        type="email" 
        bind:value={$fieldEmail.value} 
        errors={$fieldEmail.errors}
        errorText={{
            required: "Please enter your email address",
            default: "Please enter a valid email address"
        }}
    />
    <FormField 
        title="Message" 
        type="message" 
        bind:value={$fieldMessage.value} 
        errors={$fieldMessage.errors}
        errorText={{
            required: "Please enter a message",
            max: "The message is too long"
        }}
    />
    <FormCheckbox
        title="I agree to the Terms of Service"
        bind:value={$fieldTerms.value}
        errors={$fieldTerms.errors}
        errorText={{
            checked: "Please agree to the Terms of Service"
        }}
    />
    <FormRadioGroup
        title="Select the"
        groupId="the"
        options={[
            { id: 'first', label: 'First' },
            { id: 'second', label: 'Second' },
            { id: 'third', label: 'Third' }
        ]}
        bind:value={$fieldThe.value}
        errors={$fieldThe.errors}
        errorText={{
            required: "Please select the"
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
        bind:value={$fieldCategory.value}
        errors={$fieldCategory.errors}
        errorText={{
            required: "Please select a category"
        }}
    />
    <FormFile
        title="Images"
        accept="image/*"
        description="Supported formates: JPEG, PNG, GIF, PDF, Word"
        bind:value={$fieldImages.value}
        errors={$fieldImages.errors}
        errorText={{
            filesRequired: "Please upload at least one image"
        }}
    />
    <FormFile
        title="Audio File"
        accept="audio/*"
        multiple={false}
        bind:value={$fieldOneImage.value}
        errors={$fieldOneImage.errors}
        errorText={{
            filesRequired: "Please upload an audio"
        }}
    />
</Form>