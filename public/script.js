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
    if (textResponse.includes("正解")) {
      console.log("1"); // 「正解」が含まれていた場合
    } else if (textResponse.includes("不正解")) {
      console.log("2"); // 「不正解」が含まれていた場合
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
