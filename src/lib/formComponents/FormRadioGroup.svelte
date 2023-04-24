<script lang="ts">
    
import type { RadioGroupOption } from "../../util/types";

export let title: string;
export let groupId: string;
export let options: RadioGroupOption[] = [];
export let defaultValue: string = "";

export let value: string = defaultValue;

</script>

<style lang="scss">

@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

.component {
    
    @include flex(column, flex-start, flex-start, 8px);
    position: relative;

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
        }

        .labelText {
            padding-top: 4px;
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

<div class="component">
    <h4>{title}</h4>

    {#each options as option}
        <label class="label">
            <input type="radio" value={option.id} name={groupId} bind:group={value} />
            <button class="radioVis" on:click={() => value = option.id}></button>
            <span class="labelText">{option.label}</span>
        </label>
    {/each}
</div>