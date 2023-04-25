<script lang="ts">
    export let errors: string[];
    export let errorText: Record<string, string>;
    export let styleMin: boolean = false;

    let errorVisible: boolean = false;
</script>

<div class="component">
    <button class="errorIcon" 
        on:mouseover={() => errorVisible = true}
        on:mouseout={() => errorVisible = false}
        on:focus={() => errorVisible = true}
        on:blur={() => errorVisible = false}
        class:styleMin={styleMin}
    />
    <span class="formFieldError" class:visible={errorVisible} class:styleMin={styleMin}>
        {errorText[errors[0]] ?? errorText.default ?? 'Error!'}
    </span>
</div>

<style lang="scss">

@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

.component {

    .errorIcon {
        @include clearDefaultStyle;
        @include clickable;
        position: absolute;
        width: 24px;
        height: 24px;
        top: 40px;
        right: 16px;
        background: url('../../assets/icons/iconError.svg') no-repeat center;
        &.styleMin {
            top: 0;
        }
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
        &.styleMin {
            top: 50px;
        }
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

}
    
</style>