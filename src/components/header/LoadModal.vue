<template>
    <div class="load-modal" @keydown.esc="closeModal">
        <a-button class="load-btn" @click="delayOpen">
            <a-icon v-if="load_loading" type="loading"></a-icon>
            <div v-else> Load </div>
        </a-button>
        <transition name="modal" mode="in-out">
            <Modal v-if="show_modal" :active="show_modal" :onClose="closeModal">
                <div class="modal-content">
                    <p>Load</p>
                    <p>Choose a save from the table below. Just click on the desired row to go back to selected game
                        state.</p>
                    <div v-if="number == 0" class="array-no-data"> No data </div>
                    <div v-else>
                        <div class="data-title-show">
                            <div class="data-title-date">Date </div>
                            <div class="data-title-name">Name </div>
                        </div>
                        <div class="data-list" v-for="(data, index) in save_array" >
                            <div :class="['data-show', 'array-data-list' + index % 2]" @click="loadData(data)">
                                <div class="data-date"> {{ data.save_date }} </div>
                                <div class="data-name"> {{ data.save_name }} </div>
                            </div>
                            <a-button :class="['data-del', 'array-data-list' + index % 2]" @click="deleteData(data)"> X
                            </a-button>
                        </div>
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
            save_array: [],
            number: 0,
            load_loading: false,
            time_out: 1500,
        }
    },
    methods: {
        localListRead() {
            //console.log("read");
            this.save_array.splice(0, this.save_array.length);
            for (let i = 0; i < localStorage.length; i++) {
                var tmp_key = localStorage.key(i);
                if (tmp_key[0] == '|') {
                    this.save_array.push(JSON.parse(localStorage.getItem(tmp_key)));
                    //console.log("key:" + tmp_key);
                    //console.log(localStorage.getItem(tmp_key));
                    //console.log(JSON.parse(localStorage.getItem(tmp_key)));
                }
            }
            this.save_array.sort();
            //console.log(this.save_array);
            this.number = this.save_array.length;
        },
        openModal() {
            this.show_modal = true;
            this.load_loading = false;
            this.localListRead();
        },
        closeModal() {
            this.show_modal = false;
        },
        loadData(data) {
            //console.log(data);
            this.$store.commit("loadData", data);
            this.closeModal();
        },
        delayOpen() {
            this.load_loading = true;
            setTimeout(() => {
                this.openModal();
            }, 1200);
        },
        deleteData(data_key) {
            localStorage.removeItem('|' + data_key.save_name);
            this.save_array = this.save_array.filter(item => item.save_name !== data_key.save_name);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

.load-modal {
    padding-right: $header_pandding_size;
}

.load-btn {
    z-index: 0;
}

.modal-content {
    margin: auto;
    text-align: center;
    display: inline-block;
    white-space: normal;
    word-wrap: break-word;
    max-width: 95%;

}

.array-no-data {
    font-size: large;
    font-weight: 600;
}

.data-list {
    display: flex;
}

.data-title-show,
.data-show {
    display: flex;
    height: 40px;
    justify-content: flex-start;
    /* 将项目靠右对齐 */
    align-items: center;
    /* 将项目垂直居中 */
    border-bottom: 1px solid $border_color_gray;
}

.data-show {
    cursor: pointer;

    &:hover {
        background-color: $bg_color_gray3;
    }
}

.array-data-list0 {
    background-color: $bg_color_gray;
}

.array-data-list1 {
    background-color: $bg_color_gray2;
}

.data-title-name,
.data-title-date {
    font-size: large;
    font-weight: 600;
    width: 200px;
    text-align: left;
}



.data-date {
    width: 200px;
    text-align: left;
}

.data-name {
    width: 200px;
    text-align: left;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.data-del {
    border: 1px solid;
    height: 40px;
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
