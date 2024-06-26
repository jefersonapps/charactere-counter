var results = document.getElementById("results");

export function count() {
  var text = document.getElementById("text").value;
  if (text.length === 0) return;
  var charCountSpaces = document.getElementById("spaces").checked;
  var charCount = charCountSpaces
    ? text.length
    : text.replace(/\s/g, "").length;
  var wordCount = text.trim().split(/\s+/).length;
  results.innerHTML = `<div class="card text-white bg-secondary mb-3 w-50 shadow-lg"> 
                            <div class="card-header text-center bg-purple"> Resultado </div> 
                            <div class="card-body bg-purple-dark"> 
                                <h5 class="card-title text-center" id="charResult">Número de caracteres: ${charCount}</h5> 
                                <h5 class="card-title text-center" id="wordResult">Número de palavras: ${wordCount}</h5> 
                            </div> 
                        </div>`;
}

document.getElementById("spaces").addEventListener("change", function () {
  count();
});

document.getElementById("text").addEventListener("input", function () {
  count();
});
