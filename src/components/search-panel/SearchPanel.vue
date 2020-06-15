<template>
    <div class="w-full md:w-10/12 lg:w-8/12 mx-auto">
        <div class="main-part px-5 py-8">
            <div class="flex flex-col md:flex-row">
                <div
                        v-if="isBasicSearch"
                        class="flex flex-grow flex-col md:flex-row"
                >
                    <t-select
                            v-model="city"
                            :items="cities"
                            class="w-full md:w-4/12 mb-3 md:mb-0 md:mr-px md:rounded-tl md:rounded-bl py-1"
                    >
                    </t-select>
                    <t-select
                            v-model="dealType"
                            :items="dealTypes"
                            class="w-full md:w-4/12 mb-3 md:mb-0 mr-px py-1"
                    >
                    </t-select>
                    <t-select
                            v-model="realtyType"
                            :items="realtyTypes"
                            class="w-full md:w-4/12 mb-3 md:mb-0 py-1"
                    >
                    </t-select>
                </div>
                <div
                        v-else
                        class="flex flex-grow mb-3 md:mb-0"
                >
                    <input
                            v-model="searchText"
                            class="w-full md:rounded-tl md:rounded-bl px-5 py-2 focus:outline-none"
                            type="text"
                            placeholder="Введите название объекта"
                    >
                </div>
                <button
                        class="flex-grow-0 md:rounded-tr md:rounded-br px-5 py-2 text-white focus:outline-none
                         bg-primary active:bg-green-800 hover:bg-green-600"
                        @click="onSubmit"
                >
                    Найти
                </button>
            </div>

            <div
                    v-show="isBasicSearch && (isPriceFilterEnabled || isSizeFilterEnabled)"
                    class="flex flex-col md:flex-row mt-5"
            >
                <div class="flex w-full md:w-8/12 mr-5 mb-3 md:mb-0">
                    <search-panel-price-filter
                            v-if="isPriceFilterEnabled"
                            v-model="priceFilter"
                            class="w-full"
                    >
                    </search-panel-price-filter>
                    <button
                            v-else
                            class="border rounded border-extra text-extra w-full py-2 focus:outline-none"
                            @click="isPriceFilterEnabled = true"
                    >
                        Добавить цену
                    </button>
                </div>
                <div class="flex w-full md:w-4/12">
                    <search-panel-size-filter
                            v-if="isSizeFilterEnabled"
                            v-model="sizeFilter"
                    ></search-panel-size-filter>
                    <button
                            v-else
                            class="border rounded border-extra text-extra w-full focus:outline-none"
                            @click="isSizeFilterEnabled = true"
                    >
                        Добавить метраж
                    </button>
                </div>
            </div>
        </div>

        <div class="flex flex-col md:flex-row md:justify-between px-5 py-3 bg-light-blue">
            <search-panel-type-switch
                    class="flex-shrink-0"
                    @change="onSearchTypeChange"
            >
            </search-panel-type-switch>
            <div
                    v-show="isBasicSearch"
                    class="text-sm flex text-extra"
            >
                <button
                        class="flex items-center focus:outline-none mr-2"
                        @click="isPriceFilterEnabled = !isPriceFilterEnabled"
                >
                    <i
                            class="fas fa-times rounded-full border-2 border-extra flex h-4 w-4 items-center
                                justify-center mr-1 text-xxs"
                    >
                    </i>
                    <span :class="{'text-gray-500': isPriceFilterEnabled}">Цена</span>
                </button>
                <button
                        class="flex items-center focus:outline-none"
                        @click="isSizeFilterEnabled = !isSizeFilterEnabled"
                >
                    <i
                            class="fas fa-plus rounded-full border-2 border-extra flex h-4 w-4 items-center
                                justify-center mr-1 text-xxs"
                    >
                    </i>
                    <span :class="{'text-gray-500': isSizeFilterEnabled}">Метраж</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import SearchPanelTypeSwitch from 'src/components/search-panel/SearchPanelTypeSwitch.vue';
    import SearchPanelPriceFilter from 'src/components/search-panel/SearchPanelPriceFilter.vue';
    import SearchPanelSizeFilter from 'src/components/search-panel/SearchPanelSizeFilter.vue';
    import {DealType, PaymentPeriod, RealtyType, SearchModel, SearchType} from 'src/components/search-panel/SearchModel';
    import TSelectItem from 'src/components/t-select/TSelectItem';
    import PriceFilterModel from 'src/components/search-panel/PriceFilterModel';
    import SizeFilterModel from 'src/components/search-panel/SizeFilterModel';

    @Component({
        components: {
            SearchPanelTypeSwitch,
            SearchPanelPriceFilter,
            SearchPanelSizeFilter,
        },
    })
    export default class SearchPanel extends Vue {
        public isBasicSearch: boolean = true;
        public isPriceFilterEnabled: boolean = false;
        public isSizeFilterEnabled: boolean = false;
        public priceFilter: PriceFilterModel = {from: '', to: '', paymentPeriod: PaymentPeriod.Month};
        public sizeFilter: SizeFilterModel = {from: '', to: ''};
        public city: TSelectItem = {text: 'Москва', value: 'moscow'};
        public dealType: TSelectItem = {text: 'Купить', value: 'buy'};
        public realtyType: TSelectItem = {text: 'Офис', value: 'office'};
        public searchText: string = '';

        public cities: TSelectItem[] = [
            {text: 'Москва', value: 'moscow'},
            {text: 'Екатеринбург', value: 'ekaterinburg'},
        ];

        public dealTypes: TSelectItem[] = [
            {text: 'Купить', value: DealType.Buy},
            {text: 'Продать', value: DealType.Sell},
            {text: 'Снять', value: DealType.Rent},
        ];

        public realtyTypes: TSelectItem[] = [
            {text: 'Офис', value: RealtyType.Office},
            {text: 'Квартира', value: RealtyType.Flat},
            {text: 'Дом', value: RealtyType.House},
        ];

        public onSearchTypeChange(value: boolean): void {
            this.isBasicSearch = !value;
        }

        public onSubmit(): void {
            this.$emit('submit', this.getSearchModel());
        }

        /**
         * Возвращает модель данных для поискового запроса на основе введенных данных
         * Получение модели сделано методом а не вычисляемым свойством с целью оптимизации производительности
         */
        public getSearchModel(): SearchModel {
            const model: SearchModel = {
                searchType: this.isBasicSearch ? SearchType.Basic : SearchType.ByName,
            };

            if (this.isBasicSearch) {
                model.city = this.city.value;
                model.dealType = <DealType>this.dealType.value;
                model.realtyType = <RealtyType>this.realtyType.value;

                if (this.isPriceFilterEnabled) {
                    model.priceFrom = this.priceFilter.from;
                    model.priceTo = this.priceFilter.to;
                    model.paymentPeriod = this.priceFilter.paymentPeriod;
                }

                if (this.isSizeFilterEnabled) {
                    model.sizeFrom = this.sizeFilter.from;
                    model.sizeTo = this.sizeFilter.to;
                }
            } else {
                model.searchText = this.searchText;
            }

            return model;
        }
    }
</script>

<style scoped>
    .main-part {
        background: linear-gradient(90deg, #82b3e5 0%, #a8d5e9 100%);
    }
</style>
