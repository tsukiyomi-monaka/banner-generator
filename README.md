# バナーデザイン候補生成ツール

Claude AIを使って広告バナーのデザイン案（A〜D案）を自動生成するWebツールです。
**GitHub Pages で公開し、チームでURLを共有するだけで使えます。**

---

## ファイル構成

```
banner-generator/
├── index.html           メイン画面（入力・生成・プレビュー）
├── config.js            サイズ・トーンなどの設定ファイル（APIキーは不要）
├── prompts/
│   └── templates.js     Claudeへのプロンプトテンプレート
└── README.md            このファイル
```

---

## GitHub Pages への公開手順

### 1. GitHubにリポジトリを作成・プッシュ

```bash
# GitHubで空のリポジトリを作成後
git remote add origin https://github.com/ユーザー名/banner-generator.git
git push -u origin main
```

### 2. GitHub Pages を有効化

1. GitHubのリポジトリページを開く
2. 「**Settings**」タブ → 左メニュー「**Pages**」
3. **Source** を「Deploy from a branch」に設定
4. **Branch** を `main` / `/ (root)` に設定して「Save」
5. 数分後に `https://ユーザー名.github.io/banner-generator/` で公開される

### 3. チームに共有

公開されたURLをSlack・Notionなどで共有するだけです。

---

## APIキーの設定（チームメンバー各自が行う）

このツールはAPIキーを**各自のブラウザ（localStorage）に保存**します。  
GitやサーバーにAPIキーが保存されることは一切ありません。

### 手順

1. サイトを開く
2. 右上の **⚙️ ボタン** をクリック
3. [console.anthropic.com](https://console.anthropic.com) で取得したAPIキーを入力
4. 「保存」をクリック → ブラウザに記憶される（次回から不要）

### APIキーの取得方法

1. [https://console.anthropic.com](https://console.anthropic.com) にアクセス
2. サインアップ（またはログイン）
3. 左メニューの「**API Keys**」→「**Create Key**」
4. 表示されたキー（`sk-ant-api03-...`）をコピー

> ⚠️ APIキーは作成時にしか全文表示されません。必ずコピーして保存してください。

---

## 使い方

1. **商品画像をアップロード**（任意） — PNG・JPG・WebPなど
2. **キャッチコピー・サブテキスト・CTAを入力**
3. **トーンを選択** — 高級感 / カジュアル / 緊急感 / クール
4. **バナーサイズを選択**（複数可）
5. **「デザイン案を生成」をクリック** — 30〜60秒でA〜D案が生成される
6. **プレビュータブ** でデザインを確認・HTML/CSSをコピー
7. **プロンプトタブ** でGemini ImageFX用プロンプトをコピー

---

## config.js のカスタマイズ

### バナーサイズの追加・削除

```js
const BANNER_SIZES = [
  // 既存のサイズ...

  // 追加例
  { id: "square", label: "1080×1080", width: 1080, height: 1080, desc: "Instagram スクエア" },

  // 削除したいサイズはコメントアウト
  // { id: "leaderboard", ... },
];
```

**注意：** `id` は英数字・ハイフンのみ、他と重複しないこと。

### トーンの追加

```js
const TONES = [
  // 既存のトーン...

  // カスタムトーン例
  {
    id: "japanese",
    label: "和風",
    keywords: "traditional Japanese, wabi-sabi, zen, minimalist, natural",
    colorHint: "indigo, white, muted earth tones, natural wood"
  },
];
```

config.js を変更したら `git push` するだけで全員に反映されます。

---

## チームでの運用上の注意

| 項目 | 説明 |
|------|------|
| APIキー | 各自のブラウザに保存。共有不要・漏洩リスクなし |
| コスト | APIは各自のキーで呼び出されるため、使用量も各自の負担 |
| 共有APIキー運用 | 管理者のキーを全員が使う場合はコスト管理に注意 |
| リポジトリ公開設定 | GitHub Pages は Public リポジトリなら無料。Private は有料プラン必要 |
| config.js の変更 | サイズ・トーンの追加は config.js を編集して push するだけ |

---

## ローカルでも使える（サーバー不要）

`index.html` をダブルクリックして開くだけでもOKです。  
APIキーの設定方法は同じ（⚙️ ボタンから入力）。

---

## トラブルシューティング

| 症状 | 対処法 |
|------|--------|
| 右上が「APIキー未設定」のまま | ⚙️ ボタンから `sk-ant-` で始まるキーを入力・保存 |
| 「APIキーが無効」エラー | キーが失効している可能性。Consoleで確認・再発行 |
| GitHub Pagesで404になる | Settings > Pages の Branch 設定を確認 |
| 生成が止まる・固まる | ページを再読み込みして再試行。入力が長すぎる場合は短くする |

---

## 技術仕様

- 動作環境：モダンブラウザ（Chrome 推奨）、サーバー不要
- APIキー管理：localStorage（ブラウザ内のみ保存）
- 使用ライブラリ：なし（バニラJS / HTML / CSS のみ）
- API：Anthropic Messages API `POST /v1/messages`
- モデル：claude-sonnet-4-20250514（`config.js` の `CLAUDE_MODEL` で変更可）
- API利用料金目安：1回あたり $0.05〜$0.15 USD 程度
