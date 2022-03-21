package cpm

import (
	"github.com/bsponge/boil/graph"
)

func (g *graph.Graph) StepForward() error {
	return g.stepForward(0, 0)
}

func (g *graph.Graph) stepForward(startValue, idx uint) error {
	list := g.AdjacencyList[idx]
	for node := list.Node; node != nil; node = node.Next {
		if node.Value.EarliestStart < startValue {
			node.Value.EarliestStart = startValue
			node.Value.EarliestFinish = startValue + node.Value.Cost
		}

		err := g.stepForward(node.Value.EarliestFinish, node.Value.EarliestFinish)
		if err != nil {
			return err
		}
	}

	return nil
}

func (g *graph.Graph) StepBackward() error {

}
