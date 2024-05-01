import Jimp from "jimp";
import sharp from "sharp";

const pieces = [
  "b_bishop",
  "b_king",
  "b_knight",
  "b_pawn",
  "b_queen",
  "b_rook",
  "w_bishop",
  "w_king",
  "w_knight",
  "w_pawn",
  "w_queen",
  "w_rook",
] as const;

const getExtractedPiece = async (input: string, column: number, row: number) =>
  await sharp(input)
    .extract({
      left: (8 - column) * 100,
      top: (8 - row) * 100,
      width: 100,
      height: 100,
    })
    .toFile("output.png", (err, info) => {
      console.log(err);
    });

(async () => {
  await getExtractedPiece("data/1.png", 0, 0);
})();

// const getPieceType = async (boardPiece: string) => {
//   const boardPieceImg = await Jimp.read(boardPiece);

//   interface Match {
//     name: (typeof pieces)[number];
//     distance: number;
//   }
//   const matches: Match[] = [];

//   let piece: (typeof pieces)[number];
//   for (piece of pieces) {
//     const comparedImg = await Jimp.read(`data/${piece}.png`);
//     matches.push({
//       name: piece,
//       distance: Jimp.distance(boardPieceImg, comparedImg),
//     });
//   }

//   console.table(matches);
// };

// (async () => {
//   const boardFile = Bun.argv[2];
//   if (!boardFile) {
//     throw "Missing board file";
//   }

//   type Field = (typeof pieces)[number] | "nothing";
//   const board: Field[][] = [];

//   // for (let i = 0; i < 8; i++) {}
//   getPieceType("/home/evest/Projects/competitions/chess/1.png");
// })();
