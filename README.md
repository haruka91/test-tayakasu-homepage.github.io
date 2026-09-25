# 情報系研究室HP デザイン案

Jekyll + Bootstrapを想定した静的サイトのデザイン案です。

## 構成

- `index.html`: トップページ
- `assets/css/style.css`: 追加スタイル
- `assets/js/news.js`: CSV読み込み処理
- `assets/data/news.csv`: NEWS表示用CSV
- `_config.yml`: Jekyll設定

## 確認方法

Jekyll環境がある場合:

```bash
jekyll serve
```

Jekyllがない場合も、静的サーバーで確認できます:

```bash
python -m http.server 4000
```

その後、ブラウザで `http://localhost:4000/` を開いてください。

## 著書ページの更新

`data/csv/book.csv` の1行が1冊（または1掲載物）に対応します。表紙は `data/images/book/` に保存し、`image` にその相対パスを指定します。共著・共同編集は同じ本を重複登録しません。

- `people`: `misako`、`hideki`、または `misako;hideki`。著者・編集者・訳者・分担執筆者としての参加を確認して指定します。空欄の本は「すべて」にのみ表示します。
- `year`: 並び順と年表示に使う初版の出版年。同年の本はCSVの記載順で表示します。
- `published`: 表示用の出版年月。新装版がある場合も初版の年月を記載します。
- `edition_year`: 掲載している表紙が新装版の場合、その刊行年。`note` にも「○年新装版刊行」と記載します。
- `isbn`: 購入リンク先の版のISBN。新装版の場合は新装版の番号を記載します。画面には自動表示しません。
- `source_url` / `image_source_url`: 書誌情報と表紙画像の確認元。画面には表示しません。
- `authors`: 編集者1名は `/ Ed.`、複数名は `/ Eds.`。分担執筆・解説・監訳なども実際の役割を明記します。

初版と新装版は1行にまとめ、表紙と購入リンクを新装版にそろえます。今回追加したSpringerの3冊は、出版社のハードカバー発売日を `year` / `published` に使用し、異なる書誌年を `note` に併記しています。

フィルターはページ再読み込みなしで一覧と上部の本棚を切り替えます。表示件数は雑誌を含むため「件」で表示しています。
