<script lang="ts">
import { Form, FormField, FormCheckbox, FormRadioGroup, FormSelect } from '$lib';
import { form, field } from 'svelte-forms';
import { required, email, max } from 'svelte-forms/validators';

const fieldName = field('name', '', [required(), max(32)]);
const fieldEmail = field('email', '', [required(), email()]);
const fieldMessage = field('message', '', [required(), max(512)]);
const fieldTerms = field('terms', false, [required()]);
const fieldThe = field('the', '', [required()]);
const fieldCategory = field('category', '', [required()]);

const formContact = form(fieldName, fieldEmail, fieldMessage, fieldTerms, fieldThe, fieldCategory);
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
    />
    <FormSelect
        title="Category"
        options={[
            { id: 'suggestions', label: 'Suggestions' },
            { id: 'bugs', label: 'Bugs' },
            { id: 'other', label: 'Other' }
        ]}
        bind:value={$fieldCategory.value}
    />
</Form>