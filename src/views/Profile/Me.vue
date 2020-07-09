<template>
    <profile :self-profile="userProfile">

    </profile>
</template>

<script>
    import Profile from "../Profile";
    export default {
        name: "Me",
        components: {Profile},
        computed: {
            userProfile() {return this.$store.state.userProfile;}
        }
    }
</script>

<style scoped>

</style>