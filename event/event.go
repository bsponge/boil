package event

import (
	"github.com/bsponge/boil/types"
)

type Event struct {
	Action types.Item `json:"action"`
	PrecedingActions []types.Item `json:"preceding_actions"`
	Duration types.Cost `json:"duration"`
}
