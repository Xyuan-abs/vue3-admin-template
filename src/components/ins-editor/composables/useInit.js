export default function (emit) {
  // 编辑器实例，必须用 shallowRef，重要！
  const editorRef = shallowRef()

  // 编辑器实例创建事件
  function onEditorCreated(editor) {
    editorRef.value = editor

    // editor.getAllMenuKeys()
    // console.log('editor.getAllMenuKeys()', editor.getAllMenuKeys())
  }

  // change事件
  function onEditorChange(editor) {
    const value = editor.getHtml()
    emit('update:modelValue', value)
    emit('change', value)
  }

  onBeforeUnmount(() => {
    const editor = editorRef.value

    editor && editor.destroy()
  })

  return {
    editorRef,
    onEditorCreated,
    onEditorChange,
  }
}
