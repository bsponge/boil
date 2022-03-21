package graph

import (
	"fmt"

	"github.com/bsponge/boil/linkedlist"
	"github.com/bsponge/boil/types"
	"github.com/bsponge/boil/event"
)

type Edge struct {
	Source         uint
	Destination    uint
	Cost           types.Cost
	Label          string
	EarliestStart  types.Cost
	EarliestFinish types.Cost
	LatestStart    types.Cost
	LatestFinish   types.Cost
	Reserve        types.Cost
	Critical       bool
}

type Graph struct {
	AdjacencyList []linkedlist.LinkedList[Edge]
}

func New() *Graph {
	return &Graph{
		AdjacencyList: make([]linkedlist.LinkedList[Edge], 0),
	}
}

func (g *Graph) AddEdge(source, destination uint, cost types.Cost, label string) {
	edge := &Edge {
		Source: source,
		Destination: destination,
		Cost: cost,
		Label: label,
	}

	for ; uint(len(g.AdjacencyList)) < source+1; {
		g.AdjacencyList = append(g.AdjacencyList, linkedlist.LinkedList[Edge]{})
	}

	g.AdjacencyList[source].AddNode(edge)
}

func (g *Graph) findNode(label string) (uint, error) {
	for _, list := range g.AdjacencyList {
		for n := list.Node; n != nil; n = n.Next {
			if n.Value.Label == label {
				return n.Value.Destination, nil
			}
		}
	}

	return 0, fmt.Errorf("Cannot find node with edge %s", label)
}

func NewGraphFromEvents(events []event.Event) (*Graph, error) {
	g := New()
	nodeNum := uint(1)

	for _, e := range events {

		if len(e.PrecedingActions) == 0 {
			g.AddEdge(0, nodeNum, e.Duration, string(e.Action))
		} else {
			for _, precEvent := range e.PrecedingActions {
				prevNode, err := g.findNode(string(precEvent))
				if err != nil {
					return nil, fmt.Errorf("Cannot create graph: %s", err)
				}

				g.AddEdge(prevNode, nodeNum, e.Duration, string(e.Action))
			}
		}

		nodeNum++
	}

	return g, nil
}

func (g *Graph) String() string {
	s := ""

	for i, list := range g.AdjacencyList {
		s += fmt.Sprintf("node: %d\n", i)
		for n := list.Node; n != nil; n = n.Next {
			s += fmt.Sprintf("\tedge: %s\n", n.Value.Label)
		}
	}

	return s
}
