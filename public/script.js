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
  let split_chars; //よくわからないけどいるみたい
  var text = [];

  text[0] = [
    "",
    "<fadeIn_chara 1 1>おはよございます。今日の授業を始めていきたいと思います。",
    "<item 1><fadeIn_chara 5 1><saveButton>図のようにマッチ棒を並べて、正方形を横につないだ形を作ります。",
    "<select1 1><select2 2><select3 none><text1 10本><text2 わからない><selectBox>正方形を3個作るとき、マッチ棒は何本必要でしょうか？"
  ];
  text[1] = [
    "",
    "テキスト１",
    "図のようにマッチ棒を並べて、正方形を横につないだ形を作ります。",
    "<select1 1><select2 2><select3 none><text1 10本><text2 わからない><selectBox>正方形を3個作るとき、マッチ棒は何本必要でしょうか？"
  ];
  text[2] = [
    "",
    "テキスト２",
    "図のようにマッチ棒を並べて、正方形を横につないだ形を作ります。",
    "<select1 1><select2 2><select3 none><text1 10本><text2 わからない><selectBox>正方形を3個作るとき、マッチ棒は何本必要でしょうか？"
  ];

  console.log("main関数呼び出し前のsplit_chars:", split_chars);


  function main() {
    // split_charsが無効または空の場合のエラーハンドリング
    if (!Array.isArray(split_chars) || split_chars.length === 0) {
      console.error("split_charsが無効または空です:", split_chars);
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
          $('.saveButton').addClass('Buttonshow');
          console.log('ボタン表示!');
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
  const showBtn = document.querySelector('#show-canvas-button');
  const wrapper = document.querySelector('.wrapper');

  let x;
  let y;
  let mousePressed = false;
  let selectedColor = 'black'; // デフォルトの色を黒に設定



  showBtn.addEventListener('click', () => {
    //wrapper.style.display = 'block';
    wrapper.classList.toggle('none');
    if (showBtn.innerHTML === 'ノートを表示') {
      showBtn.innerHTML = 'ノートを非表示';
    } else {
      showBtn.innerHTML = 'ノートを表示';
    }

    console.log("おしたよ");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const chara = new Image();
    chara.src = "./img/item3.png";  // 画像のURLを指定
    chara.onload = () => {
      const scaleWidth = 800;  // 画像の幅を200pxに設定
      const scaleHeight = 800; // 画像の高さを200pxに設定
      ctx.drawImage(chara, 0, 0, scaleWidth, scaleHeight);
    }

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
      const highestPrediction = predictions.sort((a, b) => b.probability - a.probability)[0];
      console.log(`予測結果: ${highestPrediction.className}（確率: ${(highestPrediction.probability * 100).toFixed(2)}%）`);

      // 予測結果に基づいてシナリオを変更
      changeScenarioBasedOnPrediction(highestPrediction);
    } catch (error) {
      console.error("予測中にエラーが発生しました: ", error);
    }
  }


  // 予測結果に基づいてシナリオを動的に変更
  function changeScenarioBasedOnPrediction(highestPrediction) {
    switch (highestPrediction.className) {
      case "Class 1":
        split_chars = ['<', 's', 'k', 'i', 'p', ' ', '2', '>'];
        //もうここに文章を入れることにしようか
        break;
      case "Class 2":
        split_chars = ['<', 's', 'k', 'i', 'p', ' ', '2', '>'];
        break;
      case "クラス3":
        split_chars = ['select2', 'scene1'];
        break;
      default:
        split_chars = ['select1', 'none'];
    }

    console.log("渡されるシナリオデータ:", split_chars);
    main();

  }



  // '保存'ボタンがクリックされたときに予測を実行
  document.getElementById("save-button").addEventListener("click", predictCanvas);

  // 初期化
  loadModel();

  // 解答送信の処理
  const form = document.getElementById('answer-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // ページのリロードを防止

    const userAnswer = document.getElementById('userAnswer').value;

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAnswer }),
      });
      const textResponse = await response.text(); // レスポンスをテキストとして取得
      console.log(textResponse); // レスポンスの内容を表示
      // レスポンス内容を判定
      if (textResponse.includes("不正解")) {
        split_chars = ['<', 's', 'k', 'i', 'p', ' ', '3', '>'];
        console.log(split_chars); // 「不正解」が含まれていた場合
      } else if (textResponse.includes("正解")) {
        console.log("2"); // 「正解」が含まれていた場合
      } else {
        console.log("レスポンスに「正解」も「不正解」も含まれていません");
      }


    } catch (error) {
      console.error('エラー:', error);
      document.getElementById('response').textContent = 'サーバーエラーが発生しました';
    }
  });

  // 音声入力の処理
  const startVoiceButton = document.getElementById('start-voice');
  startVoiceButton.addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'ja-JP';
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById('userAnswer').value = transcript;
    };

    recognition.onerror = (event) => {
      console.error('音声認識エラー:', event.error);
      alert('音声入力エラー: ' + event.error);
    };
  });


})

