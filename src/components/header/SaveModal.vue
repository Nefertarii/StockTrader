<template>
    <div class="save-modal" @keydown.esc="closeModal">
        <a-button @click="openModal"> Save </a-button>
        <transition name="modal" mode="in-out">
            <Modal v-if="show_modal" :active="show_modal" :onClose="closeModal">
                <div class="modal-content">
                    <div class="modal-save-text">Save Name</div>
                    <input v-model="save_name" />
                    <div>
                        <a-button :loading="save_loading" :disabled="save_btn_dis" class="modal-save-btn" @click="delaySave"> 
                            <a-icon v-if="saved" class="modal-save-completed" type="check"></a-icon>
                            save 
                        </a-button>
                    </div>
                </div>
            </Modal>
        </transition>
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
            save_name: "",
            save_loading: false,
            save_btn_dis: true,
            saved: false,
        }
    },
    methods: {
        openModal() {
            this.show_modal = true;
        },
        closeModal() {
            this.show_modal = false;
        },
        saveData() {
            this.$store.commit("saveDate");
            this.$store.commit("saveName", this.save_name);
            //console.log("save:");
            //console.log(JSON.stringify(this.$store.state));
            localStorage.setItem(('|' + this.save_name), JSON.stringify(this.$store.state));
        },
        delaySave() {
            this.save_loading = true;
            this.saveData();
            setTimeout(() => {
                this.save_loading = false;
                this.saved = true;
            }, 800);
            setTimeout(() => {
                this.closeModal();
                this.saved = false;
                this.save_name = "";
            }, 1200);
        }
    }, 
    watch: {
        save_name() {
            if(this.save_name === "") {
                this.save_btn_dis = true;
            } else {
                this.save_btn_dis = false;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

.save-modal {
    padding-left: $header_pandding_size;
    padding-right: 0.5*$header_pandding_size;
}

input {
    width: 80%;
    height: 30px;
    border: 1px solid $border_color_gray;
    border-radius: $border_radius;
    text-align: center;

    &:focus {
        outline: none; //有才生效
        border: 1px solid $button_color1;
        box-shadow: 0 0 0.1rem #c2c2c2;
    }

}

.modal-save-completed {
    color: $success_color;
}

.modal-save-text {
    margin-top: $header_pandding_size;
    margin-bottom: $header_pandding_size;
}

.modal-save-btn {
    margin-top: $header_pandding_size;
    margin-bottom: $header_pandding_size;
    border: 1px solid $border_color_gray;
    border-radius: $border_radius;
    font-weight: 600;
    font-size: $font_size1;
    cursor: pointer;


}

.modal-content {
    text-align: center;
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
