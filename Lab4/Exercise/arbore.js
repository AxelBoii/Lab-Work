function huffmanEncode(text) {
  // calculate character frequencies
  const freq = {};
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    freq[char] = (freq[char] || 0) + 1;
  }

  // create leaf nodes for each character
  const nodes = Object.keys(freq).map(char => ({ name: char, frequency: freq[char] }));

  // build Huffman tree
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);
    const left = nodes.shift();
    const right = nodes.shift();
    const newNode = {
      name: `Level ${left.name}${right.name}`,
      children: [left, right],
      frequency: left.frequency + right.frequency,
    };
    nodes.push(newNode);
  }

  // generate code table from Huffman tree
  const codeTable = {};
  function generateCode(node, code) {
    if (node.name.length === 1) {
      codeTable[node.name] = code;
    } else {
      generateCode(node.children[0], code + "0");
      generateCode(node.children[1], code + "1");
    }
  }
  generateCode(nodes[0], "");

  // encode text using code table
  let encoded = "";
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    encoded += codeTable[char];
  }

  // return encoded text and code table
  return { encodedText: encoded, codeTable };
}


function createHuffmanTree(mapping) {
  // Initialize an empty tree
  let tree = {};
  
  // Loop through the mapping and insert each character into the tree
  for (let [char, code] of Object.entries(mapping)) {
    let currentNode = tree;
    currentNode.name = "A0";
    for (let bit of code) {

      if (!currentNode.children) {
        currentNode.children = [];
      }
      if (!currentNode.children[bit]) {
        currentNode.children[bit] = {};
      }
      let tmpname = currentNode.name;
      currentNode = currentNode.children[bit];
      currentNode.name = tmpname;
      if(bit=='1') currentNode.name += 'L'
      else currentNode.name += 'R'
    }
    var tmptxt = "";
    for (let bit of code) {
      if(bit == '1') tmptxt+="L"
      else tmptxt+="R"
    }
    if(char != ' ')
      currentNode.name = "A0" + tmptxt + " " + char;
    else currentNode.name = "A0" + tmptxt + " \"Spatiu\"";
  }

  // Add the root node to the tree
  tree = {
    name: 'A0',
    children: tree.children
  };

  return tree;
}

function shannonFanoEncode(text) {
  // Create a dictionary of characters and their frequencies
  const freqDict = {};
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (!freqDict[char]) {
      freqDict[char] = 0;
    }
    freqDict[char]++;
  }

  // Convert dictionary to a list of objects and sort by frequency
  const freqList = [];
  for (const char in freqDict) {
    freqList.push({ char, freq: freqDict[char] });
  }
  freqList.sort((a, b) => b.freq - a.freq);

  // Recursively divide the list into two sub-lists with similar frequencies
  const divideList = (list) => {
    if (list.length === 1) {
      return list;
    }
    let sum = 0;
    for (const item of list) {
      sum += item.freq;
    }
    let halfSum = 0;
    let index = 0;
    while (halfSum < sum / 2) {
      halfSum += list[index].freq;
      index++;
    }
    const leftList = list.slice(0, index);
    const rightList = list.slice(index);
    for (const item of leftList) {
      item.code = (item.code || "") + "0";
    }
    for (const item of rightList) {
      item.code = (item.code || "") + "1";
    }
    return divideList(leftList).concat(divideList(rightList));
  };
  divideList(freqList);

  // Create a dictionary of characters and their codes
  const codeDict = {};
  for (const item of freqList) {
    codeDict[item.char] = item.code;
  }

  // Encode the text using the codes
  let encodedText = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    encodedText += codeDict[char];
  }
  return {encodedText, codeDict};
}


const urlParams = new URLSearchParams(window.location.search);
const param1 = urlParams.get('text');
const param2 = urlParams.get('method');
var met;
var treeData;


if(param2 == "H"){
  met = "Huffman"
  document.getElementById("titel").innerHTML = "Huffman Tree"
  treeData = createHuffmanTree(huffmanEncode(param1).codeTable)
}
if(param2 == "SF"){
  met = "Shannon-Fano"
  document.getElementById("titel").innerHTML = "Shannon-Fano Tree"
  treeData = createHuffmanTree(shannonFanoEncode(param1).codeDict)
}

document.getElementById("encodedText").innerHTML = "The text that was encoded using "+met+" is: \""+param1+"\"";


// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 3060 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

	
// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);

update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      });

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}
