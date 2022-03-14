package graph

import (
	"fmt"

	"github.com/bsponge/boil/types"
	"github.com/bsponge/boil/event"
)

type Node struct {
	Value types.Item
}

type Edge struct {
	To    *Node
	Cost  types.Cost
}

type Graph struct {
	Nodes  []*Node
	Edges  map[Node][]*Edge
	Labels map[types.Item]*Edge
}

func (n *Node) String() string {
	return fmt.Sprintf("%v", n.Value)
}

func (e Edge) String() string {
	return fmt.Sprintf("%v", e.Cost)
}

func (g *Graph) AddNode(n *Node) {
	g.Nodes = append(g.Nodes, n)
}

func (g *Graph) AddEdge(from, to *Node, cost types.Cost, label types.Item) {
	if g.Edges == nil {
		g.Edges = make(map[Node][]*Edge)
	}

	e := &Edge{to, cost}
	g.Edges[*from] = append(g.Edges[*from], e)
	g.Labels[label] = e
}

func (g *Graph) String() {
	s := ""
	for i := 0; i < len(g.Nodes); i++ {
		s += g.Nodes[i].String() + " -> "
		near := g.Edges[*g.Nodes[i]]
		for j := 0; j < len(near); j++ {
			s += near[j].String() + " "
		}
		s += "\n"
	}
}

func NewGraphFromEvents(events []event.Event) *Graph {
	nodeValue := 'b'

	g := Graph{}
	g.Labels = make(map[types.Item]*Edge)

	startNode := &Node{"a"}
	g.AddNode(startNode)

	for _, e := range events {
		n := &Node{types.Item(nodeValue)}
		nodeValue++
		g.AddNode(n)

		if len(e.PrecedingActions) == 0 {
			g.AddEdge(startNode, n, e.Duration, e.Action)
		} else {
			for _, a := range e.PrecedingActions {
				g.AddEdge(g.Labels[a].To, n, e.Duration, e.Action)
			}
		}
	}

	return &g
}
