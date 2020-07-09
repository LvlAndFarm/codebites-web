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

        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    <strong>Codebites</strong> by <a href="https://jgthms.com">Codebites Ltd</a>.
                    <br/>
                    Copyright © 2020 Codebites Ltd
                    <br/><br/>
                    <a>Contact Us</a> | <a>Privacy Policy</a> | <a>Terms & Conditions</a>
                </p>
            </div>
        </footer>
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
        overlay: true,
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
    *, .font-circular, select>option {
        font-family: "Circular Std", "Font Awesome 5 Free", sans-serif;
    }

#app {
  font-family: Circular, Avenir, Helvetica, Arial, sans-serif !important;
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

    footer.footer {
        background-color: #eeeeee;
        padding: 3rem 1.5rem 3rem;
    }



    /* Modal z-index fix */
    .modal>.animation-content {
        z-index: 1;
    }

    .main-text-color {
        color: #363636 !important;
    }
</style>
