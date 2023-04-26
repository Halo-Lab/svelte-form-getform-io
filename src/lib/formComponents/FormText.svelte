<script lang="ts">

import Error from "$lib/components/Error.svelte";
import { getContext } from "svelte";
import type { Writable } from "svelte/store";
import type { Field } from "svelte-forms/types";
import type { TextField } from "../../util/types";

export let title: string;
export let type: 'text' | 'email' | 'message' = 'text';
export let errorText: Record<string, string> = {};

export let field: Field<TextField>;
export let globalClass: string = '';

const formInteracted = getContext<Writable<boolean>>('formInteracted');
$: shouldShowError = field.errors.length && $formInteracted;

</script>

<div class={"formField" + globalClass} class:error={shouldShowError}>
    <h4>{title}</h4>

    {#if type === 'message'}
        <textarea placeholder={title} bind:value={field.value}></textarea>
    {:else if type === 'email'}
        <input type="email" placeholder={title} bind:value={field.value} />
    {:else}
        <input type="text" placeholder={title} bind:value={field.value} />
    {/if}

    {#if shouldShowError}
        <Error errors={field.errors} errorText={errorText} />
    {/if}
</div>

<style lang="scss">

@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

.formField {

    @include flex(column, flex-start, flex-start, 8px);
    position: relative;

    &.error {

        input, textarea {
            outline: 1px solid $colorError;
            &:hover {
                outline: 1px solid $colorErrorDark;
            }
            &:focus {
                outline: 1px solid $colorTextPrimary;
            }
        }

        input {
            padding-right: 48px;
        }

    }

    input, textarea {
        @include clearDefaultStyle;
        background: $colorWhite;
        padding: 14px 16px;
        font-size: 16px;
        border-radius: 14px;
        color: $colorTextPrimary;
        width: 100%;
        outline: 1px solid $colorLight;

        &::placeholder {
            color: $colorTextPlaceholder;
        }

        &:hover {
            outline: 1px solid $colorTextPlaceholder;
        }
        &:focus {
            outline: 1px solid $colorTextPrimary;
        }
    }

    textarea {
        resize: none;
        height: 88px;
    }

    h4 {
        font-size: 14px;
        font-weight: 500;
        color: $colorTextPrimary;
    }

}

</style>