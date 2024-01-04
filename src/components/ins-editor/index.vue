<!-- 
  名称：分页
  版本：1.0.0 
  作者：Xyuan
  时间：2023年2月13日15:31:38
 -->
<script setup>
  import '@wangeditor/editor/dist/css/style.css'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

  const props = defineProps({
    toolbarConfig: {
      type: Object,
      default: () => ({}),
    },
    editorConfig: {
      type: Object,
      default: () => ({
        placeholder: '请输入内容...',
      }),
    },
    modelValue: {
      type: String,
      default: null,
    },
  })

  const emit = defineEmits(['change', 'update:modelValue'])

  /* 值的双向绑定 */
  const html = ref('') // 值的双向绑定
  watch(
    () => props.modelValue,
    (newValue) => {
      html.value = newValue
    },
    {
      immediate: true,
    }
  )

  const editorRef = ref()

  const handleCreated = (editor) => {
    editorRef.value = editor
  }

  const handleChange = () => {
    console.log(editorRef.value.isEmpty())

    const value = editorRef.value.isEmpty() ? '' : html.value

    emit('update:modelValue', value)
    emit('change')
  }
</script>

<template>
  <div class="ins-editor">
    <Toolbar class="ins-editor-toolbar" :default-config="toolbarConfig" :editor="editorRef" />
    <Editor
      v-model="html"
      class="ins-editor-editor"
      :default-config="editorConfig"
      mode="simple"
      @on-change="handleChange"
      @on-created="handleCreated"
    />
  </div>
</template>

<style lang="scss" scoped>
  .ins-editor {
    &-toolbar {
      border-bottom: 1px solid #e8e8e8;
    }
    &-editor {
      height: 300px;
      cursor: text;
    }
  }
</style>
