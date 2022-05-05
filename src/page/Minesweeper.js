/*
 * @Description: 请输入....
 * @Author: Gavin
 * @Date: 2022-04-19 11:46:15
 * @LastEditTime: 2022-05-05 23:50:31
 * @LastEditors: Gavin
 */
import React, { Component } from 'react'
import _ from 'lodash'
import './css/index.css'
class MainWarp extends Component {
  width = 10
  height = 10
  directions = [[0, -1], [0, 1],[-1,0],[1,0], [1, -1], [-1, -1], [-1, 1], [1, 1]]
  color = ['', '#0066CC', '#FFCC00', '#006600', '#990033']
  constructor() {
    super()
    const init = Array.from({ length: this.height }, (_, y) => Array.from({ length: this.width }, (_, x) => ({ x, y, adjacentMines: 0, mine: false, revealed: false })))

    this.state = {
      start: false,
      list: init,
      isEnding:false
    }
  }
  render() {
    return (
      <div>
        {
          this.state.list.map((j, inx) => (<div key={inx} style={{ height: '40px', overflow: 'hidden' }}>{
            j.map(i => (<button key={i.x + i.y} className={`mine-content ${i.revealed ? 'mine-active' : ''}`} style={{ color: this.getFontColor(i), background: i.revealed && i.mine && 'red' }} onClick={() => (this.handleRevealed(i, this.state.list))}>{
              i.revealed||this.state.isEnding ? (i.mine ? '💣' : i.adjacentMines) : "?"
            }</button>))
          }</div>))
        }

      </div>
    )
  }
  generateMines = (oldList, initial) => {
    const newList = _.cloneDeep(oldList)
    newList.forEach(item => {
      item.forEach((j, index) => {
        // console.log(initial);

        if (initial && Math.abs(initial.x - j.x) < 1) return
        if (initial && Math.abs(initial.y - j.y) < 1) return
        j['mine'] = Math.random() < 0.2

      })

    })
    
    return newList
  }
  
  /**
   * @description: 方法说明....
   * @param {*} item 当前选中想
   * @param {*} oldList
   * @return {*}
   * @Date: 2022-05-05 22:42:04
   */
  handleRevealed(item, oldList) {
    if(this.state.isEnding)return
    const { x, y, mine } = item
    const initGame=()=> this.updateNumbers(this.generateMines(oldList, item))
    let newList = _.cloneDeep(this.state.start?oldList :initGame())

    newList =this.expandZero(newList[y][x],newList)
    newList[y][x].revealed = true
    //拓展
    
    this.setState(state=>({
      list: newList,
      start:true
    }), () => {
      mine && setTimeout(() => {
        alert("你输了")
        this.setState({isEnding:true})
      }, 0);
    })

  }
  getFontColor(item) {
    if (!item.revealed) return
    return this.color[item.adjacentMines || 0]
  }
  updateNumbers(oldList) {
    const newList = _.cloneDeep(oldList)
    newList.forEach((row, y) => {
      row.forEach((j, x) => {
        if (j.mine) return
        this.directions.forEach(([dx, dy]) => {
          const x2 = x + dx,
            y2 = y + dy
          // console.log(x2 < 0 || x2 > this.width || y2 < 0 || y2 >= this.height);
          if (x2 < 0 || x2 >= this.width || y2 < 0 || y2 >= this.height) return
   
          newList[y2][x2].mine && j.adjacentMines++

        })
      })
    })
    return newList
  }
  expandZero(block,list){

    const {x,y,adjacentMines,revealed,mine}=block
  
    if(adjacentMines||revealed||mine)return list
    let newList = list
    this.directions.forEach(([dx, dy]) => {
            const x2 = x + dx,
              y2 = y + dy
            // console.log(x2 < 0 || x2 > this.width || y2 < 0 || y2 >= this.height);
            if (x2 < 0 || x2 >= this.width || y2 < 0 || y2 >= this.height) return
            const {adjacentMines,revealed,mine}=newList[y2][x2]

            if(adjacentMines||revealed||mine){
              
              console.warn("执行特殊");
              this.expandZero(newList[y2][x2],newList)}
            
            newList[y2][x2].revealed= true
  
     })
     return newList
    // const newList = _.cloneDeep(this.state.list)
    // newList.forEach((row, y) => {
    //   row.forEach((j, x) => {
    //     if (j.mine) return
    //     this.directions.forEach(([dx, dy]) => {
    //       const x2 = x + dx,
    //         y2 = y + dy
    //       // console.log(x2 < 0 || x2 > this.width || y2 < 0 || y2 >= this.height);
    //       if (x2 < 0 || x2 >= this.width || y2 < 0 || y2 >= this.height) return
   
    //       newList[y2][x2].mine && j.adjacentMines++

    //     })
    //   })
    // })

  }
}

export default class Minesweeper extends Component {
  render() {
    return (
      <div><MainWarp></MainWarp></div>
    )
  }
}
