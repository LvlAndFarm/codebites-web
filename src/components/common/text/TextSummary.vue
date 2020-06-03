<template>
    <div>
        <i>        {{truncatedText}}
            {{isTruncated && "..."}}</i>
        <a v-if="isTruncated && showMore">More</a>
    </div>
</template>

<script>
    export default {
        name: "TextSummary",
        props: {
            text: {
                default: "",
                type: String
            },
            maxChars: {
                default: 160,
                type: Number
            },
            showMore: {
                default: true,
                type: Boolean
            }
        },
        computed: {
            truncatedText() {
                // let txt = this.text;
                return this.text.slice(0, this.maxChars);
                // return txt;
            },

            isTruncated() {
                return this.text.length>this.maxChars;
            }
        }
    }
</script>

<style scoped>

</style>