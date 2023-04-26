<script lang="ts">

import mimeMatch from "mime-match";

import Error from "$lib/components/Error.svelte";
import { MultiFileArray } from "../../util/classes";
import uploadIcon from "$lib/../assets/icons/upload.svg";
import { getContext } from "svelte";
import type { Writable } from "svelte/store";
import type { Field } from "svelte-forms/types";
import type { FileField } from "../../util/types";

export let title: string;
export let description: string = "";
export let multiple: boolean = false;
export let accept: string = "*";
export let errorText: Record<string, string> = {};

export let field: Field<FileField>;

const formInteracted = getContext<Writable<boolean>>('formInteracted');
$: shouldShowError = field.errors.length && $formInteracted;

let elemFileInput: HTMLInputElement;
let isDragging = false;

function handleDrop (e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const newFiles = e.dataTransfer?.files;
    if (newFiles) handleFiles(newFiles);
    isDragging = false;
}

function handleDragOver (e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDragEnter(e: DragEvent) {
    e.preventDefault();
    isDragging = true;
}

function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
}

function handleInputChange (e: any) {
    const newFiles = (e.target as HTMLInputElement).files;
    if (newFiles) handleFiles(newFiles);
}

function handleFiles (newFiles: FileList) {
    const fileArray = Array.from(newFiles);

    fileArray.forEach(file => {
        if (!mimeMatch(file.type, accept)) return;
        if (!field.value) field.value = new MultiFileArray();
        if (multiple)
            field.value.addFile(file);
        else
            field.value.setFiles([file]);
        field = field; // Force update
    });

    elemFileInput.value = "";
}

</script>

<div class="component" class:error={shouldShowError}>
    <h4>{title}</h4>

    <div class="filePanel">
        <div 
            class="fileDropzone" 
            class:dragging={isDragging}
            on:drop={handleDrop}
            on:dragover={handleDragOver}
            on:dragenter={handleDragEnter}
            on:dragleave={handleDragLeave}
        >
            <img src={uploadIcon} alt="Upload icon" draggable="false" />
            <center>
                <h4>Drop Files here</h4>
                {#if description}
                    <p>{description}</p>
                {/if}
            </center>
            <input 
                type="file" 
                multiple={multiple}
                accept={accept}
                on:change={handleInputChange}
                bind:this={elemFileInput}
            />
            <button
                class="buttonPrimary"
                on:click={() => elemFileInput.click()}
            >
                Choose Files
            </button>
        </div>
        {#if field.value?.getFileCount()}
            <div class="fileItems">
                {#each field.value.files as file}
                    <div class="fileItem">
                        <p>{file.name}</p>
                        <button class="fileItemBtn btnRemove" on:click={() => {
                            if (!field.value) return;
                            field.value.removeFile(file);
                            field = field; // Force update
                        }} />
                    </div>
                {/each}
            </div>
        {/if}
    </div>

    {#if shouldShowError}
        <Error errors={field.errors} errorText={errorText} styleMin />
    {/if}
</div>

<style lang="scss">

@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

.component {
    @include flex(column, flex-start, flex-start, 8px);
    position: relative;

    &.error {
        .filePanel {
            outline: 1px solid $colorError;
        }
    }

    h4 {
        font-size: 14px;
        font-weight: 500;
        color: $colorTextPrimary;
    }

    .filePanel {
        @include flex(column, flex-start, stretch, 24px);
        position: relative;
        padding: 24px;
        border-radius: 14px;
        background: $colorWhite;
        width: 100%;
    }

    .fileDropzone {
        @include flex(column, center, center, 24px);
        padding: 32px;
        background-image: url('../../assets/icons/dropzoneBg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        user-select: none;

        &.dragging {
            background-image: url('../../assets/icons/dropzoneBgActive.png');
            & * {    
                pointer-events: none;
            }
        }

        center {
            @include flex(column, center, center, 8px);
        }
        h4 {
            font-size: 24px;
            font-weight: 600;
        }
        p {
            font-size: 14px;
            color: $colorTextHint;
        }

        input[type=file] {
            display: none;
        }
        button {
            @include clearDefaultStyle;
            @include clickable;
            padding: 14px 32px;
            border-radius: 10px;
            border: 2px solid $colorTextPrimary;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            transition: 0.25s ease;
            transition-property: background, color;
            &:hover {
                background: $colorTextPrimary;
                color: $colorWhite;
            }
        }
    }

    .fileItems {
        @include flex(column, flex-start, stretch, 20px);

        .fileItem {
            @include flex(row, space-between, center);

            p {
                font-size: 14px;
            }

            .fileItemBtn {
                @include clearDefaultStyle;
                @include clickable;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background-color: $colorLighter;
                background-repeat: no-repeat;
                background-position: center;
                transition: 0.25s ease background-color;

                &:hover {
                    background-color: $colorLightMid;
                }

                &.btnRemove {
                    background-image: url('../../assets/icons/iconRemove.svg');
                }
            }
        }
    }
}

</style>