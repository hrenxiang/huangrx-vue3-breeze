<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { markRaw, onBeforeUnmount, reactive, ref, watch } from 'vue';
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
  ListSuccess,
  ListTwo,
  Next,
  OrderedList,
  Pic,
  Quote,
  Split,
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
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';
import { Highlight } from '@tiptap/extension-highlight';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Heading } from '@tiptap/extension-heading';
import { Text } from '@tiptap/extension-text';
import { ImageResize } from '@comp/TipTapEditor/resizableImage.ts';

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

// 监听 content 的变化并更新编辑器内容
watch(
  () => props.content,
  (newContent) => {
    if (editor) {
      editor.value?.commands.setContent(newContent || '');
    }
  },
);

// create a lowlight instance
const lowlight = createLowlight(all);

const color = ref('rgba(0, 0, 0)');

const bgColor = ref('rgba(255, 255, 255)');

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
]);

const editorContainer = ref<HTMLElement | null>();

const imgUploadRef = ref();

let isFullScreen = ref<boolean>(false);

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit,
    Underline,
    Text,
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Indent.configure({
      types: ['listItem', 'paragraph'],
      minLevel: 0,
      maxLevel: 8,
    }),
    Link.configure({ openOnClick: true }),
    // Image,
    ImageResize,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Highlight.configure({ multicolor: true }),
    TextStyle,
    Color,
  ],
  onUpdate: () => {
    emit('update:content', editor.value?.getHTML());
  },
});

const items = reactive([
  {
    icon: markRaw(TextBold),
    title: '加粗',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleBold().run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('bold'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(TextUnderline),
    title: '下划线',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleUnderline().run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('underline'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(TextItalic),
    title: '斜体',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleItalic().run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('italic'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(Strikethrough),
    title: '文本线',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleStrike().run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('strike'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(H1),
    title: 'H1',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleHeading({ level: 1 }).run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('heading', { level: 1 }),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(H2),
    title: 'H2',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleHeading({ level: 2 }).run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('heading', { level: 2 }),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(H3),
    title: 'H3',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleHeading({ level: 3 }).run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('heading', { level: 3 }),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(LevelFourTitle),
    title: 'H4',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleHeading({ level: 4 }).run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('heading', { level: 4 }),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(LevelFiveTitle),
    title: 'H5',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleHeading({ level: 5 }).run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('heading', { level: 5 }),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(LevelSixTitle),
    title: 'H6',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleHeading({ level: 6 }).run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('heading', { level: 6 }),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(Code),
    title: '代码',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleCode().run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('code'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(CodeBrackets),
    title: '代码块',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleCodeBlock().run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('codeBlock'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(ListTwo),
    title: '无序列表',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleBulletList().run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('bulletList'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(OrderedList),
    title: '有序列表',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleOrderedList().run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('orderedList'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(AlignTextLeft),
    title: '左对齐',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().setTextAlign('left').run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('text-align-left'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(AlignTextRight),
    title: '右对齐',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().setTextAlign('right').run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('text-align-right'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(AlignTextCenter),
    title: '居中对齐',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().setTextAlign('center').run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('text-align-center'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(AlignTextBoth),
    title: '两端对齐',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().setTextAlign('justify').run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('text-align-justify'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(IndentLeft),
    title: '减少缩进',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.commands.outdent();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('outdent'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(IndentRight),
    title: '增加缩进',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.commands.indent();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('indent'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(Quote),
    title: '引用',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleBlockquote().run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('blockquote'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(LinkIcon),
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
    change: () => {},
    isActive: () => editor.value?.isActive('set-link'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(Unlink),
    title: '取消链接',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().extendMarkRange('link').unsetLink().run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('unset-link'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(ListSuccess),
    title: '任务列表',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().toggleTaskList().run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('taskList'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(Split),
    title: '任务列表子项',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().splitListItem('taskItem').run();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('taskList'),
    disabled: () => !editor.value?.can().sinkListItem('taskItem'),
    type: 'button',
  },
  {
    icon: markRaw(Split),
    title: '文字颜色',
    action: (event: MouseEvent) => {
      event.preventDefault();
    },
    change: (val: string | null) => {
      console.log(val);

      editor.value?.chain().focus().setColor(color.value).run();
    },
    isActive: () => editor.value?.isActive('textStyle', { color: color.value }),
    disabled: () => {
      return false;
    },
    type: 'color-picker',
  },
  {
    icon: markRaw(Split),
    title: '高亮',
    action: (event: MouseEvent) => {
      event.preventDefault();
    },
    change: (val: string | null) => {
      console.log(val);
      editor.value
        ?.chain()
        .focus()
        .toggleHighlight({ color: bgColor.value })
        .run();
    },
    isActive: () =>
      editor.value?.isActive('highlight', { color: bgColor.value }),
    disabled: () => {
      return false;
    },
    type: 'bg-color-picker',
  },
  {
    icon: markRaw(Pic),
    title: '上传图片',
    action: (event: MouseEvent) => {
      event.preventDefault();
      imgUploadRef.value?.triggerUpload();
    },
    change: () => {},
    isActive: () => editor.value?.isActive('upload-image'),
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(ClearFormat),
    title: '清除格式',
    action: (event: MouseEvent) => {
      event.preventDefault();
      editor.value?.chain().focus().unsetAllMarks().run();
      editor.value?.chain().focus().clearNodes().run();
    },
    change: () => {},
    isActive: () => false,
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(Back),
    title: '撤销',
    action: (event: MouseEvent) => {
      event.preventDefault();
      if (editor.value?.can().undo()) {
        editor.value?.chain().undo().run();
      }
    },
    change: () => {},
    isActive: () => false,
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(Next),
    title: '重做',
    action: (event: MouseEvent) => {
      event.preventDefault();
      if (editor.value?.can().redo()) {
        editor.value?.chain().redo().run();
      }
    },
    change: () => {},
    isActive: () => false,
    disabled: () => {
      return false;
    },
    type: 'button',
  },
  {
    icon: markRaw(FullScreenOne),
    title: '全屏',
    action: (event: MouseEvent) => {
      event.preventDefault();
      isFullScreen.value = !isFullScreen.value;
    },
    change: () => {},
    isActive: () => false,
    disabled: () => {
      return false;
    },
    type: 'button',
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

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<template>
  <div
    v-if="editor"
    class="editor-container"
    ref="editorContainer"
    :class="{ fullscreen: isFullScreen }"
  >
    <div class="editor-control-group">
      <span v-for="(item, i) in items" :key="i" class="editor-control-item">
        <el-tooltip
          class="box-item"
          effect="light"
          :content="item.title"
          placement="top"
          popper-append-to-body
        >
          <template v-if="item.type === undefined || item.type === 'button'">
            <el-button
              @click="item.action"
              :class="item.isActive() ? 'is-active' : ''"
              :icon="item.icon"
              :disabled="item.disabled === undefined ? false : item.disabled()"
            />
          </template>

          <template v-else-if="item.type === 'color-picker'">
            <span>
              <el-color-picker
                v-model="color"
                show-alpha
                :predefine="predefineColors"
                @change="item.change"
                :class="item.isActive() ? 'is-active' : ''"
                :icon="item.icon"
              />
            </span>
          </template>

          <template v-else-if="item.type === 'bg-color-picker'">
            <span>
              <el-color-picker
                v-model="bgColor"
                show-alpha
                :predefine="predefineColors"
                @change="item.change"
                :class="item.isActive() ? 'is-active' : ''"
                :icon="item.icon"
              />
            </span>
          </template>
        </el-tooltip>
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

.editor-control-item {
  display: flex;
  align-items: center;
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

  :first-child {
    margin-top: 0;
  }

  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Task list specific styles */
  ul[data-type='taskList'] {
    padding: 0;
    margin-left: 0;
    list-style: none;

    li {
      display: flex;
      align-items: flex-start;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }

    li[data-checked='true'] {
      color: $bg-color-gray-2;
    }

    input[type='checkbox'] {
      cursor: pointer;
    }

    ul[data-type='taskList'] {
      margin: 0;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  blockquote {
    padding-left: 1rem;
    margin: 1.5rem 0;
    border-left: 3px solid $bg-color-gray-2;
  }

  hr {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid $bg-color-gray-2;
  }

  p {
    margin-bottom: 8px;
  }

  a {
    padding: 5px;
    margin: 0 2px;
    text-decoration: none;
    color: $primary-color;
    font-weight: bold;
  }

  a:hover {
    cursor: pointer;
  }

  /* code style */
  code {
    padding: 0.25em 0.3em;
    font-size: 0.85rem;
    color: $bg-color-dark;
    background-color: $bg-color-gray;
    border-radius: 0.4rem;
  }

  /* code block style */
  pre {
    padding: 0.75rem 1rem;
    margin: 1.5rem 0;
    color: $bg-color-light;
    background: $bg-color-dark;
    border-radius: 0.5rem;

    code {
      padding: 0;
      font-size: 0.8rem;
      color: inherit;
      background: none;
    }

    /* Code styling */
    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }

  /* 缩进样式 */
  @for $i from 1 through 8 {
    .tt-indent-#{$i} {
      padding-left: $i * 3rem;
    }
  }
}

/* Webkit 浏览器：Chrome, Safari, Edge */
:deep(.ProseMirror::-webkit-scrollbar) {
  display: none;
}

:deep(.ProseMirror-focused) {
  outline: none;
}

:deep(.el-color-picker__trigger) {
  width: 24px;
  height: 24px;
  border: none;
}
</style>
