<template>
  <div class="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  .app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

  :focus {
    outline: 0;
  }

  .container {
    padding: 30px 15px;
  }

  .title {
    margin-top: 0;
    margin-bottom: 50px;
  }
</style>
