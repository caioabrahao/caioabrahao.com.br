<script setup>
  import "../../styles/markdown.css";
  import { useEditor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'

  const editor = useEditor({
    content: "Escreva aqui seu conteúdo!",
    extensions: [StarterKit],
    editorProps: {
    attributes: {
      class: 'px-4 aspect-4/5 outline-none',
    },
  },
  })
</script>

<template>
  <editor-content class="" :editor="editor" />
</template>