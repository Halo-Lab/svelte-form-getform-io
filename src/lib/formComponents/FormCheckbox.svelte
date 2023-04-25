<script lang="ts">

import Error from "../components/Error.svelte";

export let title: string;
export let defaultValue: boolean = false;
export let errors: string[] = [];
export let errorText: Record<string, string> = {};

export let value: boolean = defaultValue;

</script>

<div class="component" class:error={errors.length}>
    <label class="label">
        <input type="checkbox" bind:checked={value} />
        <button class="checkboxVis" on:click={() => value = !value}></button>
        <span class="labelText">{title}</span>
    </label>
    {#if errors.length}
        <Error errors={errors} errorText={errorText} styleMin />
    {/if}
</div>

<style lang="scss">

@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

.component {
    @include flex(column);
    position: relative;

    &.error {
        .label .checkboxVis {
            border: 2px solid $colorError;
        }
    }

    .label {
        @include flex(row, flex-start, center, 12px);
        @include clickable;

        input[type=checkbox] {
            display: none;
        }

        .checkboxVis {
            @include clearDefaultStyle;
            @include clickable;
            @include flex(column, center, center);
            width: 24px;
            height: 24px;
            border-radius: 4px;
            border: 2px solid $colorLightMid;
            background: $colorWhite;
            transition: 0.2s ease;
            transition-property: border, background;
        }

        .labelText {
            padding-top: 4px;
            font-size: 16px;
            color: $colorTextPrimary;
        }

        &:hover .checkboxVis, .checkboxVis:focus-visible {
            border: 2px solid $colorPrimary;
        }
    }

    input[type=checkbox]:checked + .checkboxVis {
        border: 2px solid $colorPrimary;
        background: $colorPrimary;
        &::before {
            content: '';
            display: block;
            width: 18px;
            height: 18px;
            background-image: url('../../assets/icons/iconCheck.svg');
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }
    }
}

</style>