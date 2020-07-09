<template>
    <section>
        <b-field horizontal label="Title">
            <b-input name="title" v-model="listingDetails.title" expanded></b-input>
        </b-field>

        <b-field horizontal label="Description">
            <b-input type="textarea" v-model="listingDetails.description"></b-input>
        </b-field>

        <b-field horizontal label="Tags">
            <b-taginput
                    v-model="listingDetails.tags"
                    :data="filteredTags"
                    autocomplete
                    :allow-new="allowNew"
                    :open-on-focus="openOnFocus"
                    field="user.first_name"
                    icon="label"
                    placeholder="Add a tag"
                    @typing="getFilteredTags">
            </b-taginput>
        </b-field>

        <b-field horizontal label="Price">
            <b-field>
                <b-input name="price" v-model="listingDetails.price.amount" expanded></b-input>
                <b-select placeholder="Currency" v-model="listingDetails.price.currency">
                    <option value="usd">$ (USD)</option>
                    <option value="gbp">£ (GBP)</option>
                    <option value="eur">€ (EUR)</option>
                </b-select>
            </b-field>
        </b-field>

    </section>
</template>

<script>
    const tags = ["JavaScript", "React", "Shopify", "Vue", "TypeScript", "C#", "C++", "C", "Firebase", "ExpressJS"];

    export default {
        name: "DetailsForm",
        props: {
            listingDetails: Object
        },
        data() {
            return {


                // Tags field
                filteredTags: tags,
                isSelectOnly: false,
                tags: [],
                allowNew: false,
                openOnFocus: true,
            }
        },
        methods: {
            getFilteredTags(text) {
                this.filteredTags = tags.filter((option) => {
                    // console.log(option)
                    return option
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) >= 0
                }).filter(option => !this.listingDetails.tags.includes(option))
            },
        }
    }
</script>

<style scoped>

</style>