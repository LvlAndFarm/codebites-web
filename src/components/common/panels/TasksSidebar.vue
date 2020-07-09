<template>
    <div>
        <div class="tabs">
            <ul>
                <li class="is-active"><a>Active (0)</a></li>
                <li><a>Posted ({{listingsNumber}})</a></li>
            </ul>
        </div>

        <div class="box">
            <div class="columns is-gapless">
                <div class="column">
                    <text-summary :show-more="false" :max-chars="40"
                                  text="I need someone to make minor (very minor!) CSS edits to my Shopify theme that I can't figure out" />
                </div>
                <div class="column is-narrow">
                    <button class="button">View</button>
                </div>
            </div>
            <div class="columns is-gapless">
                <div class="column" style="margin-top: 4px; margin-right: 4px;">
                    <b-progress :value="30" :max="100" :show-value="false" type="is-success"/>
                </div>
                <div class="column is-narrow progress-label">
                    30%
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TextSummary from "../text/TextSummary";
    export default {
        name: "TasksSidebar",
        components: {TextSummary},
        computed: {
            userProfile: function() { return this.$store.state.userProfile },
            // displayName: () => this.currentUser&&this.currentUser.displayName
            listingsNumber:  function() { return this.userProfile&&this.userProfile.listings&&this.userProfile.listings.length }
        },
    }
</script>

<style scoped>

</style>