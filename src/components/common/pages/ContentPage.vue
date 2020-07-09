<template>
    <section class="main-page">
        <div class="container is-fluid" >
            <div class="columns is-gapless">
                <div class="column">
                    <div class="container box page-content sidecol" v-if="$slots.leftcol">
                        <slot name="leftcol"></slot>
                    </div>
                </div>
                <div class="column is-three-fifths">
                    <div class="container box page-content">
                        <slot name="main"></slot>

                    </div>
                </div>
                <div class="column">
                    <div class="container page-content sidecol">
                        <slot name="rightcol"></slot>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ContentPage"
    }
</script>

<style lang="scss">
    .page-content {

        margin-top: 30px;
        margin-bottom: 30px;
        max-width: 800px;

    }

    div.box > h3.title.is-3 {
        color: #363636;
    }

    .main-page {
        min-height: 100vh;
        background-image: linear-gradient(141deg, #3725d4 0%, #7957d5 71%, #9b67df 100%);

    }
</style>