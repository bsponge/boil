package graph

import (
	"fmt"

	"github.com/bsponge/boil/types"
)

type Node struct {
	Value types.Item
}

type Edge struct {
	To   *Node
	Cost types.Cost
}

func (n *Node) String() string {
	return fmt.Sprintf("%v", n.Value)
}

func (e Edge) String() string {
	return fmt.Sprintf("%v", e.Cost)
}

type Graph struct {
	nodes []*Node
	edges map[Node][]Edge
}

func (g *Graph) AddNode(n *Node) {
	g.nodes = append(g.nodes, n)
}

func (g *Graph) AddEdge(from, to *Node, cost types.Cost) {
	if g.edges == nil {
		g.edges = make(map[Node][]Edge)
	}

	g.edges[*from] = append(g.edges[*from], Edge{to, cost})
}

func (g *Graph) String() {
	s := ""
	for i := 0; i < len(g.nodes); i++ {
		s += g.nodes[i].String() + " -> "
		near := g.edges[*g.nodes[i]]
		for j := 0; j < len(near); j++ {
			s += near[j].String() + " "
		}
		s += "\n"
	}
}
