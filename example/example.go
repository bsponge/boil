package example

var EventJson = `
{
	"action": "A",
	"preceding_actions": [],
	"duration", 5
}
`

var EventsJson = `
[
	{
		"action": "A",
		"preceding_actions": [],
		"duration": 5
	},
	{
		"action": "B",
		"preceding_actions": [],
		"duration": 7
	},
	{
		"action": "C",
		"preceding_actions": ["A"],
		"duration": 6
	},
	{
		"action": "D",
		"preceding_actions": ["A"],
		"duration": 8
	},
	{
		"action": "E",
		"preceding_actions": ["B"],
		"duration": 3
	},
	{
		"action": "F",
		"preceding_actions": ["C"],
		"duration": 4
	},
	{
		"action": "G",
		"preceding_actions": ["C"],
		"duration": 2
	},
	{
		"action": "H",
		"preceding_actions": ["E", "D", "F"],
		"duration": 5
	}
]
`
