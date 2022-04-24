package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/bsponge/boil/event"
	"github.com/bsponge/boil/graph"
)

// "net/http"
// "encoding/json"
// "log"
// "github.com/bsponge/boil/event"

func main() {
	/*
		fmt.Println("test")
		g := graph.New(6)

		g.AddEdge(0, 1, 5, "A")
		g.AddEdge(0, 2, 7, "B")
		g.AddEdge(1, 3, 6, "C")
		g.AddEdge(1, 4, 8, "D")
		g.AddEdge(2, 4, 3, "E")
		g.AddEdge(3, 4, 4, "F")
		g.AddEdge(3, 5, 2, "G")
		g.AddEdge(4, 5, 5, "H")

		path := g.CPM()

		fmt.Println(g.String())

		fmt.Println(path)
		fmt.Println(g.CPM())
	*/
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")

		if r.Method == "POST" {
			actions := []event.Nodes{}
			// actions := []event.Event{}
			err := json.NewDecoder(r.Body).Decode(&actions)
			if err != nil {
				// log.Info("Cannot decode json")
				return
			}

			g := graph.New(len(actions))

			for _, action := range actions {
				g.AddEdge(action.Source, action.Destination, action.Duration, action.Label)
			}
			fmt.Println(actions)
			cpm := g.CPM()
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(cpm)
		}
	})

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("HTTP server error", err)
		return
	}
}
