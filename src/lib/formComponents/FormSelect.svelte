<script lang="ts">

import { clickOutside } from "../../util/clickOutside";
import Error from "../components/Error.svelte";
import { getContext } from "svelte";
import type { Writable } from "svelte/store";
import type { Field } from "svelte-forms/types";
import type { SelectField, SelectOption } from "../../util/types";

export let title: string;
export let options: SelectOption[] = [];
export let defaultText: string = "Select an option";
export let errorText: Record<string, string> = {};

export let field: Field<SelectField>;

const formInteracted = getContext<Writable<boolean>>('formInteracted');
$: shouldShowError = field.errors.length && $formInteracted;

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

function highlightStr (str: string, search: string) {
    const s = search.toLowerCase().trim();
    const beforeText = str.slice(0, str.toLowerCase().indexOf(s));
    const highlightedText = str.slice(beforeText.length, beforeText.length + s.length);
    const afterText = str.slice(beforeText.length + s.length);
    return { beforeText, highlightedText, afterText };
}

</script>

<div class="component" class:error={shouldShowError}>
    <h4>{title}</h4>

    <div use:clickOutside class="selectContainer" on:click_outside={() => toggleActive(false)}>
        <button class="selectMain" class:active={active} on:click={() => toggleActive()}>
            <span>{ options.find(option => option.id === field.value)?.label ?? defaultText }</span>
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
                        class:selected={option.id === field.value}
                        on:click={() => {
                            field.value = option.id;
                            toggleActive(false);
                        }}
                    >
                        {
                            highlightStr(option.label, search).beforeText
                        }<b>{
                            highlightStr(option.label, search).highlightedText
                        }</b>{
                            highlightStr(option.label, search).afterText
                        }
                    </button>
                {/each}
            </div>
        {/if}
    </div>

    {#if shouldShowError}
        <Error errors={field.errors} errorText={errorText} />
    {/if}
</div>

<style lang="scss">

@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

.component {
    
    @include flex(column, flex-start, flex-start, 8px);
    position: relative;

    &.error {

        .selectContainer .selectMain {
            outline: 1px solid $colorError;
            &:hover {
                outline: 1px solid $colorErrorDark;
            }
            &.active, &:focus-visible {
                outline: 1px solid $colorPrimary;
            }
            &::after {
                opacity: 0;
            }
        }

    }

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
            padding-right: 48px;

            &:hover {
                outline: 1px solid $colorTextPlaceholder;
            }

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
            z-index: 10;
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
                background: $colorWhite;
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
                    background: $colorWhite;
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