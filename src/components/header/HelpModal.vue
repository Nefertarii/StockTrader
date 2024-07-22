<template>
    <div class="help-modal" @keydown.esc="closeModal">
        <a-button class="help-btn" shape="circle" @click="openModal"> ? </a-button>
        <Transition name="modal" mode="in-out">
            <Modal v-if="show_modal" :active="show_modal" :onClose="closeModal">
                <div class="help-content">
                    How to play?
                    <ul>
                        <li>Buy/sell stocks</li>
                        <li>End the day</li>
                        <li>Check the prices</li>
                        <li>Profit & Repeat</li>
                    </ul>
                </div>
            </Modal>
        </Transition>
    </div>
</template>

<script>
import Modal from "./MyModal.vue";

export default {
    components: {
        Modal,
    },
    data() {
        return {
            show_modal: false,
        }
    },
    methods: {
        openModal() {
            this.show_modal = true;
        },
        closeModal() {
            this.show_modal = false;
        },
    }
};
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

.help-modal {
    padding: $header_pandding_size;
}

.help-btn {
    border: 1;
    border-radius: 50%;
    font-size: large;
    font-weight: 700;

    &:hover {
        background-color: $bg_color_gray3;
    }
}

.help-content {
    margin: auto;
    text-align: center;
}

ul {
    padding: 0;
}

li {
    padding-top: 10px;
    list-style: number;
    list-style-position: inside;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity .3S;
}

.modal-enter,
.modal-leave-to {
    opacity: 0;
}

</style>
