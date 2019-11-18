document.addEventListener(
    'DOMContentLoaded',
    function() {
        new Vue({
            el: '#app',
            data: {
                panel_array: [
                    [, , , , ],
                    [, , , , ],
                    [, , , , ],
                    [, , , , ]
                ],
                ans_array_1: [
                    [1, 2, 3, 4],
                    [5, 6, 7, 8],
                    [9, 10, 11, 12],
                    [13, 14, 15, null]
                ],
                ans_array_2: [
                    [1, 2, 3, 4],
                    [5, 6, 7, 8],
                    [9, 10, 11, 12],
                    [null, 13, 14, 15]
                ],
                clear_log: '',
                select_panel: ''
            },

            methods: {
                // mouse hover leave
                mouse_hover: function(panel) {
                    this.select_panel = panel
                },

                // スタート
                start: function() {
                    this.panel_array = this.random_two_dimensions()
                },

                // 初期化

                random_two_dimensions: function() {
                    const one_dimensions_panel = []
                    const two_dimensions_panel = []

                    while (one_dimensions_panel.length < 16) {
                        let n = Math.floor(Math.random() * 16)
                        if (n === 0) n = null
                        if (one_dimensions_panel.indexOf(n) === -1) {
                            one_dimensions_panel.push(n)
                            if (one_dimensions_panel.length % 4 === 0) {
                                two_dimensions_panel.push(
                                    Array.from(
                                        one_dimensions_panel.slice(
                                            one_dimensions_panel.length - 4,
                                            one_dimensions_panel.length
                                        )
                                    )
                                )
                            }
                        }
                    }
                    return two_dimensions_panel
                },

                // パネル入れ替え
                change_panel: function(panel) {
                    // nullの位置
                    const nullIndex = []
                    this.panel_array.map((element, firstNumber) => {
                        if (
                            element.filter(just => {
                                return just === null
                            }).length > 0
                        ) {
                            nullIndex.push(firstNumber)
                        }
                    })

                    this.panel_array.findIndex(element => {
                        if (element.indexOf(null) !== -1) {
                            nullIndex.push(element.indexOf(null))
                        }
                    })

                    // タッチしたパネル
                    const touch_panel = []
                    this.panel_array.map((element, firstNumber) => {
                        if (
                            element.filter(just => {
                                return just === panel
                            }).length > 0
                        ) {
                            touch_panel.push(firstNumber)
                        }
                    })

                    this.panel_array.findIndex(element => {
                        if (element.indexOf(panel) !== -1) {
                            touch_panel.push(element.indexOf(panel))
                        }
                    })

                    // 移動の判定
                    const judge = [nullIndex[0] - touch_panel[0], nullIndex[1] - touch_panel[1]]
                    if (
                        (judge[0] === 0 || judge[1] === 0) &&
                        (judge[0] === 1 || judge[1] === 1 || judge[0] === -1 || judge[1] === -1)
                    ) {
                        this.panel_array[nullIndex[0]][nullIndex[1]] = this.panel_array[touch_panel[0]][
                            touch_panel[1]
                        ]
                        this.panel_array[touch_panel[0]][touch_panel[1]] = null

                        // クリア判定
                        if (
                            JSON.stringify(this.panel_array) == JSON.stringify(this.ans_array_1) ||
                            JSON.stringify(this.panel_array) == JSON.stringify(this.ans_array_2)
                        )
                            this.clear_log = 'おめでとう！クリア！'
                    }
                    // 発火処理
                    this.panel_array.splice()
                }
            }
        })
    },
    false
)