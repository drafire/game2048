var grids;
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
const CONLUMN_LENGTH = 4;
const ROW_LENGTH = 4;

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
    swipeGrids(event) {
        console.log("enent direct: " + event.direction);
        if (event.direction == "up") {
            //1、该方向的格子，行n的格子的值，被行n-1的格子的值代替
            for (let row = 1;row < ROW_LENGTH; row++) {
                for (let column = 0;column < CONLUMN_LENGTH; column++) {
                    //如果row-1行，column格子为0，则被row行，column 列代替
                    if (0 == grids[row - 1][column]) {
                        grids[row - 1][column] = grids[row][column];
                    } else if (grids[row - 1][column] == grids[row][column]) {
                        //如果row-1行，column格子不为0，则检查row行，column列和row-1行，column格子数字是否相同
                        //如果相同，则row-1行，column列的值，等于row-1行，column列的原来的值*2
                        //否则，什么都不做
                        grids[row - 1][column] = (grids[row][column] * 2);
                    }
                }
            }
            //随机抽取一个格子，用于填入2或者4
            let columnIndex = 0;
            let rowIndex = 0;
            do{
                rowIndex = Math.floor(Math.random() * ROW_LENGTH);
                columnIndex = Math.floor(Math.random() * CONLUMN_LENGTH);
            } while (grids[rowIndex][columnIndex].toString() != "0")

            console.log("将在" + rowIndex + "行" + columnIndex + "列格子产生新的值");

            if (Math.random() < 0.8) {
                grids[rowIndex][columnIndex] = 2;
            } else {
                grids[rowIndex][columnIndex] = 4;
            }

            console.log("最后的grids的值如下：")
            var str = "";
            for (let row = 0;row < ROW_LENGTH; row++) {
                for (let column = 0;column < CONLUMN_LENGTH; column++) {
                    if (row != column) {
                        str += grids[row][column] + " "
                    } else {
                        str += grids[row][column] + "\n";
                        console.log(str)
                        str = "";
                    }
                }
            }
        }

        //重新绘制格子
        this.drawGrids();
    },
    onInit() {
        this.initGrids();
        this.addTwoOrFour();
        this.addTwoOrFour();
    },
    addTwoOrFour() {
        let array = [];
        for (let row = 0;row < 4; row++) {
            for (let column = 0;column < 4; column++) {
                if (grids[row][column] == 0) {
                    //这种push数组，有些神奇
                    array.push([row, column]);
                }
            }
        }

        let randomIndex = Math.floor(Math.random() * array.length);
        let row = array[randomIndex][0];
        let column = array[randomIndex][1];

        if (Math.random() < 0.8) {
            grids[row][column] = 2;
        } else {
            grids[row][column] = 4;
        }
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
                    //canvas，可以百度这个插件的用法
                    context.fillText(gridStr,leftTopx + offseX,leftTopY + offsetY);
                }
            }
        }
    },
    restartGame() {
        this.initGrids();
        this.addTwoOrFour();
        this.addTwoOrFour();
        this.drawGrids();
    },
    initGrids() {
        grids = [[0, 0, 0, 0],
                 [0, 0, 0, 0],
                 [0, 0, 0, 0],
                 [0, 0, 0, 0]
        ];
    }
}
