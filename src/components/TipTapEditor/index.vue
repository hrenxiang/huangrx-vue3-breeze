<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { onBeforeUnmount, reactive, ref, watch } from 'vue';
import {
  AlignTextBoth,
  AlignTextCenter,
  AlignTextLeft,
  AlignTextRight,
  Back,
  ClearFormat,
  Code,
  CodeBrackets,
  FullScreenOne,
  H1,
  H2,
  H3,
  IndentLeft,
  IndentRight,
  LevelFiveTitle,
  LevelFourTitle,
  LevelSixTitle,
  Link as LinkIcon,
  ListTwo,
  Next,
  OrderedList,
  Pic,
  Quote,
  Strikethrough,
  TextBold,
  TextItalic,
  TextUnderline,
  Unlink,
} from '@icon-park/vue-next';
import { Underline } from '@tiptap/extension-underline';
import { TextAlign } from '@tiptap/extension-text-align';
import { Indent } from '@weiruo/tiptap-extension-indent';
import { Link } from '@tiptap/extension-link';
import ImageUpload from '@/components/ImageUpload/index.vue';
import { UploadUserFile } from 'element-plus';
import { Image } from '@tiptap/extension-image';

defineOptions({
  name: 'TipTapEditor',
});

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:content']);

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit,
    Underline,
    TextAlign,
    Indent.configure({
      types: ['listItem', 'paragraph'],
      minLevel: 0,
      maxLevel: 8,
    }),
    Link.configure({ openOnClick: true }),
    Image,
  ],
  onUpdate: () => {
    emit('update:content', editor.value?.getHTML());
  },
});

// 监听 content 的变化并更新编辑器内容
watch(
  () => props.content,
  (newContent) => {
    if (editor) {
      editor.value?.commands.setContent(newContent || '');
    }
  },
);

const editorContainer = ref<HTMLElement | null>();

const imgUploadRef = ref();

let isFullScreen = ref<boolean>(false);

onBeforeUnmount(() => {
  editor.value?.destroy();
});

const items = reactive([
  {
    icon: TextBold,
    title: '加粗',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleBold().run();
    },
    isActive: () => editor.value?.isActive('bold'),
  },
  {
    icon: TextUnderline,
    title: '下划线',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleUnderline().run();
    },
    isActive: () => editor.value?.isActive('underline'),
  },
  {
    icon: TextItalic,
    title: '斜体',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleItalic().run();
    },
    isActive: () => editor.value?.isActive('italic'),
  },
  {
    icon: Strikethrough,
    title: '文本线',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleStrike().run();
    },
    isActive: () => editor.value?.isActive('strike'),
  },
  {
    icon: H1,
    title: 'H1',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleHeading({ level: 1 }).run();
    },
    isActive: () => editor.value?.isActive('heading', { level: 1 }),
  },
  {
    icon: H2,
    title: 'H2',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleHeading({ level: 2 }).run();
    },
    isActive: () => editor.value?.isActive('heading', { level: 2 }),
  },
  {
    icon: H3,
    title: 'H3',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleHeading({ level: 3 }).run();
    },
    isActive: () => editor.value?.isActive('heading', { level: 3 }),
  },
  {
    icon: LevelFourTitle,
    title: 'H4',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleHeading({ level: 4 }).run();
    },
    isActive: () => editor.value?.isActive('heading', { level: 4 }),
  },
  {
    icon: LevelFiveTitle,
    title: 'H5',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleHeading({ level: 5 }).run();
    },
    isActive: () => editor.value?.isActive('heading', { level: 5 }),
  },
  {
    icon: LevelSixTitle,
    title: 'H6',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleHeading({ level: 6 }).run();
    },
    isActive: () => editor.value?.isActive('heading', { level: 6 }),
  },
  {
    icon: Code,
    title: '代码',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleCode().run();
    },
    isActive: () => editor.value?.isActive('code'),
  },
  {
    icon: CodeBrackets,
    title: '代码块',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleCodeBlock().run();
    },
    isActive: () => editor.value?.isActive('codeBlock'),
  },
  {
    icon: ListTwo,
    title: '无序列表',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleBulletList().run();
    },
    isActive: () => editor.value?.isActive('bulletList'),
  },
  {
    icon: OrderedList,
    title: '有序列表',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleOrderedList().run();
    },
    isActive: () => editor.value?.isActive('orderedList'),
  },
  {
    icon: AlignTextLeft,
    title: '左对齐',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().setTextAlign('left').run();
    },
    isActive: () => editor.value?.isActive('text-align-left'),
  },
  {
    icon: AlignTextRight,
    title: '右对齐',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().setTextAlign('right').run();
    },
    isActive: () => editor.value?.isActive('text-align-right'),
  },
  {
    icon: AlignTextCenter,
    title: '居中对齐',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().setTextAlign('center').run();
    },
    isActive: () => editor.value?.isActive('text-align-center'),
  },
  {
    icon: AlignTextBoth,
    title: '两端对齐',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().setTextAlign('justify').run();
    },
    isActive: () => editor.value?.isActive('text-align-justify'),
  },
  {
    icon: IndentLeft,
    title: '减少缩进',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.commands.outdent();
    },
    isActive: () => editor.value?.isActive('outdent'),
  },
  {
    icon: IndentRight,
    title: '增加缩进',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.commands.indent();
    },
    isActive: () => editor.value?.isActive('indent'),
  },
  {
    icon: Quote,
    title: '引用',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleBlockquote().run();
    },
    isActive: () => editor.value?.isActive('blockquote'),
  },
  {
    icon: LinkIcon,
    title: '添加链接',
    action: (event: MouseEvent) => {
      event.preventDefault();

      const previousUrl = editor.value?.getAttributes('link').href;
      const url = window.prompt('URL', previousUrl);
      if (url === null) {
        return;
      }
      if (url === '') {
        editor.value?.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }
      // update link
      editor.value
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    },
    isActive: () => editor.value?.isActive('set-link'),
  },
  {
    icon: Unlink,
    title: '取消链接',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().extendMarkRange('link').unsetLink().run();
    },
    isActive: () => editor.value?.isActive('unset-link'),
  },
  {
    icon: Pic,
    title: '上传图片',
    action: (event: MouseEvent) => {
      event.preventDefault();
      imgUploadRef.value?.triggerUpload();
    },
    isActive: () => editor.value?.isActive('upload-image'),
  },
  {
    icon: ClearFormat,
    title: '清除格式',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().unsetAllMarks().run();
      editor.value?.chain().focus().clearNodes().run();
    },
    isActive: () => false,
  },
  {
    icon: Back,
    title: '撤销',
    action: (event: MouseEvent) => {
      event.preventDefault();
      if (editor.value?.can().undo()) {
        editor.value?.chain().undo().run();
      }
    },
    isActive: () => false,
  },
  {
    icon: Next,
    title: '重做',
    action: (event: MouseEvent) => {
      event.preventDefault();
      if (editor.value?.can().redo()) {
        editor.value?.chain().redo().run();
      }
    },
    isActive: () => false,
  },
  {
    icon: FullScreenOne,
    title: '全屏',
    action: (event: MouseEvent) => {
      event.preventDefault();
      isFullScreen.value = !isFullScreen.value;
    },
    isActive: () => false,
  },
]);

const handleImgUploadComplete = (
  fileList: (UploadUserFile & { fileId: string; createTime: string })[],
) => {
  if (fileList.length > 0) {
    editor.value
      ?.chain()
      .focus()
      .setImage({
        src: (import.meta.env.VITE_APP_BASE_FILE_DOWNLOAD_URL +
          fileList[0].url) as string,
      })
      .run();
  }
};
</script>

<template>
  <div
    v-if="editor"
    class="editor-container"
    ref="editorContainer"
    :class="{ fullscreen: isFullScreen }"
  >
    <div class="editor-control-group">
      <span v-for="(item, i) in items" :key="i">
        <el-button
          @click="item.action"
          :class="item.isActive() ? 'is-active' : ''"
          :icon="item.icon"
        />
      </span>
    </div>
    <editor-content class="editor-content" :editor="editor" />

    <div class="editor-image-upload">
      <image-upload
        v-show="false"
        ref="imgUploadRef"
        :addition="{ type: 'policy_info' }"
        :limit="1"
        :is-edit="true"
        :original-list="[]"
        :file-type="['JPG', 'JPEG', 'PNG']"
        :file-size="10"
        @upload-complete="handleImgUploadComplete"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.editor-container {
  display: grid;
  width: 820px;
  height: 406px;
  grid-template-rows: auto 1fr;
}

.fullscreen {
  position: fixed;
  inset: 0;
  z-index: 20005;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: #fff;
}

.editor-control-group {
  display: flex;
  padding: 6px 12px;
  width: 100%;
  border: 1px solid var(--el-border-color);
  border-radius: 8px 8px 0 0;
  flex-flow: row wrap;
  gap: 2px;

  .el-button {
    padding: 8px;
    border: none;
  }
}

.editor-content {
  overflow: auto;
}

:deep(.ProseMirror) {
  overflow: auto;
  padding: 12px;
  width: 100%;
  height: 100%;
  font-family: pingfang-sc-regular, sans-serif;
  border: 1px solid var(--el-border-color);
  border-radius: 0 0 8px 8px;
  border-top: none;
  line-height: 21px;

  /* 针对 Firefox 浏览器滚动条 */
  scrollbar-width: none;

  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    text-wrap: pretty;
  }

  h1 {
    font-size: 1.6rem;
  }

  h2 {
    font-size: 1.4rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  h4 {
    font-size: 1.1rem;
  }

  h5 {
    font-size: 1rem;
  }

  h6 {
    font-size: 0.9rem;
  }

  code {
    padding: 0.25em 0.3em;
    font-size: 0.85rem;
    color: var(--black);
    background-color: var(--el-color-primary);
    border-radius: 0.4rem;
  }

  pre {
    padding: 0.75rem 1rem;
    margin: 1.5rem 0;
    font-family: pingfang-sc-regular, monospace;
    color: white;
    background: black;
    border-radius: 0.5rem;

    code {
      padding: 0;
      font-size: 0.8rem;
      color: inherit;
      background: none;
    }
  }

  blockquote {
    padding-left: 1rem;
    margin: 1.5rem 0;
    border-left: 3px solid gray;
  }

  hr {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid gray;
  }

  a {
    padding: 5px;
    margin: 0 2px;
    text-decoration: none;
    color: var(--el-color-primary);
    font-weight: bold;
  }

  a:hover {
    cursor: pointer;
  }

  p {
    margin-bottom: 8px;
  }
}

/* Webkit 浏览器：Chrome, Safari, Edge */
:deep(.ProseMirror::-webkit-scrollbar) {
  display: none;
}

:deep(.ProseMirror-focused) {
  outline: none;
}
</style>
