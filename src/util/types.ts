import { MultiFileArray } from "./classes";
import { field } from "svelte-forms";

export type FormSubmitData = Record<string, any>

export type RadioGroupOption = {
    id: string;
    label: string;
}

export type SelectOption = {
    id: string;
    label: string;
}

export type TextField = string;
export type CheckboxField = boolean;
export type SelectField = string;
export type RadioGroupField = string;
export type FileField = MultiFileArray|undefined;

export type SvelteFormFieldType<T> = ReturnType<typeof field<T>>;
