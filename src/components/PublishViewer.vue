<template>
  <div class="publish-viewer">
    <span>Id: {{ publish.original_id }}</span><br>
    <span>Processo: {{ publish.process_number }}</span><br>
    <span>Data de emissão: {{ publish.emission_date }}</span><br>
    <span>Data de registro: {{ publish.register_date }}</span><br>
    <span>Tipo: <strong>{{ publish.type }}</strong></span><br>
    <strong>{{ publish.system }}</strong>
    <br>
    <br>

    <div v-html="publish.text"></div>
    
  </div>
</template>

<script>
export default {
  name: 'PublishViewer',
  props: {
    publish: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.publish-viewer{
  display: block;
  background-color: antiquewhite;
  align-self: center;
  max-width: 100%;
  width: 50rem;
  padding: 1rem 0rem 1rem 0rem;
  margin: 1rem;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
