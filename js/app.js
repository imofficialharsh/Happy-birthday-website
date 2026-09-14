/**
 * Main Application Controller (Appy Don VIP Birthday Extravaganza)
 * Complete 5-Scene Progression with Endless Looping Guitar Video & Low-Volume Justin Bieber MP3.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Music Controls
  const btnMusicToggle = document.getElementById('btn-music-toggle');
  const bieberMusicPill = document.getElementById('bieber-music-pill');
  const vinylDisc = document.getElementById('vinyl-disc');
  const btnSoundToggle = document.getElementById('btn-sound-toggle');
  const localBieberAudio = document.getElementById('local-bieber-audio');
  const guitarVideo = document.getElementById('guitar-video');

  // Scenes (5-Scene Streamlined Progression)
  const scene1 = document.getElementById('scene-1');
  const scene2 = document.getElementById('scene-2');
  const scene3 = document.getElementById('scene-3');
  const scene4 = document.getElementById('scene-4');
  const scene5 = document.getElementById('scene-5');

  // Scene 1 Elements
  const btnScene1Next = document.getElementById('btn-scene-1-next');

  // Scene 2 Elements (VIP Concert)
  const btnConcertBoost = document.getElementById('btn-concert-boost');
  const vibeStatusLabel = document.getElementById('vibe-status-label');
  const vibeBarFill = document.getElementById('vibe-bar-fill');
  const btnScene2Next = document.getElementById('btn-scene-2-next');

  // Scene 3 Elements (Cake with Dancing Cats & Cheeky Wish Tease)
  const candleHeaderText = document.getElementById('candle-header-text');
  const countdownDisplay = document.getElementById('countdown-display');
  const actionPrompt = document.getElementById('action-prompt');
  const actionPromptText = document.getElementById('action-prompt-text');
  const cakeWrapper = document.getElementById('cake-wrapper');
  const candleFlame = document.getElementById('candle-flame');
  const smokePuff = document.getElementById('smoke-puff');
  const sliceGuide = document.getElementById('slice-guide');
  const cheekyWishBubble = document.getElementById('cheeky-wish-bubble');
  const cakeSliceDisplay = document.getElementById('cake-slice-display');
  const btnScene3Next = document.getElementById('btn-scene-3-next');

  // Scene 4 Elements (Party Games: Quiz + Scratch Card)
  const partyQuizContainer = document.getElementById('party-quiz-container');
  const quizCounter = document.getElementById('quiz-counter');
  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizOptionsGrid = document.getElementById('quiz-options-grid');
  const quizReactionBubble = document.getElementById('quiz-reaction-bubble');
  const reactionEmoji = document.getElementById('reaction-emoji');
  const reactionText = document.getElementById('reaction-text');
  const btnQuizNext = document.getElementById('btn-quiz-next');
  const blushMeterBox = document.getElementById('blush-meter-box');
  const blushEmojiFace = document.getElementById('blush-emoji-face');
  const blushFeedbackTag = document.getElementById('blush-feedback-tag');
  const blushSlider = document.getElementById('blush-slider');
  const btnBlushConfirm = document.getElementById('btn-blush-confirm');

  const partyScratchContainer = document.getElementById('party-scratch-container');
  const scratchCanvas = document.getElementById('scratch-canvas');
  const scratchRevealedMsg = document.getElementById('scratch-revealed-msg');
  const btnScene4Next = document.getElementById('btn-scene-4-next');

  // Scene 5 Elements (The Anonymous Mystery Finale)
  const decryptPromptCard = document.getElementById('decrypt-prompt-card');
  const btnStartDecrypt = document.getElementById('btn-start-decrypt');
  const btnSkipDecrypt = document.getElementById('btn-skip-decrypt');
  const teaserBox = document.getElementById('teaser-box');
  const decryptProgress = document.getElementById('decrypt-progress');
  const progressStatus = document.getElementById('progress-status');
  const error404Banner = document.getElementById('error-404-banner');
  const grandReveal = document.getElementById('grand-reveal');
  const accessDeniedContent = document.getElementById('access-denied-content');
  const btnRevealBack = document.getElementById('btn-reveal-back');
  const btnReplay = document.getElementById('btn-replay');
  const btnCelebrateMore = document.getElementById('btn-celebrate-more');

  // State
  let currentScene = 1;
  let countdownTimer = null;
  let countdownValue = 7;
  let isCandleBlown = false;
  let isCakeSliced = false;
  let isBieberPlaying = false;
  let isScratchCompleted = false;
  let concertTimer = null;
  let concertSeconds = 10;

  // ==========================================
  // LOCAL MUSIC CONTROLLER (Justin Bieber - Eye Candy)
  // Low volume (30%), continuous looping across all scenes
  // ==========================================
  const MUSIC_VOLUME = 0.30; // Kept low and pleasant per user request

  if (localBieberAudio) {
    localBieberAudio.volume = MUSIC_VOLUME;
    localBieberAudio.loop = true;

    localBieberAudio.addEventListener('play', () => {
      isBieberPlaying = true;
      if (vinylDisc) vinylDisc.classList.add('spinning');
      if (btnMusicToggle) btnMusicToggle.textContent = '⏸️';
    });

    localBieberAudio.addEventListener('pause', () => {
      isBieberPlaying = false;
      if (vinylDisc) vinylDisc.classList.remove('spinning');
      if (btnMusicToggle) btnMusicToggle.textContent = '▶️';
    });

    localBieberAudio.addEventListener('ended', () => {
      localBieberAudio.currentTime = 0;
      localBieberAudio.play().catch(() => {});
    });
  }

  function playBieberMusic() {
    if (!localBieberAudio) return;
    localBieberAudio.volume = MUSIC_VOLUME;
    localBieberAudio.loop = true;
    localBieberAudio.play().then(() => {
      isBieberPlaying = true;
      if (vinylDisc) vinylDisc.classList.add('spinning');
      if (btnMusicToggle) btnMusicToggle.textContent = '⏸️';
    }).catch(err => {
      console.log('Audio autoplay waiting for user interaction:', err);
    });
  }

  function pauseBieberMusic() {
    if (localBieberAudio) {
      localBieberAudio.pause();
    }
    isBieberPlaying = false;
    if (vinylDisc) vinylDisc.classList.remove('spinning');
    if (btnMusicToggle) btnMusicToggle.textContent = '▶️';
  }

  function toggleBieberMusic() {
    window.soundFX.init();
    if (localBieberAudio && !localBieberAudio.paused) {
      pauseBieberMusic();
    } else {
      playBieberMusic();
      if (window.confettiEngine) {
        window.confettiEngine.blast({ particleCount: 25, origin: { x: 0.5, y: 0.1 } });
      }
    }
  }

  if (btnMusicToggle) {
    btnMusicToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBieberMusic();
    });
  }

  if (bieberMusicPill) {
    bieberMusicPill.addEventListener('click', toggleBieberMusic);
  }

  // Boost Button in Concert Scene
  if (btnConcertBoost) {
    btnConcertBoost.addEventListener('click', () => {
      window.soundFX.init();
      if (localBieberAudio) {
        if (localBieberAudio.volume <= 0.32) {
          localBieberAudio.volume = 0.45;
          btnConcertBoost.textContent = '🔊 BOOST (45%)';
        } else {
          localBieberAudio.volume = MUSIC_VOLUME;
          btnConcertBoost.textContent = '🔉 LOW (30%)';
        }
        if (localBieberAudio.paused) {
          playBieberMusic();
        }
      }
      window.soundFX.playFanfare();
      if (window.confettiEngine) {
        window.confettiEngine.blast({
          particleCount: 40,
          spread: 80,
          origin: { x: 0.5, y: 0.45 }
        });
      }
    });
  }

  // Sound FX Mute Toggle
  if (btnSoundToggle) {
    btnSoundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isMuted = window.soundFX.toggleMute();
      btnSoundToggle.textContent = isMuted ? '🔇' : '🔊';
      btnSoundToggle.title = isMuted ? 'Unmute Sounds' : 'Mute Sounds';
      if (!isMuted) {
        window.soundFX.playPop(1.2);
      }
    });
  }

  // Helper: Switch active scene
  function showScene(sceneNumber) {
    [scene1, scene2, scene3, scene4, scene5].forEach((sc) => {
      if (sc) sc.classList.remove('active');
    });

    const targetScene = document.getElementById(`scene-${sceneNumber}`);
    if (targetScene) targetScene.classList.add('active');

    currentScene = sceneNumber;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================
  // SCENE 1 -> SCENE 2 (ENTER CONCERT)
  // ==========================================
  if (btnScene1Next) {
    btnScene1Next.addEventListener('click', () => {
      window.soundFX.init();
      window.soundFX.playPop(1.1);
      window.soundFX.playFanfare();

      // Start Justin Bieber song immediately
      playBieberMusic();

      if (window.confettiEngine) {
        window.confettiEngine.blast({
          particleCount: 50,
          spread: 75,
          origin: { x: 0.5, y: 0.6 }
        });
      }

      showScene(2);
      startConcertScene();
    });
  }

  // ==========================================
  // SCENE 2: VIP BIRTHDAY CONCERT (GUITAR VIDEO & ENDLESS JAM)
  // ==========================================
  function startConcertScene() {
    clearInterval(concertTimer);
    concertSeconds = 10;
    if (vibeBarFill) vibeBarFill.style.width = '0%';
    if (vibeStatusLabel) vibeStatusLabel.textContent = 'Vibing to Eye Candy... 10s 🎧';
    if (btnScene2Next) btnScene2Next.style.display = 'none';

    // 1. Ensure local Justin Bieber MP3 is playing continuously at low volume
    playBieberMusic();

    // 2. Play guitar.mp4 endlessly on loop
    if (guitarVideo) {
      guitarVideo.muted = true;
      guitarVideo.loop = true;
      guitarVideo.play().catch(err => {
        console.log('Video autoplay error:', err);
      });
    }

    const startTime = Date.now();
    const duration = 10000;

    concertTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      if (vibeBarFill) vibeBarFill.style.width = `${progress}%`;

      const remaining = Math.max(0, Math.ceil((duration - elapsed) / 1000));
      if (remaining > 0) {
        if (vibeStatusLabel) vibeStatusLabel.textContent = `Vibing to Eye Candy... ${remaining}s 🎧`;
      } else {
        clearInterval(concertTimer);
        if (vibeBarFill) vibeBarFill.style.width = '100%';
        if (vibeStatusLabel) vibeStatusLabel.textContent = 'Appy Don Vibe Check: 10000% IMMACULATE! 🎸🕶️';
        if (btnScene2Next) btnScene2Next.style.display = 'inline-flex';

        window.soundFX.playFanfare();
        if (window.confettiEngine) window.confettiEngine.celebrationBlast();
      }
    }, 100);
  }

  // Scene 2 -> Scene 3 (Bring out cake: pause video, but Justin Bieber song keeps playing endlessly!)
  if (btnScene2Next) {
    btnScene2Next.addEventListener('click', () => {
      window.soundFX.playPop(1.1);
      // Pause guitar video when entering cake scene
      if (guitarVideo) {
        guitarVideo.pause();
      }
      // Justin Bieber song keeps playing continuously across all scenes!
      showScene(3);
      startScene3Countdown();
    });
  }

  // ==========================================
  // SCENE 3: 7-SECOND CANDLE BLOW & CAKE CUTTING
  // ==========================================
  function startScene3Countdown() {
    clearInterval(countdownTimer);
    countdownValue = 7;
    isCandleBlown = false;
    isCakeSliced = false;

    if (candleHeaderText) candleHeaderText.textContent = 'Get those lungs ready! Blowing out candles in...';
    if (countdownDisplay) {
      countdownDisplay.textContent = countdownValue;
      countdownDisplay.classList.remove('ready');
      countdownDisplay.style.display = 'inline-flex';
    }
    if (actionPrompt) actionPrompt.style.display = 'none';
    if (candleFlame) candleFlame.style.display = 'block';
    if (smokePuff) smokePuff.classList.remove('puffed');
    if (sliceGuide) sliceGuide.classList.remove('visible');
    if (cheekyWishBubble) cheekyWishBubble.classList.remove('show');
    if (cakeSliceDisplay) cakeSliceDisplay.classList.remove('show');
    if (btnScene3Next) btnScene3Next.style.display = 'none';

    countdownTimer = setInterval(() => {
      countdownValue--;
      if (countdownValue > 0) {
        if (countdownDisplay) countdownDisplay.textContent = countdownValue;
        window.soundFX.playTick(1 + (7 - countdownValue) * 0.1);
      } else {
        clearInterval(countdownTimer);
        if (countdownDisplay) {
          countdownDisplay.textContent = '0';
          countdownDisplay.classList.add('ready');
        }
        window.soundFX.playTick(1.8);

        setTimeout(() => {
          if (candleHeaderText) candleHeaderText.textContent = 'Make your birthday wish, Appy Don! ✨';
          if (countdownDisplay) countdownDisplay.style.display = 'none';
          if (actionPrompt) {
            actionPrompt.style.display = 'inline-flex';
            if (actionPromptText) actionPromptText.textContent = 'TAP the candle to blow it out! 🌬️';
          }
        }, 800);
      }
    }, 1000);
  }

  // Blowing out the candle (With Cheeky Wish Tease)
  function handleBlowCandle() {
    if (countdownValue > 0 || isCandleBlown) return;

    isCandleBlown = true;
    window.soundFX.playBlow();
    window.soundFX.playTwinkle();
    if (candleFlame) candleFlame.style.display = 'none';
    if (smokePuff) smokePuff.classList.add('puffed');

    // Show cheeky wish tease immediately right under the cake!
    if (cheekyWishBubble) {
      cheekyWishBubble.classList.add('show');
    }

    if (actionPromptText) actionPromptText.textContent = 'Now SWIPE or CLICK to slice your cake! 🍰✂️';

    if (window.confettiEngine) {
      window.confettiEngine.blast({
        particleCount: 60,
        spread: 80,
        origin: { x: 0.5, y: 0.5 }
      });
    }

    setTimeout(() => {
      if (sliceGuide) sliceGuide.classList.add('visible');
    }, 400);
  }

  if (candleFlame) candleFlame.addEventListener('click', handleBlowCandle);
  if (cakeWrapper) {
    cakeWrapper.addEventListener('click', () => {
      if (!isCandleBlown && countdownValue === 0) {
        handleBlowCandle();
      }
    });
  }

  // Slicing the cake
  function handleCakeSlice() {
    if (!isCandleBlown || isCakeSliced) return;

    isCakeSliced = true;
    window.soundFX.playSlice();
    window.soundFX.playFanfare();

    if (sliceGuide) sliceGuide.classList.remove('visible');
    if (actionPrompt) actionPrompt.style.display = 'none';
    if (candleHeaderText) candleHeaderText.textContent = 'Woohoo! Happy Birthday Superstar! 🥳✨';

    if (window.confettiEngine) {
      window.confettiEngine.celebrationBlast();
    }

    if (cakeSliceDisplay) cakeSliceDisplay.classList.add('show');
    if (btnScene3Next) btnScene3Next.style.display = 'inline-flex';
  }

  if (sliceGuide) sliceGuide.addEventListener('click', handleCakeSlice);

  // Touch Swipe support for slicing
  let touchStartX = 0;
  let touchStartY = 0;
  if (cakeWrapper) {
    cakeWrapper.addEventListener('touchstart', (e) => {
      if (!isCandleBlown || isCakeSliced) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    cakeWrapper.addEventListener('touchend', (e) => {
      if (!isCandleBlown || isCakeSliced) return;
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
      if (dx > 30 || dy > 30 || isCandleBlown) {
        handleCakeSlice();
      }
    }, { passive: true });
  }

  // Scene 3 -> Scene 4 (Party Cards & Games)
  if (btnScene3Next) {
    btnScene3Next.addEventListener('click', () => {
      window.soundFX.playPop(1.1);
      showScene(4);
      initPartyGames();
    });
  }

  // ==========================================
  // SCENE 4: PARTY CARDS & GAMES (QUIZ + SCRATCH CARD)
  // ==========================================
  const quizData = [
    {
      q: "First question, Appy Don: What is your official criminal offense today?",
      options: [
        { text: "A) Stealing hearts without a permit 💘", emoji: "💘", reaction: "Guilty as charged! Bail set at 1 million smiles. 🥰" },
        { text: "B) Walking around with illegal levels of swag 🕶️", emoji: "🚨", reaction: "The FBI (Federal Bureau of Incrédible Cuties) is on high alert! 🕶️✨" },
        { text: "C) Looking effortlessly gorgeous 24/7 💅", emoji: "🔬", reaction: "Scientists are still baffled how you pull that off. 10/10 perfection! 💖" },
        { text: "D) Running the show like a true Don 👑", emoji: "🙇‍♂️", reaction: "All hail Don Appy! Supreme ruler of our hearts! 👑✨" }
      ]
    },
    {
      q: "Second question: What is the secret admirer's biggest weakness when it comes to Apoorva?",
      options: [
        { text: "A) That killer smile that resets my whole brain 🧠💥", emoji: "😍", reaction: "Total system reboot required every single time you smile! 💥" },
        { text: "B) That cute bossy 'Don' attitude 😈", emoji: "🫡", reaction: "Terrifyingly cute. 10/10 would obey orders again. 😂" },
        { text: "C) Literally everything... it’s totally unfair 😩", emoji: "🏆", reaction: "Ding ding ding! You win the grand prize of being completely adored! 💝" },
        { text: "D) Your elite music taste (Justin Bieber on repeat) 🎵", emoji: "🎧", reaction: "Certified Belieber Queen! Eye Candy is our official anthem! 🎶" }
      ]
    },
    {
      q: "Hypothetical scenario: You & the mysterious web dev get stranded on a deserted island. What happens?",
      options: [
        { text: "A) Appy Don establishes a royal dictatorship 👑", emoji: "🥥", reaction: "I will gladly be your chief coconut peeler, your Highness. 🌴" },
        { text: "B) 24/7 non-stop playful bickering & laughing 🥊", emoji: "😂", reaction: "Let’s be real: you’d roast me all day and I’d secretly love it. 💖" },
        { text: "C) The developer builds you a 5-star bamboo luxury resort 🏖️", emoji: "⭐", reaction: "Five stars isn’t enough for Appy Don, only a ten-star resort! 🌟" },
        { text: "D) First you gotta tell me who you are, mister! 🧐", emoji: "🤫", reaction: "Patience, Appy Don... the mystery makes it ten times more exciting! 😉" }
      ]
    }
  ];

  let currentQuestionIndex = 0;

  function initPartyGames() {
    if (partyQuizContainer) partyQuizContainer.style.display = 'block';
    if (partyScratchContainer) partyScratchContainer.style.display = 'none';
    if (btnScene4Next) btnScene4Next.style.display = 'none';
    currentQuestionIndex = 0;
    renderQuestion(0);
  }

  function renderQuestion(idx) {
    if (quizReactionBubble) quizReactionBubble.style.display = 'none';
    if (blushMeterBox) blushMeterBox.style.display = 'none';
    if (quizOptionsGrid) quizOptionsGrid.style.display = 'grid';

    if (idx < quizData.length) {
      if (quizCounter) quizCounter.textContent = `Question ${idx + 1} of 4`;
      if (quizQuestionText) quizQuestionText.textContent = quizData[idx].q;
      if (quizOptionsGrid) {
        quizOptionsGrid.innerHTML = '';
        quizData[idx].options.forEach((opt) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'quiz-option-btn';
          btn.innerHTML = `
            <span class="quiz-option-radio"></span>
            <span class="quiz-option-text">${opt.text}</span>
          `;
          btn.addEventListener('click', () => {
            handleQuizAnswer(opt, btn);
          });
          quizOptionsGrid.appendChild(btn);
        });
      }
    } else {
      // Question 4: Blush-O-Meter
      if (quizCounter) quizCounter.textContent = 'Question 4 of 4 (Interactive)';
      if (quizQuestionText) quizQuestionText.textContent = 'Final Vibe Check: How much did this whole surprise make Appy Don blush?';
      if (quizOptionsGrid) quizOptionsGrid.style.display = 'none';
      if (blushMeterBox) blushMeterBox.style.display = 'block';
      updateBlushDisplay(blushSlider ? blushSlider.value : 75);
    }
  }

  function handleQuizAnswer(option, clickedBtn) {
    // 1. Highlight selected button clearly
    if (quizOptionsGrid) {
      const allBtns = quizOptionsGrid.querySelectorAll('.quiz-option-btn');
      allBtns.forEach((b) => b.classList.remove('selected'));
    }
    if (clickedBtn) {
      clickedBtn.classList.add('selected');
    }

    // 2. Play sound safely
    try {
      if (window.soundFX && typeof window.soundFX.playQuizOption === 'function') {
        window.soundFX.playQuizOption();
      } else if (window.soundFX && typeof window.soundFX.playPop === 'function') {
        window.soundFX.playPop(1.2);
      }
    } catch (e) {
      console.warn('Audio FX play error:', e);
    }

    // 3. Update reaction bubble
    if (reactionEmoji) reactionEmoji.textContent = option.emoji;
    if (reactionText) reactionText.textContent = option.reaction;
    if (quizReactionBubble) {
      quizReactionBubble.style.display = 'flex';
      // Ensure reaction bubble and Next button are visible to user
      setTimeout(() => {
        quizReactionBubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 60);
    }

    // 4. Confetti burst
    if (window.confettiEngine && typeof window.confettiEngine.blast === 'function') {
      window.confettiEngine.blast({
        particleCount: 24,
        spread: 65,
        origin: { x: 0.5, y: 0.7 }
      });
    }
  }

  if (btnQuizNext) {
    btnQuizNext.addEventListener('click', () => {
      try {
        if (window.soundFX && typeof window.soundFX.playPop === 'function') {
          window.soundFX.playPop(1.1);
        }
      } catch (e) {}
      currentQuestionIndex++;
      renderQuestion(currentQuestionIndex);
    });
  }

  // Blush-o-meter logic
  function updateBlushDisplay(val) {
    val = parseInt(val, 10);
    if (val < 25) {
      if (blushEmojiFace) blushEmojiFace.textContent = '🤥';
      if (blushFeedbackTag) blushFeedbackTag.textContent = 'Trying so hard to play it cool! (We see you smiling!)';
    } else if (val < 65) {
      if (blushEmojiFace) blushEmojiFace.textContent = '🌸';
      if (blushFeedbackTag) blushFeedbackTag.textContent = 'Aww, cheeks are turning strawberry pink! 🍓';
    } else if (val < 90) {
      if (blushEmojiFace) blushEmojiFace.textContent = '🥰';
      if (blushFeedbackTag) blushFeedbackTag.textContent = 'Full heart-eyes! Appy Don is loving every second!';
    } else {
      if (blushEmojiFace) blushEmojiFace.textContent = '🍅';
      if (blushFeedbackTag) blushFeedbackTag.textContent = '1000% MAXIMUM TOMATO MODE! 🚨 Irresistibly cute!';
    }
  }

  if (blushSlider) {
    blushSlider.addEventListener('input', (e) => {
      updateBlushDisplay(e.target.value);
      try {
        if (window.soundFX && typeof window.soundFX.playSliderTick === 'function') {
          window.soundFX.playSliderTick(e.target.value / 100);
        }
      } catch (err) {}
    });
  }

  if (btnBlushConfirm) {
    btnBlushConfirm.addEventListener('click', () => {
      try {
        if (window.soundFX && typeof window.soundFX.playFanfare === 'function') {
          window.soundFX.playFanfare();
        }
      } catch (err) {}
      if (window.confettiEngine && typeof window.confettiEngine.celebrationBlast === 'function') {
        window.confettiEngine.celebrationBlast();
      }

      // Transition to Sub-step 5B: Scratch card
      if (partyQuizContainer) partyQuizContainer.style.display = 'none';
      if (partyScratchContainer) partyScratchContainer.style.display = 'block';
      initScratchCard();
    });
  }

  // Sub-step 5B: Scratch Card Engine
  function initScratchCard() {
    if (!scratchCanvas) return;
    const ctx = scratchCanvas.getContext('2d');
    const rect = scratchCanvas.getBoundingClientRect();
    const w = rect.width || 320;
    const h = rect.height || 210;

    scratchCanvas.width = w;
    scratchCanvas.height = h;

    // Fill with cartoonish gold glitter foil
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#ffd166');
    grad.addColorStop(0.3, '#fef08a');
    grad.addColorStop(0.7, '#f59e0b');
    grad.addColorStop(1, '#d97706');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative sparkles & text on the scratch card
    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 16px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH WITH COIN / FINGER ✨', w / 2, h / 2 - 12);
    ctx.font = 'bold 13px "Nunito", sans-serif';
    ctx.fillText('👑 Classified Don Perk Awaits! 👑', w / 2, h / 2 + 14);

    let isDrawing = false;
    isScratchCompleted = false;

    function scratch(x, y) {
      if (isScratchCompleted) return;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2, false);
      ctx.fill();

      try {
        if (window.soundFX && typeof window.soundFX.playScratch === 'function') {
          window.soundFX.playScratch();
        }
      } catch (err) {}
      checkScratchPercentage();
    }

    function checkScratchPercentage() {
      if (isScratchCompleted) return;
      try {
        const imgData = ctx.getImageData(0, 0, w, h);
        const totalPixels = imgData.data.length / 4;
        let clearPixels = 0;

        for (let i = 3; i < imgData.data.length; i += 16) {
          if (imgData.data[i] === 0) {
            clearPixels += 4;
          }
        }

        const percent = (clearPixels / totalPixels) * 100;
        if (percent > 40) {
          isScratchCompleted = true;
          ctx.clearRect(0, 0, w, h);
          if (scratchRevealedMsg) scratchRevealedMsg.style.display = 'block';
          if (btnScene4Next) btnScene4Next.style.display = 'inline-flex';

          try {
            if (window.soundFX && typeof window.soundFX.playFanfare === 'function') {
              window.soundFX.playFanfare();
            }
          } catch (err) {}
          if (window.confettiEngine && typeof window.confettiEngine.celebrationBlast === 'function') {
            window.confettiEngine.celebrationBlast();
          }
        }
      } catch (err) {
        console.log('Scratch canvas check:', err);
      }
    }

    // Scratch Event listeners
    scratchCanvas.onmousedown = (e) => {
      isDrawing = true;
      scratch(e.offsetX, e.offsetY);
    };
    scratchCanvas.onmousemove = (e) => {
      if (isDrawing) scratch(e.offsetX, e.offsetY);
    };
    window.addEventListener('mouseup', () => { isDrawing = false; });

    scratchCanvas.ontouchstart = (e) => {
      isDrawing = true;
      const b = scratchCanvas.getBoundingClientRect();
      const t = e.touches[0];
      scratch(t.clientX - b.left, t.clientY - b.top);
    };
    scratchCanvas.ontouchmove = (e) => {
      if (!isDrawing) return;
      e.preventDefault();
      const b = scratchCanvas.getBoundingClientRect();
      const t = e.touches[0];
      scratch(t.clientX - b.left, t.clientY - b.top);
    };
    scratchCanvas.ontouchend = () => { isDrawing = false; };
  }

  // Scene 4 -> Scene 5 (Finale)
  if (btnScene4Next) {
    btnScene4Next.addEventListener('click', () => {
      try {
        if (window.soundFX && typeof window.soundFX.playPop === 'function') {
          window.soundFX.playPop(1.1);
        }
      } catch (err) {}
      showScene(5);
      initScene5();
    });
  }

  function initScene5() {
    if (decryptPromptCard) decryptPromptCard.style.display = 'block';
    if (teaserBox) teaserBox.style.display = 'none';
    if (grandReveal) grandReveal.classList.remove('show');
    if (accessDeniedContent) accessDeniedContent.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (btnRevealBack) {
    btnRevealBack.addEventListener('click', () => {
      try {
        if (window.soundFX && typeof window.soundFX.playPop === 'function') {
          window.soundFX.playPop(1.1);
        }
      } catch (err) {}
      initScene5();
    });
  }

  if (btnStartDecrypt) {
    btnStartDecrypt.addEventListener('click', () => {
      try {
        if (window.soundFX && typeof window.soundFX.playPop === 'function') {
          window.soundFX.playPop(1.1);
        }
      } catch (err) {}
      if (decryptPromptCard) decryptPromptCard.style.display = 'none';
      if (teaserBox) teaserBox.style.display = 'block';
      if (accessDeniedContent) accessDeniedContent.style.display = 'block';
      startHackerDecryption();
    });
  }

  if (btnSkipDecrypt) {
    btnSkipDecrypt.addEventListener('click', () => {
      try {
        if (window.soundFX && typeof window.soundFX.playPop === 'function') {
          window.soundFX.playPop(1.1);
        }
      } catch (err) {}
      // When choosing to send feedback only: DO NOT show access denied content!
      if (decryptPromptCard) decryptPromptCard.style.display = 'none';
      if (teaserBox) teaserBox.style.display = 'none';
      if (accessDeniedContent) accessDeniedContent.style.display = 'none';
      if (grandReveal) grandReveal.classList.add('show');

      try {
        if (window.soundFX && typeof window.soundFX.playFanfare === 'function') {
          window.soundFX.playFanfare();
        }
      } catch (err) {}
      if (window.confettiEngine && typeof window.confettiEngine.celebrationBlast === 'function') {
        window.confettiEngine.celebrationBlast();
      }
      setTimeout(() => {
        const transmissionCard = document.getElementById('secret-transmission-card');
        if (transmissionCard) {
          transmissionCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 60);
    });
  }

  // ==========================================
  // SCENE 5: DECRYPTION PROGRESS & GRAND REVEAL
  // ==========================================
  function startHackerDecryption() {
    if (decryptProgress) decryptProgress.style.width = '0%';
    if (progressStatus) progressStatus.textContent = 'Initializing neural network...';
    if (error404Banner) error404Banner.classList.remove('show');
    if (grandReveal) grandReveal.classList.remove('show');

    let percent = 0;
    const logs = [
      { at: 15, text: 'Scanning database of people who adore Apoorva... 🔍' },
      { at: 35, text: 'Matches found: Entire universe, but 1 developer especially! 💖' },
      { at: 60, text: 'Measuring Appy Don charm levels: OVER 9000% 📈' },
      { at: 82, text: 'Overheating from excessive swagger... 🔥' },
      { at: 99, text: 'Almost there... resolving developer photo ID... 📸' }
    ];

    const progressInterval = setInterval(() => {
      percent += Math.floor(Math.random() * 4) + 2;
      if (percent > 99) percent = 99;

      if (decryptProgress) decryptProgress.style.width = percent + '%';
      window.soundFX.playDecryptClick();

      const matchedLog = logs.filter(l => percent >= l.at).pop();
      if (matchedLog && progressStatus) {
        progressStatus.textContent = `${matchedLog.text} (${percent}%)`;
      }

      if (percent >= 99) {
        clearInterval(progressInterval);
        if (progressStatus) progressStatus.textContent = 'CRITICAL SYSTEM OVERLOAD! (99%)';

        setTimeout(() => {
          window.soundFX.playErrorBuzzer();
          if (error404Banner) error404Banner.classList.add('show');

          setTimeout(() => {
            if (accessDeniedContent) accessDeniedContent.style.display = 'block';
            if (grandReveal) grandReveal.classList.add('show');
            window.soundFX.playFanfare();
            if (window.confettiEngine) window.confettiEngine.celebrationBlast();
          }, 900);
        }, 600);
      }
    }, 60);
  }

  // Replay Button
  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      window.soundFX.playPop(1);
      initScene5();
      showScene(1);
    });
  }

  // Celebrate More Button
  if (btnCelebrateMore) {
    btnCelebrateMore.addEventListener('click', () => {
      window.soundFX.playFanfare();
      if (window.confettiEngine) window.confettiEngine.celebrationBlast();
    });
  }

  // ==========================================
  // SCENE 5: ANONYMOUS TRANSMISSION & FORMSPREE BACK-CHANNEL
  // ==========================================
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqpkrdpq';
  const gesturePills = document.querySelectorAll('.gesture-pill');
  const secretMsgText = document.getElementById('secret-msg-text');
  const secretCharCounter = document.getElementById('secret-char-counter');
  const btnTransmitSecret = document.getElementById('btn-transmit-secret');
  const secretFormNudge = document.getElementById('secret-form-nudge');
  const transmissionSuccessBox = document.getElementById('transmission-success-box');
  const transmissionFormContent = document.getElementById('transmission-form-content');
  const deliveredMemoPreview = document.getElementById('delivered-memo-preview');

  gesturePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('selected');
      try {
        if (window.soundFX && typeof window.soundFX.playPop === 'function') {
          window.soundFX.playPop(1.25);
        }
      } catch (err) {}
      if (secretFormNudge) secretFormNudge.style.display = 'none';
    });
  });

  if (secretMsgText && secretCharCounter) {
    secretMsgText.addEventListener('input', (e) => {
      const len = e.target.value.length;
      secretCharCounter.textContent = `${len}/500`;
      if (secretFormNudge) secretFormNudge.style.display = 'none';
    });
  }

  if (btnTransmitSecret) {
    btnTransmitSecret.addEventListener('click', () => {
      const selectedPills = Array.from(document.querySelectorAll('.gesture-pill.selected'))
        .map((p) => p.getAttribute('data-gesture'));
      const message = secretMsgText ? secretMsgText.value.trim() : '';

      if (selectedPills.length === 0 && !message) {
        if (secretFormNudge) {
          secretFormNudge.style.display = 'block';
        }
        return;
      }

      btnTransmitSecret.disabled = true;
      btnTransmitSecret.innerHTML = '<span>Transmitting into the cosmos... 📡✨</span>';

      const payload = {
        subject: '💌 Secret Birthday Note from Appy Don!',
        gestures: selectedPills.join(' | ') || 'None selected',
        personal_message: message || '(No written note, gesture only)',
        timestamp: new Date().toLocaleString()
      };

      // Local storage backup
      try {
        const past = JSON.parse(localStorage.getItem('appy_secret_notes') || '[]');
        past.push(payload);
        localStorage.setItem('appy_secret_notes', JSON.stringify(past));
      } catch (err) {}

      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).catch((err) => {
        console.log('Formspree transmission notice:', err);
      }).finally(() => {
        // Celebrate and confirm
        try {
          if (window.soundFX && typeof window.soundFX.playFanfare === 'function') {
            window.soundFX.playFanfare();
          }
        } catch (err) {}
        if (window.confettiEngine && typeof window.confettiEngine.celebrationBlast === 'function') {
          window.confettiEngine.celebrationBlast();
        }

        if (transmissionFormContent) transmissionFormContent.style.display = 'none';
        if (transmissionSuccessBox) transmissionSuccessBox.style.display = 'block';

        if (deliveredMemoPreview) {
          let html = '';
          if (selectedPills.length > 0) {
            html += `<div class="delivered-pills"><strong>Gestures:</strong> ${selectedPills.map((g) => `<span class="delivered-chip">${g}</span>`).join(' ')}</div>`;
          }
          if (message) {
            const clean = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            html += `<div class="delivered-note"><strong>Note:</strong> “${clean}”</div>`;
          }
          deliveredMemoPreview.innerHTML = html;
        }

        if (transmissionSuccessBox) {
          setTimeout(() => {
            transmissionSuccessBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 60);
        }
      });
    });
  }

  // ==========================================
  // INTERACTIVE CLICK / TOUCH SPARKLES
  // ==========================================
  const sparkleEmojis = ['✨', '💖', '⭐', '🧁', '🌸', '💫', '🎉', '👑', '💣', '🎸'];
  window.addEventListener('pointerdown', (e) => {
    // Prevent interfering with buttons/inputs/textareas
    if (e.target.closest('button, input, textarea, canvas, .music-pill, .gesture-pill')) return;

    if (window.confettiEngine) {
      window.confettiEngine.clickBurst(e.clientX, e.clientY);
    }

    const sparkle = document.createElement('div');
    sparkle.className = 'touch-sparkle';
    sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;

    const tx = (Math.random() - 0.5) * 80;
    const ty = -30 - Math.random() * 50;
    sparkle.style.setProperty('--tx', `${tx}px`);
    sparkle.style.setProperty('--ty', `${ty}px`);

    document.body.appendChild(sparkle);
    setTimeout(() => {
      sparkle.remove();
    }, 800);
  });

  // ==========================================
  // URL QUERY PARAMETER HANDLING (For Previews)
  // ==========================================
  const urlParams = new URLSearchParams(window.location.search);
  const requestedScene = parseInt(urlParams.get('scene'), 10);
  const stateParam = urlParams.get('state');
  const revealParam = urlParams.get('reveal');

  if (requestedScene >= 1 && requestedScene <= 5) {
    showScene(requestedScene);

    if (requestedScene === 2) {
      if (stateParam === 'ready') {
        if (vibeBarFill) vibeBarFill.style.width = '100%';
        if (vibeStatusLabel) vibeStatusLabel.textContent = 'Appy Don Vibe Check: 10000% IMMACULATE! 🎸🕶️';
        if (btnScene2Next) btnScene2Next.style.display = 'inline-flex';
        if (guitarVideo) {
          guitarVideo.muted = true;
          guitarVideo.loop = true;
          guitarVideo.play().catch(() => {});
        }
      } else {
        startConcertScene();
      }
    } else if (requestedScene === 3) {
      if (stateParam === 'ready') {
        countdownValue = 0;
        if (countdownDisplay) countdownDisplay.style.display = 'none';
        if (actionPrompt) {
          actionPrompt.style.display = 'inline-flex';
          if (actionPromptText) actionPromptText.textContent = 'TAP the candle to blow it out! 🌬️';
        }
      } else if (stateParam === 'blown') {
        countdownValue = 0;
        isCandleBlown = true;
        if (candleHeaderText) candleHeaderText.textContent = 'Make your birthday wish, Appy Don! ✨';
        if (countdownDisplay) countdownDisplay.style.display = 'none';
        if (candleFlame) candleFlame.style.display = 'none';
        if (smokePuff) smokePuff.classList.add('puffed');
        if (actionPrompt) {
          actionPrompt.style.display = 'inline-flex';
          if (actionPromptText) actionPromptText.textContent = 'Now SWIPE or CLICK to slice your cake! 🍰✂️';
        }
        if (cheekyWishBubble) cheekyWishBubble.classList.add('show');
        if (sliceGuide) sliceGuide.classList.add('visible');
      } else if (stateParam === 'sliced') {
        countdownValue = 0;
        isCandleBlown = true;
        isCakeSliced = true;
        if (candleHeaderText) candleHeaderText.textContent = 'Woohoo! Happy Birthday Superstar! 🥳✨';
        if (countdownDisplay) countdownDisplay.style.display = 'none';
        if (candleFlame) candleFlame.style.display = 'none';
        if (smokePuff) smokePuff.classList.add('puffed');
        if (actionPrompt) actionPrompt.style.display = 'none';
        if (cheekyWishBubble) cheekyWishBubble.classList.add('show');
        if (cakeSliceDisplay) cakeSliceDisplay.classList.add('show');
        if (btnScene3Next) btnScene3Next.style.display = 'inline-flex';
      } else {
        startScene3Countdown();
      }
    } else if (requestedScene === 4) {
      initPartyGames();
    } else if (requestedScene === 5) {
      if (revealParam === 'true') {
        if (decryptPromptCard) decryptPromptCard.style.display = 'none';
        if (teaserBox) teaserBox.style.display = 'none';
        if (decryptProgress) decryptProgress.style.width = '99%';
        if (progressStatus) progressStatus.textContent = 'CRITICAL SYSTEM OVERLOAD! (99%)';
        if (error404Banner) error404Banner.classList.add('show');
        if (grandReveal) grandReveal.classList.add('show');
      } else if (stateParam === 'decrypting') {
        if (decryptPromptCard) decryptPromptCard.style.display = 'none';
        if (teaserBox) teaserBox.style.display = 'block';
        startHackerDecryption();
      } else {
        initScene5();
      }
    }
  }
});
