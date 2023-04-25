export function clickOutside(node: HTMLElement) {

    const handleClick = (event: Event) => {
        const target = event.target as HTMLElement;
        if (!event.target) {
            return;
        }
        if (node && !node.contains(target) && !event.defaultPrevented) {
            node.dispatchEvent(
                new CustomEvent('click_outside')
            );
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
};