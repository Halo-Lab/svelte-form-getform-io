<script lang="ts">

import Error from "$lib/components/Error.svelte";

export let title: string;
export let type: 'text' | 'email' | 'message' = 'text';
export let defaultValue: string = '';
export let errors: string[] = [];
export let errorText: Record<string, string> = {};

export let value: string = defaultValue;

</script>

<div class="formField" class:error={errors.length}>
    <h4>{title}</h4>

    {#if type === 'message'}
        <textarea placeholder={title} bind:value={value}></textarea>
    {:else if type === 'email'}
        <input type="email" placeholder={title} bind:value={value} />
    {:else}
        <input type="text" placeholder={title} bind:value={value} />
    {/if}

    {#if errors.length}
        <Error errors={errors} errorText={errorText} />
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

        &::placeholder {
            color: $colorTextPlaceholder;
        }

        &:hover {
            outline: 1px solid $colorLight;
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