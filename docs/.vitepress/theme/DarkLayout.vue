<script setup>
import DefaultTheme from "vitepress/theme";
import { h, compile, onMounted } from "vue";
const { Layout } = DefaultTheme;
onMounted(() => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    console.log("setting as dark");
    document.body.classList.add("dark");
  }
  setTimeout(() => {
    let initial = document.body.classList.contains("dark") ? "🔆" : "🌙";
    let navBars = document.getElementsByClassName("nav-links");
    if (navBars) {
      let navBar = navBars[0];
      if (navBar) {
        navBar.insertAdjacentHTML(
          "beforeend",
          `<div class="item" style="padding: 0 1.5rem;;cursor: pointer;" onclick="document.body.classList.toggle('dark'); this.innerHTML= document.body.classList.contains('dark') ? '🔆' : '🌙';"> ${initial} </div>`
        );
      }
      navBar = navBars[1];
      if (navBar) {
        navBar.insertAdjacentHTML(
          "beforeend",
          `<div class="item" style="padding: 0 1.5rem;;cursor: pointer;" onclick="document.body.classList.toggle('dark'); this.innerHTML= document.body.classList.contains('dark') ? '🔆' : '🌙';"> ${initial} </div>`
        );
      }
    }
  }, 100);
});
</script>

<template>
  <Layout></Layout>
</template>