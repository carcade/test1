<template>
    <div>
        <h1>{{ message }}</h1>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class App extends Vue {
        public readonly message: string = 'Hello!';
    }
</script>

<style scoped>

</style>
