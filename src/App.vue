<template>
  <h2>Classificador de Publicações</h2>
  
  <!-- <form :action="url+'api/types'" method="post" @submit.prevent="createTypeHandler"> -->
  <div>
    <input type="text" name="name" v-model="publishTypeNameTemp" placeholder="Tipo de publicação">
    <button @click="createType" >Criar tipo</button>
  </div>
  <!-- </form> -->

  <PublishViewer v-if="publish" :publish="publish"/> 
  <div v-if="publish">
    <select v-model="selectedType_id">
      <option disabled value="">Selecione um tipo para classificar</option>
      <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
    </select>
    <button @click="classifySelectedPublish">Classificar</button>
  </div>
  <button @click="fetchRandomPublish(false)">Trazer publicação aleatória</button>
  <button @click="fetchRandomPublish(true)">Trazer publicação expediente</button>


</template>

<script>
import PublishViewer from './components/PublishViewer.vue'
import axios from 'axios';
import { useToast } from "vue-toastification";


export default {
  name: 'App',
  components: {
    PublishViewer,
  },
  data() {
    return {
      selectedType_id: null,
      publishTypeNameTemp: null,
      publish: null,
      types: null,
    }
  },
  created() {
    console.log(this.url);
    this.fetchTypes();
  },
  methods: {
    classifySelectedPublish: function(){
      if(!this.publish)return;

      if(!this.selectedType_id){
        useToast().error('Você precisa selecionar um tipo para classificar a publicação.');
        return;
      }

      axios.put(this.url+`api/publishes/${this.publish.id}`,{
        type_id:this.selectedType_id,
      }).then((res)=>{
        console.log(res.data)
          useToast().success(`Publicação classificada!`)
          this.publish = null;
      }).catch((err)=>{
          console.log(err)
          useToast().error(`Não foi possível criar o tipo`)
      });
    },
    fetchTypes: function(){
      axios.get(this.url+"api/types").then((res)=>{
        this.types=res.data;
      })
    },
    createType: function(){

      axios.post(this.url+"api/types",{
        name:this.publishTypeNameTemp,
      }).then((res)=>{
        console.log(res.data)
          useToast().success(`Tipo ${res.data.name} adicionado`)
          this.types.push(res.data);
      }).catch((err)=>{
          console.log(err)
          useToast().error(`Não foi possível criar o tipo`)
      });
    },
    fetchRandomPublish: function(isExpedient=false){
      axios.get(this.url+"api/publishes/random"+(isExpedient?'?type=expediente':'')).then((res)=>{
        this.publish=res.data;
      })
    }
  },
  computed: {
    url: function(){
      return process.env.VUE_APP_PUBLISHES_URL;
    }
  },
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  align-content: center;
  justify-items: center;
}
</style>
