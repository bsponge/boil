package graph

import (
	"fmt"

	"github.com/bsponge/boil/event"
	"github.com/bsponge/boil/linkedlist"
	"github.com/bsponge/boil/types"
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
	Preceding     []linkedlist.LinkedList[Edge]
}

func New(size int) *Graph {
	return &Graph{
		AdjacencyList: make([]linkedlist.LinkedList[Edge], size),
		Preceding:     make([]linkedlist.LinkedList[Edge], size),
	}
}

func (g *Graph) AddEdge(source, destination uint, cost types.Cost, label string) {
	edge := &Edge{
		Source:      source,
		Destination: destination,
		Cost:        cost,
		Label:       label,
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
	size := 1
	for _, e := range events {
		if len(e.PrecedingActions) != 0 {
			size++
		}
	}

	eventsMap := map[string]event.Event{}
	endingEvents := map[string]struct{}{}
	for _, e := range events {
		eventsMap[string(e.Action)] = e
		endingEvents[string(e.Action)] = struct{}{}
	}

	for _, e := range events {
		for _, prec := range e.PrecedingActions {
			delete(endingEvents, string(prec))
		}
	}

	g := New(size)

	for k, _ := range endingEvents {
		g.createGraph(string(k), eventsMap)
	}

	return g, nil
}

func Index(l linkedlist.LinkedList[Edge], label string) (uint, error) {
	var idx uint
	idx = 0

	for n := l.Node; n != nil; n = n.Next {
		if n.Value.Label == label {
			return idx, nil
		}
		idx++
	}

	return idx, fmt.Errorf("Cannot find edge with label %s", label)
}

// createGraph returns number of a preceding node
func (g *Graph) createGraph(eventName string, eventsMap map[string]event.Event) uint {
	var biggestNodeNum uint
	biggestNodeNum = 0
	precNodeNums := make([]uint, 1)
	for _, precEvent := range eventsMap[eventName].PrecedingActions {
		precNodeNum := g.createGraph(string(precEvent), eventsMap)
		precNodeNums = append(precNodeNums, precNodeNum)
		if precNodeNum > biggestNodeNum {
			biggestNodeNum = precNodeNum
		}
	}

	e := eventsMap[eventName]

	if biggestNodeNum == 0 {
		nodeNum, err := Index(g.AdjacencyList[0], eventName)
		if err != nil {
			nodeNum++
			g.AddEdge(0, nodeNum, e.Duration, string(e.Action))
		}
		return nodeNum
	} else {
		nodeNum := biggestNodeNum + 1
		for i, precNodeNum := range precNodeNums {
			precEvent := eventsMap[string(e.PrecedingActions[i])]
			g.AddEdge(precNodeNum, nodeNum, precEvent.Duration, string(precEvent.Action))
		}
		return nodeNum
	}
}

func (g *Graph) String() string {
	s := ""

	for i, list := range g.AdjacencyList {
		s += fmt.Sprintf("node: %d\n", i)
		for n := list.Node; n != nil; n = n.Next {
			s += fmt.Sprintf("\tedge: %s, from: %d, to: %d, ES: %d, EF: %d, LS: %d, LF: %d\n",
				n.Value.Label, n.Value.Source, n.Value.Destination, n.Value.EarliestStart,
				n.Value.EarliestFinish, n.Value.LatestStart, n.Value.LatestFinish)
		}
	}

	return s
}

func (g *Graph) StepForward() error {
	err := g.stepForward(0, 0)
	for _, list := range g.AdjacencyList {
		for node := list.Node; node != nil; node = node.Next {
			edge := &Edge{
				Source:         node.Value.Destination,
				Destination:    node.Value.Source,
				Cost:           node.Value.Cost,
				Label:          node.Value.Label,
				EarliestStart:  node.Value.EarliestStart,
				EarliestFinish: node.Value.EarliestFinish,
				LatestFinish:   types.Cost(99999999),
			}
			g.Preceding[node.Value.Destination].AddNode(edge)
		}
	}

	return err
}

func (g *Graph) stepForward(startValue types.Cost, idx uint) error {
	list := g.AdjacencyList[idx]
	for node := list.Node; node != nil; node = node.Next {
		if node.Value.EarliestStart <= startValue {
			node.Value.EarliestStart = startValue
			node.Value.EarliestFinish = node.Value.EarliestStart + node.Value.Cost
		}

		err := g.stepForward(node.Value.EarliestFinish, node.Value.Destination)
		if err != nil {
			return err
		}
	}

	return nil
}

func (g *Graph) StepBackward() error {
	var biggestEF types.Cost
	biggestEF = 0
	for edge := g.Preceding[len(g.Preceding)-1].Node; edge != nil; edge = edge.Next {
		if edge.Value.EarliestFinish > biggestEF {
			biggestEF = edge.Value.EarliestFinish
		}
	}
	g.stepBackward(biggestEF, uint(len(g.Preceding)-1))
	g.cpy()
	return nil
}

func (g *Graph) stepBackward(startValue types.Cost, idx uint) error {
	for node := g.Preceding[idx].Node; node != nil; node = node.Next {
		if node.Value.LatestFinish >= startValue {
			node.Value.LatestFinish = startValue
			node.Value.LatestStart = node.Value.LatestFinish - node.Value.Cost
		}

		err := g.stepBackward(node.Value.LatestStart, node.Value.Destination)
		if err != nil {
			return err
		}
	}

	return nil
}

func (g *Graph) getEdge(label string) *Edge {
	for _, list := range g.AdjacencyList {
		for node := list.Node; node != nil; node = node.Next {
			if node.Value.Label == label {
				return node.Value
			}
		}
	}
	return nil
}

func (g *Graph) cpy() {
	for _, list := range g.Preceding {
		for node := list.Node; node != nil; node = node.Next {
			edge := g.getEdge(node.Value.Label)
			if edge != nil {
				edge.LatestStart = node.Value.LatestStart
				edge.LatestFinish = node.Value.LatestFinish
			}
		}
	}
}
