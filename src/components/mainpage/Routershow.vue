<template>
    <div class="page-total">
        <div class="page">
            <transition name="router" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

.page-total {
    min-width: $page_window_min_size;
    max-width: $page_window_max_size;
}

.page {
    
}

h2 {
    font-size: $font_size3;
    font-weight: 800;
}

h3 {
    font-weight: 600;
}

.router-enter-active,
.router-leave-active {
    transition: opacity 0.3s;
}

.router-enter,
.router-leave-to {
    opacity: 0;
}
</style>