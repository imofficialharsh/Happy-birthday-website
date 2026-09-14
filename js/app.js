/**
 * Main Application Controller (Appy Don VIP Concert Edition)
 * Manages 6-Scene Storyline, YouTube "Eye Candy" Player, VIP Concert, Slower Shooting Star, Party Games & Finale.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Music Controls
  const btnMusicToggle = document.getElementById('btn-music-toggle');
  const bieberMusicPill = document.getElementById('bieber-music-pill');
  const vinylDisc = document.getElementById('vinyl-disc');
  const btnSoundToggle = document.getElementById('btn-sound-toggle');
  const localBieberAudio = document.getElementById('local-bieber-audio');

  // Scenes
  const scene1 = document.getElementById('scene-1');
  const scene2 = document.getElementById('scene-2');
  const scene3 = document.getElementById('scene-3');
  const scene4 = document.getElementById('scene-4');
  const scene5 = document.getElementById('scene-5');
  const scene6 = document.getElementById('scene-6');

  // Scene 1 Elements
  const btnScene1Next = document.getElementById('btn-scene-1-next');

  // Scene 2 Elements (Concert)
  const btnConcertBoost = document.getElementById('btn-concert-boost');
  const vibeStatusLabel = document.getElementById('vibe-status-label');
  const vibeBarFill = document.getElementById('vibe-bar-fill');
  const btnScene2Next = document.getElementById('btn-scene-2-next');

  // Scene 3 Elements (Cake)
  const candleHeaderText = document.getElementById('candle-header-text');
  const countdownDisplay = document.getElementById('countdown-display');
  const actionPrompt = document.getElementById('action-prompt');
  const actionPromptText = document.getElementById('action-prompt-text');
  const cakeWrapper = document.getElementById('cake-wrapper');
  const candleFlame = document.getElementById('candle-flame');
  const smokePuff = document.getElementById('smoke-puff');
  const sliceGuide = document.getElementById('slice-guide');
  const cakeSliceDisplay = document.getElementById('cake-slice-display');
  const btnScene3Next = document.getElementById('btn-scene-3-next');

  // Scene 4 Elements (Shooting Star)
  const shootingStar = document.getElementById('shooting-star');
  const shootingStar2 = document.getElementById('shooting-star-2');
  const btnWishLocked = document.getElementById('btn-wish-locked');
  const btnReWish = document.getElementById('btn-re-wish');
  const cheekyBubble = document.getElementById('cheeky-bubble');
  const btnScene4Next = document.getElementById('btn-scene-4-next');

  // Scene 5 Elements (Party Games: Quiz + Scratch Card)
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
  const btnScene5Next = document.getElementById('btn-scene-5-next');

  // Scene 6 Elements (Finale)
  const decryptProgress = document.getElementById('decrypt-progress');
  const progressStatus = document.getElementById('progress-status');
  const error404Banner = document.getElementById('error-404-banner');
  const grandReveal = document.getElementById('grand-reveal');
  const btnReplay = document.getElementById('btn-replay');
  const btnCelebrateMore = document.getElementById('btn-celebrate-more');

  // State
  let currentScene = 1;
  let countdownTimer = null;
  let countdownValue = 7;
  let isCandleBlown = false;
  let isCakeSliced = false;
  let shootingStarInterval = null;
  let isBieberPlaying = false;
  let isScratchCompleted = false;
  let concertTimer = null;
  let concertSeconds = 10;

  // Local Audio & Video Elements
  const guitarVideo = document.getElementById('guitar-video');

  // ==========================================
  // LOCAL MUSIC CONTROLLER (Justin Bieber - Eye Candy)
  // Low volume (~30%), continuous looping across all scenes
  // ==========================================
  const MUSIC_VOLUME = 0.30; // Kept low and pleasant per user request

  if (localBieberAudio) {
    localBieberAudio.volume = MUSIC_VOLUME;
    localBieberAudio.loop = true;

    localBieberAudio.addEventListener('play', () => {
      isBieberPlaying = true;
      vinylDisc.classList.add('spinning');
      btnMusicToggle.textContent = '⏸️';
    });

    localBieberAudio.addEventListener('pause', () => {
      isBieberPlaying = false;
      vinylDisc.classList.remove('spinning');
      btnMusicToggle.textContent = '▶️';
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
      vinylDisc.classList.add('spinning');
      btnMusicToggle.textContent = '⏸️';
    }).catch(err => {
      console.log('Audio autoplay waiting for user tap:', err);
    });
  }

  function pauseBieberMusic() {
    if (localBieberAudio) {
      localBieberAudio.pause();
    }
    isBieberPlaying = false;
    vinylDisc.classList.remove('spinning');
    btnMusicToggle.textContent = '▶️';
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

  btnMusicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleBieberMusic();
  });
  bieberMusicPill.addEventListener('click', toggleBieberMusic);

  // Boost Button in Concert Scene
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
    window.confettiEngine && window.confettiEngine.blast({
      particleCount: 40,
      spread: 80,
      origin: { x: 0.5, y: 0.45 }
    });
  });

  // Sound FX Mute Toggle
  btnSoundToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isMuted = window.soundFX.toggleMute();
    btnSoundToggle.textContent = isMuted ? '🔇' : '🔊';
    btnSoundToggle.title = isMuted ? 'Unmute Sounds' : 'Mute Sounds';
    if (!isMuted) {
      window.soundFX.playPop(1.2);
    }
  });

  // Helper: Switch active scene
  function showScene(sceneNumber) {
    [scene1, scene2, scene3, scene4, scene5, scene6].forEach((sc) => {
      if (sc) sc.classList.remove('active');
    });

    const targetScene = document.getElementById(`scene-${sceneNumber}`);
    if (targetScene) targetScene.classList.add('active');

    currentScene = sceneNumber;

    // Body background theme (Scene 4 is night-mode)
    if (sceneNumber === 4) {
      document.body.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================
  // SCENE 1 -> SCENE 2 (ENTER CONCERT)
  // ==========================================
  btnScene1Next.addEventListener('click', () => {
    window.soundFX.init();
    window.soundFX.playPop(1.1);
    window.soundFX.playFanfare();

    // Start Justin Bieber song immediately
    playBieberMusic();

    window.confettiEngine && window.confettiEngine.blast({
      particleCount: 50,
      spread: 75,
      origin: { x: 0.5, y: 0.6 }
    });

    showScene(2);
    startConcertScene();
  });

  // ==========================================
  // SCENE 2: VIP BIRTHDAY CONCERT (GUITAR VIDEO & ENDLESS JAM)
  // ==========================================
  function startConcertScene() {
    clearInterval(concertTimer);
    concertSeconds = 10;
    vibeBarFill.style.width = '0%';
    vibeStatusLabel.textContent = `Vibing to Eye Candy... 10s 🎧`;
    btnScene2Next.style.display = 'none';

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
      vibeBarFill.style.width = `${progress}%`;

      const remaining = Math.max(0, Math.ceil((duration - elapsed) / 1000));
      if (remaining > 0) {
        vibeStatusLabel.textContent = `Vibing to Eye Candy... ${remaining}s 🎧`;
      } else {
        clearInterval(concertTimer);
        vibeBarFill.style.width = '100%';
        vibeStatusLabel.textContent = `Vibe check: 10000% IMMACULATE! 🎸🔥 (Jam on or bring the cake!)`;
        btnScene2Next.style.display = 'inline-flex';

        window.soundFX.playFanfare();
        window.confettiEngine && window.confettiEngine.celebrationBlast();
      }
    }, 100);
  }

  // Scene 2 -> Scene 3 (Bring out cake: pause video, but Justin Bieber song keeps playing endlessly!)
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

  // ==========================================
  // SCENE 3: 7-SECOND CANDLE BLOW & CAKE CUTTING
  // ==========================================
  function startScene3Countdown() {
    clearInterval(countdownTimer);
    countdownValue = 7;
    isCandleBlown = false;
    isCakeSliced = false;

    candleHeaderText.textContent = 'Get those lungs ready! Blowing out candles in...';
    countdownDisplay.textContent = countdownValue;
    countdownDisplay.classList.remove('ready');
    countdownDisplay.style.display = 'inline-flex';
    actionPrompt.style.display = 'none';
    candleFlame.style.display = 'block';
    smokePuff.classList.remove('puffed');
    sliceGuide.classList.remove('visible');
    cakeSliceDisplay.classList.remove('show');
    btnScene3Next.style.display = 'none';

    countdownTimer = setInterval(() => {
      countdownValue--;
      if (countdownValue > 0) {
        countdownDisplay.textContent = countdownValue;
        window.soundFX.playTick(1 + (7 - countdownValue) * 0.1);
      } else {
        clearInterval(countdownTimer);
        countdownDisplay.textContent = '0';
        countdownDisplay.classList.add('ready');
        window.soundFX.playTick(1.8);

        setTimeout(() => {
          candleHeaderText.textContent = 'Make your birthday wish, Appy Don! ✨';
          countdownDisplay.style.display = 'none';
          actionPrompt.style.display = 'inline-flex';
          actionPromptText.textContent = 'TAP the candle to blow it out! 🌬️';
          candleFlame.style.cursor = 'pointer';
        }, 400);
      }
    }, 1000);
  }

  function handleCandleBlow() {
    if (countdownValue > 0 || isCandleBlown) return;
    isCandleBlown = true;

    window.soundFX.playBlow();
    candleFlame.style.display = 'none';
    smokePuff.classList.add('puffed');

    setTimeout(() => {
      window.soundFX.playFanfare();
      window.confettiEngine && window.confettiEngine.celebrationBlast();
    }, 250);

    setTimeout(() => {
      candleHeaderText.textContent = 'Slice the cake & celebrate! 🍰';
      actionPromptText.textContent = 'Now swipe/click to slice the cake! 🍰';
      sliceGuide.classList.add('visible');
    }, 800);
  }

  candleFlame.addEventListener('click', handleCandleBlow);
  cakeWrapper.addEventListener('click', () => {
    if (countdownValue <= 0 && !isCandleBlown) {
      handleCandleBlow();
    }
  });

  function handleCakeSlice() {
    if (!isCandleBlown || isCakeSliced) return;
    isCakeSliced = true;

    candleHeaderText.textContent = 'Woohoo! Happy Birthday Superstar! 🥳✨';
    window.soundFX.playSlice();
    sliceGuide.classList.remove('visible');
    actionPrompt.style.display = 'none';

    window.confettiEngine && window.confettiEngine.blast({
      particleCount: 50,
      spread: 90,
      origin: { x: 0.5, y: 0.55 },
      shapes: ['heart', 'circle']
    });

    cakeSliceDisplay.classList.add('show');
    btnScene3Next.style.display = 'inline-flex';
  }

  sliceGuide.addEventListener('click', handleCakeSlice);

  // Swipe support for slicing
  let touchStartX = 0;
  let touchStartY = 0;
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

  // Scene 3 -> Scene 4 (Shooting star)
  btnScene3Next.addEventListener('click', () => {
    window.soundFX.playPop(1.1);
    showScene(4);
    triggerShootingStar();
  });

  // ==========================================
  // SCENE 4: SLOWER SHOOTING STAR & FLIRTY WISH
  // ==========================================
  function triggerShootingStar() {
    [shootingStar, shootingStar2].forEach(star => {
      if (!star) return;
      star.classList.remove('animate');
      void star.offsetWidth;
      star.classList.add('animate');
    });
    window.soundFX.playTwinkle();

    clearInterval(shootingStarInterval);
    shootingStarInterval = setInterval(() => {
      if (currentScene === 4) {
        [shootingStar, shootingStar2].forEach(star => {
          if (!star) return;
          star.classList.remove('animate');
          void star.offsetWidth;
          star.classList.add('animate');
        });
        window.soundFX.playTwinkle();
      }
    }, 7500);
  }

  btnReWish.addEventListener('click', () => {
    triggerShootingStar();
    window.confettiEngine && window.confettiEngine.blast({
      particleCount: 20,
      spread: 60,
      origin: { x: 0.5, y: 0.4 },
      shapes: ['star']
    });
  });

  btnWishLocked.addEventListener('click', () => {
    window.soundFX.playPop(1.2);
    window.soundFX.playChime(1318.51);

    window.confettiEngine && window.confettiEngine.blast({
      particleCount: 40,
      spread: 80,
      origin: { x: 0.5, y: 0.65 },
      shapes: ['star', 'heart']
    });

    btnWishLocked.style.display = 'none';
    btnReWish.style.display = 'none';
    cheekyBubble.classList.add('show');
  });

  // Scene 4 -> Scene 5 (Party Cards & Games)
  btnScene4Next.addEventListener('click', () => {
    window.soundFX.playPop(1.2);
    clearInterval(shootingStarInterval);
    showScene(5);
    initPartyGames();
  });

  // ==========================================
  // SCENE 5: PARTY CARDS & GAMES (QUIZ + SCRATCH CARD)
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
    partyQuizContainer.style.display = 'block';
    partyScratchContainer.style.display = 'none';
    btnScene5Next.style.display = 'none';
    currentQuestionIndex = 0;
    renderQuestion(0);
  }

  function renderQuestion(idx) {
    quizReactionBubble.style.display = 'none';
    blushMeterBox.style.display = 'none';
    quizOptionsGrid.style.display = 'grid';

    if (idx < quizData.length) {
      quizCounter.textContent = `Question ${idx + 1} of 4`;
      quizQuestionText.textContent = quizData[idx].q;
      quizOptionsGrid.innerHTML = '';

      quizData[idx].options.forEach((opt, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.textContent = opt.text;
        btn.addEventListener('click', () => {
          window.soundFX.playQuizOption(optIdx);
          selectOption(opt, btn);
        });
        quizOptionsGrid.appendChild(btn);
      });
    } else {
      // Question 4: Blush-O-Meter!
      quizCounter.textContent = `Question 4 of 4 (Bonus!)`;
      quizQuestionText.textContent = "Final interrogation: Be honest, Appy Don... How hard are you blushing or smiling right this second?";
      quizOptionsGrid.style.display = 'none';
      blushMeterBox.style.display = 'flex';
      updateBlushDisplay(parseInt(blushSlider.value, 10));
    }
  }

  function selectOption(opt, btnElement) {
    document.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
    btnElement.classList.add('selected');

    reactionEmoji.textContent = opt.emoji;
    reactionText.textContent = opt.reaction;
    quizReactionBubble.style.display = 'flex';

    window.confettiEngine && window.confettiEngine.blast({
      particleCount: 18,
      spread: 60,
      origin: { x: 0.5, y: 0.6 }
    });
  }

  btnQuizNext.addEventListener('click', () => {
    window.soundFX.playPop(1.1);
    currentQuestionIndex++;
    renderQuestion(currentQuestionIndex);
  });

  // Blush-O-Meter slider updates
  blushSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    window.soundFX.playSliderTick(val);
    updateBlushDisplay(val);
  });

  function updateBlushDisplay(val) {
    if (val < 25) {
      blushEmojiFace.textContent = '😎';
      blushFeedbackTag.textContent = "Cold-blooded Don (Liar! I know you're grinning)";
    } else if (val < 50) {
      blushEmojiFace.textContent = '😏';
      blushFeedbackTag.textContent = "A tiny smirk detected... Appy Don is amused!";
    } else if (val < 75) {
      blushEmojiFace.textContent = '🌸';
      blushFeedbackTag.textContent = "Cheeks turning strawberry pink! So cute!";
    } else if (val < 90) {
      blushEmojiFace.textContent = '🥰';
      blushFeedbackTag.textContent = "Cutie mode 100% activated! Heart melting!";
    } else {
      blushEmojiFace.textContent = '🍅';
      blushFeedbackTag.textContent = "Full tomato mode! Appy Don is blushing hard! ✨";
    }
  }

  // Lock in Blush score -> Transitions smoothly to the Scratch Card!
  btnBlushConfirm.addEventListener('click', () => {
    window.soundFX.playFanfare();
    window.confettiEngine && window.confettiEngine.celebrationBlast();
    btnBlushConfirm.style.display = 'none';
    blushFeedbackTag.textContent = "✅ Blush score locked! Unlocking VIP Scratch Card...";

    setTimeout(() => {
      partyQuizContainer.style.display = 'none';
      partyScratchContainer.style.display = 'block';
      initScratchCard();
    }, 1200);
  });

  // VIP Birthday Scratch Card Logic
  function initScratchCard() {
    isScratchCompleted = false;
    scratchRevealedMsg.style.display = 'none';
    btnScene5Next.style.display = 'none';

    const ctx = scratchCanvas.getContext('2d');
    const rect = scratchCanvas.parentElement.getBoundingClientRect();
    const width = rect.width || 340;
    const height = rect.height || 210;

    scratchCanvas.width = width;
    scratchCanvas.height = height;

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#d97706');
    grad.addColorStop(0.3, '#fbbf24');
    grad.addColorStop(0.5, '#fef08a');
    grad.addColorStop(0.7, '#f59e0b');
    grad.addColorStop(1, '#b45309');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 16px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE WITH FINGER / MOUSE ✨', width / 2, height / 2 - 10);
    ctx.font = 'bold 13px "Nunito", sans-serif';
    ctx.fillText('VIP APPY DON BIRTHDAY PASS', width / 2, height / 2 + 16);

    let isDrawing = false;

    function getCoords(e) {
      const b = scratchCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - b.left,
        y: clientY - b.top
      };
    }

    function scratch(e) {
      if (!isDrawing || isScratchCompleted) return;
      const { x, y } = getCoords(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();

      window.soundFX.playScratch();
      checkScratchPercentage();
    }

    function checkScratchPercentage() {
      if (isScratchCompleted) return;
      if (Math.random() > 0.35) return;

      const imgData = ctx.getImageData(0, 0, width, height);
      const pixels = imgData.data;
      let transparentCount = 0;
      const step = 32;
      for (let i = 3; i < pixels.length; i += 4 * step) {
        if (pixels[i] === 0) transparentCount++;
      }
      const totalSampled = pixels.length / (4 * step);
      const ratio = transparentCount / totalSampled;

      if (ratio > 0.38) {
        isScratchCompleted = true;
        ctx.clearRect(0, 0, width, height);
        scratchRevealedMsg.style.display = 'block';
        btnScene5Next.style.display = 'inline-flex';
        window.soundFX.playFanfare();
        window.confettiEngine && window.confettiEngine.celebrationBlast();
      }
    }

    scratchCanvas.onmousedown = (e) => { isDrawing = true; scratch(e); };
    window.onmouseup = () => { isDrawing = false; };
    scratchCanvas.onmousemove = scratch;

    scratchCanvas.ontouchstart = (e) => { isDrawing = true; scratch(e); };
    window.ontouchend = () => { isDrawing = false; };
    scratchCanvas.ontouchmove = scratch;
  }

  // Scene 5 -> Scene 6 (Finale)
  btnScene5Next.addEventListener('click', () => {
    window.soundFX.playPop(1.1);
    showScene(6);
    startHackerDecryption();
  });

  // ==========================================
  // SCENE 6: DECRYPTION PROGRESS & GRAND REVEAL
  // ==========================================
  function startHackerDecryption() {
    decryptProgress.style.width = '0%';
    progressStatus.textContent = 'Initializing neural network...';
    error404Banner.classList.remove('show');
    grandReveal.classList.remove('show');

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

      decryptProgress.style.width = percent + '%';
      window.soundFX.playDecryptClick();

      const matchedLog = logs.filter(l => percent >= l.at).pop();
      if (matchedLog) {
        progressStatus.textContent = `${matchedLog.text} (${percent}%)`;
      }

      if (percent >= 99) {
        clearInterval(progressInterval);
        progressStatus.textContent = 'CRITICAL SYSTEM OVERLOAD! (99%)';

        setTimeout(() => {
          window.soundFX.playErrorBuzzer();
          error404Banner.classList.add('show');

          setTimeout(() => {
            grandReveal.classList.add('show');
            window.soundFX.playFanfare();
            window.confettiEngine && window.confettiEngine.celebrationBlast();
          }, 900);
        }, 600);
      }
    }, 60);
  }

  // Replay
  btnReplay.addEventListener('click', () => {
    window.soundFX.playPop(1);
    btnWishLocked.style.display = 'inline-flex';
    btnReWish.style.display = 'inline-flex';
    cheekyBubble.classList.remove('show');
    showScene(1);
  });

  // Celebrate More Button
  btnCelebrateMore.addEventListener('click', () => {
    window.soundFX.playFanfare();
    window.confettiEngine && window.confettiEngine.celebrationBlast();
  });

  // ==========================================
  // INTERACTIVE CLICK / TOUCH SPARKLES
  // ==========================================
  const sparkleEmojis = ['✨', '💖', '⭐', '🧁', '🌸', '💫', '🎉', '👑', '💣', '🎸'];
  window.addEventListener('pointerdown', (e) => {
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
  const wishedParam = urlParams.get('wished');
  const revealParam = urlParams.get('reveal');

  if (requestedScene >= 1 && requestedScene <= 6) {
    showScene(requestedScene);

    if (requestedScene === 2) {
      if (stateParam === 'ready') {
        vibeBarFill.style.width = '100%';
        vibeStatusLabel.textContent = 'Vibe check: 10000% IMMACULATE! 🎸🔥 (Jam on or bring the cake!)';
        btnScene2Next.style.display = 'inline-flex';
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
        countdownDisplay.style.display = 'none';
        actionPrompt.style.display = 'inline-flex';
        actionPromptText.textContent = 'TAP the candle to blow it out! 🌬️';
      } else if (stateParam === 'sliced') {
        countdownValue = 0;
        isCandleBlown = true;
        isCakeSliced = true;
        candleHeaderText.textContent = 'Woohoo! Happy Birthday Superstar! 🥳✨';
        countdownDisplay.style.display = 'none';
        candleFlame.style.display = 'none';
        actionPrompt.style.display = 'none';
        cakeSliceDisplay.classList.add('show');
        btnScene3Next.style.display = 'inline-flex';
      } else {
        startScene3Countdown();
      }
    } else if (requestedScene === 4) {
      triggerShootingStar();
      if (wishedParam === 'true') {
        btnWishLocked.style.display = 'none';
        btnReWish.style.display = 'none';
        cheekyBubble.classList.add('show');
      }
    } else if (requestedScene === 5) {
      initPartyGames();
    } else if (requestedScene === 6) {
      if (revealParam === 'true') {
        decryptProgress.style.width = '99%';
        progressStatus.textContent = 'CRITICAL SYSTEM OVERLOAD! (99%)';
        error404Banner.classList.add('show');
        grandReveal.classList.add('show');
      } else {
        startHackerDecryption();
      }
    }
  }
});
