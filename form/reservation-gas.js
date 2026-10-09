/**
 * HARIKA LP 予約フォーム受付用 Google Apps Script
 *
 * 使い方
 *  1. 予約を記録する Googleスプレッドシートを新規作成
 *  2. メニュー「拡張機能」→「Apps Script」を開き、このファイルの中身を貼り付けて保存
 *  3. 下の NOTIFY_TO に予約通知を受け取るメールアドレスを入れる
 *  4. 「デプロイ」→「新しいデプロイ」→ 種類「ウェブアプリ」
 *       次のユーザーとして実行：自分
 *       アクセスできるユーザー：全員
 *     → 発行された「ウェブアプリのURL」（…/exec）をコピー
 *  5. LP の index.html 内 `var FORM_ENDPOINT = '';` にそのURLを貼り付ける
 *  ※ スクリプトを修正したら「デプロイを管理」→ 編集 →「新バージョン」で更新（URLは変わりません）
 */
var NOTIFY_TO = 'reserve@example.com';   // ← 通知先メールアドレス（カンマ区切りで複数可）
var SHEET_NAME = '予約';

var FIELDS = [
  ['受付日時', null], ['メニュー', 'menu'], ['第1希望', 'pref1'], ['第2希望', 'pref2'], ['第3希望', 'pref3'],
  ['お名前', 'name'], ['フリガナ', 'kana'], ['電話番号', 'tel'], ['メール', 'email'],
  ['お悩み', 'concern'], ['FVパターン', 'fv_pattern'], ['流入元', 'source']
];

function doPost(e) {
  var p = (e && e.parameter) || {};
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) sh.appendRow(FIELDS.map(function (f) { return f[0]; }));
    var row = FIELDS.map(function (f) { return f[1] ? String(p[f[1]] || '').slice(0, 500) : new Date(); });
    // 数式として解釈されないよう先頭の = + - @ を無害化
    row = row.map(function (v) { return typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v; });
    sh.appendRow(row);

    var body = FIELDS.slice(1).map(function (f) { return f[0] + '：' + (p[f[1]] || '―'); }).join('\n');
    MailApp.sendEmail({
      to: NOTIFY_TO,
      subject: '【HARIKA LP】新規予約リクエスト：' + (p.name || '') + ' 様（第1希望 ' + (p.pref1 || '') + '）',
      body: 'LPから予約リクエストが届きました。空き状況を確認し、お客様へ確定のご連絡をしてください。\n\n' + body
    });
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
