<template>
    <div class="w-full min-h-screen flex items-stretch md:items-center justify-center">
        <search-panel @submit="onFormSubmit"></search-panel>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import SearchPanel from 'src/components/search-panel/SearchPanel.vue';
    import {SearchModel} from 'src/components/search-panel/SearchModel';

    @Component({
        components: {SearchPanel},
    })
    export default class App extends Vue {
        public onFormSubmit(searchModel: SearchModel): void {
            // eslint-disable-next-line no-console
            console.log(searchModel);
            alert('Данные собраны, проверьте вывод консоли');
        }
    }
</script>

<style scoped>

</style>
