document.getElementById('search').addEventListener('click', function() {
    const artist = document.getElementById('artist').value;
    const song = document.getElementById('song').value;

    if (artist && song) {
        fetchLetra(artist, song);
    } else {
        alert('Por favor, insira o nome do artista e da música.');
    }
});

document.getElementById('translate').addEventListener('click', function() {
    const artist = document.getElementById('artist').value;
    const song = document.getElementById('song').value;

    if (artist && song) {
        translateLetra(artist, song);
    } else {
        alert('Por favor, insira o nome do artista e da música.');
    }
});

function updateVagalumeLink(artist) {
    const vagalumeLink = document.getElementById('vagalumeLink');
    vagalumeLink.href = `http://www.vagalume.com.br/search.php?t=art&q=${encodeURIComponent(artist)}`;
    vagalumeLink.textContent = `Mais sobre ${artist} no Vagalume »`;
}

function showLetra(data, artist, song, arrayid = 0) {
    const lyricsTextarea = document.getElementById('lyrics');

    if (data.type === 'exact' || data.type === 'aprox') {
        lyricsTextarea.value = data.mus[arrayid].text;
    } else if (data.type === 'song_notfound') {
        lyricsTextarea.value = `Song "${song}" from "${artist}" was not found.`;
    } else {
        lyricsTextarea.value = `Song "${song}" from "${artist}" was not found (artist not found).`;
    }

    updateVagalumeLink(artist);
}

function translateLetra(artist, song) {
    const data = jQuery.data(document, artist + song);
    if (data && data.mus[0].translate) {
        const lyricsTextarea = document.getElementById('lyrics');
        lyricsTextarea.value = data.mus[0].translate[0].text;
    } else {
        alert('Tradução não disponível.');
    }
}

function fetchLetra(artist, song) {
    const data = jQuery.data(document, artist + song);
    if (data) {
        showLetra(data, artist, song);
        return;
    }

    const url = `http://api.vagalume.com.br/search.php?art=${encodeURIComponent(artist)}&mus=${encodeURIComponent(song)}`;

    jQuery.getJSON(url, function(data) {
        jQuery.data(document, artist + song, data);
        showLetra(data, artist, song);
    });
}

// Inicialize com artista e música padrão
fetchLetra("The Weeknd", "Save Your Tears");
