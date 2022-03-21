package main

import (
	"fmt"

	"github.com/bsponge/boil/graph"
)

func main() {
	g := graph.New(6)

	g.AddEdge(0, 1, 5, "A")
	g.AddEdge(0, 2, 7, "B")
	g.AddEdge(1, 3, 6, "C")
	g.AddEdge(1, 4, 8, "D")
	g.AddEdge(2, 4, 3, "E")
	g.AddEdge(3, 4, 4, "F")
	g.AddEdge(3, 5, 2, "G")
	g.AddEdge(4, 5, 5, "H")

	g.StepForward()

	g.StepBackward()

	fmt.Println(g.String())
	/*
		http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Headers", "*")

			if r.Method == "POST" {
				actions := []event.Event{}
				err := json.NewDecoder(r.Body).Decode(&actions)
				if err != nil {
					log.Fatal("Cannot decode json")
				}
				fmt.Println(actions)
			}
		})

		err := http.ListenAndServe(":8080", nil)
		if err != nil {
			log.Fatal("HTTP server error", err)
			return
		}
	*/
}
