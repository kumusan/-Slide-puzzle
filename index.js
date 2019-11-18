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
                ]
            },

            methods: {
                // スタート
                start: function() {
                    this.panel_array = this.two_dimensions(this.random())
                },

                // 乱数
                random: function() {
                    const panels = []
                    while (panels.length < 16) {
                        const n = Math.floor(Math.random() * 16)
                        if (panels.indexOf(n) === -1) {
                            panels.push(n)
                        }
                    }
                    return panels
                },

                // 二次元配列化
                two_dimensions: function(panels) {
                    const two_dimensions_panel = []
                    const one_dimensions_panel = []
                    let i = 0
                    panels.forEach(value => {
                        if (value === 0) value = ''
                        one_dimensions_panel.push(value)
                        if (i++ === 3) {
                            two_dimensions_panel.push(Array.from(one_dimensions_panel))
                            one_dimensions_panel.length = 0
                            i = 0
                        }
                    })
                    return two_dimensions_panel
                },

                // パネル入れ替え
                change_panel: function(panel) {
                    // click
                    let x
                    let y
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {
                            if (panel === this.panel_array[i][j]) {
                                y = i
                                x = j
                            }
                        }
                    }
                    // null
                    let x2
                    let y2
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {
                            if (!this.panel_array[i][j]) {
                                y2 = i
                                x2 = j
                            }
                        }
                    }

                    const judge = [x - x2, y - y2]
                    if (
                        (judge[0] === 0 || judge[1] === 0) &&
                        (judge[0] === 1 || judge[1] === 1 || judge[0] === -1 || judge[1] === -1)
                    ) {
                        this.panel_array[y2][x2] = this.panel_array[y][x]
                        this.panel_array[y][x] = null
                    }
                    this.panel_array.splice()
                }
            }
        })
    },
    false
)