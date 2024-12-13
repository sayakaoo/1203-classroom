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



  const text = {
    //配列0のは時短のためのスキップ
    0: [
      "",
      "<fadeIn_chara 5 1><showCanvas1>おはようございます。今日の授業を始めていきたいと思います。",
      "<item 1>図のようにマッチ棒を並べて、正方形を横につないだ形を作ります。",
      "<Q1form>正方形を3個作るとき、マッチ棒は何本必要でしょうか？"
    ],
    1: [
      "そうですね、数えてみると10本ですね",
      "今回は数えることでマッチ棒の数が分かりました<skip 3>",
    ],
    2: [
      "本当ですか？数えてみましょう",
      "<Q1form>正方形を3個作るとき、マッチ棒は何本必要でしょうか？"
    ],
    3: [
      "<fadeOut_item 1>では正方形の数を増やしてみましょう",
      "正方形が50個、100個のとき、マッチ棒はそれぞれ何本必要でしょうか？<fadeOut_chara 5 1>",
      "<fadeIn_chara 5 2>描くのにも時間かかっちゃうよ、、<fadeOut_chara 5 2>",
      "<fadeIn_chara 5 1>正方形の数が多い時数えるのは大変ですね",
      "どのようにしたら考えられるでしょうか<Q2form>",
    ],
    4: [
      "文字を使ってみるのはいい方法ですね！<fadeOut_chara 5 1>",
      "<fadeIn_chara 3 5>どの数を文字で表そうか。。<Q3form>",
    ],
    5: [
      "文字を使ってみるとかどうかな？"
    ],
    6: [
      "<fadeOut_chara 3 5><fadeIn_chara 5 1>そうですね、正方形の数をnを用いて表しましょう",
      "では正方形がn個あるとき、マッチ棒は何本必要ですか。どのように考えられるでしょうか。まずは5分個人で考えてみてください",
      "(5分タイマー)<skip 7>",

    ],
    7: [
      "<fadeOut_chara 5 1><fadeIn_chara 3 5>立てた式を1つおしえてね<Q4form>",
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
    20: [
      "<fadeOut_chara 3 5><fadeIn_chara 5 1>ではAさんどのような式を立てたか教えてください",
      "4+3(n-1)という式をたてました。",
      "ありがとうございます。",
      "これはどのような図に表せるでしょうか？<showCanvas>"
    ],
    21: [
      "21",
      "",
      "",
      ""
    ],




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
        case 'saveButton':
          $('.saveButton').addClass('visible');
          console.log('ボタン表示');
          break;
        case 'saveButtonremove':
          $('.saveButton').removeClass('Buttonshow');
          break;
        case 'Q1form':
          $('.formQ1').addClass('visible');
          console.log('フォーム表示');
          break;
        case 'Q2form':
          $('.formQ2').addClass('visible');
          console.log('フォーム表示');
          break;
        case 'Q3form':
          $('.formQ3').addClass('visible');
          console.log('フォーム表示');
          break;
        case 'Q4form':
          $('.formQ4').addClass('visible');
          console.log('フォーム表示');
          break;
        case 'showCanvas':
          $('.showCanvasButton').addClass('visible');
          $('.wrapper').addClass('visible');
          $('.hint1').addClass('visible');
          console.log('フォーム表示');
          break;
        case 'apiform1':
          $('.formapi1').addClass('visible');
          $('.submit-button1').addClass('visible');
          console.log('フォーム表示');
          break;
        case 'showCanvas1':
          $('.showCanvasButton').addClass('visible');
          $('.wrapper').addClass('visible');
          $('.saveButton').addClass('visible');
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
        case 'item':
          document.getElementById('item').src = 'img/item' + tagget_str[1] + '.png';
          break;

        case 'fadeIn_chara':
          function fadeIn_chara_remove() {
            $('#charaposition' + tagget_str[1]).removeClass('fadein');
          }
          $('#charaposition' + tagget_str[1]).addClass('fadein');
          document.getElementById('chara' + tagget_str[1]).src = 'img/chara' + tagget_str[2] + '.png';
          setTimeout(fadeIn_chara_remove, 500);
          break;
        case 'fadeIn_bg':
          function fadeIn_bg_remove() {
            $('#bgimg').removeClass('fadein');
          }
          $('#bgimg').addClass('fadein');
          setTimeout(fadeIn_bg_remove, 500);
          break;
        case 'fadeIn_item':
          function fadeIn_item_remove() {
            $('.itembox').removeClass('fadein');
          }
          $('.itembox').addClass('fadein');
          setTimeout(fadeIn_item_remove, 500);
          break;
        case 'fadeOut_chara':
          function fadeOut_chara_remove() {
            $('#charaposition' + tagget_str[1]).removeClass('fadeout');
            document.getElementById('chara' + tagget_str[1]).src = 'img/chara' + tagget_str[2] + '.png';
          }
          $('#charaposition' + tagget_str[1]).addClass('fadeout');
          setTimeout(fadeOut_chara_remove, 500);
          break;
        case 'fadeOut_bg':
          function fadeOut_bg_remove() {
            $('#bgimg').removeClass('fadeout');
            document.getElementById('bgimg').src = 'img/bg' + tagget_str[1] + '.jpg';
          }
          $('#bgimg').addClass('fadeout');
          setTimeout(fadeOut_bg_remove, 500);
          break;
        case 'fadeOut_item':
          function fadeOut_item_remove() {
            $('.itembox').removeClass('fadeout');
            document.getElementById('item').src = 'img/item0.png';
          }
          $('.itembox').addClass('fadeout');
          setTimeout(fadeOut_item_remove, 500);
          break;
        case 'fadeOutIn_bg':
          function fadeOutIn_bg_change() {
            document.getElementById('bgimg').src = 'img/bg' + tagget_str[1] + '.jpg';
          }
          function fadeOutIn_bg_remove() {
            $('#bgimg').removeClass('fadeoutin');
            $('#textbox').removeClass('none');
            $('#textbox').trigger('click');
          }
          $('#bgimg').addClass('fadeoutin');
          $('#textbox').addClass('none');
          setTimeout(fadeOutIn_bg_change, 1500);
          setTimeout(fadeOutIn_bg_remove, 3000);
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
        // console.log(textRead);
        // msg.text = textRead;
        // msg.lang = 'ja-JP';
        // msg.rate = 3.0;//速度
        // msg.pitch = 0.3;//声の高さ

        // window.speechSynthesis.speak(msg);




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
  const clearBtn = document.querySelector('#clear-button');
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
  const modelURL = "https://teachablemachine.withgoogle.com/models/tLuDsRP9H/";

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
  }


  // '保存'ボタンがクリックされたときに予測を実行
  document.getElementById("save-button").addEventListener("click", predictCanvas);

  // 初期化
  loadModel();

  // chatgptapi解答送信の処理
  const form = document.getElementById('answer-form');
  form.addEventListener('submit', async (e) => {

    const apiUserAnswer = document.getElementById("apiUserAnswer").value; // 入力内容を取得
    console.log("ユーザーの解答:", apiUserAnswer);
    console.log("chatgpt認識中");
    $('.answerform').removeClass('visible');
    e.preventDefault(); // 

    const buttonId = document.querySelector('button[type="submit"]:focus').value; // フォーカスされたボタンのvalueを取得

    const userAnswer = document.getElementById('apiUserAnswer').value;

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAnswer, buttonId }),
      });
      const textResponse = await response.text(); // レスポンスをテキストとして取得
      console.log(textResponse); // レスポンスの内容を表示
      canvasButtonClick();
      await sleep(5000);

      // レスポンス内容を判定
      // ボタンの数だけ作らなきゃいけないよ
      if (buttonId === 'button1') {
        if (textResponse.includes("不正解")) {
          switch (highestPrediction.className) {
            case "Class 1":
              input = "<skip 11>";
              split_chars = splitStr(input);
              break;
            default:
              input = "<skip 12>";
              split_chars = splitStr(input);
              break;
          };
        } else if (textResponse.includes("正解")) {
          switch (highestPrediction.className) {
            case "Class 1":
              input = "<skip 9>";
              split_chars = splitStr(input);
              break;
            default:
              input = "<skip 10>";
              split_chars = splitStr(input);
              break;
          };
        } else {
          console.log("ボタン1: レスポンスに「正解」も「不正解」も含まれていません");
        }
      } else if (buttonId === 'button2') {
        if (textResponse.includes("不正解")) {
          input = "<skip >";
          split_chars = splitStr(input);
          console.log(split_chars); // 「不正解」が含まれていた場合（button2の場合）
        } else if (textResponse.includes("正解")) {
          input = "<skip >";
          split_chars = splitStr(input);
        } else {
          console.log("ボタン2: レスポンスに「正解」も「不正解」も含まれていません");
        }
      } else {
        console.log("未知のボタンID");
      }


    } catch (error) {
      console.error('エラー:', error);
      document.getElementById('response').textContent = 'サーバーエラーが発生しました';
    }

    main();
    mess_box.click();
  });

  // canvasの画像判定後の分岐処理
  function handlePrediction() {
    if (!highestPrediction) {
      console.log("予測結果が無効です");
      return;
    }
  
    if (highestPrediction.className === "class2") {
      console.log("class2が検出されました。特定の処理を実行します。");
      input = "<skip 21>";
              split_chars = splitStr(input);
    } else {
      console.log("他のクラスが検出されました。");
      // 他のクラスの時の処理をここに記述
    }
    main();
    mess_box.click();
  }
  
  async function runPrediction(imageElement) {
    await predictImage(imageElement); // predictImageはそのまま利用
    handlePrediction(); // 結果をhandlePredictionに渡す
  }
  

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

    if (userAnswer === '1+3n') {
      //さきにAさんのパターン
      input = "<skip 20>";
      //最初にユーザーの発表なら8に進む
      //input = "<skip 8>";
      split_chars = splitStr(input);
      console.log(split_chars);

    } else {
      input = "<skip 100>";
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

  //キャンバス送信ボタンの関数
  function canvasButtonClick() {
    const saveButton = document.getElementById('save-button');
    if (saveButton) {
      saveButton.click(); // ボタンのクリックイベントを発火
      console.log("ボタンをクリックしました");
    } else {
      console.log("ボタンが見つかりません");
    }
  }
  //読み込みのための遅延のための関数
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  runPrediction(imageElement);


})

