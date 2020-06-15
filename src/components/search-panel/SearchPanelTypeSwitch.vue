<template>
    <div class="flex text-sm items-center">
        <div
                class="mr-3 select-none cursor-pointer"
                :class="{'text-extra': !value, 'text-gray-500': value, 'underline': !value}"
                @click="onSwitchChange(false)"
        >
            Основной поиск
        </div>
        <t-switch
                :value="value"
                @input="onSwitchChange($event)"
        >
        </t-switch>
        <div
                class="ml-3 select-none cursor-pointer"
                :class="{'text-extra': value, 'text-gray-500': !value, 'underline': value}"
                @click="onSwitchChange(true)"
        >
            Искать по названию
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class SearchPanelTypeSwitch extends Vue {
        /**
         * Тип поиска: false - основной поиск, true - поиск по названию
         */
        public value: boolean = false;

        public onSwitchChange(value: boolean): void {
            this.value = value;
            this.$emit('change', value);
        }
    }
</script>
