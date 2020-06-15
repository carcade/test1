<template>
    <label class="switch relative inline-block">
        <input
                type="checkbox"
                class="opacity-0 w-0 h-0"
        >
        <span
                class="slider absolute cursor-pointer bg-primary top-0 bottom-0 left-0 right-0"
                :class="{active: value}"
                @click="onClick"
        >

        </span>
    </label>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class TSwitch extends Vue {
        @Prop()
        public value: boolean = false;

        public onClick(): void {
            this.$emit('input', !this.value);
        }
    }
</script>

<style scoped>
    .switch {
        width: 46px;
        height: 26px;
    }

    .slider {
        transition: .4s;
        border-radius: 34px;

    }

    .slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 2px;
        bottom: 3px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;

    }

    .slider.active:before {
        transform: translateX(22px);
    }
</style>
