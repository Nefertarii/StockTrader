<template>
    <div class="progress-bar-container">
        <div :class="['progress-bar', color]" :style="{ width: progress + '%' }"></div>
    </div>
</template>

<script>
export default {
    props: {
        progress: {
            type: Number,
            required: true,
            validator(value) {
                return value >= 0 && value <= 100;
            }
        }
    },
    data() {
        return {
            color: "danger"
        }
    },
    watch: {
        progress() {
            if (this.progress <= 20) {
                this.color = "danger";
            } else if (this.progress > 20 && this.progress <= 70) {
                this.color = "warning";
            } else {
                this.color = 'safe';
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

.progress-bar-container {
    height: 20px;
    background-color: $bg_color_gray3;
    border-radius: 10px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background-color: $success_color;
    transition: width 1s ease;

    &.danger {
        background-color: $danger_color;
    }

    &.warning {
        background-color: $warning_color;
    }

    &.safe {
        background-color: $success-color;
    }
}
</style>