<script lang="ts">
    export let errors: string[];
    export let errorText: Record<string, string>;
    export let iconTop: number = 40;

    let errorVisible: boolean = false;
</script>

<button class="errorIcon" 
    on:mouseover={() => errorVisible = true}
    on:mouseout={() => errorVisible = false}
    on:focus={() => errorVisible = true}
    on:blur={() => errorVisible = false}
    style={`top: ${iconTop}px;`}
/>
<span class="formFieldError" class:visible={errorVisible} style={`top: ${iconTop + 56}px;`}>
    {errorText[errors[0]] ?? errorText.default ?? 'Error!'}
</span>

<style lang="scss">

@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

.errorIcon {
    @include clearDefaultStyle;
    @include clickable;
    position: absolute;
    width: 24px;
    height: 24px;
    top: 40px;
    right: 16px;
    background: url('../../assets/icons/iconError.svg') no-repeat center;
}

.formFieldError {
    position: absolute;
    top: 96px;
    width: 100%;
    z-index: 1;
    background: $colorError;
    color: $colorTextContrast;
    padding: 12px;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 500;
    box-shadow: 0 4px 24px rgba(42, 42, 42, 12%);
    pointer-events: none;
    opacity: 0;
    transition: 0.25s ease opacity;
    &::before {
        content: '';
        position: absolute;
        display: block;
        width: 16px;
        height: 11px;
        top: -9px;
        right: 20px;
        background: url('../../assets/icons/iconErrorTooltip.svg') no-repeat center;
        pointer-events: none;
    }

    
    &.visible {
        opacity: 1;
    }
}
    
</style>