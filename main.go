package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/bsponge/boil/event"
	"github.com/bsponge/boil/example"
	"github.com/bsponge/boil/graph"
)

func main() {
	actions := []event.Event{}
	err := json.Unmarshal([]byte(example.EventsJson), &actions)
	if err != nil {
		log.Fatal(err)
		return
	}

	fmt.Println(actions)

	g, err := graph.NewGraphFromEvents(actions)
	if err != nil {
		log.Fatal(err)
		return
	}

	fmt.Println(g)

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
