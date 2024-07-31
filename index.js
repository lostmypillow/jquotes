import { fileSave } from "https://unpkg.com/browser-fs-access@0.31.0/dist/index.modern.js";

const quoteSpace = document.getElementById("quote");
const authorSpace = document.getElementById("author");
const categorySpace = document.getElementById("category");
const bwutton = document.getElementById("get");
async function unzipGZ() {
  if ("CompressionStream" in window) {
    bwutton.textContent = "Unzipping data, please wait..."
    bwutton.setAttribute('aria-busy', true)
    bwutton.setAttribute('disabled', true)
    const compressedReadableStream = await fetch("data.gz").then(
      (response) => response.body
    );

    const decompressedReadableStream = compressedReadableStream.pipeThrough(
      new DecompressionStream("gzip")
    );
    const decomp = await new Response(decompressedReadableStream).json();
    bwutton.textContent = "Get Random quote"
    bwutton.setAttribute('aria-busy', false)
    bwutton.removeAttribute('disabled')
    return decomp;
    
  } else {
    alert("Your browser doesn't support the CompressionStream API.");
  }
}

const decompressedData = await unzipGZ();

function getRandomQuote() {
  const stuff =
    decompressedData[Math.floor(Math.random() * decompressedData.length)];
    console.log(stuff)
  return stuff;
}
bwutton.onclick = function () {
  // clear previous content
  quoteSpace.textContent = "";
  authorSpace.textContent = "";
  categorySpace.textContent = "";

  // make loading spinner visible
  quoteSpace.setAttribute("aria-busy", true);
  author.setAttribute("aria-busy", true);
  categorySpace.setAttribute("aria-busy", true);

  const content = getRandomQuote();

  //set HTML contents to generated quote
  quoteSpace.textContent = content.quote;
  authorSpace.textContent = content.author;
  categorySpace.textContent = content.category;

  quoteSpace.setAttribute("aria-busy", false);
  authorSpace.setAttribute("aria-busy", false);
  categorySpace.setAttribute("aria-busy", false);
  // });
};

// ignore below:
// const button = document.getElementById("button");

// if ("CompressionStream" in window) {
//   button.addEventListener("click", async () => {
//     const readableStream = await fetch("data.json").then(
//       (response) => response.body
//     );
//     const compressedReadableStream = readableStream.pipeThrough(
//       new CompressionStream("gzip")
//     );
//     await fileSave(new Response(compressedReadableStream), {
//       fileName: "lorem.gz",
//       extensions: [".gz"],
//     });
//   });
// } else {
//   button.addEventListener("click", () => {
//     alert("Your browser doesn't support the CompressionStream API.");
//   });
// }

// const readButton = document.getElementById("read");
