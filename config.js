/**
 * =====================================================
 * バナーデザイン候補生成ツール 設定ファイル
 * =====================================================
 *
 * APIキーはブラウザの設定画面（右上の ⚙ ボタン）から入力します。
 * 入力されたキーは各自のブラウザ（localStorage）に保存されます。
 * このファイルにAPIキーを書く必要はありません。
 *
 * ※ セルフホスト（file://で直接開く）する場合のみ、
 *    下記に直接書くこともできます。その場合はGitにコミットしないでください。
 */

// （任意）file://で使う場合のみ設定。通常は空のままでOK。
const ANTHROPIC_API_KEY_FALLBACK = "";

/**
 * 使用するClaudeモデル
 */
const CLAUDE_MODEL = "claude-sonnet-4-20250514";

/**
 * =====================================================
 * バナーサイズ設定
 * =====================================================
 * 追加例: { id: "square", label: "1080×1080", width: 1080, height: 1080, desc: "Instagram スクエア" }
 * 削除  : 該当行をコメントアウト or 削除
 */
const BANNER_SIZES = [
  { id: "facebook-ogp",        label: "1200×628",  width: 1200, height: 628,  desc: "Facebook / OGP" },
  { id: "display-300",         label: "300×250",   width: 300,  height: 250,  desc: "ディスプレイ広告" },
  { id: "leaderboard",         label: "728×90",    width: 728,  height: 90,   desc: "レクタングル（横長）" },
  { id: "smartphone-vertical", label: "1080×1920", width: 1080, height: 1920, desc: "スマホ縦型ストーリー" },
  // { id: "square", label: "1080×1080", width: 1080, height: 1080, desc: "Instagram スクエア" },
  // { id: "wide",   label: "970×250",   width: 970,  height: 250,  desc: "ビルボード" },
];

/**
 * =====================================================
 * トーン定義
 * =====================================================
 * id       : 内部識別子
 * label    : UI表示の日本語名
 * keywords : 英語プロンプト用キーワード
 * colorHint: 配色ヒント（Claudeへの指示に使用）
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
