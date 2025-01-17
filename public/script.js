window.addEventListener('load', function () {
  var mess_box = document.getElementById('textbox');
  var mess_text = document.getElementById('text');
  var mswin_flg = true;
  var stop_flg = false;
  var end_flg = false;
  var scene_cnt = 0;
  var line_cnt = 0;
  const interval = 20;
  var select_num1 = 0;
  var select_num2 = 0;
  var select_num3 = 0;
  var select1 = document.getElementById('select1');
  var select2 = document.getElementById('select2');
  var select3 = document.getElementById('select3');
  var select_text1 = document.getElementById('selectText1');
  var select_text2 = document.getElementById('selectText2');
  var select_text3 = document.getElementById('selectText3');
  let split_chars;

  let input = "";
  let userChar = "";
  let highestPrediction = "";
  let textResponse = "";
  let buttonId = "";
  let rootId = "0";
  const clearBtn = document.querySelector('#clear-button');




  const text = {
    //配列0のは時短のためのスキップ
    0: [
      "",
      "こんにちは",
      "<item 1>図のようにマッチ棒を並べて、正方形を横につないだ形を作ります。",
      "<form 1>正方形を3個作るとき、マッチ棒は何本必要でしょうか？"
    ],
    1: [
      "そうですね、数えてみると10本ですね",
      "今回は数えることでマッチ棒の数が分かりました<skip 3>",
    ],
    2: [
      "本当ですか？数えてみましょう",
      "<form 1>正方形を3個作るとき、マッチ棒は何本必要でしょうか？"
    ],
    3: [
      "<itemOut 1>では正方形の数を増やしてみましょう",
      "正方形が50個、100個のとき、マッチ棒はそれぞれ何本必要でしょうか？",
      "<charaOut 5><chara 5 2>描くのにも時間かかっちゃうよ、、",
      "<charaOut 5><chara 5 1>正方形の数が多い時数えるのは大変ですね",
      "どのようにしたら考えられるでしょうか<form 2>",
    ],
    4: [
      "文字を使ってみるのはいい方法ですね！",
      "どの数を文字で表そうか。。<form 3>",
    ],
    5: [
      "文字を使ってみるとかどうかな？<skip 4>"
    ],
    6: [
      "そうですね、正方形の数をnを用いて表しましょう",
      "では正方形がn個あるとき、マッチ棒は何本必要ですか。",
      "どのように考えられるでしょうか。まずは5分個人で考えてみてください",
      "(5分タイマー)<skip 7>",

    ],
    7: [
      "立てた式を1つおしえてください<form 4>",
      ""
    ],
    //今は8~12は使っていない
    8: [
      "(1+3n)ありがとうございます。",
      "(学習者)さんどのように求めたか説明してください。<showCanvas><apiform1>",

    ],
    9: [
      "ありがとうございます。",
      "分かりやすい説明でした<skip 8>",
    ],
    10: [
      "図をもう一度書いてみてください",
    ],
    11: [
      "もう一度説明してみてください",
    ],
    12: [
      "もう一度どのように求めたか説明してみましょう",
    ],

    //間に何個か入れよう
    45: [
      "では次にAさんどのような式を立てたか教えてください<skip 20>",
    ],
    46: [
      "ではAさんどのような式を立てたか教えてください<skip 20>",
    ],


    20: [
      "<charaOut 5><chara 5 3>1+3nという式をたてました。",
      "<charaOut 5><chara 5 1>ありがとうございます。",
      "これはどのような図に表せるでしょうか？考えてみましょう。<showCanvas 0>"
    ],
    21: [
      "みなさん考えられましたか？",
      "ではAさんどのように考えたか教えてください。",
      "<charaOut 5><chara 5 3><item 4>図のように考えました．",
      "赤で囲んだ部分に1本のマッチ棒があって、3本のマッチ棒でできる青のコの字型の部分がn個だけあるから1+3nという式になりました",
      "<charaOut 5><itemOut 4><chara 5 1>ありがとうございます。自分の回答と見比べてみましょう。",
      "<root>"
    ],
    44: [
      "<closeCanvas 0>では次に(学習者)さんどのように考えたか式を教えてください。<form 5>"
    ],

    //22編集中
    22: [
      "(4+3(n-1))ありがとうございます。",
      "(学習者)さんどのように4+3(n-1)という式を立てたか説明してください。<showCanvaswithapi><apiform 1><hint 1>"
    ],
    23: [
      "<closeCanvas><colseapiform><closehint>ありがとうございます。赤で囲んだ部分に4本のマッチ棒があって、3本のマッチ棒でできる青で囲ったコの字型の部分がn-1個だけあるので4+3(n-1)という式になりますね。<fadeOut_item 5><skip 30>",
    ],
    29: [
      "<closeCanvas><colseapiform><closehint>図をもう一度書いてみましょう<showCanvas 2><hint 2>",
      "",
      ""
    ],
    30: [
      "<closeCanvas><colseapiform><closehint><itemOut >次にCさんどのように考えたか教えてください。",
      "正方形はマッチ棒4本でできているから、4nという式をたてたけど、正方形が3個のときマッチ棒が12本必要ってことになっちゃって間違っている気がします。",
      "たしかにそうですね。4nだと数えすぎてしまっているようです。どのように考えたらいいでしょうか？",
      "話し合ってみましょう",
      "<gwform>"
    ],
    31: [
      "ありがとうございます。一緒に考えてみましょう",
      "<item 5>Aさんの例と同じように考えると、このように考えられそうですね(分かりやすく動画で解説したいな)",
      "もう一度解答を見直してみましょう",
      "クリックで次の問題に進む",
      "<closeCanvas><closehint><itemOut 5><skip 30>"
    ],

    32: [
      "<closeCanvas><closehint><colseapiform>ありがとうございます。",
      "<skip 33>",
      "",
      ""
    ],
    33: [
      "<closeCanvas><closehint><colseapiform>先ほどのAさんの説明を参考にもう一度説明してみましょう<hint 3><apiform 3>",
    ],
    34: [
      "<closeCanvas><closehint><colseapiform>先ほどのAさんの説明を参考にもう一度説明してみましょう<hint 4><apiform 4><showCanvaswithapi>",
    ],
    35: [
      "(4+3n)ありがとうございます。",
      "4+3nという式が正しいか確かめることはできますか？また、どのような方法で確かめることが出来ますか？<apiform 5><backButton 5>",
      ""
    ],
    36: [
      "<colseapiform>そうですね、具体的な数を入れてみましょう。",
      "正方形が3個のときマッチ棒は10本だったからこれを当てはめてみましょう<skip 38>",
    ],
    37: [
      "<colseapiform><charaOut 5><chara 5 3>最初に正方形が3個のときを考えたからそれを式に当てはめてみたらどうかな？",
      "<charaOut 5><chara 5 1>いいですね。正方形が3個のときマッチ棒は10本だったからこれを当てはめてみましょう<skip 38>",
    ],
    38: [
      "どうでしたか？<form 6>",
    ],
    39: [
      "一緒に確認してみましょう(映像で説明できたらいいな)<skip 40>",
    ],
    40: [
      "正方形が3個のときマッチ棒は13本必要なことになってしまうので式が違いそうですね。",
      "どのように式を変えたらいいでしょうか？<form 7>",
    ],
    41: [
      "では変更した式をおしえて下さい。<form 8>",
    ],
    42: [
      "一緒に確認しましょう。(擬変数的確認かなあ)<skip 45>",
    ],
    43: [
      "そうですね、4+3(n-1)だと正方形が3個の時も計算が合いますね。<skip 45>",
    ],
    //44,45,46使う
    47: [
      "ではAさんどのような式を立てたか教えてください<skip 48>"
    ],
    67: [
      "では次にAさんどのような式を立てたか教えてください<skip 48>"
    ],

    48: [
      "<charaOut 5><chara 5 3>4+3(n-1)という式をたてました。",
      "<charaOut 5><chara 5 1>ありがとうございます。",
      "これはどのような図に表せるでしょうか？考えてみましょう。<showCanvas 6>"
    ],
    49: [
      "みなさん考えられましたか？",
      "ではAさんどのように考えたか教えてください。",
      "<charaOut 5><chara 5 3><item 5>図のように考えました．",
      "赤で囲んだ部分に4本のマッチ棒があって、3本のマッチ棒でできる青のコの字型の部分がn-1個だけあるから4+3(n-1)という式になりました",
      "<charaOut 5><itemOut 4><chara 5 1>ありがとうございます。自分の回答と見比べてみましょう。",
      "<rootId>"
    ],
    50: [
      "<closeCanvas 6>では次に(学習者)さん1+3nという式を立てていたと思います。",
      "(学習者)さんどのように1+3nという式を立てたか説明してください。<showCanvaswithapi><apiform 7><hint 1>"
    ],
    51: [
      "<closeCanvas><closehint><colseapiform>ありがとうございます。",
      "<skip 52>",
    ],
    52: [
      "<closeCanvas><closehint><colseapiform>先ほどのAさんの説明を参考にもう一度説明してみましょう<hint 8><apiform 8>",
    ],
    53: [
      "<closeCanvas><colseapiform><closehint><item 4>ありがとうございます。赤で囲んだ部分に1本のマッチ棒があって、3本のマッチ棒でできる青で囲ったコの字型の部分がn個だけあるので1+3nという式になりますね。<fadeOut_item 4><skip 30>",
    ],
    54: [
      "<closeCanvas><colseapiform><closehint>図をもう一度書いてみましょう<showCanvas 9><hint 9>",
      "",
      ""
    ],
    55: [
      "ありがとうございます。一緒に考えてみましょう",
      "<item 4>Aさんの例と同じように考えると、このように考えられそうですね(分かりやすく動画で解説したいな)",
      "もう一度解答を見直してみましょう",
      "クリックで次の問題に進む",
      "<closeCanvas><closehint><itemOut 4><skip 30>"
    ],
    56: [
      "<closeCanvas><closehint><colseapiform>先ほどのAさんの説明を参考にもう一度説明してみましょう<hint 10><apiform 10><showCanvaswithapi>",
    ],
    //30のグループワーク後
    57: [
      "グループで結論を出すことが出来ましたか？Cさん出た答えを説明してください",
      "<charaOut 5><chara 5 2><item 1>図だとこのように示すことが出来て、4nという式だと間のマッチ棒まで数えてしまってました。",
      "なので、n-1この重複するマッチ棒の数を引いて、4n-(n-1)が正しい式です。",
      "<charaOut 5><chara 5 1><itemOut>ありがとうございます。様々な方法で求めるkとができましたね。",
      "今まで求めた式を計算してみましょう。計算して気付いたことを教えてください<<apiform 11>",
    ],
    58: [
      "<colseapiform>全て同じ式になりましたね。",
    ],

    59: [
      "<colseapiform>それぞれの式を計算してみましょう。<form 9>",
    ],
    60: [
      "それぞれ計算すると１+3nになりますね(二度間違いちゃんと説明しなきゃ)",
    ],

    //式が思い浮かばないときの分岐
    //かってに62に飛ばしてるだけで本とは違う
    61: [
      "<chara 5 1>規則性を探してみましょう",
      "(ここでフォーム分け)",
      "<skip 62>",
      ""
    ],
    62: [
      "最初に1本マッチ棒があってそこから3本ずつマッチ棒が増えているという規則性を見つけましたね。",
      "では、その規則性を使って具体的な数で考えてみましょう。",
      "<item 6>まず、3個のときを考えてみましょう。",
      "<item 7>見つけた規則性を使うと、赤で囲んでいる最初の1本と、青で囲んでいるコの字型をしたグループに分けられそうですね。",
      "コの字型は3つあるので、<item 8>マッチ棒の本数は最初の1本と、コの字型×3で表すことが出来ます",
      "コの字型は3本のマッチ棒でできているので、式にすると、<item 9>1+3×3になります。",
      "では、同じ方法で正方形が<item 15>4個の時も考えてみましょう。",
      "<skip 63>"

    ],
    63: [
      "同じ方法で考えると正方形が4個の時どのような式で表せますか？<form 10>"
    ],
    64: [
      "正方形が3個のときと同じように考えてみましょう(変更する)",
      "<skip 63>",
    ],
    65: [
      "3個の時と同じように考えるとコの字型は4つあるので、マッチ棒の本数は最初の1本と、コの字型×4で表すことが出来ますね",
      "つまり、式にすると、<item 10>1+3×4になります。",
      "同じ方法で正方形が5個の時も考えると、<item 11>1+3×5になります。",
      "では、正方形がn個の時も<item 12>考えてみましょう",
      "まず、3個、4個、5個の時を振り返ってみましょう。",
      "なにか気付いたことはありますか？(わんちゃん分岐)",
      "<skip 66>"

    ],
    66: [
      "正方形の数と式の最後の数<item 13>が一致していますね。",
      "つまりこの式は1+3×(正方形の数)と表せそうです。(画像がない)",
      "今回は正方形の数がn個の時を考えているので、正方形がn個の時必要なマッチ棒の本数は1+3×n本<item 14ws>となります",
      "<skip 67>"
    ],
    //67使う



    //経由用
    100: [
      "未作成",
      "",
      "",
      ""
    ],

  };

  console.log("main関数呼び出し前のsplit_chars:", split_chars);


  function main() {
    // split_charsが無効または空の場合のエラーハンドリング
    if (!Array.isArray(split_chars) || split_chars.length === 0) {

      mess_text.innerHTML += '<span class="blink-text"></span>';
    }

    var tmp = split_chars.shift();

    //console.log(split_chars);

    if (tmp == '<') {
      let tagget_str = '';
      tmp = split_chars.shift();
      while (tmp != '>' && tmp !== undefined) {
        tagget_str += tmp;
        tmp = split_chars.shift();

      }
      tagget_str = tagget_str.split(/\s/);
      switch (tagget_str[0]) {
        case 'stop':
          stop_flg = true;
          break;
        case 'root':
          switch (rootId) {
            case '0':
              input = "<skip 44>";
              split_chars = splitStr(input);
              break;
            case '1':
              input = "<skip 30>";
              split_chars = splitStr(input);
              break;
            case '2':
              input = "<skip 50>";
              split_chars = splitStr(input);
              break;
            case '3':
              input = "<skip 30>";
              split_chars = splitStr(input);
              break;
          }
          main();
          mess_box.click();
          break;
        case 'saveButton':
          $('.saveButton').addClass('visible');
          console.log('ボタン表示');
          break;
        case 'saveButtonremove':
          $('.saveButton').removeClass('Buttonshow');
          break;
        case 'backButton':
          $('.backButton').addClass('visible');
          console.log('ボタン表示');
          buttonId = 'saveButton' + tagget_str[1];
          break;
        case 'gwform':
          $('.gwform').addClass('visible');
          break;
        case 'form':
          const targetClass = 'formQ' + tagget_str[1];
          $('.' + targetClass).addClass('visible');
          console.log('フォーム表示: ' + targetClass); // 確認用のログ
          break;
        case 'showCanvas':
          $('#saveButton').addClass('visible');    // 作成したクラス名を利用
          buttonId = 'saveButton' + tagget_str[1];
          $('.showCanvasButton').addClass('visible');
          $('.wrapper').addClass('visible');

          break;
        case 'closeCanvas':
          $('.saveButton').removeClass('visible');    // 作成したクラス名を利用
          $('.showCanvasButton').removeClass('visible');
          $('.wrapper').removeClass('visible');
          $('.hint1').removeClass('visible');
          console.log('フォーム表示');
          break;
        case 'hint':
          const hint = 'hint' + tagget_str[1]; // 動的にクラス名を作成
          $('#' + hint).addClass('visible');    // 作成したクラス名を利用;
          console.log('ヒント表示');
          break;
        case 'closehint':
          $('.hint').removeClass('visible');    // 作成したクラス名を利用;
          console.log('ヒント表示');
          break;
        //apiとともにキャンバスを出すときのやつ(送信ボタンを出さない)
        case 'showCanvaswithapi':
          $('.wrapper').addClass('visible');
          $('.hint1').addClass('visible');
          buttonId = 'saveButton' + tagget_str[1];
          break;
        case 'apiform':
          $('.formapi').addClass('visible');
          $('.submit-button').addClass('visible');
          console.log('フォーム表示');
          buttonId = 'saveButton' + tagget_str[1];
          break;
        case 'colseapiform':
          $('.formapi').removeClass('visible');
          $('.submit-button').removeClass('visible');
          console.log('フォーム表示');
          break;
        case 'selectBox':
          $('.selectBox').addClass('show');
          break;
        case 'text1':
          select_text1.innerHTML = tagget_str[1];
          break;
        case 'text2':
          select_text2.innerHTML = tagget_str[1];
          break;
        case 'text3':
          select_text3.innerHTML = tagget_str[1];
          break;
        case 'select1':
          if (tagget_str[1] === "none") {
            $('#select1').addClass('none');
          } else {
            select_num1 = tagget_str[1];
            select1.addEventListener('click', function () {
              scene_cnt = select_num1;
              line_cnt = -1;
              $('.selectBox').removeClass('show');
              selectNoneRemove();
              textClick();
            });
          }
          break;
        case 'select2':
          if (tagget_str[1] === "none") {
            $('#select2').addClass('none');
          } else {
            select_num2 = tagget_str[1];
            select2.addEventListener('click', function () {
              scene_cnt = select_num2;
              line_cnt = -1;
              $('.selectBox').removeClass('show');
              selectNoneRemove();
              textClick();
            });
          }
          break;
        case 'select3':
          if (tagget_str[1] === "none") {
            $('#select3').addClass('none');
          } else {
            select_num3 = tagget_str[1];
            select3.addEventListener('click', function () {
              scene_cnt = select_num3;
              line_cnt = -1;
              $('.selectBox').removeClass('show');
              selectNoneRemove();
              textClick();
            });
          }
          break;
        case 'break':
          mess_text.innerHTML += '<br>';
          break;
        case 'skip':
          scene_cnt = tagget_str[1];
          line_cnt = -1;
          break;
        case 'bg':
          document.getElementById('bgimg').src = 'img/bg' + tagget_str[1] + '.jpg';
          break;
        case 'chara':
          document.getElementById('chara' + tagget_str[1]).src = 'img/chara' + tagget_str[2] + '.png';
          break;
        case 'charaOut':
          document.getElementById('chara' + tagget_str[1]).src = '';
          break;
        case 'item':
          document.getElementById('item').src = 'img/item' + tagget_str[1] + '.png';
          break;
        case 'itemOut':
          document.getElementById('item').src = '';
          break;
      }
    }
    if (!stop_flg) {
      if (tmp) {
        if (tmp != '>') mess_text.innerHTML += tmp;
        setTimeout(main, interval);

      }
    } else {
      mess_text.innerHTML += '<span class="blink-text"></span>';
    }
  }

  mess_box.addEventListener('click', function () {
    if (end_flg) return;
    if (mswin_flg) {
      if (!stop_flg) {
        line_cnt++; //次の文に行く

        // //読み上げを行う関数
        // //WebSpeechApiにて実行してる
        // let textDate = text[scene_cnt];
        // var textRead = textDate[line_cnt];
        // // コマンドを除去する正規表現
        // textRead = textRead.replace(/<[^>]*>/g, ''); // <...> の形式のテキストを削除
        // var msg = new SpeechSynthesisUtterance();
        // let voices = window.speechSynthesis.getVoices();
        // msg.voice = voices.find(voice => voice.name.includes('Google 日本語')); // 好みの音声を選択
        // msg.text = textRead;
        // msg.lang = 'ja-JP';
        // msg.rate = 1.0; // 適度な速度
        // msg.pitch = 1.2; // 自然な声の高さ

        // window.speechSynthesis.speak(msg);
        console.log(scene_cnt);
        //新しい読み上げ関数
        let textDate = text[scene_cnt];
        var text = textDate[line_cnt];
        text = textRead.replace(/<[^>]*>/g, ''); // <...> の形式のテキストを削除
        console.log("Input text: ", text);
        //関数呼び出し、したのほうにあるよ
        synthesizeSpeech(text);



        if (line_cnt >= text[scene_cnt].length) {
          line_cnt = 0;
        }
      } else if (scene_cnt >= text.length) {
        end_flg = true;
        return;
      }
      split_chars = text[scene_cnt][line_cnt].split('');
      mess_text.innerHTML = '';
      main();
    }
  }
  );

  function textClick() {
    $('#textbox').trigger('click');

    function selectNoneRemove() {
      $('#select1').removeClass('none');
      $('#select2').removeClass('none');
      $('#select3').removeClass('none');
    }
  }

  //キャンバス用の関数
  const canvas = document.querySelector('#drawing-area');
  const ctx = canvas.getContext('2d');
  const colorPicker = document.querySelector('#color-picker'); // 色選択用
  const wrapper = document.querySelector('.wrapper');

  let x;
  let y;
  let mousePressed = false;
  let selectedColor = 'black'; // デフォルトの色を黒に設定

  // 初期状態で画像を表示する
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const chara = new Image();
  chara.src = "./img/item3.png";  // 画像のURLを指定
  chara.onload = () => {
    const scaleWidth = 800;  // 画像の幅を200pxに設定
    const scaleHeight = 800; // 画像の高さを200pxに設定
    ctx.drawImage(chara, 0, 0, scaleWidth, scaleHeight);
  }

  // クリアボタンの処理
  clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // キャンバスをクリア
  });

  // 色を選択する
  colorPicker.addEventListener('change', (e) => {
    selectedColor = e.target.value;
    ctx.strokeStyle = selectedColor; // 選択した色に設定
  });

  //描画を開始する
  function startDrawing(xPos, yPos) {
    mousePressed = true;
    x = xPos;
    y = yPos;
  }

  //線を描画する
  function draw(xPos, yPos) {
    if (!mousePressed) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(xPos, yPos);
    ctx.lineWidth = 5;  // 線の太さを設定
    ctx.stroke();
    x = xPos;
    y = yPos;
  }

  // マウスイベント
  canvas.addEventListener('mousedown', (e) => startDrawing(e.offsetX, e.offsetY));
  canvas.addEventListener('mousemove', (e) => draw(e.offsetX, e.offsetY));
  window.addEventListener('mouseup', () => mousePressed = false);

  // タッチイベント
  canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
  });

  canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    draw(touch.clientX - rect.left, touch.clientY - rect.top);
    e.preventDefault();  // スクロールなどのデフォルト動作を無効化
  });

  window.addEventListener('touchend', () => mousePressed = false);

  ///消去ボタンクリックで全消去
  clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const chara = new Image();
    chara.src = "./img/item3.png";  // 画像のURLを指定
    chara.onload = () => {
      const scaleWidth = 800;  // 画像の幅を800pxに設定
      const scaleHeight = 800; // 画像の高さを800pxに設定
      ctx.drawImage(chara, 0, 0, scaleWidth, scaleHeight);
    };
  });


  // Teachable MachineでエクスポートしたモデルのURL
  const modelURL = "https://teachablemachine.withgoogle.com/models/xbPaKLXkL/";

  // モデルのロード
  let model;
  async function loadModel() {
    try {
      model = await tmImage.load(`${modelURL}model.json`, `${modelURL}metadata.json`);
      console.log("モデルが正常に読み込まれました");
    } catch (error) {
      console.error("モデルの読み込み中にエラーが発生しました: ", error);
    }
  }


  // キャンバスの内容を予測
  async function predictCanvas() {
    const canvas = document.getElementById("drawing-area");
    canvas.willReadFrequently = true; // パフォーマンス向上のため
    const context = canvas.getContext("2d");
    console.log("画像予測中 ");

    // キャンバスを画像に変換
    const imageElement = new Image();
    imageElement.src = canvas.toDataURL();
    imageElement.onload = () => predictImage(imageElement);
  }


  // 画像を予測
  async function predictImage(imageElement) {
    if (!model) {
      console.error("モデルがロードされていません");
      return;
    }

    try {
      const predictions = await model.predict(imageElement);
      highestPrediction = predictions.sort((a, b) => b.probability - a.probability)[0];
      console.log(`予測結果: ${highestPrediction.className}（確率: ${(highestPrediction.probability * 100).toFixed(2)}%）`);
    } catch (error) {
      console.error("予測中にエラーが発生しました: ", error);
    }
    handlePrediction();

  }

  // canvasの画像判定後の分岐処理
  //画像だけの時はこの関数の中かも
  function handlePrediction() {
    if (!highestPrediction) {
      console.log("予測結果が無効です");
      return;
    }
    //buttonIdが何かによってswitch
    switch (buttonId) {

      case "saveButton0":
        if (highestPrediction.className === "1+3n") {
          console.log("画像は1+3n");
          input = "<skip 21>";
          split_chars = splitStr(input);
        } else {
          console.log("他のクラスが検出されました。");
          input = "<skip 21>";
          split_chars = splitStr(input);
          // ここに間違いを記録する処理を追加?
          //とりあえず21に飛ばしちゃう
        }
        break;
      case "saveButton2":
        if (highestPrediction.className === "3+4(n-1)") {
          console.log("画像は3+4(n-1)");
          input = "<skip 23>";
          split_chars = splitStr(input);
        } else {
          console.log("2度目の画像間違い");
          input = "<skip 31>";
          split_chars = splitStr(input);
          // ここに間違いを記録する処理を追加?
          //とりあえず21に飛ばしちゃう
        }
        break;
      case "saveButton6":
        if (highestPrediction.className === "3+4(n-1)") {
          console.log("画像は3+4(n-1)");
          input = "<skip 49>";
          split_chars = splitStr(input);
        } else {
          console.log("画像間違い");
          input = "<skip 49>";
          split_chars = splitStr(input);
          // ここに間違いを記録する処理を追加?
          //とりあえず49に飛ばしちゃう
        }
        break;
      case "saveButton9":
        if (highestPrediction.className === "1+3n") {
          console.log("画像は1+3n");
          input = "<skip 53>";
          split_chars = splitStr(input);
        } else {
          console.log("1+3n,2度目の画像間違い");
          input = "<skip 55>";
          split_chars = splitStr(input);
          // ここに間違いを記録する処理を追加?
          //とりあえず21に飛ばしちゃう
        }
        break;
      default:
        console.log(`未知のボタンIDが検出されました: ${buttonId}`);
        // 追加のデフォルト処理を実行
        break;
    }
    main();
    mess_box.click();
  }

  // ボタンのクリックイベントを設定
  document.getElementById('saveButton').addEventListener('click', () => {
    predictCanvas(); // ボタンがクリックされたときに関数を実行
    console.log("画像判断開始");
  });


  // 初期化
  loadModel();



  // 音声入力の処理
  // 音声入力の処理を共通関数で管理
  function enableVoiceInput(inputId, buttonId) {
    const startVoiceButton = document.getElementById(buttonId);
    startVoiceButton.addEventListener('click', () => {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'ja-JP';
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById(inputId).value = transcript;
      };

      recognition.onerror = (event) => {
        console.error('音声認識エラー:', event.error);
        alert('音声入力エラー: ' + event.error);
      };
    });
  }

  // 各フォームで音声入力を有効にする
  enableVoiceInput('userAnswer1', 'start-voice1');
  enableVoiceInput('userAnswer2', 'start-voice2');
  enableVoiceInput('userAnswer4', 'start-voice4');
  enableVoiceInput('apiuserAnswer1', 'apistart-voice1', 'apistop-voice1');



  //Q1の回答の分岐
  document.querySelector('#Q1form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    const userAnswer = document.querySelector('#userAnswer1').value; // ユーザーの回答を取得
    $('.formQ1').removeClass('visible');

    if (userAnswer === '10') {
      input = "<skip 1>";
      split_chars = splitStr(input);
      console.log(split_chars);

    } else {
      input = "<skip 2>";
      split_chars = splitStr(input);
      console.log(split_chars);
    }
    main();
    mess_box.click();
    document.querySelector('#userAnswer').value = '';
  });

  //Q2の回答の分岐
  document.querySelector('#Q2form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    const userAnswer = document.querySelector('#userAnswer2').value.trim(); // 空白を除去
    console.log(`ユーザーの入力: ${userAnswer}`); // 入力値を確認

    $('.formQ2').removeClass('visible');

    if (/(もじ|文字|x)/i.test(userAnswer)) {
      console.log("条件に一致しました");
      input = "<skip 4>";
      split_chars = splitStr(input);
      console.log(split_chars);
    } else {
      console.log("条件に一致しません");
      input = "<skip 5>";
      split_chars = splitStr(input);
      console.log(split_chars);
    }

    main();
    mess_box.click();
  });


  //Q3の回答の分岐
  document.querySelector('#Q3form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    // ユーザーの回答と文字を取得
    const userAnswer = document.querySelector('#userAnswer3').value.trim();
    userChar = document.querySelector('#userVariable').value.trim();

    // 入力が1文字でない場合のチェック
    if (userChar.length !== 1) {
      alert("1文字だけ入力してください！");
      return;
    }

    // 入力内容を処理
    $('.formQ3').removeClass('visible');

    if (/(正方形|せいほうけい|しかく|四角)/i.test(userAnswer)) {
      input = "<skip 6>";
      split_chars = splitStr(input);
      console.log("正しい回答:", split_chars);
    } else {
      input = "<skip 5>";
      split_chars = splitStr(input);
      console.log("間違った回答:", split_chars);
    }

    // 任意の文字を保存・利用
    console.log(`ユーザーが選択した文字: ${userChar}`);

    // 次の処理を進める
    main();
    mess_box.click();

    // 入力フォームをリセット
    document.querySelector('#userAnswer').value = '';
    document.querySelector('#userVariable').value = '';
  });

  //Q4の回答の分岐
  document.querySelector('#Q4form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    const userAnswer = document.querySelector('#userAnswer4').value; // ユーザーの回答を取得
    $('.formQ4').removeClass('visible');

    //回答鬼分岐！！！！
    if (normalize(userAnswer) === '3(n-1)+4' || normalize(userAnswer) === '4+3(n-1)') {
      //さきにAさんのパターン
      input = "<skip 46>";
      //最初にユーザーの発表なら8に進む
      //input = "<skip 8>";
      split_chars = splitStr(input);
      console.log(split_chars);
    } else if (normalize(userAnswer) === '3n+4' || normalize(userAnswer) === '4+3n') {
      input = "<skip 35>";
      split_chars = splitStr(input);
      console.log(split_chars);
      rootId = "1";
    } else if (normalize(userAnswer) === '3n+1' || normalize(userAnswer) === '1+3n') {
      input = "<skip 47>";
      split_chars = splitStr(input);
      console.log(split_chars);
      rootId = "2";
    } else {
      input = "<skip 100>";
      split_chars = splitStr(input);
      console.log(split_chars);
    }
    main();
    mess_box.click();
    document.querySelector('#userAnswer').value = '';
  });

  //式がわからないボタン
  document.getElementById('Q4nonsbmitbutton').addEventListener('click', function (event) {
    event.preventDefault(); // デフォルトの動作を防ぐ
    input = "<skip 61>";
    split_chars = splitStr(input);
    console.log(split_chars);
    $('.formQ4').removeClass('visible');
    main();
    mess_box.click();
  });


  //4+3(n-1)において様々な全角、半角など統一させるための関数
  //絶対もっといいのある
  function normalize(answer) {
    return answer
      .replace(/[（）＋－]/g, (m) => ({ '（': '(', '）': ')', '＋': '+', '－': '-' }[m])) // 全角記号を半角に変換
      .replace(/\s+/g, '') // 空白を除去
      .replace(/N/g, 'n'); // 大文字のNを小文字のnに変換
  }

  //Q5の回答の分岐
  document.querySelector('#Q5form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    const userAnswer = document.querySelector('#userAnswer5').value; // ユーザーの回答を取得
    $('.formQ5').removeClass('visible');

    if (userAnswer === '4+3(n-1)') {
      input = "<skip 22>";
      split_chars = splitStr(input);
      console.log(split_chars);
    } else if (userAnswer === '4+3n') {
      input = "<skip 25>";
      split_chars = splitStr(input);
      console.log(split_chars);
    }
    main();
    mess_box.click();
    document.querySelector('#userAnswer').value = '';
  });
  //Q6の回答の分岐
  document.getElementById('correctButton').addEventListener('click', () => {
    input = "<skip 40>";
    split_chars = splitStr(input);
    console.log("式はただしい");
    $('.formQ6').removeClass('visible');
    main();
    mess_box.click();
  });

  document.getElementById('incorrectButton').addEventListener('click', () => {
    input = "<skip 39>";
    split_chars = splitStr(input);
    console.log("式はただしくない");
    $('.formQ6').removeClass('visible');
    main();
    mess_box.click();
  });

  //Q7の回答の分岐
  document.getElementById('correctButton7').addEventListener('click', () => {
    input = "<skip 41>";
    split_chars = splitStr(input);
    console.log("わかった");
    $('.formQ7').removeClass('visible');
    main();
    mess_box.click();
  });

  document.getElementById('incorrectButton7').addEventListener('click', () => {
    input = "<skip 42>";
    split_chars = splitStr(input);
    console.log("わからない");
    $('.formQ7').removeClass('visible');
    main();
    mess_box.click();
  });

  //Q8の回答の分岐
  document.querySelector('#Q8form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    const userAnswer = document.querySelector('#userAnswer8').value; // ユーザーの回答を取得
    $('.formQ8').removeClass('visible');

    if (normalize(userAnswer) === '3(n-1)+4' || normalize(userAnswer) === '4+3(n-1)') {
      input = "<skip 43>";
      split_chars = splitStr(input);
      console.log(split_chars);
    } else {
      input = "<skip 42>";
      split_chars = splitStr(input);
      console.log(split_chars);
    }
    main();
    mess_box.click();
    document.querySelector('#userAnswer').value = '';
  });

  //Q9の回答の分岐
  document.querySelector('#Q9form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    // 解答を取得する前にDOMが更新されているか確認
    const userAnswer1 = document.querySelector('#userAnswer91').value.trim(); // 解答1を取得 (trimで余分なスペースを削除)
    const userAnswer2 = document.querySelector('#userAnswer92').value.trim(); // 解答2を取得

    // ここで各解答を処理
    console.log('解答1:', userAnswer1);
    console.log('解答2:', userAnswer2);

    // 例えば、回答に応じて分岐処理を行う
    if (userAnswer1 === '1+3n' && userAnswer2 === '1+3n') {
      input = "<skip 58>"; // 例として次の処理をスキップ
      split_chars = splitStr(input);
      console.log(split_chars);
    } else {
      input = "<skip 60>"; // 異なる処理
      split_chars = splitStr(input);
      console.log(split_chars);
    }
    main();
    mess_box.click();
  });

  //Q10の回答の分岐
  document.querySelector('#Q10form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ
    rootId = "3";

    const userAnswer = document.querySelector('#userAnswer10').value; // ユーザーの回答を取得
    $('.formQ10').removeClass('visible');

    if (userAnswer === '1+3×4' || userAnswer === '1+4×3') {
      input = "<skip 65>";
      split_chars = splitStr(input);
      console.log(split_chars);
    } else {
      input = "<skip 64>";
      split_chars = splitStr(input);
      console.log(split_chars);
    }
    main();
    mess_box.click();
    document.querySelector('#userAnswer').value = '';
  });





  //['<', 's', 'k', 'i', 'p', ' ', '2', '>']これにしてくれる関数
  function splitStr(str) {
    return str.split('');
  }

  // chatgptを送信するとそれと同時に画像を提出してくれるボタン、
  document.querySelector('.submit-button').addEventListener('click', (e) => {
    const saveButton = document.getElementById('saveButton'); // 対応するボタンを取得
    if (saveButton) {
      saveButton.click(); // ボタンのクリックイベントを発火
      console.log('画像を提出するボタンをクリックしました');
    } else {
      console.log('画像を提出するボタンが見つかりません');
    }
  });


  // フォーム送信処理を継続するようにsubmitイベントは保持
  const formapi = document.getElementById('answer-form');
  formapi.addEventListener('submit', async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信を防止

    const apiUserAnswer = document.getElementById("apiUserAnswer").value; // 入力内容を取得
    console.log("ユーザーの解答:", apiUserAnswer);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiUserAnswer, buttonId }),
      });

      textResponse = await response.text();
      console.log("判定結果:", textResponse);
    } catch (error) {
      console.error('エラー:', error);
    }
    await sleep(5000);
    // レスポンス内容を判定
    // ボタンの数だけ作らなきゃいけないよ
    //何でかは全くわからないけど、chatgpt送信、画像送信後この関数に行く
    const inputField = document.getElementById('apiUserAnswer');
    inputField.value = ''; // 入力内容をクリア


    if (buttonId === 'saveButton1') {
      if (textResponse.includes("不正解")) {
        switch (highestPrediction.className) {
          case "4+3(n-1)":
            console.log("図〇、説明×");
            input = "<skip 31>";
            split_chars = splitStr(input);
            break;
          default:
            console.log("図も説明も不正解");
            input = "<skip 34>";
            split_chars = splitStr(input);
            break;
        };
      } else if (textResponse.includes("正解")) {
        switch (highestPrediction.className) {
          case "4+3(n-1)":
            console.log("図も説明も正解");
            input = "<skip 23>";
            split_chars = splitStr(input);
            break;
          default:
            console.log("説明〇図×");
            input = "<skip 29>";
            split_chars = splitStr(input);
            break;
        };
      } else {
        console.log("ボタン1: レスポンスに「正解」も「不正解」も含まれていません");
      }
    } else if (buttonId === 'saveButton3') {
      if (textResponse.includes("不正解")) {
        input = "<skip 33>";
        split_chars = splitStr(input);
      } else if (textResponse.includes("正解")) {
        input = "<skip 30>";
        split_chars = splitStr(input);
      } else {
        console.log("ボタン2: レスポンスに「正解」も「不正解」も含まれていません");
      }
    } else if (buttonId === 'saveButton4') {
      if (textResponse.includes("不正解")) {
        switch (highestPrediction.className) {
          case "4+3(n-1)":
            console.log("図〇、説明×");
            input = "<skip 31>";
            split_chars = splitStr(input);
            break;
          default:
            console.log("図も説明も不正解");
            input = "<skip 31>";
            split_chars = splitStr(input);
            break;
        };
      } else if (textResponse.includes("正解")) {
        switch (highestPrediction.className) {
          case "4+3(n-1)":
            console.log("図も説明も正解");
            input = "<skip 30>";
            split_chars = splitStr(input);
            break;
          default:
            console.log("説明〇図×");
            input = "<skip 31>";
            split_chars = splitStr(input);
            break;
        };
      } else {
        console.log("ボタン1: レスポンスに「正解」も「不正解」も含まれていません");
      }
    } else if (buttonId === 'saveButton5') {
      if (textResponse.includes("具体的な数を使う")) {
        console.log("具体的な数を使う");
        input = "<skip 36>";
        split_chars = splitStr(input);
      } else if (textResponse.includes("その他")) {
        console.log("その他");
        input = "<skip 37>";
        split_chars = splitStr(input);
      } else {
        console.log("ボタン1: レスポンスに「正解」も「不正解」も含まれていません");
      }
    } if (buttonId === 'saveButton7') {
      if (textResponse.includes("不正解")) {
        switch (highestPrediction.className) {
          case "1+3n":
            console.log("図〇、説明×");
            input = "<skip 51>";
            split_chars = splitStr(input);
            break;
          default:
            console.log("図も説明も不正解");
            input = "<skip 56>";
            split_chars = splitStr(input);
            break;
        };
      } else if (textResponse.includes("正解")) {
        switch (highestPrediction.className) {
          case "1+3n":
            console.log("図も説明も正解");
            input = "<skip 53>";
            split_chars = splitStr(input);
            break;
          default:
            console.log("説明〇図×");
            input = "<skip 54>";
            split_chars = splitStr(input);
            break;
        };
      } else {
        console.log("ボタン1: レスポンスに「正解」も「不正解」も含まれていません");
      }
    } else if (buttonId === 'saveButton8') {
      if (textResponse.includes("不正解")) {
        input = "<skip 52>";
        split_chars = splitStr(input);
      } else if (textResponse.includes("正解")) {
        input = "<skip 30>";
        split_chars = splitStr(input);
      } else {
        console.log("ボタン2: レスポンスに「正解」も「不正解」も含まれていません");
      }
    } else if (buttonId === 'saveButton10') {
      if (textResponse.includes("不正解")) {
        switch (highestPrediction.className) {
          case "4+3(n-1)":
            console.log("図〇、説明×");
            input = "<skip 55>";
            split_chars = splitStr(input);
            break;
          default:
            console.log("図も説明も不正解");
            input = "<skip 55>";
            split_chars = splitStr(input);
            break;
        };
      } else if (textResponse.includes("正解")) {
        switch (highestPrediction.className) {
          case "4+3(n-1)":
            console.log("図も説明も正解");
            input = "<skip 30>";
            split_chars = splitStr(input);
            break;
          default:
            console.log("説明〇図×");
            input = "<skip 55>";
            split_chars = splitStr(input);
            break;
        };
      } else {
        console.log("ボタン1: レスポンスに「正解」も「不正解」も含まれていません");
      }
    } else if (buttonId === 'saveButton11') {
      if (textResponse.includes("不正解")) {
        input = "<skip 59>";
        split_chars = splitStr(input);
      } else if (textResponse.includes("正解")) {
        input = "<skip 58>";
        split_chars = splitStr(input);
      } else {
        console.log("ボタン2: レスポンスに「正解」も「不正解」も含まれていません");
      }
    } else {
      console.log("未知のボタンID");
    }
    main();
    mess_box.click();
    canvasClearButtonClick();

  });

  //読み込みのための遅延のための関数
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function canvasClearButtonClick() {
    const button = document.getElementById('clear-button');
    if (button) {
      button.click(); // clear-buttonをクリックしたことにする
      console.log('キャンバスを消しました');
    } else {
      console.log('ボタンが見つかりません');
    }
  }

  //ひとつ前に戻るボタンを押したときの処理
  const backButton = document.querySelector('.backButton');
  backButton.addEventListener('click', (event) => {
    event.preventDefault(); switch (buttonId) {
      case "saveButton5":
        input = "<skip 7>";
        split_chars = splitStr(input);
        break;
    }
    console.log('ひとつ前に戻るボタンがクリックされました');
    main();
    mess_box.click();
  });

  //グループワーク終了ボタンを押したときの処理
  const endButton = document.querySelector('.endButton');
  endButton.addEventListener('click', (event) => {
    event.preventDefault();
    input = "<skip 57>";
    split_chars = splitStr(input);
    console.log('グループワークを終了しました');
    $('.gwform').removeClass('visible');
    main();
    mess_box.click();
  });


  //chat用
  const chatInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");
  const chatOutput = document.getElementById("chatWindow");

  sendButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const userMessage = chatInput.value;
    chatOutput.innerHTML += `<div class="message student"><strong>（学習者）さん：</strong> ${userMessage}</div>`;
    chatInput.value = "";

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("サーバーエラー");

      const data = await response.json();
      chatOutput.innerHTML += `<div class="message assistant"><strong>Aさん：</strong> ${data.response}</div>`;
    } catch (error) {
      chatOutput.innerHTML += `<div class="message error"><strong>エラー：</strong> ${error.message}</div>`;
    }
  });
  //いろいろなところに飛べるボタン、ほんとうはいらない
  const skip30Button = document.querySelector('.skip30Button');
  skip30Button.addEventListener('click', (event) => {
    event.preventDefault();
    input = "<skip 30>";
    split_chars = splitStr(input);

    console.log('30に');
    main();
    mess_box.click();
  });
  const skip7Button = document.querySelector('.skip7Button');
  skip7Button.addEventListener('click', (event) => {
    event.preventDefault();
    input = "<skip 7>";
    split_chars = splitStr(input);

    console.log('30に');
    main();
    mess_box.click();
  });



  const synthesizeButton = document.getElementById("synthesize");
  const audioElement = document.getElementById("audio");
  const textArea = document.getElementById("text43");
  

  async function synthesizeSpeech(text) {
    if (!text) {
      alert("Please enter some text!");
      return;
    }
  
    console.log("Input text: ", text);
  
    try {
      const response = await fetch('/api/textspeech', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const audioBuffer = await response.arrayBuffer();
      const blob = new Blob([audioBuffer], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
  
      audioElement.src = url;
      audioElement.style.display = "block";
      audioElement.play();
    } catch (error) {
      console.error(error);
      alert("Failed to synthesize speech.");
    }
  }
  
  // // クリックイベントで関数を呼び出すようにする
  // synthesizeButton.addEventListener("click", () => {
  //   const text = textArea?.value; // `?` を使うと安全にアクセスできる
  //   synthesizeSpeech(text); // 関数として呼び出し
  // });
  
  





})

