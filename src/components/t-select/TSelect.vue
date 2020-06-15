<template>
    <div
            v-click-outside="close"
            class="bg-white relative inline-block w-auto"
            :class="{'z-10': opened}"
    >
        <div
                class="flex h-full overflow-hidden pl-5 pr-4 cursor-pointer"
                style="transition: all .3s ease-in-out;"
        >
            <div
                    class="w-full appearance-none py-1 outline-none flex items-center select-none"
                    @click="toggle"
            >
                {{ value.text }}
            </div>
            <div
                    class="w-6 cursor-pointer text-gray-600 flex justify-center items-center"
                    @click="toggle"
            >
                <i
                        class="fas"
                        :class="{'fa-caret-down': !opened, 'fa-caret-up': opened}"
                ></i>
            </div>
        </div>

        <div
                v-show="opened"
                class="overflow-y-scroll absolute bg-white min-w-full shadow-lg"
        >
            <template v-if="items.length > 0">
                <div
                        v-for="item in items"
                        :key="item.value"
                        class="px-3 py-1 hover:bg-gray-200 cursor-pointer"
                        @click="onItemClick(item)"
                >
                    {{ item.text }}
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
    import ClickOutside from 'vue-click-outside';
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import SearchPanel from 'src/components/search-panel/SearchPanel.vue';
    import TSelectItem from 'src/components/t-select/TSelectItem';

    @Component({
        components: {SearchPanel},
        directives: {
            ClickOutside,
        },
    })
    export default class TSelect extends Vue {
        @Prop()
        public items!: TSelectItem[];

        @Prop()
        public value!: TSelectItem;

        public opened: boolean = false;

        public toggle(): void {
            this.opened = !this.opened;
        }

        public open(): void {
            this.opened = true;
        }

        public close(): void {
            this.opened = false;
        }

        public onItemClick(item: TSelectItem): void {
            this.close();
            this.$emit('input', item);
        }
    }
</script>
