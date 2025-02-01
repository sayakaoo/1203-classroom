window.addEventListener('load', function () {
  var mess_box = document.getElementById('textbox');
  var mess_text = document.getElementById('text');
  var mswin_flg = true;
  var stop_flg = false;
  var end_flg = false;
  var scene_cnt = 0;
  var line_cnt = 0;
  const interval = 20;
  let split_chars;

  let input = "";
  let userChar = "";
  let highestPrediction = "";
  let textResponse = "";
  let buttonId = "";
  let rootId1 = "0";
  let rootIdch = "";
  let rootId = "0";
  let charaId = "0";
  const clearBtn = document.querySelector('#clear-button');

  const text = {
    //配列0のは時短のためのスキップ
    0: [
      "",
      "<chara 5 1>こんにちは",
      "<item 1>図のようにマッチ棒を並べて、正方形を横につないだ形を作ります。",
      "正方形を3個作るとき、マッチ棒は何本必要でしょうか？<form 1>"
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
      "正方形が50個、100個のとき、マッチ棒はそれぞれ何本必要でしょうか？<charav 2>",
      "<charaOut 5><chara 5 2>描くのにも時間かかっちゃうよ、、<charav 1>",
      "<charaOut 5><chara 5 1>正方形の数が多い時数えるのは大変ですね<skip 6>",
    ],
    //"どのようにしたら考えられるでしょうか<form 2>",3の最後にこの一文あると４．５へ
    //4.5は使わない
    4: [
      "文字を使ってみるのはいい方法ですね！",
      "どの数を文字で表そうか。。<form 3>",
    ],
    5: [
      "文字を使ってみるとかどうかな？<skip 4>"
    ],
    6: [
      "では正方形がn個あるとき、マッチ棒は何本必要ですか。",
      "どのように考えられるでしょうか。まずは4分個人で考えてみてください",
      "<timer>表や図を使って説明できるようにしましょう。<skip 7>",
    ],
    7: [
      "<form 4>",
    ],
    //今は8~12は使っていない
    8: [
      "(1+3n)ありがとうございます。",
      "(学習者)さんどのように求めたか説明してください。<showCanvas><apiform 1>",

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
      "では次にまいさんどのような式を立てたか教えてください<skip 20>",
    ],
    46: [
      "ではまいさんどのような式を立てたか教えてください<skip 20><charav 3>",
    ],

    20: [
      "<charaOut 5><chara 5 3>1+3nという式をたてました。<charav 1>",
      "<charaOut 5><chara 5 1>ありがとうございます。",
      "これはどのような図に表せるでしょうか？考えてみましょう。<showCanvas 0><saveButton>"
    ],
    21: [
      "<saveButtonremove>みなさん考えられましたか？",
      "ではまいさんどのように考えたか教えてください。<charav 3>",
      "<charaOut 5><chara 5 3><item 4>図のように考えました．",
      "赤で囲んだ部分に1本のマッチ棒があって、3本のマッチ棒でできる青のコの字型の部分がn個だけあるから1+3nという式になりました<charav 1>",
      "<charaOut 5><itemOut 4><chara 5 1>ありがとうございます。自分の解答と見比べてみましょう。",
      "<root>"
    ],
    44: [
      "<closeCanvas 0>では次にどのように考えたか式を教えてください。<form 5>"
    ],

    //22編集中
    22: [
      "(4+3(n-1))ありがとうございます。",
      "どのように4+3(n-1)という式を立てたか説明してください。<showCanvaswithapi><apiform 1><hint 1>"
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
      "<closeCanvas><colseapiform><closehint><itemOut >次にたくみさんどのように考えたか教えてください。<charav 2>",
      "<charaOut 5><chara 5 2>正方形はマッチ棒4本でできているから、4nという式をたてたけど、正方形が3個のときマッチ棒が12本必要ってことになっちゃって間違っている気がします。<charav 1>",
      "<charaOut 5><chara 5 1>たしかにそうですね。4nだと数えすぎてしまっているようです。どのように考えたらいいでしょうか？",
      "話し合ってみましょう",
      "<gwform><charav 3>"
    ],
    31: [
      "ありがとうございます。一緒に考えてみましょう",
      "<item 5>まいさんの例と同じように考えると、赤で囲んだ部分に1本のマッチ棒があって、3本のマッチ棒でできる青のコの字型の部分がn個だけあるから1+3nという式になりました",
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
      "<closeCanvas><closehint><colseapiform>先ほどのまいさんの説明を参考にもう一度説明してみましょう<hint 3><apiform 3>",
    ],
    34: [
      "<closeCanvas><closehint><colseapiform>先ほどのまいさんの説明を参考にしましょう",
      "もう一度説明してみましょう。<hint 4><apiform 4><showCanvaswithapi>",
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
      "<colseapiform><charaOut 5><chara 5 3>最初に正方形が3個のときを考えたからそれを式に当てはめてみたらどうかな？<charav 1>",
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
      "ではまいさんどのような式を立てたか教えてください<skip 48>"
    ],
    67: [
      "では次にまいさんどのような式を立てたか教えてください<skip 48>"
    ],

    48: [
      "<charaOut 5><chara 5 3>4+3(n-1)という式をたてました。<charav 1>",
      "<charaOut 5><chara 5 1>ありがとうございます。",
      "これはどのような図に表せるでしょうか？考えてみましょう。<showCanvas 6>"
    ],
    49: [
      "みなさん考えられましたか？",
      "ではまいさんどのように考えたか教えてください。<charav 3>",
      "<charaOut 5><chara 5 3><item 5>図のように考えました．",
      "赤で囲んだ部分に4本のマッチ棒があって、3本のマッチ棒でできる青のコの字型の部分がn-1個だけあるから4+3(n-1)という式になりました<charav 1>",
      "<charaOut 5><itemOut 4><chara 5 1>ありがとうございます。自分の解答と見比べてみましょう。",
      "<root>"
    ],
    50: [
      "<closeCanvas 6>では次に(学習者)さん1+3nという式を立てていたと思います。",
      "<roottable>",
    ],
    82: ["(学習者)さんどのように1+3nという式を立てたか説明してください。<showCanvaswithapi><apiform 7><hint 1>"
    ],
    51: [
      "<closeCanvas><closehint><colseapiform>ありがとうございます。",
      "<skip 52>",
    ],
    52: [
      "<closeCanvas><closehint><colseapiform>先ほどのまいさんの説明を参考にもう一度説明してみましょう<hint 8><apiform 8>",
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
      "<item 4>まいさんの例と同じように考えると、このように考えられそうですね(分かりやすく動画で解説したいな)",
      "もう一度解答を見直してみましょう",
      "クリックで次の問題に進む",
      "<closeCanvas><closehint><itemOut 4><skip 30>"
    ],
    56: [
      "<closeCanvas><closehint><colseapiform>先ほどのまいさんの説明を参考にもう一度説明してみましょう<hint 10><apiform 10><showCanvaswithapi>",
    ],
    //30のグループワーク後
    57: [
      "グループで結論を出すことが出来ましたか？たくみさん出た答えを説明してください<charav 2>",
      "<charaOut 5><chara 5 2><item 46>図だとこのように示すことが出来て、4nという式だと青で囲んでいる間のマッチ棒まで数えてしまってました。",
      "なので、この重複するマッチ棒の数を引いて、4n-(n-1)が正しい式です。<charav 1>",
      "<charaOut 5><chara 5 1><itemOut>ありがとうございます。様々な方法で求めることができましたね。",
      "<item 44>今まで求めた式を計算してみましょう。計算して気付いたことを教えてください<apiform 11>",
    ],
    58: [
      "<colseapiform>全て同じ式になりましたね。",
      "様々な求め方をできますが、その答えは一つになることがわかりました！",
      "では今日の感想を書いてみましょう<form 12>",
    ],

    59: [
      "<colseapiform>それぞれの式を計算してみましょう。<form 9>",
    ],
    60: [
      "それぞれ計算すると１+3nになりますね(二度間違いちゃんと説明しなきゃ)",
    ],

    //式が思い浮かばないときの分岐
    //かってに62に飛ばしてるだけで本とは違う
    //本当は分岐させたいねえ
    // 

    // 61: [  "<chara 5 1>では、式を考えるために規則性を探してみましょう",
    //   "規則性を探すために表を書いてみましょう",
    //   "<form 11>",
    //   ""
    // ],

    //formは68に飛ぶ
    61: [
      "では一緒に正方形がn個のときのマッチ棒の数を考えてみましょう。",
      "n個のときは数えることが出来ないので何か規則性をみつけられると考えられそうです。",
      "まずは具体的な数つまり、正方形が1つ、2つの時を考えてみましょう。",
      "表を使って比較しやすくしましょう。<item 23><form 11>"
    ],


    62: [
      "<root3>では一緒に考えてみましょう。",
      "正方形が3個のとき、<item 7>赤で囲んでいる最初のマッチ棒1本と青で囲んでいる他のコの字型のグループに分けて考えてみましょう。",
      "コの字型は3つあるので、<item 8>マッチ棒の本数は最初の1本と、コの字型×3で表すことが出来ます",
      "コの字型は3本のマッチ棒でできているので、式にすると、<item 9>1+3×3になります。",
      "正方形が 4個のときも<item 15>3個の時と同じように考えるとコの字型は4つあるので、マッチ棒の本数は最初の1本と、コの字型×4で表すことが出来ますね",
      "つまり、式にすると、<item 10>1+3×4になります。",
      "同じ方法で正方形が5個の時も考えると、<item 11>1+3×5になります。",
      "<item 13>3,4,5個のときを振り返ると、正方形の数と式の最後の数が一致していますね。",
      "つまり<item 43>この式は1+3×(正方形の数)と表せそうです。",
      "今回は正方形の数がn個の時を考えているので、正方形がn個の時必要なマッチ棒の本数は1+3×n本<item 14>となります",
      "<skip 67>"
    ],

    //67使う
    68: [
      "<item 21>表がかけましたね",
      "この表から規則性を見つけてみましょう",
      "どんな規則性がみつけられますか？<apiform 12>"
    ],
    //ちないみわからん
    69: [
      "<colseapiform><item 22>表から正方形がひとつ増えるごとにマッチ棒が3本ずつ増えるという規則性を見つけましたね。",
      "これを<item 24>図で考えてみましょう。正方形の数が<item 25>増えるたびにコの字の<item 26>グループが1つ追加されている<item 27>ようですね。<item 28>",
      "表を埋めた時の数え方を思い出してみましょう。",
      "正方形が1つのときは4本、<item 29>正方形が２つのときはコの字のグループが<item 30>1つ追加されます。よって、4+3×1という式が立てられます。<item 31>",
      "3個、4個の時も同じように考えてみましょう。",
      "3個のときはコの字のグループが<item 32> 2つ追加されるので、4+3×2という式が立てられます。4個、<item 33> 5個のときも同様に立てられます。",
      "このように考えると<item 34>正方形が１つの時はコの字型のグループが0個と考えることができそうです。",
      "つまり、<item 35>正方形の数がいくつのときも同じ形の式で表すことができますね！",
      "<item 36>ではこの黄色の部分の数字は正方形の数とどんな規則性があるでしょうか？<apiform 13>"
    ],
    70: [
      "<colseapiform>正方形の数より1小さい数が黄色の部分の数字と一致していますね。",
      "つまり、n個の時黄色の部分に入る数はn-1となります。",
      "<item 37>よってn個のときの式は4×3(n-1)と表せます。<skip 45>"
    ],
    71: [
      "最後に今回の問題に似ている問題を作ってみましょう",
      "<item 38>今回の問題は「正方形をn個作るとき、マッチ棒は何本必要か」という問題でした。",
      "この問題をもとにして、同じような問題を作りましょう。",
      "<snsbtn><notesavebutton>また，問題が作れたら「みんなの問題掲示板」に投稿してみましょう！「ノートを保存するボタン」から今日のノートを保存することが出来ます。",
    ],
    72: [
      "<root3>表を縦に見ると、<item 39>マッチ棒の本数は正方形の数を3倍して1足した数になっているという規則性を見つけましたね。",
      "つまり<item 40>（マッチ棒の数）＝（正方形の数）×3+1という式が成り立ちます。",
      "今回は正方形がn個のときの、マッチ棒の本数を求めたいので、正方形の数をnとして、3×n+1と表せます。<item 41>",
      "似たような考えで図を使って考えることもできます。",
      "正方形が3個のとき、<item 7>赤で囲んでいる最初のマッチ棒1本と青で囲んでいる他のコの字型のグループに分けて考えてみましょう。",
      "コの字型は3つあるので、<item 8>マッチ棒の本数は最初の1本と、コの字型×3で表すことが出来ます",
      "コの字型は3本のマッチ棒でできているので、式にすると、<item 9>1+3×3になります。",
      "正方形が 4個のときも<item 15>3個の時と同じように考えるとコの字型は4つあるので、マッチ棒の本数は最初の1本と、コの字型×4で表すことが出来ますね",
      "つまり、式にすると、<item 10>1+3×4になります。",
      "同じ方法で正方形が5個の時も考えると、<item 11>1+3×5になります。",
      "<item 13>3,4,5個のときを振り返ると、正方形の数と式の最後の数が一致していますね。",
      "つまり<item 43>この式は1+3×(正方形の数)と表せそうです。",
      "今回は正方形の数がn個の時を考えているので、正方形がn個の時必要なマッチ棒の本数は1+3×n本<item 14>となります",
      "<skip 67>"
    ],
    73: [
      "(4n-(n-1))ありがとうございます。",
      "(学習者)さんどのように4n-(n-1)という式を立てたか説明してください。<showCanvaswithapi><apiform 14><hint 1>"
    ],
    74: [
      "<closeCanvas><closehint><colseapiform>先ほどのまいさんの説明を参考にもう一度説明してみましょう<hint 4><apiform 15><showCanvaswithapi>",
    ],
    75: [
      "<closeCanvas><colseapiform><closehint>ありがとうございます。4本のマッチ棒を赤で囲んだ部分がn個あり、重なって数えている青で囲んだ部分がn-1個あるので、4n-(n-1)という式になりますね。","<fadeOut_item 5><skip 76>",
    ],
    76: [
      "<skip 30>",
      "",
      "",
      ""
    ],
    77: [
      "ありがとうございます。一緒に考えてみましょう",
      "<item 46>正方形ごとに赤で囲むと、青で囲んでいる部分を余分に数え過ぎてしまうので、赤で囲んだ部分の本数から、青の数を引くと求められそうです",
      "つまり、4本のマッチ棒を赤で囲んだ部分がn個あり、重なって数えている青で囲んだ部分がn-1個あるので、4n-(n-1)という式になりますね。","<fadeOut_item 5><skip 76>",
    ],
    78: [
      "<closeCanvas><colseapiform><closehint>ありがとうございます。正しい図が書けています。一緒に確認すると、4本のマッチ棒を赤で囲んだ部分がn個あり、重なって数えている青で囲んだ部分がn-1個あるので、4n-(n-1)という式になりますね。<fadeOut_item 5><skip 76>",
    ],
    79: [
      "(表)(4+3(n-1))ありがとうございます。",
      "どのように4+3(n-1)という式を立てたか説明してください。<showtable><apiform 16><hint 1>"
    ],
    80: [
      "<closetable><colseapiform><closehint>ありがとうございます。一緒に確認しましょう。",
      "<item 45>このように横に見ると、正方形の数が1つ増えたとき、マッチ棒が3本ずつ増えると見ることができるので、4+3(n-1)となります。",
      "<skip 30>",
    ],
    81: [
      "<closetable><colseapiform><closehint>説明ありがとうございます。",
      "表を用いた分かりやすい説明でした<skip 30>",
      "",
      ""
    ],
    //82つかう
    83: ["(表)どのように1+3nという式を立てたか説明してください。<showtable><apiform 17>"
    ],
    84: [
      "<closetable><colseapiform><closehint>ありがとうございます。一緒に確認しましょう。",
      "<item 39>このように縦に見ると、マッチ棒の本数は正方形の数を3倍して1足した数になっていることがわかるので、1+3nとなります。",
      "<skip 30>",
    ],
    85: [
      "<closetable><colseapiform><closehint>説明ありがとうございます。",
      "表を用いた分かりやすい説明でした<skip 30>",
    ],


    //経由用
    102: [
      "未作成",
      "",
      "",
      ""
    ],
    100: [
      "未作成",
      "",
      "",
      "",
      "これを図で考えると、<item 18>増えているのはこの青で囲んだ部分とみれそうです",
      "正方形がひとつ増えるごと<item 17>にマッチ棒が3本ずつ増えるという規則性を見つけましたね。<item 16>",
      "これを図で考えると、<item 18>増えているのはこの青で囲んだ部分とみれそうです",
      "これを図で考えると、<item 18>増えているのはこの青で囲んだ部分とみれそうです",
      "式の表現を変えてみると、<item 19>このように考えることができそうです。<item 20>正方形が4個の時も同様です。",
      "赤で囲んでいる最初の4本と、青で囲んでいるコの字型をしたグループに分けられそうですね。",
      "…"
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
            case '4':
              input = "<skip 44>";
              split_chars = splitStr(input);
              break;
          }
          main();
          mess_box.click();
          break;
          case 'roottable':
            switch (rootId1) {
              case '1':
                input = "<skip 82>";
                split_chars = splitStr(input);
                break;
              case '2':
                input = "<skip 83>";
                split_chars = splitStr(input);
                break;
             
            }
            main();
            mess_box.click();
            break;
          
        case 'root3':
          rootId = "3";
          break;
        case 'timer':
          $('.timer').addClass('visible');
          console.log('タイマー表示');
          document.getElementById("startButton").click();
          console.log($('.timer'))
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
          // 2秒待ってから addClass を実行
          setTimeout(() => {
            $('.' + targetClass).addClass('visible');
            console.log('フォーム表示: ' + targetClass); // 確認用のログ
          }, 1500); // 1500ms = 2秒
          break;
        case 'showtable':
          $('.fullcanvas-alt').addClass('visible');
          console.log("表表示");
          break;
        case 'closetable':
          $('.fullcanvas-alt').removeClass('visible');
          console.log("表表示");
          break;
        case 'showCanvas':
          $('.saveButton').addClass('visible');    // 作成したクラス名を利用
          buttonId = 'saveButton' + tagget_str[1];
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
          rootIdch = rootId1;
          console.log(`ボタンID ${rootIdch}`);
          break;
        case 'apiform':
          $('.formapi').addClass('visible');
          $('.submit-button').addClass('visible');
          console.log('フォーム表示');
          buttonId = 'saveButton' + tagget_str[1];
          console.log(`ボタンID ${buttonId}`);
          break;
        case 'colseapiform':
          $('.formapi').removeClass('visible');
          $('.submit-button').removeClass('visible');
          console.log('フォーム表示');
          break;
        case 'snsbtn':
          $('.snsbtn').addClass('visible');

          break;
          case 'notesavebutton':
          $('.notesavebutton').addClass('visible');

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
          case 'charav':
            charaId = tagget_str[1];
            console.log(`キャラID ${charaId}`);
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
        //新しい読み上げ関数
        let textDate = text[scene_cnt];
        let textRead = textDate ? textDate[line_cnt] || '' : ''; // undefinedの場合は空文字にする
        textRead = textRead.replace(/<[^>]*>/g, ''); // <...> の形式のテキストを削除
        //関数呼び出し、したのほうにあるよ
        synthesizeSpeech(textRead);



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


  //キャンバス用の関数
  const canvas = document.querySelector('#drawing-area');
  const ctx = canvas.getContext('2d');
  const colorPicker = document.querySelector('#color-picker'); // 色選択用
  const wrapper = document.querySelector('.wrapper');

  const eraserButton = document.getElementById('eraser-button');

  let x;
  let y;
  let mousePressed = false;
  let selectedColor = 'black'; // デフォルトの色を黒に設定

  // 初期状態で画像を表示する
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const chara = new Image();
  chara.src = "./img/item3.png";  // 画像のURLを指定
  chara.onload = () => {
    const scaleWidth = 800;  // 画像の幅を800pxに設定
    const scaleHeight = 800; // 画像の高さを800pxに設定
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

  //表用
  const sketchCanvas = document.querySelector('#sketch-area');
  const sketchCtx = sketchCanvas.getContext('2d');
  const colorSelector = document.querySelector('#color-selector');

  let startX;
  let startY;
  let isDrawing = false;
  let currentColor = 'black';

  sketchCtx.clearRect(0, 0, sketchCanvas.width, sketchCanvas.height);

  document.getElementById('erase-button').addEventListener('click', () => {
    sketchCtx.clearRect(0, 0, sketchCanvas.width, sketchCanvas.height);
    const bgImage = new Image();
    bgImage.src = "./img/item3.png";
    bgImage.onload = () => {
      sketchCtx.drawImage(bgImage, 0, 0, 800, 800);
    };
  });

  colorSelector.addEventListener('change', (e) => {
    currentColor = e.target.value;
    sketchCtx.strokeStyle = currentColor;
  });

  function beginSketch(x, y) {
    isDrawing = true;
    startX = x;
    startY = y;
  }

  function sketch(x, y) {
    if (!isDrawing) return;
    sketchCtx.beginPath();
    sketchCtx.moveTo(startX, startY);
    sketchCtx.lineTo(x, y);
    sketchCtx.lineWidth = 5;
    sketchCtx.stroke();
    startX = x;
    startY = y;
  }

  sketchCanvas.addEventListener('mousedown', (e) => beginSketch(e.offsetX, e.offsetY));
  sketchCanvas.addEventListener('mousemove', (e) => sketch(e.offsetX, e.offsetY));
  window.addEventListener('mouseup', () => isDrawing = false);

  sketchCanvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const rect = sketchCanvas.getBoundingClientRect();
    beginSketch(touch.clientX - rect.left, touch.clientY - rect.top);
  });

  sketchCanvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const rect = sketchCanvas.getBoundingClientRect();
    sketch(touch.clientX - rect.left, touch.clientY - rect.top);
    e.preventDefault();
  });

  window.addEventListener('touchend', () => isDrawing = false);



  // ノート用の関数
  // ノート用の関数
  let currentPage = 1;  // 現在表示しているページ
  function getCurrentCanvas() {
    return document.getElementById(`notedrawing-area-${currentPage}`);
  }
  const note = getCurrentCanvas(); // ここを常に呼び出してcanvasを取得
  const notectx = note.getContext('2d');
  const notecolorPicker = document.querySelector('#notecolor-picker'); // 色選択用
  let isNoteEraserMode = false; // 消しゴムモードフラグ
  const eraserSize = 20; // 消しゴムのサイズ


  // 背景と罫線を描画する関数
  function drawBackground() {
    const note = getCurrentCanvas();
    const notectx = note.getContext('2d');
    const bgColor = "white";
    const lineColor = "#e0e0e0";
    const lineSpacing = 40;

    notectx.fillStyle = bgColor;
    notectx.fillRect(0, 0, note.width, note.height);

    notectx.strokeStyle = lineColor;
    notectx.lineWidth = 1;
    for (let y = 0; y <= note.height; y += lineSpacing) {  // <= に変更
      notectx.beginPath();
      notectx.moveTo(0, y);
      notectx.lineTo(note.width, y);
      notectx.stroke();
    }
  }

  // 初期化時に背景を描画
  drawBackground();

  // クリアボタンの処理
  clearBtn.addEventListener('click', () => {
    const note = getCurrentCanvas();
    const notectx = note.getContext('2d');
    notectx.clearRect(0, 0, note.width, note.height);  // キャンバスをクリア
    drawBackground(); // 背景を再描画
  });

  // 色を選択する
  notecolorPicker.addEventListener('change', (e) => {
    selectedColor = e.target.value;
    const note = getCurrentCanvas();
    const notectx = note.getContext('2d');
    notectx.strokeStyle = selectedColor;
  });

  // 描画状態を保存するためのオブジェクト
  let canvasStates = {
    1: null,
    2: null,
    3: null
  };

  // 背景と描画状態を復元する関数
  function drawBackgroundAndRestore(page) {
    const note = getCurrentCanvas();
    const notectx = note.getContext('2d');
    const bgColor = "white";
    const lineColor = "#e0e0e0";
    const lineSpacing = 40;

    notectx.fillStyle = bgColor;
    notectx.fillRect(0, 0, note.width, note.height);

    notectx.strokeStyle = lineColor;
    notectx.lineWidth = 1;
    for (let y = 0; y <= note.height; y += lineSpacing) {
      notectx.beginPath();
      notectx.moveTo(0, y);
      notectx.lineTo(note.width, y);
      notectx.stroke();
    }

    // 保存されている描画状態を復元
    if (canvasStates[page]) {
      const image = new Image();
      image.src = canvasStates[page];
      image.onload = function () {
        notectx.drawImage(image, 0, 0);
      };
    }
  }

  // 描画を開始する
  function notestartDrawing(xPos, yPos) {
    mousePressed = true;
    const note = getCurrentCanvas();
    x = xPos;
    y = yPos;
  }

  // 線を描画する
  function notedraw(xPos, yPos) {
    if (!mousePressed) return;

    const note = getCurrentCanvas();
    const notectx = note.getContext('2d');
    if (isNoteEraserMode) {
      // 消しゴムモード: 背景を再描画しないように修正
      const eraseX = xPos - eraserSize / 2;
      const eraseY = yPos - eraserSize / 2;
      notectx.clearRect(eraseX, eraseY, eraserSize, eraserSize);
    } else {
      notectx.beginPath();
      notectx.moveTo(x, y);
      notectx.lineTo(xPos, yPos);
      notectx.lineWidth = 3;  // 線の太さを設定
      notectx.stroke();
    }

    x = xPos;
    y = yPos;
  }

  // マウスイベント
  note.addEventListener('mousedown', (e) => {
    notestartDrawing(e.offsetX, e.offsetY);
  });

  note.addEventListener('mousemove', (e) => {
    notedraw(e.offsetX, e.offsetY);
  });

  window.addEventListener('mouseup', () => mousePressed = false);

  // タッチイベント
  note.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const rect = note.getBoundingClientRect();
    notestartDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
  });

  // 消しゴムボタン
  document.getElementById("noteeraser-button").addEventListener("click", () => {
    isNoteEraserMode = !isNoteEraserMode;
  });

  note.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const rect = note.getBoundingClientRect();
    notedraw(touch.clientX - rect.left, touch.clientY - rect.top);
    e.preventDefault();  // スクロールなどのデフォルト動作を無効化
  });

  window.addEventListener('touchend', () => mousePressed = false);
  console.log(`ボタンID ${buttonId}`);
  // 前ページに戻る処理
  // 前のページに戻る処理
  document.getElementById('prevpage-button').addEventListener('click', () => {
    // 現在のページの描画内容を保存
    const note = getCurrentCanvas();
    const notectx = note.getContext('2d');
    canvasStates[currentPage] = note.toDataURL();  // 現在の描画を画像として保存

    // 現在のページを非表示
    document.getElementById(`notedrawing-area-${currentPage}`).style.display = 'none';

    // 前のページに切り替え
    currentPage--;
    if (currentPage < 1) {
      currentPage = 3;
    }

    // 新しいページを表示
    document.getElementById(`notedrawing-area-${currentPage}`).style.display = 'block';

    // 新しいページで背景と描画状態を復元
    drawBackgroundAndRestore(currentPage);

    // 新しいページのキャンバスイベントリスナーを再設定
    const noteCanvas = getCurrentCanvas();
    noteCanvas.addEventListener('mousedown', (e) => notestartDrawing(e.offsetX, e.offsetY));
    noteCanvas.addEventListener('mousemove', (e) => notedraw(e.offsetX, e.offsetY));
    noteCanvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const rect = noteCanvas.getBoundingClientRect();
      notestartDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
    });
    noteCanvas.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      const rect = noteCanvas.getBoundingClientRect();
      notedraw(touch.clientX - rect.left, touch.clientY - rect.top);
      e.preventDefault();  // スクロールなどのデフォルト動作を無効化
    });
  });



  // 次のページに切り替える処理
  document.getElementById('nextpage-button').addEventListener('click', () => {
    // 現在のページの描画内容を保存
    const note = getCurrentCanvas();
    const notectx = note.getContext('2d');
    canvasStates[currentPage] = note.toDataURL();  // 現在の描画を画像として保存

    // 現在のページを非表示
    document.getElementById(`notedrawing-area-${currentPage}`).style.display = 'none';

    // 次のページに切り替え
    currentPage++;
    if (currentPage > 3) {
      currentPage = 1;
    }

    // 新しいページを表示
    document.getElementById(`notedrawing-area-${currentPage}`).style.display = 'block';

    // 新しいページで背景と描画状態を復元
    drawBackgroundAndRestore(currentPage);

    // 新しいページのキャンバスイベントリスナーを再設定
    const noteCanvas = getCurrentCanvas();
    noteCanvas.addEventListener('mousedown', (e) => notestartDrawing(e.offsetX, e.offsetY));
    noteCanvas.addEventListener('mousemove', (e) => notedraw(e.offsetX, e.offsetY));
    noteCanvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const rect = noteCanvas.getBoundingClientRect();
      notestartDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
    });
    noteCanvas.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      const rect = noteCanvas.getBoundingClientRect();
      notedraw(touch.clientX - rect.left, touch.clientY - rect.top);
      e.preventDefault();  // スクロールなどのデフォルト動作を無効化
    });
  });


//ノート保存用
  document.getElementById('notesavebutton').addEventListener('click', () => {
    const canvas1 = document.getElementById('notedrawing-area-1');
    const canvas2 = document.getElementById('notedrawing-area-2');
    const canvas3 = document.getElementById('notedrawing-area-3');
    const combinedCanvas = document.createElement('canvas');
    const combinedCtx = combinedCanvas.getContext('2d');

    combinedCanvas.width = canvas1.width;
    combinedCanvas.height = canvas1.height * 3;

    // 3つのキャンバスを1つに合成
    combinedCtx.drawImage(canvas1, 0, 0);
    combinedCtx.drawImage(canvas2, 0, canvas1.height);
    combinedCtx.drawImage(canvas3, 0, canvas1.height * 2);

    // 画像として保存
    const dataURL = combinedCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'combined_notebook.png';
    link.click();
  });


  // Teachable MachineでエクスポートしたモデルのURL
  const modelURL = "https://teachablemachine.withgoogle.com/models/CAyIdTCPn/";

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
    console.log("画像予測中 ");

    // 1. リサイズ用のオフスクリーンキャンバスを作る
    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = 224;
    resizedCanvas.height = 224;
    const resizedCtx = resizedCanvas.getContext("2d");

    // 2. 224x224 にリサイズして描画
    resizedCtx.drawImage(canvas, 0, 0, 224, 224);

    // 4. そのリサイズ画像をモデルに渡す
    const imageElement = new Image();
    imageElement.src = resizedCanvas.toDataURL();
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
    console.log(`ボタンID ${buttonId}`);
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



  //Q1の解答の分岐
  document.querySelector('#Q1form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    const userAnswer = document.querySelector('#userAnswer1').value; // ユーザーの解答を取得
    $('.formQ1').removeClass('visible');

    if (toHalfWidth(userAnswer).includes('10')) {
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

  //Q2の解答の分岐
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


  //Q3の解答の分岐
  document.querySelector('#Q3form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    // ユーザーの解答と文字を取得
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
      console.log("正しい解答:", split_chars);
    } else {
      input = "<skip 5>";
      split_chars = splitStr(input);
      console.log("間違った解答:", split_chars);
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

  //Q4の解答の分岐
  document.querySelector('#Q4form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    const form4Answer = document.getElementById('userAnswer4').value;
    // form5の解答欄にセット
    document.getElementById('userAnswer5').value = form4Answer;

    const userAnswer = document.querySelector('#userAnswer4').value; // ユーザーの解答を取得
    $('.formQ4').removeClass('visible');

    //解答鬼分岐！！！！
    if (normalize(userAnswer) === '3(n-1)+4' || normalize(userAnswer) === '4+3(n-1)') {
      //さきにまいさんのパターン
      input = "<skip 46>";
      split_chars = splitStr(input);
      console.log(split_chars);
    } else if (normalize(userAnswer) === '3n+4' || normalize(userAnswer) === '4+3n') {
      input = "<skip 35>";
      split_chars = splitStr(input);
      console.log(split_chars);
      rootId = "1";
    } else if (normalize(userAnswer) === '4n-(n-1)' || normalize(userAnswer) === '4n-n+1') {
      //まいさんが3n+1のパターン
      input = "<skip 46>";
      split_chars = splitStr(input);
      console.log(split_chars);
      rootId = "4";
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

  //Q5の解答の分岐
  document.querySelector('#Q5form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    const userAnswer = document.querySelector('#userAnswer5').value; // ユーザーの解答を取得
    $('.formQ5').removeClass('visible');

    if (normalize(userAnswer) === '4+3(n-1)' || normalize(userAnswer) === '3(n-1)+4') {
      console.log(`ボタンID ${rootId1}`);
      if (rootId1 === "2") {
        input = "<skip 79>";
        split_chars = splitStr(input);
        console.log(split_chars);
      } else {
        input = "<skip 22>";
        split_chars = splitStr(input);
        console.log(split_chars);
      }

    } else if (userAnswer === '4+3n') {
      input = "<skip 25>";
      split_chars = splitStr(input);
      console.log(split_chars);
    }
    else if (normalize(userAnswer) === '4n-(n-1)' || normalize(userAnswer) === '4n-n+1') {
      input = "<skip 73>";
      split_chars = splitStr(input);
      console.log(split_chars);
    }
    main();
    mess_box.click();
    document.querySelector('#userAnswer').value = '';
  });
  //Q6の解答の分岐
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

  //Q7の解答の分岐
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

  //Q8の解答の分岐
  document.querySelector('#Q8form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    const userAnswer = document.querySelector('#userAnswer8').value; // ユーザーの解答を取得
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

  //Q9の解答の分岐
  document.querySelector('#Q9form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    // 解答を取得する前にDOMが更新されているか確認
    const userAnswer1 = document.querySelector('#userAnswer91').value.trim(); // 解答1を取得 (trimで余分なスペースを削除)
    const userAnswer2 = document.querySelector('#userAnswer92').value.trim(); // 解答2を取得

    // ここで各解答を処理
    console.log('解答1:', userAnswer1);
    console.log('解答2:', userAnswer2);

    // 例えば、解答に応じて分岐処理を行う
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

  //Q10の解答の分岐
  document.querySelector('#Q10form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ
    rootId = "3";

    const userAnswer = document.querySelector('#userAnswer10').value; // ユーザーの解答を取得
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

  //Q11の解答の分岐
  document.getElementById('QTableSubmitButton').addEventListener('click', (e) => {
    e.preventDefault();

    // 正しい答え
    const correctAnswers = [4, 7, 10, 13, 16];

    // 入力値を取得
    const userAnswers = [
      document.getElementById('userAnswerSq1').value,
      document.getElementById('userAnswerSq2').value,
      document.getElementById('userAnswerSq3').value,
      document.getElementById('userAnswerSq4').value,
      document.getElementById('userAnswerSq5').value
    ];

    let allCorrect = true; // 全て正しいかどうかのフラグ

    // 入力をチェック
    for (let i = 0; i < userAnswers.length; i++) {
      const inputElement = document.getElementById(`userAnswerSq${i + 1}`);

      // 全角数字を半角に変換
      const userAnswer = parseInt(toHalfWidth(userAnswers[i]), 10);
      const correctAnswer = correctAnswers[i];

      if (userAnswer !== correctAnswer) {
        // 間違っていたら背景色を変更
        inputElement.style.backgroundColor = 'lightcoral'; // 間違っている場合は赤っぽい色
        allCorrect = false; // 全て正しいわけではない
      } else {
        // 正しい場合は背景色を元に戻す
        inputElement.style.backgroundColor = '';
      }
    }

    // 全て正しい場合のみ後続の処理を実行
    if (allCorrect) {
      $('.formQ11').removeClass('visible');
      console.log("すべて一致");
      input = "<skip 68>";
      split_chars = splitStr(input);
      console.log(split_chars);
      main();
      mess_box.click();
    }
  });

  // Q11.表のやつフォーム送信ボタンの動作
  // 全角数字を半角に変換する関数
  function toHalfWidth(str) {
    return str.replace(/[０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
  }

  //Q12の解答の分岐
  document.querySelector('#Q12form').addEventListener('submit', function (event) {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ
    rootId = "3";

    const userAnswer = document.querySelector('#userAnswer12').value; // ユーザーの解答を取得
    $('.formQ12').removeClass('visible');
    input = "<skip 71>";
    split_chars = splitStr(input);
    console.log(split_chars);
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
      console.log(`ボタンID ${buttonId}`);

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
    } else if (buttonId === 'saveButton7') {
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
    } else if (buttonId === 'saveButton12') {
      if (textResponse.includes("横に見る")) {
        input = "<skip 69>";
        split_chars = splitStr(input);
      } else if (textResponse.includes("縦に見る")) {
        input = "<skip 72>";
        split_chars = splitStr(input);
      } else {
        //なんもわからん！ってときに62いきましょう
        input = "<skip 62>";
        split_chars = splitStr(input);
      }
    } else if (buttonId === 'saveButton13') {
      if (textResponse.includes("不正解")) {
        input = "<skip 71>";
        split_chars = splitStr(input);
        rootId = "3";

      } else if (textResponse.includes("正解")) {
        input = "<skip 70>";
        split_chars = splitStr(input);
        rootId = "3";

      } else {
        console.log("ボタン2: レスポンスに「正解」も「不正解」も含まれていません");
      }
    } else if (buttonId === 'saveButton14') {
      if (textResponse.includes("不正解")) {
        switch (highestPrediction.className) {
          case "4n-(n-1)":
            console.log("図〇、説明×");
            input = "<skip 78>";
            split_chars = splitStr(input);
            break;
          default:
            console.log("図も説明も不正解");
            input = "<skip 74>";
            split_chars = splitStr(input);
            break;
        };
      } else if (textResponse.includes("正解")) {
        switch (highestPrediction.className) {
          case "4n-(n-1)":
            console.log("図も説明も正解");
            input = "<skip 75>";
            split_chars = splitStr(input);
            break;
          default:
            console.log("説明〇図×");
            input = "<skip 74>";
            split_chars = splitStr(input);
            break;
        };
      } else {
        console.log("ボタン1: レスポンスに「正解」も「不正解」も含まれていません");
      }
    } else if (buttonId === 'saveButton15') {
      if (textResponse.includes("不正解")) {
        switch (highestPrediction.className) {
          case "4n-(n-1)":
            console.log("図〇、説明×");
            input = "<skip 77>";
            split_chars = splitStr(input);
            break;
          default:
            console.log("図も説明も不正解");
            input = "<skip 77>";
            split_chars = splitStr(input);
            break;
        };
      } else if (textResponse.includes("正解")) {
        switch (highestPrediction.className) {
          case "4n-(n-1)":
            console.log("図も説明も正解");
            input = "<skip 76>";
            split_chars = splitStr(input);
            break;
          default:
            console.log("説明〇図×");
            input = "<skip 77>";
            split_chars = splitStr(input);
            break;
        };
      } else {
        console.log("ボタン1: レスポンスに「正解」も「不正解」も含まれていません");
      }
    } else if (buttonId === 'saveButton16') {
      if (textResponse.includes("不正解")) {

        input = "<skip 80>";
        split_chars = splitStr(input);
      } else if (textResponse.includes("正解")) {

        input = "<skip 81>";
        split_chars = splitStr(input);

      } else {
        console.log("ボタン1: レスポンスに「正解」も「不正解」も含まれていません");
      }
    } else if (buttonId === 'saveButton16') {
      if (textResponse.includes("不正解")) {

        input = "<skip 84>";
        split_chars = splitStr(input);
      } else if (textResponse.includes("正解")) {

        input = "<skip 85>";
        split_chars = splitStr(input);

      } else {
        console.log("ボタン1: レスポンスに「正解」も「不正解」も含まれていません");
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


  //「みんなの問題掲示板」に移動するボタン
  document.getElementById('redirectButton').addEventListener('click', function () {
    window.location.href = 'https://questsite.vercel.app/'; // 遷移したいURLに変更
  });


 // chat用
const chatInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatOutput = document.getElementById("chatWindow");

sendButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const userMessage = chatInput.value;
  chatOutput.innerHTML += `<div class="message student"><strong>あなた：</strong> ${userMessage}</div>`;
  chatInput.value = "";

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) throw new Error("サーバーエラー");

    const data = await response.json();
    chatOutput.innerHTML += `<div class="message assistant"><strong>まいさん：</strong> ${data.response}</div>`;

    // 音声合成で返答を読み上げる
    await synthesizeSpeech(data.response); // 音声合成を呼び出す
  } catch (error) {
    chatOutput.innerHTML += `<div class="message error"><strong>エラー：</strong> ${error.message}</div>`;
  }
});

// 音声合成用の関数
async function synthesizeSpeech(text) {
  const ENABLE_API = true; // APIを有効にする場合はtrue

  if (!ENABLE_API) {
    return;
  }

  try {
    const response = await fetch('/api/textspeech', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = await audioContext.decodeAudioData(audioBuffer);

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
  } catch (error) {
    console.error("音声合成エラー:", error);
  }
}

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




  // 音声合成用の Web Audio API を使った関数
  async function synthesizeSpeech(text) {


    // フラグでリクエストの有効・無効を制御
    const ENABLE_API = true; // APIを無効化する場合は false、有効化する場合は true に変更
    if (!ENABLE_API) {
      return;
    }

    console.log("Input text: ", text);

    // Web Audio API の AudioContext を作成
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    try {
      const response = await fetch('/api/textspeech', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, charaId  }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const audioBuffer = await response.arrayBuffer();
      const buffer = await audioContext.decodeAudioData(audioBuffer);

      // 音声を再生
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start();

    } catch (error) {
      console.error(error);
    }
  }


  //タイマー用
  let timeLeft = 10; // 4分（240秒）
  let timer;
  const timerDisplay = document.getElementById('timer');
  const startButton = document.getElementById('startButton');
  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `残り時間: ${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft > 0) {
      timeLeft--;
    } else {
      clearInterval(timer);
      timerDisplay.textContent = "時間終了！";

      $('.timer').removeClass('visible');
      console.log('タイマー終了');
      messbox.style.pointerEvents = 'auto'; // タイマー終了後にクリックできるようにする
      mess_box.click(); // messboxクリッ
    }
  }

  function startTimer() {
    if (!timer) { // 二重に開始しないようにする
      messbox.style.pointerEvents = 'none'; // タイマー中はクリックできないようにする
      timer = setInterval(updateTimer, 1000);
      updateTimer(); // すぐに1回目を表示
    }
  }

  startButton.addEventListener('click', startTimer);

  const optionButtons = document.querySelectorAll(".option-buttons button");

  optionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 他のボタンの active クラスを外す
      optionButtons.forEach((btn) => btn.classList.remove("active"));

      // クリックされたボタンに active クラスを追加
      this.classList.add("active");
      if (this.id === "explain-table") {
        console.log("表で説明するボタンが押された");
        rootId1 = "2";
        console.log(`ボタンID ${rootId1}`);
      } else if (this.id === "explain-image") {
        console.log("図で説明するボタンが押された");
        rootId1 = "1";
        console.log(`ボタンID ${rootId1}`);
      }
    });
  });

  const button = document.getElementById("toggleButton");
  const imageContainer = document.getElementById("imageContainer");

  button.addEventListener("click", () => {
    imageContainer.classList.toggle("show"); // クラスを切り替えてスライド
  });


})

