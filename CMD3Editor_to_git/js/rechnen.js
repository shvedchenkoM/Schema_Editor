function calculateCurrents(input) {
  const No_Edge = -1000000
  const Is_Edge = -999999

  let tt

  function compare(a,b)
  {
    let res = 0;//true
    if(a.length != b.length)
    {
      res = 1;
    } else {
      for(let i = 0; i<a.length; i++)
      {
        if(a[i] != b[i]) res = 1;
      }
    }
    return res == 0;
  }

  let inp = [],
    myArr = [],
    used = [],
    gt = [],
    g = [],
    edc = [],
    type = [],
    val = [],
    a = [],
    m2 = [],
    m3 = [],
    ans = [],
    potential = []
  let inp_size = 0,
    n = 0,
    q = 0,
    cur = 1
  cycles = new Set()

  function get_ans() {
    for (let i = 1; i < cur; i++) {
      let val = i
      for (let i1 = i + 1; i1 < q; i1++) if (Math.abs(a[i1][i]) > Math.abs(a[val][i])) val = i1
      for (let j = 1; j <= cur; j++) 
      {
        tt = a[i][j];
        a[i][j] = a[val][j];
        a[val][j] = tt;
        //swap(a[i][j], a[val][j])
      }
        //[a[i][j], a[val][j]] = [a[val][j], a[i][j]]
      let vall = a[i][i]
      if (vall != 0)
        for (let i1 = i + 1; i1 < q; i1++) {
          let v = a[i1][i]
          for (let j = 1; j <= cur; j++) a[i1][j] = a[i][j] * v - a[i1][j] * vall
        }
    }

    for (let i = cur - 1; i > 0; i--) {
      let val = i
      for (let i1 = i - 1; i1 > 0; i1--) if (Math.abs(a[val][i]) < Math.abs(a[i1][i])) val = i1
      for (let j = 1; j <= cur; j++)
      {
        tt = a[i][j];
        a[i][j] = a[val][j];
        a[val][j] = tt;
        //swap(a[i][j], a[val][j])
      }
      // [a[i][j], a[val][j]] = [a[val][j], a[i][j]]
      let vall = a[i][i]
      if (vall != 0)
        for (let i1 = i - 1; i1 > 0; i1--) {
          let v = a[i1][i]
          for (let j = 1; j <= cur; j++) a[i1][j] = a[i][j] * v - a[i1][j] * vall
        }
    }
  }
  let cycle = []
  function dfs(v, start, par) {
    //  console.log(v)
    //  console.log(start)
    //  console.log(cycle.length)
    //  console.log("-------------")
    if (cycle.length > 2 && v == start) {
      let cycle1 = []
      let minpos = 0
      for (let i = 0; i < cycle.length; i++) if (cycle[i] < cycle[minpos]) minpos = i
      for (let i = minpos; i < cycle.length; i++) cycle1.push(cycle[i])
      for (let i = 0; i < minpos; i++) cycle1.push(cycle[i])
      //    console.log(cycle1.length)
      let r = 1;
      for (let o = 0; o < myArr.length; o++)
        if (compare(cycle1, myArr[o]))
          r = 0;
      console.log(cycle1[0])
      if (r == 1)
      myArr.push(cycle1)
    } else {
      if (v != start) used[v] = 1
      cycle.push(v)
      for (let i = 1; i <= n; i++)
        if (i != par && used[i] == 0 && g[v][i] != No_Edge && i != v && type[i] != 5) {
          //       console.log(i);
          //       console.log("sdsd")
          //       console.log(v)
          dfs(i, start, v, cycle)
          used[i] = 0
        }
    }
    if (v != start) cycle.pop()
  }

  function get_cycles() {
    for (let i = 1; i <= n; i++) {
      while (cycle.length > 0) cycle.pop()
      for (let j = 1; j <= n; j++) used[j] = 0
      dfs(i, i, -1)
      //   console.log("sffsfsf")
    }
  }

  function get(pos) {
    used[pos] = true
    //let q = p[];
    let q = []
    q.push(pos)
    while (q.length > 0) {
      let v = q.shift()
      for (let i = 1; i <= n; i++)
        if (g[v][i] == Is_Edge) {
          let u = i,
            par = v
          g[v][i] = cur
          g[i][v] = -cur
          while (type[u] != 0)
            for (let j = 1; j <= n; j++)
              if (g[u][j] == Is_Edge && j != par) {
                g[u][j] = cur
                g[j][u] = -cur
                par = u
                u = j
                break
              }
          if (!used[u]) {
            used[u] = 1
            q.push(u)
          }
          cur++
        }
    }
  }

  function get_cur() {
    let r = 1
    for (let i = 1; i <= n; i++)
      if (type[i] == 0) {
        r = 0
        break
      }
    if (r) {
      for (let i = 1; i <= n; i++) used[i] = 0
      let pos = 1
      let now = pos
      do {
        used[pos] = 1
        for (let i = 1; i <= n; i++)
          if (i != pos && g[i][now] != No_Edge) {
            g[i][now] = 1
            g[now][i] = -1
            pos = now
            now = i
            break
          }
        used[now] = 1
      } while (now != 1)
      cur = 2
    } else {
      let pos = -1
      for (let i = 1; i <= n; i++)
        if (type[i] == 0) {
          pos = i
          break
        }
      // console.log(pos);
      get(pos)
    }
  }

  function get_matrix() {
    ///1 zakon
    for (let i = 1; i <= n; i++)
      if (type[i] == 0) {
        for (let j = 1; j <= n; j++)
          if (g[i][j] != No_Edge)
            if (g[i][j] < 0) a[q][-g[i][j]] = -1
            else a[q][g[i][j]] = 1
        q++
      }
      console.log("sdadfa")
      console.log(q)
      //console.log(q);
    ///2 zakon
    for (let j = 0; j < myArr.length; j++) {
      let cycle = myArr[j]
      //console.log("fuck")
      //   console.log("sdd")
      //   console.log(cycle.length)
       
        //     console.log("dfnls")
        //     console.log(cycle.length)
        cycle.push(cycle[0])
        for (let i = 0; i < cycle.length - 1; i++)
          if (type[cycle[i]] == 1 || type[cycle[i]] == 2) {
            if (g[cycle[i]][cycle[i + 1]] < 0) a[q][-g[cycle[i]][cycle[i + 1]]] += -val[cycle[i]]
            else a[q][g[cycle[i]][cycle[i + 1]]] += val[cycle[i]]
          }
        for (let i = 0; i < cycle.length - 1; i++)
          if (edc[cycle[i]][cycle[i + 1]] != 0) {
            console.log(q)
            a[q][cur] += edc[cycle[i]][cycle[i + 1]]
            //       console.log(edc[cycle[i]][cycle[i + 1]])
          }
        q++;
        let r = 0;
        for (let i = 0; i < cycle.length; i++)
          if (type[cycle[i]] == 5)
            r = 1;
            if (r == 1)
            {
              q--;
              for (let i = 0; i <= cur; i++)
                a[q][i] = 0;    
            } else {
          for (let h = 0; h < q-1; h++) { console.log(j)
          if (compare(a[h], a[j]))
          {
            console.log(h)
            q--;
            for (let i = 0; i <= cur; i++)
              a[q][i] = 0;
            break;
          }}}
        
    }
    console.log(q)
    let vv
    ///voltmetr
    for (let i = 0; i < inp_size; i++)
      if (inp[i].t == 5) {
        let v = Math.abs(g[inp[i].num_ver][inp[i].num_out])
        a[q][v] = 1
        a[q][cur] = 0
        q++
      }
  }

  function get_potentials(ver, val, cur, par) {
    potential[ver] = val
    used[ver] = 1
    for (let i = 0; i < n; i++)
      if (gt[ver][i] != No_Edge && i != par && !used[i] && type[i] != 5) {
        let v = 0
        v = potential[ver] + cur * gt[ver][i]
        get_potentials(i, v, g[ver][i], ver)
      }
  }

  function main(inp1) {
    q = 1
    inp = inp1
    for (let i = 0; i < 1000; i++) {
      a[i] = []
      for (let i1 = 0; i1 < 100; i1++) {
        a[i][i1] = 0
      }
    }
    for (let i = 0; i < 100; i++)
      m3[i] = 0;
    for (let i = 0; i < 100; i++) {
      edc[i] = []
      for (let i1 = 0; i1 < 100; i1++) {
        edc[i][i1] = 0
      }
    }
    for (let i = 0; i < 100; i++) {
      m2[i] = []
      for (let i1 = 0; i1 < 100; i1++) {
        m2[i][i1] = 0
      }
    }

    for (let i = 0; i < 100; i++) {
      g[i] = []
      for (let j = 0; j < 100; j++) g[i][j] = No_Edge
    }
    for (let i = 0; i < 100; i++) {
      gt[i] = []
      for (let j = 0; j < 100; j++) gt[i][j] = g[i][j]
    }

    for (let i = 0; i < inp_size; i++) {
      /*    cin >> inp[i].type >> inp[i].t >> inp[i].name >> inp[i].value >> inp[i].second_value >> inp[i].input.x >> inp[i].input.y >> inp[i].output.x >> inp[i].output.y;*/
      inp[i].input = {
        x: inp[i].nodes.from[0],
        y: inp[i].nodes.from[1],
      }
      inp[i].output = {
        x: inp[i].nodes.to[0],
        y: inp[i].nodes.to[1],
      }

      if (inp[i].t != 0) {
        n++
        type[n] = inp[i].t
        //console.log(inp[i].t);
        //console.log(n);
        val[n] = inp[i].value
        inp[i].num_ver = n
      }

      if (m2[inp[i].input.x][inp[i].input.y] == 0) {
        n++
        m2[inp[i].input.x][inp[i].input.y] = n
        type[n] = 4
        inp[i].num_inp = n
      } else inp[i].num_inp = m2[inp[i].input.x][inp[i].input.y]

      if (m2[inp[i].output.x][inp[i].output.y] == 0) {
        n++
        m2[inp[i].output.x][inp[i].output.y] = n
        type[n] = 4
        inp[i].num_out = n
      } else inp[i].num_out = m2[inp[i].output.x][inp[i].output.y]

      m3[inp[i].num_inp]++
      m3[inp[i].num_out]++
      if (m3[inp[i].num_inp] >= 3) type[inp[i].num_inp] = 0
      if (m3[inp[i].num_out] >= 3) type[inp[i].num_out] = 0

      if (inp[i].t != 0) {
        gt[inp[i].num_inp][inp[i].num_ver] = inp[i].value
        gt[inp[i].num_ver][inp[i].num_inp] = 0

        gt[inp[i].num_out][inp[i].num_ver] = inp[i].value
        gt[inp[i].num_ver][inp[i].num_out] = 0

        g[inp[i].num_ver][inp[i].num_inp] = Is_Edge
        g[inp[i].num_ver][inp[i].num_out] = Is_Edge

        g[inp[i].num_inp][inp[i].num_ver] = Is_Edge

        g[inp[i].num_out][inp[i].num_ver] = Is_Edge
      }
      if (inp[i].t == 0) {
        gt[inp[i].num_inp][inp[i].num_out] = 0
        gt[inp[i].num_out][inp[i].num_inp] = 0
        g[inp[i].num_inp][inp[i].num_out] = Is_Edge
        g[inp[i].num_out][inp[i].num_inp] = Is_Edge
      }

      if (inp[i].t == 2) {
        edc[inp[i].num_ver][inp[i].num_out] = inp[i].second_value
        edc[inp[i].num_out][inp[i].num_ver] = -inp[i].second_value
      }
    }
    get_cur()
    get_cycles()
    get_matrix()
    get_ans()

    for (let i = 1; i < cur; i++) {
      ans[i] = a[i][cur] / a[i][i]
      //   console.log(a[i][cur])
      //   console.log("sfsaaaaad")
    }
    /* for (let i = 1; i < 100; i++)
      for (let j = 1; j < 100; j++)
        if (g[i][j] != No_Edge) {
          if (g[i][j] < 0) g[i][j] = -ans[-g[i][j]]
          else g[i][j] = ans[g[i][j]]
        }
    */
    for (let i = 0; i < inp_size; i++)
      if (inp[i].t == 6) {
        let v = g[inp[i].num_ver][inp[i].num_out]
        inp[i].value = ans[v]
      }
    for (let i = 0; i < 100; i++) used[i] = 0
    for (let i = 0; i < inp_size; i++)
      if (inp[i].t == 2) {
        get_potentials(inp[i].num_out, 0, 0, -1)
        console.log(inp[i].num_inp)

      }
    for (let i = 0; i < inp_size; i++)
      if (inp[i].t == 5) {
        let v
        v = Math.abs(potential[inp[i].num_out] - potential[inp[i].num_inp])
        inp[i].value = v
      }
    for (let i = 0; i < inp_size; i++) {
      let v
      if (inp[i].t == 0) v = g[inp[i].num_inp][inp[i].num_out]
      else v = g[inp[i].num_ver][inp[i].num_out]
      if (v < 0) inp[i].cur_value = -ans[-v]
      else inp[i].cur_value = ans[v]
    }
    //console.log(inp)
    console.log(inp)
    return inp
  }

  inp_size = input.data.length
  return main(input.data)
}

let inp1 = {
  "data": [
    {
      "name": "",
      "value": 0,
      "second_value": 10,
      "type": "e",
      "t": 2,
      "nodes": {
        "from": [
          9,
          6
        ],
        "to": [
          10,
          6
        ]
      }
    },
    {
      "type": "w",
      "invPol": false,
      "t": 0,
      "nodes": {
        "from": [
          10,
          5
        ],
        "to": [
          10,
          6
        ]
      }
    },
    {
      "type": "w",
      "invPol": false,
      "t": 0,
      "nodes": {
        "from": [
          9,
          5
        ],
        "to": [
          9,
          6
        ]
      }
    },
    {
      "type": "w",
      "invPol": false,
      "t": 0,
      "nodes": {
        "from": [
          9,
          4
        ],
        "to": [
          9,
          5
        ]
      }
    },
    {
      "type": "w",
      "invPol": false,
      "t": 0,
      "nodes": {
        "from": [
          10,
          4
        ],
        "to": [
          10,
          5
        ]
      }
    },
    {
      "name": "",
      "value": 0,
      "type": "v",
      "invPol": false,
      "t": 5,
      "nodes": {
        "from": [
          9,
          4
        ],
        "to": [
          10,
          4
        ]
      }
    },
    {
      "name": "",
      "value": 5,
      "type": "r",
      "t": 1,
      "nodes": {
        "from": [
          9,
          5
        ],
        "to": [
          10,
          5
        ]
      }
    }
  ]
}