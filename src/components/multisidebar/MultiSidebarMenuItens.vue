<template>
  <div class="ms-menu">
    <div class='ms-historico d-flex flex-wrap'>
      <div :class="{'ms-historico-clickable': (historico.length  > 0)}" @click="historicoMenu()">
        <span class="text">MENU</span>
        <span v-if="historico.length  > 0" class="separator">-</span>
      </div>

      <div v-for="(menu, index) in historico" :key="index" :class="{'ms-historico-clickable': (index < historico.length - 1)}" @click="historicoMenu(menu)">
        <span class="text"> {{ menu.label }} </span>
        <span v-if="index < historico.length - 1" class="separator">-</span>
      </div>
    </div>
    <transition :name="transactionName">
      <div v-if="show">
        <div v-for="(menu, index) in menuItens" :key="index" >
          <multi-sidebar-menu-item :menuItem="menu" @menuClicked="navegar" v-if="menu.label"/>
          <div class="ms-divider" v-if="menu.divider"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MultiSidebarMenuItem from './MultiSidebarMenuItem.vue'
import { isDesktop } from '@/agilite-components-vue'
export default {
  name: 'MultiSidebarMenuItens',
  components: {
    MultiSidebarMenuItem
  },
  props: {
    itens: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      historico: [],
      menuItens: [],
      show: true,
      transactionName: 'slide'
    }
  },
  mounted: function () {
    this.menuItens = this.itens;
  },
  methods: {
    historicoMenu: function (menu) {
      this.transactionName = 'historico'
      this.$nextTick(() => {
        this.show = false
        if (!menu) {
          if (this.historico.length > 0) {
            this.menuItens = this.itens  
            this.historico = []
          }
        } else {
          this.menuItens = menu.submenu
          let index = this.historico.findIndex(obj => menu.label == obj.label)
          this.historico.splice(index + 1)
        }
        setTimeout(() => {
          this.show = true
        }, 100);
      })
    },
    navegar: function (menu) {
      if (menu.submenu) {
        this.transactionName = 'slide'
        this.$nextTick(() => {
          this.show = false
          this.historico.push(menu)
          this.menuItens = menu.submenu
          setTimeout(() => {
            this.show = true
          }, 100);
        });
      } else {
        if(menu.routeName){
          this.$router.push({name: menu.routeName})
          if (!isDesktop()) document.body.classList.remove('sidebar-visible')
        } else {
          console.dir("Ir para  a tarefa " + menu.label)
        }
      }
    }
  }
}
</script>
<style>
.slide-enter-active {
  animation: slide-in .3s;
}
.slide-leave-active {
  animation: slide-out .3s;
}
.historico-enter-active {
  animation: hist-in .3s;
}
.historico-leave-active {
  animation: hist-out .3s;
}

@keyframes slide-in {
  0% {
    transform: translateX(300px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-out {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-300px);
    opacity: 0;
  }
}

@keyframes hist-in {
  0% {
    transform: translateX(-300px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes hist-out {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(300px);
    opacity: 0;
  }
}
</style>


