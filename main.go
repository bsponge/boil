package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/bsponge/boil/event"
	"github.com/bsponge/boil/example"
	"github.com/bsponge/boil/graph"
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

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(r.Body)
		fmt.Fprintf(w, "Hello world")
	})

	http.ListenAndServe(":8080", nil)
}
