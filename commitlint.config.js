export default {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // @see: https://commitlint.js.org/#/reference-rules
  rules: {
    // subject大小写不做校验
    'subject-case': [0],

    // 类型枚举，git提交type必须是以下类型
    'type-enum': [
      2,
      'always',
      [
        // 新增功能
        'feat',
        // 修复缺陷
        'fix',
        // 文档变更
        'docs',
        // 代码格式（不影响功能，例如空格、分号等格式修正）
        'style',
        // 代码重构（不包括 bug 修复、功能新增）
        'refactor',
        // 性能优化
        'perf',
        // 添加疏漏测试或已有测试改动
        'test',
        // 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
        'build',
        // 修改 CI 配置、脚本
        'ci',
        // 回滚 commit
        'revert',
        // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
        'chore',
      ],
    ],
  },
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前缀（可选）:',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      generatingByAI: '正在通过 AI 生成你的提交简短描述...',
      generatedSelectByAI: '选择一个 AI 生成的简短描述:',
      confirmCommit: '是否提交或修改commit ?',
    },
    // prettier-ignore
    types: [
            {
                value: "feat",
                name: "特性:     ✨  新增功能",
                emoji: "✨",
            },
            {
                value: "fix",
                name: "修复:     🐛  修复缺陷",
                emoji: "🐛",
            },
            {
                value: "docs",
                name: "文档:     📝  文档变更",
                emoji: "📝",
            },
            {
                value: "style",
                name: "格式:     💄  代码格式（不影响功能，例如空格、分号等格式修正）",
                emoji: "💄",
            },
            {
                value: "refactor",
                name: "重构:     ♻️  代码重构（不包括 bug 修复、功能新增）",
                emoji: "♻",
            },
            {
                value: "perf",
                name: "性能:     ⚡️  性能优化",
                emoji: "⚡️",
            },
            {
                value: "test",
                name: "测试:     ✅  添加疏漏测试或已有测试改动",
                emoji: "✅",
            },
            {
                value: "build",
                name: "构建:     📦️  构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）",
                emoji: "📦️",
            },
            {
                value: "ci",
                name: "集成:     🎡  修改 CI 配置、脚本",
                emoji: "🎡",
            },
            {
                value: "revert",
                name: "回退:     ⏪️  回滚 commit",
                emoji: "⏪️",
            },
            {
                value: "chore",
                name: "其他:     🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）",
                emoji: " 🔨",
            },
        ],
    useEmoji: true,
    emojiAlign: 'center',
    useAI: false,
    aiNumber: 1,
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixes: [
      { value: 'closed', name: 'closed:   ISSUES has been processed' },
    ],
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
  },
};
