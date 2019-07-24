<template>
  <div class="task">
    <div class="task-header">
      <div>
        <h5>{{ title }}</h5>
      </div>
      <div>
        <slot name="task-header"></slot> 
      </div>
    </div> 

    <div class="view-process-container">
      <div class="portlet">
        <div class="view-process-tools">
          <div>
           <slot name="view-process-tools-body"></slot> 
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ViewProcess',
  props: {
    title: {
      type: String
    }
  },
  data: function() {
    return {
    };
  }
}
</script>
