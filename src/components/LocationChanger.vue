<script setup>
  import { ref } from 'vue'

  import Button from './Button.vue'
  import IconLocation from './icons/IconLocation.vue'
  import Input from './Input.vue'

  const emit = defineEmits(['changeLocation'])

  const editMode = ref(false)
  const location = ref('')

  const editModeToggler = () => (editMode.value = !editMode.value)

  const onChange = (value) => (location.value = value)
  const onClearLocation = () => (location.value = '')
  const onClickSave = async () => {
    emit('changeLocation', location.value)
    editModeToggler()
    onClearLocation()
  }
</script>
<template>
  <div class="location-changer-wrapper">
    <Button v-if="!editMode" :on-click="editModeToggler">Change Location</Button>
    <div v-else class="location-changer">
      <Input
        v-focus
        placeholder="Enter location"
        :value="location"
        :on-change="onChange"
        @keyup.enter="onClickSave"
      />
      <Button :on-click="onClickSave" :disabled="!location.length">
        <template #icon>
          <IconLocation size="14" />
        </template>
        Save
      </Button>
    </div>
  </div>
</template>
<style scoped>
  .location-changer-wrapper {
    min-width: 326px;
  }
  .location-changer {
    display: flex;
    gap: 16px;
  }
</style>
