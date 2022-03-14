package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/bsponge/boil/graph"
	"github.com/bsponge/boil/event"
	"github.com/bsponge/boil/example"
)

func main() {
	events := make([]event.Event, 0)

	err := json.Unmarshal([]byte(example.EventsJson), &events)
	if err != nil {
		log.Fatal("Cannot unmarshal events")
		return
	}

	fmt.Println(events)

	g := graph.NewGraphFromEvents(events)

	for k, v := range g.Labels {
		fmt.Printf("Action: %s To: %s Cost: %d\n", k, v.To.Value, v.Cost)
	}
}
