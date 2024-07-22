<template>
    <div :class="modalClasses" class="modal">
        <div class="modal-window">
            <div class="modal-midden">
                <slot></slot>
            </div>
        </div>
        <div @click="onClose" class="overlay"></div>
    </div>
</template>

<script>
export default {
    props: ["active", "onClose"],
    computed: {
        modalClasses() {
            return {
                'is-active': this.active,
            }
        }
    },
};
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

.modal {
    display: none;
}

.modal.is-active {
    display: flex;
}

.modal-window {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;

    padding-left: 10px;

    align-items: center;

    width: $modal_width_size;
    max-height: $modal_width_size;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 15px;
    overflow-y: auto;
    overflow-x: hidden;
}

.modal-midden {
    max-height: 95%;
    color: #000;
}

button {
    cursor: pointer;
    border: none;
    font-weight: 600;
}

.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    z-index: 9;
}
</style>
