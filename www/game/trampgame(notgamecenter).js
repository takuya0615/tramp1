// This is a JavaScript file


//idにphaseを含む5つの要素はそれぞれの場面。これをdisplay: none or blockで切り替えて、ゲームを動かす
//btnは各phase内での表示切替をするときにclass="btn invisible"で、display:noneにする。
//phaseを移る場合、invisible等のclass名を元に戻しつつ（最初からinvisibleが付いているのもある）、今いるphaseのinvisible, 行き先のphaseの脱invisibleを行う。

//セーブデータの取得



var sls = localStorage.getItem('sls'),
    sll = localStorage.getItem('sll'),
    sts = localStorage.getItem('sts'),
    stl = localStorage.getItem('stl');

//全体のphase変数と取得
var phasemenu,
      phasegame1,
      phasegame2,
      phasegameover,
      phaseclear,
      phaseoption;

phasemenu = document.getElementById('phasemenu');
phasegame1 = document.getElementById('phasegame1');
phasegame2 = document.getElementById('phasegame2');
phasegameover = document.getElementById('phasegameover');
phaseclear = document.getElementById('phaseclear');
phaseoption = document.getElementById('phaseoption');



/*ボタンアクション(全てのボタンにbtnpushedをするだけのonmousedownイベントを付加する)
その後用意してあるそれぞれのmouseupイベントでpushedを消す
※できてない*/
function btnpushed () { // btnpushed.apply(this);で呼び出す。（btnpushed内のthisに呼び出した関数を適用するため。）
      this.className = "btn pushed";
    };


function btnpull() {    // btnpull.apply(this);で呼び出す。（btnpull内のthisに呼び出し元の関数を適用するため。）
    if  (this.className !== "btn invisible pushed") {
    this.className = "btn";
    } else {
    this.className = "btn invisible";
    };
  }





//phasemenu
    var game,
          challenge,
          timelimit,
          rtn1,
          option,
          modetime,     //ゲーム中の関数（時間制かライフ制か）を動かすか動かさないかの真偽値として使う
          modelife,
          challengestage,
          star1, //全てクリアすると項目に出てくる星
          star2;

    var ch_st1,
        ch_st5,
        ch_st10,
        ch_st15,
        ch_st20,
        ch_st25,
        ti_st1,
        ti_st5,
        ti_st10,
        ti_st15,
        ti_st20,
        ti_st25;

    game = document.getElementById('game');
    challenge = document.getElementById('challenge');
    timelimit = document.getElementById('timelimit');
    rtn1 = document.getElementById('rtn1');
    option = document.getElementById('option');
    challengestage = document.getElementById('challengestage');
    star1 = document.getElementById('star1');
    star2 = document.getElementById('star2');




    ch_st1 = document.getElementById('ch_st1');
    ch_st5 = document.getElementById('ch_st5');
    ch_st10 = document.getElementById('ch_st10');
    ch_st15 = document.getElementById('ch_st15');
    ch_st20 = document.getElementById('ch_st20');
    ch_st25 = document.getElementById('ch_st25');


    ti_st1 = document.getElementById('ti_st1');
    ti_st5 = document.getElementById('ti_st5');
    ti_st10 = document.getElementById('ti_st10');
    ti_st15 = document.getElementById('ti_st15');
    ti_st20 = document.getElementById('ti_st20');
    ti_st25 = document.getElementById('ti_st25');






    game.addEventListener('mouseup', function() {
        challenge.className ="btn";
        timelimit.className = "btn";
        btnpull.apply(this);
        rtn1.className = "btn";
        game.className = "btn invisible";

        if (sll > 24) {
            star1.className = "star";
        };
        if (stl > 24) {
            star2.className = "star";
        };


    });

    game.addEventListener('mousedown', function() {
        btnpushed.apply(this);
    });


    challenge.addEventListener('mouseup', function() {
        challengestage.className = "";
        btnpull.apply(this);

        ch_st1.addEventListener('mouseup', function() {
              challengemode();
              initlevel = 2;
          });


        if (sll > 6) {
          ch_st5.className = "stagebtn";
          ch_st5.addEventListener('mouseup', function() {
                challengemode();
                initphasemenu();
                initlevel = 6;
            });
        };

      });

    challenge.addEventListener('mousedown', function() {
              btnpushed.apply(this);
      });


    timelimit.addEventListener('mouseup', function() {
        timelimitstage.className = "";
        btnpull.apply(this);

        ti_st1.addEventListener('mouseup', function() {
              timelimitmode();
              initlevel = 26;
          });


        if (stl > 6) {
          ti_st5.className = "stagebtn";
          ti_st5.addEventListener('mouseup', function() {
                timelimitmode();
                initphasemenu();
                initlevel = 6;
            });
        };

      });


    timelimit.addEventListener('mousedown', function() {
            btnpushed.apply(this);
    });



    /*※sllにちなんでそれぞれのステージスタートボタン作成してそれぞれにchallengemode();とlevelの値を置き換えてスタートするような仕組みを作る。
    現存のchallengebtnはchallengestageのclassName="invisible"をはずすボタンにする
    */

    //phasemenuの初期化
    function initphasemenu() {
      challenge.className ="btn invisible";
      challengestage.className = "invisible";
      timelimitstage.className = "invisible";
      timelimit.className = "btn invisible";
      rtn1.className = "btn invisible";
      game.className = "btn";
    }


    function challengemode() {
      initphasemenu();

        modelife = true;
        modetime = false;

        //phasegame1の有効化と、phasemenuの無効化
        phasegame1.className ="";
        phasemenu.className ="invisible";
    };

    function timelimitmode() {
      initphasemenu();

        modelife = false;
        modetime = true;

        //phasegame1の有効化と、phasemenuの無効化
        phasegame1.className ="";
        phasemenu.className ="invisible";
    };






    rtn1.addEventListener('mouseup', function() {
        btnpull.apply(this);
        initphasemenu();
    });

    rtn1.addEventListener('mousedown', function() {
        btnpushed.apply(this);
    });

    option.addEventListener('mouseup', function() {
        btnpull.apply(this);
        initphasemenu();

        phasemenu.className = "invisible";
        phaseoption.className = "";
    });

    option.addEventListener('mousedown', function() {
        btnpushed.apply(this);
    });

//phasegame1

    var rtn2,
          start,
          mask1;

    rtn2 = document.getElementById('rtn2');
    start = document.getElementById('start');
    mask1 = document.getElementById('mask1');

    rtn2.addEventListener('mouseup', function() {
        phasegame1.className = "invisible";
        phasemenu.className = "";
        timeflg = false;
    });

    rtn2.addEventListener('mousedown', function() {
    });

    start.addEventListener('mouseup', function() {

        btnpull.apply(this);
        phasegame1.className = "invisible";
        phasegame2.className = "";
        tramp();
    });

    start.addEventListener('mousedown', function() {
        btnpushed.apply(this);
    });



//phasegame2
    //modetimeではupdateTimertext()と時間をポイントにする処理を行う。lifeの処理は、死亡判定だけしないようにして、表示を隠す。
    //modelifeでは、ライフの表示とライフ0時の死亡判定を行う。updateTimertextと時間をポイントにする処理は行わない。


    var rtn3,
          scoreText,
          scorepoint,
          timertext,
          lifetext,
          limitTime,
          tt,
          time,
          life, //ライフの初期設定
          stage,
          timeflg, //時間切れ判定をするかどうか。したら、falseにする。
          stagenumber, //何ステージ目か表す。基本的にlevel - 1で、initの際にlevelから数値を持ってくる
          stagetext,
          audio = new Audio("pointsound.wav");

          rtn3 = document.getElementById('rtn3');

          rtn3.addEventListener('mouseup', function() {
              phasegame2.className = "invisible";
              phasemenu.className = "";
              timeflg = false;
          });

          rtn3.addEventListener('mousedown', function() {
          });

         //難易度に影響する初期値
            var initlife = 5,
                  inittime = 10,
                  plustime = 5,
                  initlevel,
                  pluslife; //tramp内（levelがtramp内の関数のため）


        function tramp() {




            var cards = [],
                  level = initlevel,      //カードを何組にするか
                  flipCount = 0,
                  correctCount = 0,
                  firstCard = null,
                  secondCard = null,
                  scorepoint = 0,
                  lifenumber = initlife;            //ライフの数

          pluslife = level; //levelに値(=initlevel)が代入されてから。変数定義は上にくるが、代入は記載された行で行われるため。

            stage = document.getElementById('stage');
            lifetext = document.getElementById('lifetext');
            timertext = document.getElementById('timertext');
            life = document.getElementById('life');
            time = document.getElementById('time');
            scoreText = document.getElementById('scoretext');
            stagetext = document.getElementById('stagetext');





         //ライフとタイムの表示を選んだモードに従わせる。
            if (modelife) {
            lifetext.className = "";
            timertext.className = "invisible";
            };
            if (modetime) {
            lifetext.className = "invisible";
            timertext.className = "";


            };


            init();

            function init() {       //あるステージを最初からやる際に作動。
                startTime = Date.now();         //これにvarをつけると、timeが何故か時間が動かない
                correctCount = 0;
                lifetext.innerHTML = "Life:" + lifenumber;
                scoreText.innerHTML = "Score:" + scorepoint;
                stagenumber = level - 1;
                stagetext.innerHTML = "Stage:" + stagenumber;


                if (modetime) {
                timeflg = true;

                limitTime = 0 + level * plustime;
              };

                while (stage.firstChild) stage.removeChild(stage.firstChild);

                var r;
                for (var i = 1; i <= level; i++) {      //同じ数字二枚で一セットなので、同じiで二枚作成する
                    if (i > 13) {   //13枚より多くなった場合、また1, 2..と順に配る。iを小さくするとforが終わらなくなるため、代わりのrを用意。
                      r = i - 13;
                    } else {
                      r = i;
                    }
                    cards[cards.length] = createCard1(r);
                    cards[cards.length] = createCard2(r);
                }

                while (cards.length) {      //forとcreateCardで作成したcardsの要素をstageにランダムな順序で配置していく
                    var pos = Math.floor(Math.random() * cards.length);
                   stage.appendChild(cards.splice(pos, 1)[0]);
                }
            }

            function createCard1(num) {
                var inner,
                    card,
                    container,
                    whichcard;

                whichcard = Math.random();
                if (whichcard < 0.5) {
                    inner = '<div class="card-back" style="background-image : url(img/ura.gif)">?</div><div class="card-front" style="background-image : url(img/spade/*.png)">*</div>';
                } else {
                    inner = '<div class="card-back" style="background-image : url(img/ura.gif)">?</div><div class="card-front" style="background-image : url(img/kurabu/*.png)">*</div>';
                };

                card = document.createElement('div');
                card.className = 'card';　//card.innerHTML = inner.replace('*', num);
                inner = inner.replace('*', num);    //inner中の*をnum(現在の数字（i）)に置き換える
                card.innerHTML = inner.replace('*', num);

                card.addEventListener('mousedown', function() {
                    flipCard(this);
                });

                container = document.createElement('div');
                container.className = 'card-container';
                container.appendChild(card);

                return container;
            }

            function createCard2(num) {
                var inner,
                    card,
                    container,
                    whichcard;

                whichcard = Math.random();
                if (whichcard < 0.5) {
                    inner = '<div class="card-back" style="background-image : url(img/ura.gif)">?</div><div class="card-front" style="background-image : url(img/heart/*.png)">*</div>';
                } else {
                    inner = '<div class="card-back" style="background-image : url(img/ura.gif)">?</div><div class="card-front" style="background-image : url(img/dia/*.png)">*</div>';
                };
                card = document.createElement('div');
                card.className = 'card';　//card.innerHTML = inner.replace('*', num);
                inner = inner.replace('*', num);    //inner中の*をnum(現在の数字（i）)に置き換える
                card.innerHTML = inner.replace('*', num);

                card.addEventListener('mousedown', function() {
                    flipCard(this);
                });

                container = document.createElement('div');
                container.className = 'card-container';
                container.appendChild(card);

                return container;
            }




            function flipCard(card) {
                if (firstCard !== null && secondCard !== null) {
                    return;
                }
                if (card.className.indexOf('open') === -1) { //クリックしたカードに.openがついているかどうか
                    card.className = 'card open';
                } else {
                    return;
                }

                flipCount++;
                if (flipCount % 2 === 1) {  //1枚目の場合、firstCardに値を入れる
                    firstCard = card;
                } else {                    //二枚目の処理
                    secondCard = card;
                    setTimeout(function() {
                        judge();
                    }, 900);
                }

            }
            function judge() {
                if (firstCard.children[1].textContent === secondCard.children[1].textContent) { //[1]とは数字の書いてある面のカードのこと（[2]は裏側。）[1]同士のtextcontentがあっている場合（＝同じ数字をめくった場合)
                    correctCount++;
                    scorepoint = scorepoint + 10; //一セット正解で10点加算
                    scoreText.innerHTML = "Score:" + scorepoint;
                    audio.play();

                    if (correctCount === level) {   //クリア処理
                      if (level === 26){  //stage25でおしまい。gameover画面にCongraturationの文字を出す
                        phasegameover.className = "";
                        phasegame2.className = "invisible";
                        congraturation.className = "";
                        level++;
                        gameover();

                      } else {
                        phaseclear.className = "";
                        phasegame2.className = "invisible";
                      };
                            if (tt > 0 && modetime) {
                                var timepoint = parseInt((tt * 10).toFixed(0)); //toFixedは文字列で返しているため、parseIntで数字にする
                                scorepoint = scorepoint + timepoint; //余った制限時間分だけスコア加算
                                scoreText.innerText = "Score:" + scorepoint;
                                timeflg = false;
                        }
                    }
                } else {    //間違えていた場合は裏返しにしてカードの状態をもとに戻す（＝.openを消す)　ライフモードではライフを一つ減らす
                    firstCard.className = 'card';
                    secondCard.className = 'card';
                    lifenumber--;
                    lifetext.innerHTML = "Life:" + lifenumber;
                    if (lifenumber <= -1 && modelife) {//lifemode時、life0時の処理
                    gameover();
                    retry.className = "invisible";

                    };
                }
                firstCard = null;
                secondCard = null;
            }




            if (modetime) {
            updateTimerText();
            };
            function updateTimerText() {        //時間切れ判定はこちらに含むが、残り時間をポイントにする処理はjudge()にある
                    var timerId = setTimeout(function() {
                        var t = Date.now() - startTime;     //現在の時間と、スタートした時間の差（ミリ秒）
                        //timerText.innerHTML = ((t / 1000) - 1).toFixed(2);    秒に直し、小数点以下2桁までの数値にして表示。- 1はカードが現れるまでの時間(CSSファイル、.cardのanimationで設定)
                        tt = ((limitTime * 1000 - t) / 1000).toFixed(2);    //リミット時間を減らしていく。極力toFixedしてから計算処理はしない（時々桁が増えてしまう）
                        timertext.innerHTML = "Time:" + tt;

                         if (tt < 0.01 && correctCount !== level && timeflg) {   //時間切れの際の処理。correctCount..がないとクリアしていても、時間切れが効いてしまう。timeflgがないと、ゲームが終わっても時間切れ判定を何回でも行ってしまい、phasegame2とphasegameoverの切り替えがうまく行かなくなる
                                gameover();
                         };     //このセミコロンがないとなぜかcorrectCountの判別が効かない

                        updateTimerText();
                    }, 10);
                }


//phaseclear    ※tramp()内。levelがtramp()内のローカル変数のため。
            var nextstage,
                rtn5;

            nextstage = document.getElementById('nextstage');
            rtn5 = document.getElementById('rtn5');


            nextstage.addEventListener('mouseup', function() {
                btnpull.apply(this);
                phaseclear.className = "invisible";
                phasegame2.className = "";
                lifenumber = lifenumber + pluslife;

                //枚数を増やして、再ゲームする処理
                level++;
                init();
            });

            nextstage.addEventListener('mousedown', function() {
                btnpushed.apply(this);
            });

            rtn5.addEventListener('mouseup', function() {
                phaseclear.className = "invisible";
                phasemenu.className = "";
                timeflg = false;
            });

//phasegameover    ※tramp()内。levelがtramp()内のローカル変数のため。
            var retry,
                  fromstart,
                  topmenu,
                  thistimescore,
                  thistimelevel,
                  rtn4;


             retry = document.getElementById('retry');
             fromstart = document.getElementById('fromstart');
             topmenu = document.getElementById('topmenu');
             thistimelevel = document.getElementById('thistimelevel');
             thistimescore = document.getElementById('thistimescore');
                  rtn4 = document.getElementById('rtn4');

            function gameover() {
                phasegame2.className = "invisible";
                phasegameover.className = "";
                timeflg = false;

                if (modelife && scorepoint > sls) {
                    localStorage.setItem('sls', scorepoint);
                    sls = scorepoint;
                };

                if (modelife && level > sll) {
                    sll = level - 2;
                    localStorage.setItem('sll', sll);

                };

                if (modetime && scorepoint > sts){
                    localStorage.setItem('sts', scorepoint);
                    sts = scorepoint;
                };

                if (modetime && level > stl) {
                    stl = level - 2;
                    localStorage.setItem('stl', stl);
                };

                thistimelevel.innerHTML = "ClearStage:" + (stagenumber - 1);
                thistimescore.innerHTML = "Score:" + scorepoint;

            }

            rtn4.addEventListener('mouseup', function() {
                phasegameover.className = "invisible";
                phasemenu.className = "";
                congraturation.className = "invisible";
                timeflg = false;
            });

            rtn4.addEventListener('mousedown', function() {
            });

             retry.addEventListener('mouseup', function() { //retry時の処理
               btnpull.apply(this);

               phasegameover.className = "invisible";
               phasegame2.className = "";
               scorepoint = scorepoint - correctCount * 10;  //このステージ分のスコアをリセットする
               scoreText.innerHTML = "Score:" + scorepoint;
               congraturation.className = "invisible";

               init();
             });

            retry.addEventListener('mousedown', function() {
                btnpushed.apply(this);
            });


            fromstart.addEventListener('mouseup', function() {
                btnpull.apply(this);

                phasegameover.className = "invisible";
                phasegame2.className = "";
                congraturation.className = "invisible";

               //initでリセットされない数値（scoreとレベル）をリセットして初期状態に戻す
                level = 2;
                scorepoint = 0;        //
                scoreText.innerText = "Score" + scorepoint;
                lifenumber = initlife;
                retry.className = "btn";
                init();
             });

            fromstart.addEventListener('mousedown', function() {
                btnpushed.apply(this);
            });



            topmenu.addEventListener('mouseup', function() {
                btnpull.apply(this);
                congraturation.className = "invisible";

                phasegameover.className = "invisible";
                phasemenu.className = "";
            });

            topmenu.addEventListener('mousedown', function() {
                btnpushed.apply(this);
            });


    };

//phaseoption もちろんtramp()外
            var rtn6,
                scr,
                deletelifegame,
                deletetimegame,
                deleteall,
                close1,
                deletetable,
                showdelete,
                scrtable,
                timelevel,
                timescore,
                lifelevel,
                lifescore;

             rtn6 = document.getElementById('rtn6');
             deletelifegame = document.getElementById('deletelifegame');
             deletetimegame = document.getElementById('deletetimegame');
             deleteall = document.getElementById('deleteall');
             close1 = document.getElementById('close1');
             deletetable = document.getElementById('deletetable');
             showdelete = document.getElementById('showdelete');
             scrtable = document.getElementById('scrtable');
             lifelevel = document.getElementById('lifelevel');
             lifescore = document.getElementById('lifescore');
             timelevel = document.getElementById('timelevel');
             timescore = document.getElementById('timescore');




             scr = document.getElementById('scr');




             rtn6.addEventListener('mouseup', function() { //retry時の処理
            　btnpull.apply(this);
               phaseoption.className = "invisible";
               phasemenu.className = "";
               deletetable.className = "invisible";
               scrtable.className = "invisible";
             });

              rtn6.addEventListener('mousedown', function() {
                btnpushed.apply(this);
              });






            　showdelete.addEventListener('mouseup', function() {
            　   btnpull.apply(this);
                 showdelete.disabled = "true";
                 deletetable.className = "";
                });

              close1.addEventListener('mouseup', function() {
                 showdelete.disabled = "false";
                 deletetable.className = "invisible";




             });


        //記録の表示
            scr.addEventListener('mouseup', function() {
            　 btnpull.apply(this);
            　 scrtable.className = "";
            　 timelevel.innerHTML = "Level:" + stl;
            　 timescore.innerHTML = "Score:" + sts;
            　 lifelevel.innerHTML = "Level:" + sll;
            　 lifescore.innerHTML = "Score:" + sls;
             });



        //記録の削除
             deletelifegame.addEventListener('mouseup', function() { //retry時の処理
                if (confirm("Challengeの記録を削除してもいいですか？")) {
                localStorage.removeItem('sls');
                localStorage.removeItem('sll');
                sls = null;
                sll = null;
              };
             });

             deletetimegame.addEventListener('mouseup', function() { //retry時の処理
                if (confirm("Challengeの記録を削除してもいいですか？")) {
                localStorage.removeItem('sts');
                localStorage.removeItem('stl');
                sts = null;
                stl = null;
              };
             });

            deleteall.addEventListener('mouseup', function() { //retry時の処理
                if (confirm("Challengeの記録を削除してもいいですか？")) {
                localStorage.removeItem('sts');
                localStorage.removeItem('stl');
                sts = null;
                stl = null;
                localStorage.removeItem('sls');
                localStorage.removeItem('sll');
                sls = null;
                sll = null;

              };
             });
