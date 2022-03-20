package graph

import (
	"github.com/bsponge/boil/linkedlist"
	"github.com/bsponge/boil/types"
)

type Edge struct {
	Source         types.Item
	Destination    types.Item
	Cost           types.Cost
	EarliestStart  types.Cost
	EarliestFinish types.Cost
	LatestStart    types.Cost
	LatestFinish   types.Cost
	Reserve        types.Cost
	Critical       bool
}

type Graph[T any] struct {
	AdjacencyList []linkedlist.LinkedList[T]
}

func NewEdge(source, destination types.Item, cost types.Cost) *Edge {
	return &Edge{
		Source:      source,
		Destination: destination,
		Cost:        cost,
	}
}

func (g *Graph[T]) StepForward() {

}

func (g *Graph[T]) StepBackward() {

}
