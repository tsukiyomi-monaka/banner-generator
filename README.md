# バナーデザイン候補生成ツール

Claude AIを使って広告バナーのデザイン案（A〜D案）を自動生成するWebツールです。
サーバー不要。ブラウザで `index.html` を開くだけで動作します。

---

## ファイル構成

```
banner-generator/
├── index.html           メイン画面（入力・生成・プレビュー）
├── config.js            APIキー・サイズ・トーンの設定ファイル
├── prompts/
│   └── templates.js     Claudeへのプロンプトテンプレート
└── README.md            このファイル
```

---

## セットアップ：APIキーの取得・設定

### 1. APIキーを取得する

1. [https://console.anthropic.com](https://console.anthropic.com) にアクセス
2. サインアップ（またはログイン）
3. 左メニューの「**API Keys**」をクリック
4. 「**Create Key**」ボタンから新しいキーを作成
5. 表示されたキー（`sk-ant-api03-...`）をコピー

> ⚠️ APIキーは作成時にしか全文表示されません。必ずコピーして保存してください。

### 2. config.js にAPIキーを貼り付ける

テキストエディタ（メモ帳、VSCode など）で `config.js` を開き、以下の行を編集します：

```js
// 変更前
const ANTHROPIC_API_KEY = "ここにAPIキーを貼り付けてください";

// 変更後（例）
const ANTHROPIC_API_KEY = "sk-ant-api03-xxxxxxxxxxxxxxxxxxxx";
```

保存して完了です。

---

## ブラウザでの起動方法

`index.html` をダブルクリックするだけで起動します。

```
banner-generator/index.html をダブルクリック
         ↓
ブラウザが開き、ツールが表示される
```

### 動作確認済みブラウザ
- Google Chrome（推奨）
- Microsoft Edge
- Firefox
- Safari

> ⚠️ Internet Explorer では動作しません。

---

## 使い方

1. **商品画像をアップロード**（任意）  
   PNG・JPG・GIF・WebP に対応。アップロードするとバナー内に画像が組み込まれます。

2. **テキスト情報を入力**  
   - キャッチコピー（必須）
   - サブテキスト（任意）
   - CTA文言（例：今すぐ購入）

3. **トーンを選択**  
   高級感 / カジュアル / 緊急感 / クール から1つ

4. **バナーサイズを選択**（複数可）  
   1200×628、300×250、728×90、1080×1920

5. **「デザイン案を生成」をクリック**  
   30〜60秒ほどでA〜D案が生成されます。

6. **結果を確認・コピー**  
   - **プレビュータブ**：バナーの見た目をサイズ別に確認。「このデザインをコピー」でHTML/CSSをクリップボードへ。
   - **プロンプトタブ**：Gemini ImageFX向けの英語プロンプトをコピーして画像生成に使用。

---

## チームで共有する際の注意事項

### APIキーの扱いについて

`config.js` にはAPIキーが平文で記載されます。**以下の点にご注意ください：**

| 状況 | 推奨対応 |
|------|----------|
| Gitで管理する | `.gitignore` に `config.js` を追加し、コミットしない |
| 社内共有フォルダに置く | アクセス権限のある人だけが見られるフォルダに置く |
| チームメンバーと共有 | `config.js` を抜いた状態で共有し、各自でAPIキーを設定してもらう |
| APIコストが心配 | Anthropic Consoleで使用量の上限を設定する |

### 推奨：テンプレートファイルを用意する

```js
// config.template.js として共有（キーは空白）
const ANTHROPIC_API_KEY = "YOUR_API_KEY_HERE";
```

各メンバーが `config.template.js` を `config.js` にコピーして自分のキーを設定する運用がおすすめです。

---

## config.js のカスタマイズ方法

### バナーサイズの追加・削除

`config.js` の `BANNER_SIZES` 配列を編集します：

```js
const BANNER_SIZES = [
  // 既存のサイズ
  { id: "facebook-ogp", label: "1200×628", width: 1200, height: 628, desc: "Facebook / OGP" },
  
  // 新しいサイズを追加する場合（末尾に追記）
  { id: "square", label: "1080×1080", width: 1080, height: 1080, desc: "Instagram スクエア" },
  
  // 削除したいサイズは行ごと消す or //でコメントアウト
  // { id: "leaderboard", ... },  ← コメントアウトで非表示
];
```

**注意：** `id` は英数字・ハイフンのみ使用し、他のサイズと重複しないようにしてください。

### トーンの追加

```js
const TONES = [
  // 既存のトーン...
  
  // カスタムトーンを追加
  {
    id: "japanese",
    label: "和風",
    keywords: "traditional Japanese, wabi-sabi, zen, minimalist, natural",
    colorHint: "indigo, white, muted earth tones, natural wood"
  },
];
```

### 使用モデルの変更

最新のClaudeモデルを使いたい場合は `CLAUDE_MODEL` を変更します：

```js
const CLAUDE_MODEL = "claude-opus-4-5"; // より高精度（コスト高）
```

---

## トラブルシューティング

| 症状 | 原因・対処法 |
|------|-------------|
| 「APIキーが設定されていません」と表示される | `config.js` のキーが初期値のまま。実際のキーに書き換えてください |
| 「APIキーが無効です」エラー | キーが古い・無効化されている可能性。Consoleで確認・再発行してください |
| 生成が始まらない・固まる | ブラウザを再読み込みして再試行。入力内容が極端に長い場合は短くしてください |
| バナーが表示されない | 対象サイズのHTMLが生成されていない可能性。再生成してください |
| コピーボタンが動かない | HTTP（`file://`）でのクリップボードAPIが制限されている場合があります。Chromeでは通常動作します |

---

## API利用料金の目安

1回の生成（4案 × 複数サイズ）で Claude Sonnet を使用します。

- 入力トークン：約 2,000〜5,000（画像あり：+数千トークン）
- 出力トークン：約 4,000〜8,000

1回あたりの費用目安：**$0.05〜$0.15 USD 程度**

最新の料金は [https://www.anthropic.com/pricing](https://www.anthropic.com/pricing) を参照してください。

---

## 技術仕様

- 動作環境：モダンブラウザ（Chrome 推奨）、サーバー不要
- 使用ライブラリ：なし（バニラ JS / HTML / CSS のみ）
- API：Anthropic Messages API (`/v1/messages`)
- モデル：claude-sonnet-4-20250514（デフォルト）
