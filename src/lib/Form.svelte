<script lang="ts">

import { form, field } from 'svelte-forms';
import { required, email, max } from 'svelte-forms/validators';
import { sendToGetForm } from '../util/network';
import { FormSubmitData } from '../util/types';

import FormField from './FormField.svelte';

export let getformId: string;
export let onFormSubmit: (data: FormSubmitData) => void = () => {};

let formSending = false;

const fieldName = field('name', '', [required(), max(32)]);
const fieldEmail = field('email', '', [required(), email()]);
const fieldMessage = field('message', '', [required(), max(512)]);

const formContact = form(fieldName, fieldEmail, fieldMessage);

async function sendForm () {
    await formContact.validate();
    if ($formContact.valid) {
        formSending = true;
        try {
            await sendToGetForm($formContact.summary, getformId);
            onFormSubmit({
                name: $fieldName.value,
                email: $fieldEmail.value,
                message: $fieldMessage.value,
            });
        } catch {}
        formSending = false;
    }
}

</script>

<style lang="scss">

@import '../styles/variables.scss';
@import '../styles/mixins.scss';

:global(.form *) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    @font-face {
        font-family: 'MacPawFixelText';
        src: url('../assets/fonts/MacPawFixelText-Regular.woff2') format('woff2');
        font-weight: 400;
    }
    @font-face {
        font-family: 'MacPawFixelText';
        src: url('../assets/fonts/MacPawFixelText-Medium.woff2') format('woff2');
        font-weight: 500;
    }
    @font-face {
        font-family: 'MacPawFixelText';
        src: url('../assets/fonts/MacPawFixelText-SemiBold.woff2') format('woff2');
        font-weight: 600;
    }
}

.form {
    @include flex(column, center, stretch, 40px);
    @include fillWidthUntil(446px);
    font-family: 'MacPawFixelText', sans-serif;

    .formFields {
        @include flex(column, center, stretch, 24px);
    }

    @media screen and (max-width: 768px) {
        gap: 32px;
    }
}

button {
   @include flex(row, center, center, 10px);
   @include clickable;
   @include clearDefaultStyle;
   
   padding: 14px 32px;
   border-radius: 10px;
   font-size: 16px;
   line-height: 150%;
   font-weight: 600;
   background: $colorPrimary;
   color: $colorTextContrast;
   transition: 0.25s ease;
   transition-property: color, background;

    &:hover {
        background: $colorPrimaryDark;
    }
    &:active {
        background: darken($colorPrimaryDark, 10%);
    }
    &:focus-visible {
        outline: 1px solid $colorTextPrimary;
    }

    &:disabled {
        background: $colorPrimaryMuted;
        color: $colorTextMuted;
        cursor: unset;
        pointer-events: none;
    }
}

.loader {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid $colorTextContrast;
    border-top-color: transparent;
    animation: spin 0.75s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>

<form class="form">
    <div class="formFields">
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
    </div>

    <button on:click={sendForm} disabled={!$formContact.valid || formSending}>
        {#if formSending}
            <div class="loader" />
        {:else}
            <span>Send form</span>
        {/if}
    </button>
</form>