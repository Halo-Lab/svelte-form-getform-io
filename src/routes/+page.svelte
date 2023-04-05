<script lang="ts">
import Form from "$lib/Form.svelte";
</script>

<style lang="scss">

@import '../styles/variables.scss';

:global(body) {
    background: $colorLighter;
}

</style>

<Form 
    getformId={import.meta.env.VITE_GETFORM_ID} 
    onFormSubmit={data => console.log(data)}
/>