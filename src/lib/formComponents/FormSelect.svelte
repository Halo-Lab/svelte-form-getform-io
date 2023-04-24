<script lang="ts">
    
import type { SelectOption } from "../../util/types";

export let title: string;
export let options: SelectOption[] = [];
export let defaultValue: string = "";

export let value: string = defaultValue;

let active: boolean = false;

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

    .selectContainer {
        position: relative;
        width: 100%;

        .selectMain {
            @include clearDefaultStyle;
            @include clickable;
            position: relative;
            background: $colorWhite;
            padding: 14px 16px;
            font-size: 16px;
            border-radius: 14px;
            text-align: left;
            color: $colorTextPrimary;
            width: 100%;
            outline: 1px solid $colorLight;

            &::placeholder {
                color: $colorTextPlaceholder;
            }

            &::after {
                content: '';
                display: block;
                position: absolute;
                top: 14px;
                right: 16px;
                height: 24px;
                width: 24px;
                background-image: url('../../assets/icons/iconExpand.svg');
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }

            &.active, &:focus-visible {
                outline: 1px solid $colorPrimary;
            }

            &.active &::after {
                background-image: url('../../assets/icons/iconCollapse.svg');
            }
        }

        .selectOptions {
            @include flex(column, center, stretch);
            overflow: hidden;
            border-radius: 14px;
            color: $colorTextPrimary;
            width: 100%;
            outline: 1px solid $colorLight;
            position: absolute;
            top: calc(100% + 8px);
            animation: appear 0.25s ease;

            .selectOption {
                @include clearDefaultStyle;
                @include clickable;
                padding: 14px 16px;
                font-size: 16px;
                text-align: left;
                border-bottom: 1px solid $colorLight;
                background: #fff;
                transition: 0.2s ease;
                transition-property: background, color;

                &:hover, &:focus-visible {
                    background: $colorLightMid;
                }
                &.selected {
                    background: $colorPrimary;
                    color: $colorWhite;
                }

                &:last-child {
                    border-bottom: none;
                }
            }
        }

        @keyframes appear {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

    }

}

</style>

<div class="component">
    <h4>{title}</h4>

    <div class="selectContainer">
        <button class="selectMain" class:active={active} on:click={() => active = !active}>
            <span>{options.find(option => option.id === value)?.label}</span>
        </button>
        {#if active}
            <div class="selectOptions">
                {#each options as option}
                    <button 
                        class="selectOption"
                        class:selected={option.id === value}
                        on:click={() => {
                            value = option.id;
                            active = false;
                        }}
                    >
                        {option.label}
                    </button>
                {/each}
            </div>
        {/if}
    </div>
</div>