<template>
    <div>
        <nav-bar :on-sidebar-open="() => {open=true}"/>
        <div class="columns is-gapless">
            <div class="column">
                <router-view/>
            </div>

        </div>

        <b-sidebar
                type="is-light"
                :fullheight="fullheight"
                :fullwidth="fullwidth"
                :overlay="overlay"
                :right="right"
                :open.sync="open"
        >
            <div class="p-1">
                <tasks-sidebar/>
            </div>
        </b-sidebar>

        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
    </div>
</template>

<script>
  import NavBar from "./components/common/NavBar";
  import TasksSidebar from "./components/common/panels/TasksSidebar";
  export default {
      components: {TasksSidebar, NavBar},
      props: {
      source: String,
    },
    data: () => ({
      drawer: null,

        open: false,
        overlay: false,
        fullheight: true,
        fullwidth: false,
        right: true
    }),
      computed: {
          isLoading() {
              return this.$store.state.isLoading;
          }
      }
  }
</script>

<style lang="scss">
    *, .font-circular {
        font-family: "Circular Std", sans-serif;
    }

#app {
  font-family: Circular, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.navbar-title {
    font-size: 1.3em;
    /*margin-bottom: 1px;*/
    color: #7957d5;
}

    .p-1 {
        padding: 1em;
    }
</style>
