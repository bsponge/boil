package event

import (
	"github.com/bsponge/boil/types"
)

type Event struct {
	Action           types.Item   `json:"action"`
	PrecedingActions []types.Item `json:"precedingActions"`
	Duration         types.Cost   `json:"duration"`
}
