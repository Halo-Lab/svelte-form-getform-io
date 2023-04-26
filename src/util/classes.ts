export class MultiFileArray {
    
    type: 'multiFileArray';
    files: File[];
    private interacted: boolean = false;
    
    constructor() {
        this.type = 'multiFileArray';
        this.files = [];
    }

    getInteracted() {
        return this.interacted;
    }

    setFiles(files: File[]) {
        this.files = files;
        this.interacted = true;
    }

    addFile(file: File) {
        this.files = [...this.files, file];
        this.interacted = true;
    }

    removeFile(file: File) {
        this.files = this.files.filter(f => f !== file);
        this.interacted = true;
    }

    getFileCount() {
        return this.files.length;
    }


}