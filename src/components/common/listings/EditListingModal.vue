<template>
    <b-modal :active="isActive"
             @close="closeModal"
             has-modal-card
             trap-focus
             :destroy-on-hide="false"
             aria-role="dialog"
             aria-modal>
        <div class="container box" style="z-index: 1;">
            <details-form :listing-details.sync="listing" style="z-index: 1;"/>
            <br/>
            <nav class="level">
                <div class="level-left">

                </div>
                <div class="level-right">
                    <p class="level-item">
                        <a class="button" @click="closeModal">Cancel</a>
                    </p>

                    <p class="level-item">
                        <a class="button is-primary">Submit</a>
                    </p>
                </div>
            </nav>
        </div>
    </b-modal>
</template>

<script>
    import DetailsForm from "./DetailsForm";
    export default {
        name: "EditListingModal",
        components: {DetailsForm},
        props: {
            isActive: Boolean,
            listing: Object
        },
        methods: {
            closeModal() {
                this.$emit('update:isActive', false)


            }
        }
    }
</script>

<style scoped>

</style>