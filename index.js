import { fileSave } from "https://unpkg.com/browser-fs-access@0.31.0/dist/index.modern.js";

const meow = document.getElementById("test");
const author = document.getElementById("author");
const cat = document.getElementById("cat");
const bwutton = document.getElementById("get");

async function getRandomQuote() {
  if ("CompressionStream" in window) {
    const compressedReadableStream = await fetch("data.gz").then(
      (response) => response.body
    );

    const decompressedReadableStream = compressedReadableStream.pipeThrough(
      new DecompressionStream("gzip")
    );
    const decomp = await new Response(decompressedReadableStream).json();

    const stuff = decomp[Math.floor(Math.random() * decomp.length)];
    return stuff;
  } else {
    alert("Your browser doesn't support the CompressionStream API.");
  }
}
bwutton.onclick = async function () {
  meow.textContent = "";
  author.textContent = "";
  cat.textContent = "";
  meow.setAttribute("aria-busy", true);
  author.setAttribute("aria-busy", true);
  cat.setAttribute("aria-busy", true);
  //   fetch("./data.json")
  //     .then((response) => response.json())
  //     .then((json) => {
  const content = await getRandomQuote();
  meow.textContent = content.quote;
  author.textContent = content.author;
  cat.textContent = content.category;
  meow.setAttribute("aria-busy", false);
  author.setAttribute("aria-busy", false);
  cat.setAttribute("aria-busy", false);
  // });
};

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
