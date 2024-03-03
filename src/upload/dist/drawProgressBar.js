"use strict";
exports.__esModule = true;
exports.drawProgressBar = void 0;
var readline = require("readline");
exports.drawProgressBar = function (progress) {
    var barLength = 30;
    var completedLength = Math.round(barLength * progress);
    var remainingLength = barLength - completedLength;
    var progressBar = "█".repeat(completedLength) + "-".repeat(remainingLength);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write("[" + progressBar + "] " + Math.round(progress * 100) + "%");
};
// function updateProgress(progress: number) {
//   drawProgressBar(progress);
//   if (progress >= 1) {
//     process.stdout.write("\n");
//     clearInterval(progressInterval);
//     console.log("完成", progress);
//   }
// }
// let progressInterval: NodeJS.Timer;
// (() => {
//   console.log("开始");
//   let progress = 0;
//   progressInterval = setInterval(() => {
//     progress += 0.05; // Increase progress by 5% each time (adjust as needed)
//     updateProgress(progress);
//   }, 500); // Update every 500ms (adjust as needed)
// })();
