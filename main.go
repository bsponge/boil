package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/bsponge/boil/event"
	"github.com/bsponge/boil/graph"
	"github.com/bsponge/boil/types"
)

// "net/http"
// "encoding/json"
// "log"
// "github.com/bsponge/boil/event"

func main() {

	/*
		fmt.Println("test")
		g := graph.New(4)

		g.AddEdge(0, 1, 5, "A")
		g.AddEdge(0, 2, 7, "B")
		g.AddEdge(1, 3, 6, "C")
		g.AddEdge(1, 4, 8, "D")
		g.AddEdge(2, 4, 3, "E")
		g.AddEdge(3, 4, 4, "F")
		g.AddEdge(3, 5, 2, "G")
		g.AddEdge(4, 5, 5, "H")

			g.AddEdge(0, 1, 1, "A")
			g.AddEdge(1, 2, 1, "B")
			g.AddEdge(2, 3, 4, "C")
			g.AddEdge(3, 4, 1, "D")

		path := g.CPM()

		fmt.Println(g.String())

		fmt.Println(path)
	*/

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")

		if r.Method == "POST" {
			// actions := []event.Nodes{}
			parser := []event.Parser{}
			fmt.Println("got!")

			// err := json.NewDecoder(r.Body).Decode(&actions)
			err := json.NewDecoder(r.Body).Decode(&parser)
			if err != nil {
				log.Println(err)
				return
			}

			fmt.Println("printing info:")
			var biggest uint64 = 0
			for i := range parser {
				d, _ := strconv.ParseUint(parser[i].Destination, 10, 32)
				if d > biggest {
					biggest = d
				}
			}
			g := graph.New(int(biggest) - 1)

			println("PARSER TEST:  ", parser[0].Destination, " label = ", parser[0].Action)
			println("PARSER TEST:  ", parser[1].Destination, " label = ", parser[1].Action)

			fmt.Println(parser)

			for _, pr := range parser {
				// fmt.Println("loooop: source ", action.Source, " dest: ", action.Destination, " time: ", action.Duration, " l = ", action.Label)
				source, err := strconv.ParseUint(pr.Source, 10, 32)
				destination, err1 := strconv.ParseUint(pr.Destination, 10, 32)

				duration, err2 := strconv.ParseUint(pr.Duration, 10, 32)
				// println("parsed: cost = ", duration)

				// g.AddEdge(action.Source, action.Destination, action.Duration, action.Label)
				if err != nil && err1 != nil && err2 != nil {
					fmt.Println("Error caught!")
				} else {
					g.AddEdge(uint(source), uint(destination), types.Cost(duration), pr.Action)
				}

			}

			cpm := g.CPM()
			fmt.Print(cpm)
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
