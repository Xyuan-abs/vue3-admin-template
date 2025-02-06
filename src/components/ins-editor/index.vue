<!-- 
  名称：分页
 -->
<script setup>
import '@wangeditor/editor/dist/css/style.css'

import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

import useInit from './composables/useInit.js'
import useToolbarConfig from './composables/useToolbarConfig.js'
import useEditorConfig from './composables/useEditorConfig.js'

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
  isReadonly: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: '350px',
  },
})
const emit = defineEmits(['change', 'update:modelValue'])

const { editorRef, onEditorCreated, onEditorChange } = useInit(emit)
/** 工具栏最终配置 */
const toolbarConfigResult = useToolbarConfig(props, 'toolbarConfig')
/** 编辑器最终配置 */
const editorConfigResult = useEditorConfig(props, 'editorConfig')

/* 值的双向绑定 */
const html = ref('') // 值的双向绑定
watch(
  () => props.modelValue,
  (newValue) => {
    html.value = newValue
  },
  { immediate: true },
)

/** 只读 */
watch(
  () => props.isReadonly,
  (isReadonly) => {
    if (!editorRef.value) return

    if (isReadonly) {
      editorRef.value.disable()
    } else {
      editorRef.value.enable()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="ins-editor">
    <Toolbar class="ins-editor-toolbar" :default-config="toolbarConfigResult" :editor="editorRef" />
    <Editor
      v-model="html"
      class="ins-editor-editor"
      :default-config="editorConfigResult"
      mode="simple"
      :style="{ height }"
      @on-change="onEditorChange"
      @on-created="onEditorCreated"
    />
  </div>
</template>

<style lang="scss" scoped>
.ins-editor {
  width: 100%;
  border: 1px solid #e8e8e8;

  &-toolbar {
    border-bottom: 1px solid #e8e8e8;
  }
  &-editor {
    overflow: auto;
    cursor: text;
  }

  :deep() {
    video {
      max-width: 100%;
    }
    .w-e-text-placeholder {
      top: 11px;
    }
    .w-e-textarea-video-container {
      display: inline-block;
      line-height: 1;
    }
  }
}
</style>
