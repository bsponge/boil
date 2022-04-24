package event

import (
	"github.com/bsponge/boil/types"
)

type Nodes struct {
	Source      uint       `json:"source"`
	Destination uint       `json:"destination"`
	Duration    types.Cost `json:"duration"`
	Action      string     `json:"action"`
}
