<script lang="ts">

import Error from "../components/Error.svelte";
import { getContext } from "svelte";
import type { Writable } from "svelte/store";
import type { Field } from "svelte-forms/types";
import type { RadioGroupOption, RadioGroupField } from "../../util/types";

export let title: string;
export let groupId: string;
export let options: RadioGroupOption[] = [];
export let errorText: Record<string, string> = {};

export let field: Field<RadioGroupField>;
export let globalClass: string = '';

const formInteracted = getContext<Writable<boolean>>('formInteracted');
$: shouldShowError = field.errors.length && $formInteracted;

</script>

<div class={"component" + globalClass} class:error={shouldShowError}>
    <h4>{title}</h4>

    {#each options as option}
        <label class="label">
            <input type="radio" value={option.id} name={groupId} bind:group={field.value} />
            <button class="radioVis" on:click={() => field.value = option.id}></button>
            <span class="labelText">{option.label}</span>
        </label>
    {/each}

    {#if shouldShowError}
        <Error errors={field.errors} errorText={errorText} iconTop={-4} />
    {/if}
</div>

<style lang="scss">

@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

.component {
    
    @include flex(column, flex-start, flex-start, 8px);
    position: relative;

    &.error {
        .label .radioVis {
            border: 2px solid $colorError;
        }
        padding-right: 48px;
    }

    h4 {
        font-size: 14px;
        font-weight: 500;
        color: $colorTextPrimary;
    }

    .label {
        @include flex(row, flex-start, center, 12px);
        @include clickable;

        input[type=radio] {
            display: none;
        }

        .radioVis {
            @include clearDefaultStyle;
            @include clickable;
            @include flex(column, center, center);
            width: 24px;
            height: 24px;
            border-radius: 24px;
            border: 2px solid $colorLightMid;
            background: $colorWhite;
            transition: 0.2s ease;
            transition-property: border, background;
            flex-shrink: 0;
        }

        .labelText {
            padding-top: 2px;
            font-size: 16px;
            color: $colorTextPrimary;
        }

        &:hover .radioVis, .radioVis:focus-visible {
            border: 2px solid $colorPrimary;
        }
    }

    input[type=radio]:checked + .radioVis {
        border: 2px solid $colorPrimary;
        &::before {
            content: '';
            display: block;
            width: 14px;
            height: 14px;
            background: $colorPrimary;
            border-radius: 14px;
        }
    }
}

</style>