# 画像・動画について

LP（`index.html`）で使用している画像・動画は、公式サイト（harika-kogao.com/img2/）の素材です。

| ファイル | 使用箇所 |
|---|---|
| p2.jpg | ファーストビュー、店舗ギャラリー |
| p9.jpg | キャンペーン、当日の流れ STEP04 |
| p7.jpg / p1.jpg | 選ばれる理由 01・02、店舗ギャラリー |
| p4.jpg | 当日の流れ STEP03、スタッフ紹介 |
| store-tenjin.jpg | 天神大名院のご案内、当日の流れ STEP02、PC表示時の背景 |
| before*.jpg / after*.jpg | ファーストビュー・症例写真（5組） |
| celeb1〜7.jpg | 著名人・インフルエンサー来店 |
| media1.jpg | ブライダル誌掲載 |
| reel1.mp4 / reel1.jpg | W施術の動画 |

## スタッフ紹介の追加
顔出し可能なスタッフの写真を `images/staff-01.jpg` などで置き、
`index.html` 末尾スクリプトの `STAFF` 配列に追加するとカードが表示されます。

```js
var STAFF = [
  {img:'images/staff-01.jpg', name:'ニックネーム', hobby:'趣味', msg:'お客様へ一言'}
];
```
