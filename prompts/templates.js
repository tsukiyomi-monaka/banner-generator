/**
 * =====================================================
 * Claude API プロンプトテンプレート
 * =====================================================
 * Claude に送るシステムプロンプトとユーザープロンプトを管理します。
 * 高度なカスタマイズが必要な場合のみ編集してください。
 */

/**
 * システムプロンプト
 * Claudeの役割・出力形式を定義します
 */
const SYSTEM_PROMPT = `あなたはプロの広告デザイナーです。
ユーザーが入力した情報をもとに、広告バナーのデザイン案をA〜D案の4パターン生成してください。

## 出力形式
必ず以下の厳密なJSON形式で返してください。JSONのみ出力し、前後に説明文や \`\`\` などを付けないでください。

{
  "designs": [
    {
      "id": "A",
      "name": "案のキャッチーな名前（例：ミニマルゴールド）",
      "concept": "このデザイン案のコンセプト説明（2〜3文）",
      "colorPalette": {
        "primary": "#HEX",
        "secondary": "#HEX",
        "accent": "#HEX",
        "text": "#HEX",
        "background": "#HEX"
      },
      "typography": {
        "headline": "フォントサイズ方針（例：大きく中央配置、太字）",
        "subtext": "フォントサイズ方針",
        "cta": "CTAボタンのスタイル方針"
      },
      "layout": "レイアウト説明（例：左半分に画像、右半分にテキストを縦並び）",
      "sizes": {
        "<size_id>": "<width>px × <height>px のバナーのHTML文字列（インラインCSS完結、外部リソース不使用）"
      },
      "imagefxPrompt": "Gemini ImageFX向け英語プロンプト文字列"
    }
  ]
}

## sizes フィールドの注意事項
- sizes のキーはユーザーが選択したサイズのIDを使用
- 各値は完全なHTML文字列（<div>〜</div>）で、そのままiframeに埋め込める状態にすること
- 画像はユーザーが提供したbase64データを <img> タグで使用するか、提供されていない場合は背景色で代替
- 外部フォント・外部CSSは一切使用しない（system-ui, sans-serif などシステムフォントのみ）
- position: relative / absolute を使いバナーのwidth/heightを正確に守ること
- overflow: hidden を必ず設定すること

## imagefxPrompt の形式
"Banner ad, [tone] style, [product features], [color palette], [layout description], professional advertising photography, high quality, --ar [width]:[height]"
`;

/**
 * ユーザープロンプトを組み立てる関数
 * @param {Object} params
 * @param {string} params.catchcopy     - キャッチコピー（必須）
 * @param {string} params.subtext       - サブテキスト（任意）
 * @param {string} params.cta           - CTA文言
 * @param {string} params.toneLabel     - トーンの日本語ラベル
 * @param {string} params.toneKeywords  - トーンの英語キーワード
 * @param {string} params.toneColorHint - トーンの配色ヒント
 * @param {Array}  params.selectedSizes - 選択されたサイズオブジェクト配列
 * @param {string|null} params.imageBase64 - 商品画像のbase64文字列（dataURL形式）またはnull
 * @returns {string} ユーザープロンプト
 */
function buildUserPrompt(params) {
  const {
    catchcopy,
    subtext,
    cta,
    toneLabel,
    toneKeywords,
    toneColorHint,
    selectedSizes,
    imageBase64
  } = params;

  const sizeList = selectedSizes
    .map(s => `  - ID: "${s.id}" / ${s.width}×${s.height}px（${s.desc}）`)
    .join("\n");

  const imageNote = imageBase64
    ? `商品画像が提供されています。sizes内のHTMLでは <img src="${imageBase64}" style="..."> として使用してください。`
    : `商品画像は提供されていません。代わりに背景色やグラデーションで商品エリアを表現してください。`;

  return `以下の情報をもとに、広告バナーのデザイン案をA〜D案の4パターン生成してください。

## 入力情報

**キャッチコピー（必須）:** ${catchcopy}
**サブテキスト:** ${subtext || "（なし）"}
**CTA文言:** ${cta || "詳しくはこちら"}
**トーン:** ${toneLabel}（英語キーワード: ${toneKeywords}）
**推奨配色方向:** ${toneColorHint}

## 生成対象サイズ
${sizeList}

## 画像について
${imageNote}

## 要件
- A〜D案それぞれ異なるレイアウト・配色・雰囲気にしてください
- 各案は選択された全サイズ分のHTMLを生成してください
- HTMLはインラインCSSのみで完結させ、システムフォントのみ使用してください
- バナーの縦横サイズは正確に守ってください（widthとheightをpxで固定）
- テキストはキャッチコピー・サブテキスト・CTAをすべて含めてください
- CTAはボタン形式でデザインしてください
- JSON形式のみで返答してください`;
}
