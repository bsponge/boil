package event

type Parser struct {
	Source      string `json:"source"`
	Destination string `json:"destination"`
	Duration    string `json:"duration"`
	Action      string `json:"action"`
}
