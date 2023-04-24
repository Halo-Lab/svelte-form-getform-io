<script lang="ts">

import { form as formFunc } from 'svelte-forms';
import { sendToGetForm } from '../util/network';
import type { FormSubmitData } from '../util/types';

export let getformId: string;
export let form: ReturnType<typeof formFunc>;
export let onFormSubmit: (data: FormSubmitData) => void = () => {};

let formSending = false;

async function sendForm () {
    await form.validate();
    if ($form.valid) {
        formSending = true;
        try {
            await sendToGetForm($form.summary, getformId);
            onFormSubmit($form.summary);
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
        <slot></slot>
    </div>

    <button on:click={sendForm} disabled={!$form.valid || formSending}>
        {#if formSending}
            <div class="loader" />
        {:else}
            <span>Send form</span>
        {/if}
    </button>
</form>