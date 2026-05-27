/**
 * =====================================================
 * バナーデザイン候補生成ツール 設定ファイル（テンプレート）
 * =====================================================
 *
 * 【初回セットアップ手順】
 * 1. このファイルを config.js という名前でコピーする
 *    （Mac/Linux）: cp config.template.js config.js
 *    （Windows）  : copy config.template.js config.js
 *
 * 2. config.js を開いて ANTHROPIC_API_KEY を自分のキーに書き換える
 *
 * 3. config.js は .gitignore で除外済みのため、
 *    Gitにコミットされることはありません（安全）
 *
 * ⚠️ このファイル（config.template.js）はGitで管理されます。
 *    ここには絶対に本物のAPIキーを書かないでください。
 *
 * 【APIキーの取得方法】
 * 1. https://console.anthropic.com にアクセス
 * 2. 「API Keys」メニューから新しいキーを作成
 * 3. 表示されたキー（sk-ant-api03-...）をコピーして config.js に貼り付ける
 */
const ANTHROPIC_API_KEY = "YOUR_ANTHROPIC_API_KEY_HERE";

/**
 * 使用するClaudeモデル
 */
const CLAUDE_MODEL = "claude-sonnet-4-20250514";

/**
 * =====================================================
 * バナーサイズ設定
 * =====================================================
 * 追加例: { id: "square", label: "1080×1080", width: 1080, height: 1080, desc: "Instagram スクエア" }
 */
const BANNER_SIZES = [
  { id: "facebook-ogp",       label: "1200×628",  width: 1200, height: 628,  desc: "Facebook / OGP" },
  { id: "display-300",        label: "300×250",   width: 300,  height: 250,  desc: "ディスプレイ広告" },
  { id: "leaderboard",        label: "728×90",    width: 728,  height: 90,   desc: "レクタングル（横長）" },
  { id: "smartphone-vertical",label: "1080×1920", width: 1080, height: 1920, desc: "スマホ縦型ストーリー" },
];

/**
 * =====================================================
 * トーン定義
 * =====================================================
 */
const TONES = [
  {
    id: "luxury",
    label: "高級感",
    keywords: "luxury, elegant, sophisticated, premium, refined",
    colorHint: "deep black, gold, ivory, champagne tones"
  },
  {
    id: "casual",
    label: "カジュアル",
    keywords: "casual, friendly, approachable, fun, warm",
    colorHint: "bright, cheerful, warm pastels, orange, yellow accents"
  },
  {
    id: "urgent",
    label: "緊急感",
    keywords: "urgent, bold, high-impact, energetic, action-driven",
    colorHint: "red, orange, high contrast, strong typography"
  },
  {
    id: "cool",
    label: "クール",
    keywords: "cool, modern, minimal, clean, tech-forward",
    colorHint: "monochrome, navy, electric blue, dark backgrounds"
  }
];
