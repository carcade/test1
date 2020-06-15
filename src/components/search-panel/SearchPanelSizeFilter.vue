<template>
    <div class="flex w-full">
        <input
                class="w-6/12 mr-px rounded-tl rounded-bl px-3 py-2 focus:outline-none"
                type="text"
                placeholder="От"
                :value="value.from"
                @input="onFromValueChange($event.target.value)"
        >
        <input
                class="w-6/12 px-3 py-2 focus:outline-none"
                type="text"
                placeholder="До"
                :value="value.to"
                @input="onToValueChange($event.target.value)"
        >
        <div class="bg-bright-blue rounded-tr rounded-br px-5 flex-shrink-0 flex-grow-0 flex items-center justify-center">
            м2
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import SizeFilterModel from 'src/components/search-panel/SizeFilterModel';

    @Component
    export default class SearchPanelSizeFilter extends Vue {
        @Prop()
        public value!: SizeFilterModel;

        public onFromValueChange(value: string): void {
            this.$emit('input', {
                from: value,
                to: this.value.to,
            });
        }

        public onToValueChange(value: string): void {
            this.$emit('input', {
                from: this.value.from,
                to: value,
            });
        }
    }
</script>
