<template>
    <form id="form" @submit.prevent="sendMessage">
      <div class="row">
        <div class="col-12 form-group">
          <label class="col-form-label col-form-label-lg">Message <span class="text-danger">*</span></label>
          <input type="text" class="form-control form-control-lg" v-model="message">
        </div>
        <div class="col-12 form-group text-center">
          <button class="btn btn-vue btn-lg col-4">Send</button>
        </div>
      </div>
    </form>
  </template>
  
  <script>

  export default {
    name: 'MessageForm',
    data() {
      return {
        message: ''
      }
    },
    methods: {
      async sendMessage() {
     fetch('https://2l1mglruj5.execute-api.us-east-1.amazonaws.com/dev/message', {
     method: 'POST',
     body: JSON.stringify({
      messageId: '103',
      messageName: this.message
  }),
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => alert(data.Item.messageName))   
}       
}
  }
  </script>
  
  <style>
  .btn-vue{
      background: #53B985;
      color: #31485D;
      font-weight: bold;
  }
  </style>
  