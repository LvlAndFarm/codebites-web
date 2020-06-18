<template>
    <span>
        <span class="flag-emoji">{{countryFlag}}</span>
        <span>
            {{showName ? countryName : ""}}
        </span>
    </span>
</template>

<script>
    import getUnicodeFlagIcon from 'country-flag-icons/unicode';
    import {getName} from 'country-list';

    export default {
        name: "FlagEmoji",
        props: {
            countryCode: String,
            showName: Boolean
        },
        computed: {
            countryFlag() {
                if (!this.countryCode) return "";
                return getUnicodeFlagIcon(this.countryCode.toUpperCase()).trim()
            },
            countryName() {
                if (!this.countryCode) return "";
                return getName(this.countryCode);
            },
        }
    }
</script>

<style>
    @font-face {
        font-family: 'Noto Color Emoji';
        src: url(https://gitcdn.xyz/repo/googlefonts/noto-emoji/master/fonts/NotoColorEmoji.ttf);
    }

    .flag-emoji {
        font-family: 'Noto Color Emoji';
    }
</style>