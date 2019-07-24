export default function (error, vm) {
  // console.dir(error)
  // console.dir(vm.$crash)
  
  error.protocolo = Math.floor(new Date() / 1000)
  vm.$crash.report(error)

  if(error.response){
    if(error.response.status == 401){
      vm.$snotify.warning('Sua sessão foi desconectada.\nPor favor efetue o login novamente');
      vm.$router.replace({name: 'Login'})
    }else if(error.response.status == 403){
      vm.$snotify.warning('Seu usuário não possui acesso a tarefa solicitada!');
      vm.$router.replace({name: 'Login'})
    }else if(error.response.status == 400){
      vm.$snotify.warning(error.response.data.message);
    }else{
      let err = {
        axios: true,
        status: error.response.status,
        data: error.response.data,
        protocolo: error.protocolo
      }
      vm.$router.replace({name: 'Error', params: err})
    }
  }else{
    let err = {
      axios: false,
      data: error,
      protocolo: error.protocolo
    }
    vm.$router.replace({name: 'Error', params: err})
  }
}