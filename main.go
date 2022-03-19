package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/bsponge/boil/event"
)

func main() {
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
}
