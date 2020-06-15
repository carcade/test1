<template>
    <div class="flex">
        <input
                class="w-4/12 mr-px rounded-tl rounded-bl px-3 py-2 focus:outline-none"
                type="text"
                placeholder="От"
                :value="value.from"
                @input="onFromValueChange($event.target.value)"
        >
        <input
                class="w-4/12 mr-px px-3 py-2 focus:outline-none"
                type="text"
                placeholder="До"
                :value="value.to"
                @input="onToValueChange($event.target.value)"
        >
        <t-select
                :items="paymentPeriods"
                :value="selectedPaymentPeriod"
                class="w-4/12 rounded-tr rounded-br"
                @input="onPaymentPeriodChange($event.value)"
        ></t-select>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {PaymentPeriod} from 'src/components/search-panel/SearchModel';
    import PriceFilterModel from 'src/components/search-panel/PriceFilterModel';
    import TSelectItem from 'src/components/t-select/TSelectItem';

    @Component
    export default class SearchPanelPriceFilter extends Vue {
        @Prop()
        public value!: PriceFilterModel;

        public paymentPeriods: TSelectItem[] = [
            {text: 'Р/месяц', value: 'month'},
            {text: 'Р/день', value: 'day'},
        ];

        public get selectedPaymentPeriod(): TSelectItem {
            const paymentPeriod: TSelectItem | undefined = this.paymentPeriods.find(item => {
                return item.value === this.value.paymentPeriod
            });

            if (paymentPeriod == undefined) {
                throw new Error('Unknown payment period code.');
            }

            return paymentPeriod;
        }

        public onFromValueChange(value: string): void {
            this.$emit('input', {
                from: value,
                to: this.value.to,
                paymentPeriod: this.value.paymentPeriod,
            });
        }

        public onToValueChange(value: string): void {
            this.$emit('input', {
                from: this.value.from,
                to: value,
                paymentPeriod: this.value.paymentPeriod,
            });
        }

        public onPaymentPeriodChange(value: PaymentPeriod): void {
            this.$emit('input', {
                from: this.value.from,
                to: this.value.to,
                paymentPeriod: value,
            });
        }
    }
</script>
