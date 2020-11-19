var grids = [[0, 2, 4, 8],
             [16, 32, 64, 128],
             [256, 512, 1024, 2048],
             [8, 4, 2, 0]
];
const NewTheme = {
    "0": "#D4C8BD",
    "2": "#EDE3DA",
    "4": "#EDE1D1",
    "8": "#F0CBAA",
    "16": "#F1BC9F",
    "32": "#F1AF9D",
    "64": "#F1A08B",
    "128": "#EDD9A6",
    "256": "#F6E5B0",
    "512": "#CDFF3F",
    "1024": "#CADCD4",
    "2048": "#75DBFF",
    "2or4": "#424242",
    "others": "#FAFAFA"
};
var context;
const SIDELEN = 70;
const MARGIN = 5;

export default {
    data: {
        bestScores: 9818,
        currentScores: 0
    },
    onReady() {
        context = this.$refs.canvas.getContext('2d');
    },
    onShow() {
        this.drawGrids();
    },
    drawGrids() {
        for (let row = 0;row < 4; row++) {
            for (let column = 0;column < 4; column++) {
                let gridStr = grids[row][column].toString();
                context.fillStyle = NewTheme[gridStr];

                let leftTopx = column * (SIDELEN + MARGIN) + MARGIN;
                let leftTopY = row * (SIDELEN + MARGIN) + MARGIN;
                //                (x,y,width,height)
                context.fillRect(leftTopx, leftTopY, SIDELEN, SIDELEN);

                context.font = "24px HYQiHei-65S";
                if (gridStr != "0") {
                    switch (gridStr) {
                        case "2":
                        case "4":
                        context.fillStyle = NewTheme["2or4"];
                        break;
                        default:
                        context.fillStyle = NewTheme["others"];
                        break;
                    }
                    let offsetY = (SIDELEN - 24) / 2;
                    let offseX = (4 - gridStr.length) * (SIDELEN / 8);
                    context.fillText(gridStr,leftTopx + offseX,leftTopY + offsetY);
                }
            }
        }
    }
}
