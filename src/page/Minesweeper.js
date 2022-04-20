/*
 * @Description: 请输入....
 * @Author: Gavin
 * @Date: 2022-04-19 11:46:15
 * @LastEditTime: 2022-04-20 00:32:47
 * @LastEditors: Gavin
 */
import React, { Component } from 'react'
import _ from 'lodash'
import './css/index.css'
class MainWarp extends Component {
  width = 10
  height = 10
  directions = [[0, -1], [1, -1], [-1, -1], [0, 1], [-1, 1], [1, 1]]
  color = ['', '#0066CC', '#FFCC00', '#006600', '#990033']
  constructor() {
    super()
    const init = Array.from({ length: this.height }, (_, y) => Array.from({ length: this.width }, (_, x) => ({ x, y, adjacentMines: 0, mine: false, revealed: false })))

    this.state = {
      start: false,
      list: init
    }
  }
  render() {
    return (
      <div>
        {
          this.state.list.map((j, inx) => (<div key={inx} style={{ height: '40px', overflow: 'hidden' }}>{
            j.map(i => (<button key={i.x + i.y} className={`mine-content ${i.revealed ? 'mine-active' : ''}`} style={{ color: this.getFontColor(i), background: i.revealed && i.mine && 'red' }} onClick={() => (this.handleRevealed(i, this.state.list))}>{
              i.revealed ? (i.mine ? '💣' : i.adjacentMines) : "?"
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
  handleRevealed(item, oldList) {
    const { x, y, mine } = item
    const initGame=()=> this.updateNumbers(this.generateMines(oldList, item))
    let newList = _.cloneDeep(this.state.start?oldList :initGame())
    console.warn(newList);
    
    newList[y][x].revealed = true
    this.setState(state=>({
      list: newList,
      start:true
    }), () => {
      mine && setTimeout(() => {
        alert("你输了")
      }, 0);
    })

  }
  getFontColor(item) {
    if (!item.revealed) return
    return this.color[item.adjacentMines || 0]
  }
  updateNumbers(oldList,) {
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
}

export default class Minesweeper extends Component {
  render() {
    return (
      <div><MainWarp></MainWarp></div>
    )
  }
}
