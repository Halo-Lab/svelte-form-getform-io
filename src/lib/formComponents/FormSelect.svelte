<script lang="ts">
    import { derived } from "svelte/store";

    
import type { SelectOption } from "../../util/types";

export let title: string;
export let options: SelectOption[] = [];
export let defaultValue: string = "";
export let defaultText: string = "Select an option";

export let value: string = defaultValue;

let active: boolean = false;
let search: string = "";

function toggleActive (t?: boolean) {
    active = t ?? !active;
    if (!active) search = "";
}

function filterOptions (options: SelectOption[], search: string) {
    return search
        ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase().trim()))
        : options;
}

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
            @include flex(column, flex-start, stretch);
            border-radius: 14px;
            color: $colorTextPrimary;
            width: 100%;
            outline: 1px solid $colorLight;
            position: absolute;
            top: calc(100% + 8px);
            animation: appear 0.25s ease;
            overflow: auto;
            max-height: 360px;
            flex-shrink: 0;

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

            .searchInput {
                @include clearDefaultStyle;
                cursor: text;
                padding: 14px 16px;
                padding-left: 48px;
                width: 100%;
                &::placeholder {
                    color: $colorTextPlaceholder;
                }
            }
            .searchInputContainer {
                @include flex(column, center, stretch);
                position: relative;
                padding: 0;
                &:hover, &:focus-visible {
                    background: #fff;
                }
                &::before {
                    content: '';
                    position: absolute;
                    top: 13px;
                    left: 16px;
                    width: 24px;
                    height: 24px;
                    background-image: url('../../assets/icons/iconSearch.svg');
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: contain;
                    pointer-events: none;
                    opacity: 0.4;
                    transition: 0.25s ease opacity;
                }
                &:has(input:focus)::before {
                    opacity: 1;
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
        <button class="selectMain" class:active={active} on:click={() => toggleActive()}>
            <span>{ options.find(option => option.id === value)?.label ?? defaultText }</span>
        </button>
        {#if active}
            <div class="selectOptions">
                <div class="selectOption searchInputContainer">
                    <input 
                        type="text"
                        class="searchInput"
                        placeholder="Type in something"
                        bind:value={search}
                    />
                </div>

                {#each filterOptions(options, search) as option}
                    <button 
                        class="selectOption"
                        class:selected={option.id === value}
                        on:click={() => {
                            value = option.id;
                            toggleActive(false);
                        }}
                    >
                        {option.label}
                    </button>
                {/each}
            </div>
        {/if}
    </div>
</div>