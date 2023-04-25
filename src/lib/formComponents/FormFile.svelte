<script lang="ts">

import uploadIcon from "$lib/../assets/icons/upload.svg";

export let title: string;
export let multiple: boolean = true;
export let accept: string = "*";

export let value: File[] = [];

type FileProgress = {
    file: File;
    progress: number;
}

let files: FileProgress[] = [];
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
        const formData = new FormData();
        formData.append('file', file);

        // create a progress obj
        const progress = {
            file,
            progress: 0
        };

        // add progress obj to array
        files = [...files, progress];
    });
}

</script>

<div class="component">
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
                <p>Supported formates: JPEG, PNG, GIF, PDF, Word</p>
            </center>
            <input 
                type="file" 
                multiple={multiple}
                accept={accept}
                on:change={handleInputChange}
                bind:value={value}
                bind:this={elemFileInput}
            />
            <button
                class="buttonPrimary"
                on:click={() => {
                    elemFileInput.click();
                }}
            >Choose Files</button>
        </div>
        {#if files.length}
            <div class="fileStatus">
                {#each files as { file, progress }, i}
                    <div class="fileStatusItem">
                        <div>
                            <p>{file.name}</p>
                        </div>
                        <div class="progressBar">
                            <div class="progress" style="width: {progress}%"></div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

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
}

</style>