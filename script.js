$(document).ready(function() {
    var envelope = $('#envelope');
    var btn_open = $("#open");
    var btn_reset = $('#reset');
    var overlay = $('.overlay');
    var isExpanded = false;

    btn_open.on("click", function() {
        if(!envelope.hasClass('open')) {
            envelope.addClass('open').removeClass('close');
        }
    });

    btn_reset.on("click", function() {
        if(envelope.hasClass('expanded')) {
            returnLetter();
        } else {
            envelope.removeClass('open').addClass('close');
        }
    });


    envelope.on("click", function() {
        if(envelope.hasClass('open') && !envelope.hasClass('expanded') && !isExpanded) {
            envelope.addClass('expanded');
            overlay.fadeIn(300);
            isExpanded = true;
        } else if(envelope.hasClass('expanded') && isExpanded) {
            returnLetter();
        }
    });


    overlay.on("click", returnLetter);

    function returnLetter() {
        envelope.addClass('returning');
        
        setTimeout(function() {
            envelope.removeClass('expanded returning');
            overlay.fadeOut(300);
            isExpanded = false;
        }, 800); 
    }
});

(function() {
  const overlay = document.getElementById('rotate-overlay');

 
  const MOBILE_WIDTH_MAX = 900; 

  function isMobileWidth() {
    return window.innerWidth <= MOBILE_WIDTH_MAX;
  }


  function isLandscape() {
    
    return window.innerWidth > window.innerHeight;
  }


function updateOverlay() {
  const isMobile = window.innerWidth <= 768;
  if (isMobile && !isLandscape()) {
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
    
  } else {
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
  }
}


const continueBtn = document.getElementById('continue-portrait');
if (continueBtn) {
  continueBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
}


  window.addEventListener('load', updateOverlay, { passive: true });

 
  window.addEventListener('resize', function() {
    
    clearTimeout(window.__rotateDebounce);
    window.__rotateDebounce = setTimeout(updateOverlay, 120);
  }, { passive: true });


  window.addEventListener('orientationchange', function() {
    setTimeout(updateOverlay, 200);
  }, { passive: true });


  overlay.addEventListener('touchmove', function(e) {

    e.preventDefault();
  }, { passive: false });

})();



document.addEventListener("DOMContentLoaded", () => {
  
  const rewindScreen = document.getElementById("rewind-screen");
  const startScreen = document.getElementById("start-screen");
  const loadingScreen = document.getElementById("loading-screen");
  const finishScreen = document.getElementById("finish-screen");
  const yearDisplay = document.getElementById("year-display");
  const startBtn = document.getElementById("start-journey");
  const finishBtn = document.getElementById("finish-journey");
  const imgElement = loadingScreen ? loadingScreen.querySelector(".yes") : null;

  
  let messageDisplay = document.getElementById("rewind-message");
  if (!messageDisplay && loadingScreen) {
    messageDisplay = document.createElement("div");
    messageDisplay.id = "rewind-message";
    messageDisplay.style.marginTop = "15px";
    messageDisplay.style.fontSize = "16px";
    messageDisplay.style.fontWeight = "400";
    messageDisplay.style.textAlign = "center";
    messageDisplay.style.color = "#fff";
    messageDisplay.style.minHeight = "50px";
    loadingScreen.querySelector(".loading-content").appendChild(messageDisplay);
  }

  
  let nextBtn = document.getElementById("next-year");
  if (!nextBtn && loadingScreen) {
    nextBtn = document.createElement("button");
    nextBtn.textContent = "Lanjut!?";
    nextBtn.id = "next-year";
    nextBtn.style.marginTop = "25px";
    loadingScreen.querySelector(".loading-content").appendChild(nextBtn);
  }

  let finishRewindBtn = document.getElementById("finish-rewind");
  if (!finishRewindBtn && loadingScreen) {
    finishRewindBtn = document.createElement("button");
    finishRewindBtn.textContent = "Lanjut?? Dikit lagi kok!!";
    finishRewindBtn.id = "finish-rewind";
    finishRewindBtn.style.marginTop = "25px";
    finishRewindBtn.style.display = "none";
    loadingScreen.querySelector(".loading-content").appendChild(finishRewindBtn);
  }

  
  const rewindSteps = [
    { year: 2009, img: "i1.jpg", msg: "Di suatu tempat yang pastinya di bumi, 30 Oktober 2009. Kamu yang imut dan lucu lahir ke dunia :>" },
    { year: 2022, img: "yay.png", msg: "Di pertengahan 2022 kita ketemu dan saling kenal. Lewat chat iseng aku yang diterusin ke kamu sama temen ku hehe 😭 Sejak itu aku semakin berusaha untuk mengenal kamu😈" },
    { year: 2025, img: "Feliz Cumpleaños con Emojis y Globos.png", msg: "Dan sekarang, 30 Oktober 2025, kamu udah tumbuh jauh lebih dewasa dan bahkan jauuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuh lebih hebat 💖" },
  ];

  let current = 0;
  let typingInterval = null;

  
  function showOnlyScreen(screenToShow) {
    [startScreen, loadingScreen, finishScreen].forEach(s => {
      if (!s) return;
      if (s === screenToShow) s.classList.add("active");
      else s.classList.remove("active");
    });
  }

  
  function openRewindContainer() {
    if (rewindScreen) {
      rewindScreen.classList.add("active");
      
      rewindScreen.style.display = "";
    }
    
    const envelopeWrap = document.querySelector(".envelope-wrapper");
    if (envelopeWrap) envelopeWrap.style.display = "none";
    
    const rotate = document.getElementById("rotate-overlay");
    if (rotate) rotate.style.display = "none";
  }

  
  function restoreEnvelope() {
    const envelopeWrap = document.querySelector(".envelope-wrapper");
    if (envelopeWrap) envelopeWrap.style.display = "";
  }

  
  function updateDisplay() {
    
    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
    }
    const step = rewindSteps[current];
    if (!step) return;

    
    if (yearDisplay) yearDisplay.textContent = step.year;
    if (imgElement) {
      imgElement.style.opacity = "0";
      
      setTimeout(() => {
        imgElement.src = step.img;
        imgElement.style.opacity = "1";
      }, 120);
    }

    
    typeMessage(step.msg);

    
    if (step.year === 2025) {
      if (nextBtn) nextBtn.style.display = "none";
      if (finishRewindBtn) finishRewindBtn.style.display = "inline-block";
    } else {
      if (nextBtn) nextBtn.style.display = "inline-block";
      if (finishRewindBtn) finishRewindBtn.style.display = "none";
    }
  }

  
  function typeMessage(text) {
    if (!messageDisplay) return;
    messageDisplay.textContent = "";
    let idx = 0;
    typingInterval = setInterval(() => {
      if (idx < text.length) {
        messageDisplay.textContent += text.charAt(idx);
        idx++;
      } else {
        clearInterval(typingInterval);
        typingInterval = null;
      }
    }, 30);
  }

  
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      openRewindContainer();
      showOnlyScreen(loadingScreen);
      current = 0;
      updateDisplay();
    });
  }

  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (current < rewindSteps.length - 1) {
        current++;
        updateDisplay();
      }
    });
  }
  
  if (finishRewindBtn) {
    finishRewindBtn.addEventListener("click", () => {
      showOnlyScreen(finishScreen);

      
      const finishMsg = finishScreen.querySelector("h2");
      if (finishMsg) {
        finishMsg.textContent = "YA! Itulah beberapa hal yang bisa kita refleksikan sejenak 😈 Eh tapi Petualangan kamu bakal terus berlanjut kok!";
      }

      
      if (finishBtn) finishBtn.style.display = "inline-block";
    });
  }

  
  if (finishBtn) {
    finishBtn.addEventListener("click", () => {
      
      [startScreen, loadingScreen, finishScreen].forEach(s => s?.classList.remove("active"));
      rewindScreen?.classList.remove("active");

      
      const envelopeWrap = document.querySelector(".envelope-wrapper");
      if (envelopeWrap) envelopeWrap.style.display = "";

      
      const overlay = document.querySelector(".overlay");
      if (overlay) overlay.style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  
  const rewindAgainBtnMain = document.getElementById("rewind-again") || document.getElementById("rewind-btn");
  if (rewindAgainBtnMain) {
    rewindAgainBtnMain.addEventListener("click", () => {
      
      const envelopeWrap = document.querySelector(".envelope-wrapper");
      if (envelopeWrap) envelopeWrap.style.display = "none";

      
      openRewindContainer();
      showOnlyScreen(loadingScreen);
      current = 0;
      updateDisplay();
    });
  }
});


