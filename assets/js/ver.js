let filme;
let ep = {};

let timeoutId;

function carregarFilme() {
  const searchParams = new URLSearchParams(window.location.search);
  const filmeId = searchParams.get("filme");
  const epId = searchParams.get("ep");

  filme = filmes.filter((el) => el.id === Number(filmeId))[0];
  if (!filme) window.location.href = "filmes.html";
  console.log(
    "VALOR DO REDUCE",
    filme.temporadas.reduce((total, atual) => {
      total.push(...atual.episodios);
      return total;
    }, [])
  );
  if (epId)
    ep = filme.temporadas
      .reduce((total, atual) => {
        total.push(...atual.episodios);
        return total;
      }, [])
      .filter((episodios) => episodios.id === epId)[0];
}

function montarVideo() {
  const video_nome = ep.nome || filme.nome;
  $(".video-nome").text(video_nome);

  $(".video-placeholder").css(
    "background-image",
    `url(${ep.miniatura || filme.imagem})`
  );

  $("a.video-voltar").attr("href", `filme.html?id=${filme.id}`);

  $(".video-placeholder button").on("click", iniciarVideo);
}

function iniciarVideo() {
  $(".video-placeholder, header").fadeOut("600", function () {
    $("video")
      .trigger("play")
      .prop("volume", 0.03)
      .unbind("click")
      .on("click", playPauseVideo);
    $("#videoPlayer").addClass("sem-cursor");

    $(".js-play").unbind("click").on("click", playPauseVideo);
    $(".js-volume").unbind("click").on("click", volumeVideo);
    $(".js-fullscreen").unbind("click").on("click", fullscreenVideo);

    $("#videoPlayer").on("mousemove", function () {
      $("#videoPlayer").removeClass("sem-cursor");
      $("header, .video-controles").css("display", "").removeClass("d-none");
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        $("header, .video-controles").fadeOut("600");
        $("#videoPlayer").addClass("sem-cursor");
      }, 2000);
    });
  });
}

function playPauseVideo(event) {
  const video = $("video");
  const paused = video.prop("paused");
  const fadeTempo = "600";

  if (paused) {
    video.trigger("play");
    $(".js-play span").removeClass("mdi-play").addClass("mdi-pause");
    $(".video-controle-retorno")
      .fadeToggle({
        duration: fadeTempo,
        start: function () {
          $(this).addClass("controle-aumentar");
        },
        done: function () {
          $(this).fadeToggle(fadeTempo, function () {
            $(this).removeClass("controle-aumentar");
          });
        },
      })
      .find("span")
      .removeClass("mdi-pause")
      .addClass("mdi-play");
  } else {
    video.trigger("pause");
    $(".js-play span").removeClass("mdi-pause").addClass("mdi-play");
    $(".video-controle-retorno")
      .fadeToggle({
        duration: fadeTempo,
        start: function () {
          $(this).addClass("controle-aumentar");
        },
        done: function () {
          $(this).fadeToggle(fadeTempo, function () {
            $(this).removeClass("controle-aumentar");
          });
        },
      })
      .find("span")
      .removeClass("mdi-play")
      .addClass("mdi-pause");
  }
}

function volumeVideo(event) {
  const video = $("video");
  const muted = video.prop("volume") === 0;

  if (muted) {
    video.prop("volume", 1);
    $(event.currentTarget)
      .children("span")
      .removeClass("mdi-volume-off")
      .addClass("mdi-volume-high");
  } else {
    video.prop("volume", 0);
    $(event.currentTarget)
      .children("span")
      .removeClass("mdi-volume-high")
      .addClass("mdi-volume-off");
  }
}

function fullscreenVideo(event) {
  const videoConteudo = $(".video-player-conteudo");
  // const fullScreen = video.prop("volume") === 0;

  if (videoConteudo.hasClass("fullscreen")) {
    videoConteudo.removeClass("fullscreen");
    $(event.currentTarget)
      .children("span")
      .removeClass("mdi-fullscreen-exit")
      .addClass("mdi-fullscreen");
    document.exitFullscreen();
  } else {
    videoConteudo.addClass("fullscreen").trigger("requestFullscreen");
    $(event.currentTarget)
      .children("span")
      .removeClass("mdi-fullscreen")
      .addClass("mdi-fullscreen-exit");
  }
}

$(document).ready(function () {
  montarVideo();
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
});

carregarFilme();

redirecionarLogin(false);