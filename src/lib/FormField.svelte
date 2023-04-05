<script lang="ts">

export let title: string;
export let type: 'text' | 'email' | 'message' = 'text';
export let defaultValue: string = '';
export let errors: string[] = [];
export let errorText: Record<string, string> = {};

export let value: string = defaultValue;

let errorVisible: boolean = false;

</script>

<style lang="scss">

@import '../styles/variables.scss';
@import '../styles/mixins.scss';

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

    .errorIcon {
        @include clearDefaultStyle;
        @include clickable;
        position: absolute;
        width: 24px;
        height: 24px;
        top: 40px;
        right: 16px;
        background: url('../assets/icons/iconError.svg') no-repeat center;
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

    .formFieldError {
        position: absolute;
        top: 96px;
        width: 100%;
        z-index: 1;
        background: $colorError;
        color: $colorTextContrast;
        padding: 12px;
        border-radius: 14px;
        font-size: 16px;
        font-weight: 500;
        box-shadow: 0 4px 24px rgba(42, 42, 42, 12%);
        pointer-events: none;
        opacity: 0;
        transition: 0.25s ease opacity;
        &::before {
            content: '';
            position: absolute;
            display: block;
            width: 16px;
            height: 11px;
            top: -9px;
            right: 20px;
            background: url('../assets/icons/iconErrorTooltip.svg') no-repeat center;
            pointer-events: none;
        }

        
        &.visible {
            opacity: 1;
        }
    }

}

</style>

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
        <button class="errorIcon" 
            on:mouseover={() => errorVisible = true}
            on:mouseout={() => errorVisible = false}
            on:focus={() => errorVisible = true}
            on:blur={() => errorVisible = false}
        />
        <span class="formFieldError" class:visible={errorVisible}>
            {errorText[errors[0]] ?? errorText.default ?? 'Error!'}
        </span>
    {/if}
</div>